import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import type { SafeUser } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SafeUser> {
    const plain = (pass ?? '').toString().trim();

    if (!username || !plain) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const fullUser = await this.usersService.findByUsername(username);
    if (!fullUser || !fullUser.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const match = await bcrypt.compare(plain, fullUser.password);
    if (!match) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = fullUser;
    return safeUser as SafeUser;
  }

  login(user: SafeUser): { access_token: string } {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
