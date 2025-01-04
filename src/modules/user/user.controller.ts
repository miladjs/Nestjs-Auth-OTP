import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
  constructor() {}

  @Post("/profile")
  Profile(@Req() request: Request) {
    return request.user;
  }
}
