import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}
  
  @Get()
  @UseGuards(JwtAuthGuard)
  async get() {
    return await this.usersService.findAll();
  }
  @Post()
  async post(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
