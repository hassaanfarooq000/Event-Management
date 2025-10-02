import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(data: { name: string; email: string; password: string }) {
    const exists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (exists) {
      throw new BadRequestException('Email already registered');
    }
    const user = await this.prisma.user.create({
      data: { name: data.name, email: data.email, password: data.password },
      select: { userId: true, name: true, email: true, createdAt: true },
    });
    return { user };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { user: { userId: user.userId, name: user.name, email: user.email } };
  }
}


