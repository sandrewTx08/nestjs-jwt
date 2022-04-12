import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { passportField } from './passportField';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body(passportField.usernameField)
    @Body(passportField.passwordField)
    @Request()
    req: any,
  ) {
    return this.authService.loginWithCredentials(req);
  }
}
