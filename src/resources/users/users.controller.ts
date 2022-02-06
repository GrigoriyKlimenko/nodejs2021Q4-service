import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAll() {
    const allUsers = await this.usersService.getAll();
    return allUsers;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const foundUser = await this.usersService.getOne(id);
    if (foundUser === null) {
      throw new NotFoundException();
    } else {
      return foundUser;
    }
  }

  @Post()
  async add(@Body() user: IUser) {
    const savedUser = await this.usersService.add(user);
    return savedUser;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: IUser) {
    const updatedUser = await this.usersService.update(id, user);
    if (updatedUser === null) {
      throw new NotFoundException();
    } else {
      return updatedUser;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.usersService.delete(id);
    if (deletedUser === null) {
      throw new NotFoundException();
    } else {
      return deletedUser;
    }
  }
}
