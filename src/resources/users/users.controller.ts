import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
 } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
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
    return await this.usersService.add(user);
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
