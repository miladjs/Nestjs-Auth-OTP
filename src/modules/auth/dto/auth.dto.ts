import { IsMobilePhone, IsString, Length } from "class-validator";

export class SendOtpDto {
  @IsMobilePhone("fa-IR", {}, { message: "Mobile number must valid number" })
  mobile: string;
}

export class CheckOtpDto {
  @IsMobilePhone("fa-IR", {}, { message: "Mobile number must valid number" })
  mobile: string;
  @IsString()
  @Length(5, 5, { message: "Incorrect code" })
  code: string;
}
