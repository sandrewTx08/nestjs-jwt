import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<Users> {
    data.password = await hash(data.password, 10);
    return await this.prisma.users.create({ data });
  }

  async findAll(): Promise<Users[]> {
    return await this.prisma.users.findMany();
  }

  async findWhere(where: Prisma.UsersWhereInput): Promise<Users> {
    return await this.prisma.users.findFirst({ where });
  }

  async findOne(id: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return await this.prisma.users.findUnique({ where: id });
  }

  async update(
    id: Prisma.UsersWhereUniqueInput,
    data: UpdateUserDto,
  ): Promise<Users> {
    data.password = await hash(<string>data.password, 10);
    return await this.prisma.users.update({ where: id, data });
  }

  async remove(id: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return await this.prisma.users.delete({ where: id });
  }
}
