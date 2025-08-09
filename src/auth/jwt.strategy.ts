import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKeyMuitoSecreto',
    });
  }

  async validate(payload: any) {
    // o payload contém { sub: userId, username }
    return { userId: payload.sub, username: payload.username };
  }
}
