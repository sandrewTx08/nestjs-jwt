import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { passportField } from './passportField';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    schema: { properties: { access_token: { type: 'string' } } },
  })
  @ApiBody({ description: 'Authneticate credetials', type: CreateUserDto })
  @UseGuards(AuthGuard('local'))
  @Post()
  async login(
    @Request()
    req: any,
  ) {
    return this.authService.loginWithCredentials({ id: req.user.id });
  }
}
