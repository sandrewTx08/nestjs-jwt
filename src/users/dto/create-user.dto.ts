import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

// Username & password
export const maxLenght = 16;
export const minLenght = 4;

export class CreateUserDto implements Prisma.UsersCreateInput {
  @ApiProperty({ readOnly: true, description: 'User ID' })
  @IsOptional()
  id?: string;

  @ApiProperty({ required: true, description: 'Username' })
  @IsString()
  @IsNotEmpty()
  @MinLength(minLenght)
  @MaxLength(maxLenght)
  username: string;

  @ApiProperty({ required: true, description: 'Hash user password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(minLenght)
  @MaxLength(maxLenght)
  password: string;
}
