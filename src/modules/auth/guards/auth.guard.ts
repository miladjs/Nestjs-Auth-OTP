import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const HttpContext = context.switchToHttp();
    const request = HttpContext.getRequest<Request>();
    const token = this.getToken(request);
    const user = await this.authService.ValidationToken(token);
    request.user = user;
    return true;
  }

  private getToken(request: Request) {
    const { authorization } = request?.headers;
    if (!authorization || authorization?.trim() === "") {
      throw new UnauthorizedException("Invalid authorization");
    }
    const [bearer, token] = authorization?.split(" ");
    if (
      !bearer ||
      bearer.toLowerCase() !== "bearer" ||
      !token ||
      !isJWT(token)
    ) {
      throw new UnauthorizedException("Invalid Token");
    }
    return token;
  }
}
