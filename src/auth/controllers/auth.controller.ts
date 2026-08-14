import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { AdminLogin } from "../entities/adminlogin.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  // Define your authentication-related endpoints here
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() admin: AdminLogin): Promise<any> {
    return this.authService.login(admin)
  }
}