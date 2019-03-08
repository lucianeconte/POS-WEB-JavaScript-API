import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/interfaces/user.interface';
import * as crypto from 'crypto';
import { SignUp } from './interfaces/signup.interface';
import { SignIn } from './interfaces/signin.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: SignUp) {
    const findUser: User = await this.usersService.findOneByEmail(createUserDto.email);
    if (findUser) {
      throw new HttpException({
        message: `O email ${findUser.email} já existe, tente outro.`
      }, HttpStatus.CONFLICT);
    }
    if (!createUserDto.password) {
      throw new HttpException({
        message: 'Falta a senha'
      }, HttpStatus.BAD_REQUEST);
    }
    let { password, ...user } = createUserDto;
    let created: User = await this.usersService.create({
      ...user,
      password: this.encrypt(password),
    });
    if (created) {
      return { message: `Usuário ${created.name} (${created.email}) criado, faça login.` }
    } else {
      throw new HttpException({
        message: 'Falha ao criar usuário'
      }, HttpStatus.BAD_REQUEST)
    }
  }
  async signIn(credential: SignIn): Promise<{payload:JwtPayload,token:string}> {
    if (!credential.password) {
      throw new HttpException({
        message: 'Falta a senha'
      }, HttpStatus.BAD_REQUEST);
    }
    let { password, email } = credential;
    const user: User = await this.usersService.findOneByCredential(
      email, this.encrypt(password)
    )
    if (!user) {
      throw new HttpException({
        message: 'Credenciais inválidas'
      }, HttpStatus.UNAUTHORIZED)
    }
    
    const payload: JwtPayload = { email, name: user.name };
    const token = await this.jwtService.sign(payload);

    return { payload, token };
  }
  private encrypt(password: string) {
    return crypto.createHmac('sha256', password).digest('hex');
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}
