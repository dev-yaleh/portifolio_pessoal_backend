import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { AdminLogin } from "../entities/adminlogin.entity";
import { ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  // Define your authentication-related endpoints here
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } }) // ← 5 tentativas por minuto
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() admin: AdminLogin): Promise<any> {
    return this.authService.login(admin)
  }
}