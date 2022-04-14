import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: 'admin' },
      },
    },
  })
  @ApiResponse({ type: CreateUserDto })
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @ApiResponse({ type: [CreateUserDto] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({ type: CreateUserDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string', example: 'administrator' },
        password: { type: 'string', example: 'administrator' },
      },
    },
  })
  @ApiResponse({ type: UpdateUserDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update({ id }, data);
  }

  @ApiResponse({ type: CreateUserDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }
}
