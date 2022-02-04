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
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() user: IUser) {
    return await this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: IUser) {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
