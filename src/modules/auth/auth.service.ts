import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { OTPEntity } from "../user/entities/otp.entity";
import { CheckOtpDto, SendOtpDto } from "./dto/auth.dto";
import { randomInt } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OTPEntity) private otpRepository: Repository<OTPEntity>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async SendOtp(otpDto: SendOtpDto) {
    const { mobile } = otpDto;
    let user = await this.userRepository.findOneBy({ mobile });
    if (!user) {
      user = this.userRepository.create({ mobile });
      user = await this.userRepository.save(user);
    }
    const code = await this.CreateOtp(user);
    if (!code) {
      throw new BadRequestException("Error creating otp");
    }
    return code;
  }

  async CheckOTP(otpDto: CheckOtpDto) {
    const { mobile, code } = otpDto;
    const user = await this.userRepository.findOne({
      where: { mobile },
      relations: { otp: true },
    });
    if (!user || !user.otp) {
      throw new BadRequestException("Error user not found ");
    }
    const UserOtp = user?.otp;
    if (UserOtp?.code !== +code) {
      throw new BadRequestException("Code is incorrect");
    }
    if (UserOtp.expire_in < new Date()) {
      throw new BadRequestException("Error otp expired ");
    }
    if (!user.mobile_verify) {
      await this.userRepository.update(
        { mobile: user.mobile },
        { mobile_verify: true }
      );
    }
    console.log(this.configService.get("Jwt.refreshTokenSecret"));

    const AccessToken = this.jwtService.sign(
      { id: user.id, mobile },
      {
        secret: this.configService.get("Jwt.accessTokenSecret"),
        expiresIn: "30d",
      }
    );
    const RefreshToken = this.jwtService.sign(
      { id: user.id, mobile },
      {
        secret: this.configService.get("Jwt.refreshTokenSecret"),
        expiresIn: "1y",
      }
    );
    return { AccessToken, RefreshToken };
  }

  async CreateOtp(user: UserEntity) {
    const OtpCode = randomInt(10000, 99999);
    const expireIn = new Date(Date.now() + 1000 * 60 * 2);
    let otp = await this.otpRepository.findOneBy({ userId: user.id });

    if (otp) {
      otp.code = OtpCode;
      otp.expire_in = expireIn;
    } else {
      otp = this.otpRepository.create({
        code: OtpCode,
        expire_in: expireIn,
        userId: user.id,
      });
    }
    await this.otpRepository.save(otp);
    user.otpId = otp.id;
    await this.userRepository.save(user);
    return otp.code;
  }
}
