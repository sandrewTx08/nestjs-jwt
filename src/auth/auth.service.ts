import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Users } from '@prisma/client';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Users> | null {
    const user = await this.userService.findWhere({ username });
    if (user && (await compare(password, user.password))) return user;
    else return null;
  }

  async loginWithCredentials(user: Prisma.UsersCreateInput) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
