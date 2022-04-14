import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @ApiProduces('text/html')
  @ApiResponse({
    schema: { type: 'string', example: '<h1>Hello World!</h1>' },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserInfo() {
    return this.appService.helloWorld();
  }
}
