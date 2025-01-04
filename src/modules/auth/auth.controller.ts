import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckOtpDto, SendOtpDto } from "./dto/auth.dto";
import { ResponseModel } from "src/common/ResponseModel";
import { Request } from "express";
import { AuthGuard } from "./guards/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/send-otp")
  async SendOTP(@Body() otpDto: SendOtpDto) {
    try {
      const { mobile } = otpDto;
      const code = await this.authService.SendOtp({ mobile });
      if (!code) throw new BadRequestException("Invalid code from send-otp");

      return new ResponseModel(201, "send otp is successful", {
        mobile,
        code,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("/check-otp")
  async CheckOTP(@Body() otpDto: CheckOtpDto) {
    const { mobile, code } = otpDto;
    try {
      const tokens = await this.authService.CheckOTP({
        mobile,
        code,
      });
      return new ResponseModel(200, "Login is successful", tokens);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("/profile")
  @UseGuards(AuthGuard)
  Profile(@Req() request: Request) {
    return request.user;
  }
}
