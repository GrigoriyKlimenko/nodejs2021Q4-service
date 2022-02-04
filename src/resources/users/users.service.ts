import { IUser } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    
    async findOne(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOne(id);
        return user ?? null;
    }
    
    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async create(user: IUser): Promise<User | null> {
        const password = await bcrypt.hash(user.password, 10);
        const userWithHash = { ...user, password };
        const createdUser = this.usersRepository.create(userWithHash);
        return await this.usersRepository.save(createdUser);
    }

    async update(id: string, user: IUser): Promise<User | null> {
        const password = await bcrypt.hash(user.password, 10);
        const userToUpdate = { ...user, password };
        return await this.usersRepository.save({ ...userToUpdate, id });
    }

    async remove(id: string): Promise<User | null> {
        const userToDelete = await this.usersRepository.findOne(id);
        if (userToDelete) {
            await this.usersRepository.delete(id);
            return userToDelete;
        } else {
            return null;
        }
    }
}