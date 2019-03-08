import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModelToken') private readonly userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({email}).exec();
  }
  async findOneByCredential(email: string, password: string): Promise<User> {
    return await this.userModel.findOne({email,password}).exec();
  }
}
