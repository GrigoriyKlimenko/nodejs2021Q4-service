import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
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
    return await this.usersService.getOne(id);
  }

  @Post()
  async add(@Body() user: IUser) {
    return await this.usersService.add(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: IUser) {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
