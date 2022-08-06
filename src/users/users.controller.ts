import { Body, Controller, Get, Post, Request, UseGuards, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { User } from './interfaces/user.interface'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //get /All users
  @Get()
  findAll(): Promise<User[]> {
      return this.usersService.findAll();
  }
  
  //delete /selected user
  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
      return this.usersService.delete(id);
  }

  //post/ signup
  @Post('signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
    @Body('email') email: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(
      userName,
      hashedPassword,
      email,
    );
    return {
      msg: 'User succcessfully registered',
      userId: result.id,
      userName: result.username,
    };
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }

  //Get /protected
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
