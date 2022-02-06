import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User, UserToResponse } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import { SALT_ROUNDS } from '../../common/config';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getAll(): Promise<UserToResponse[]> {
        const allUsers = await this.usersRepository.find();
        return allUsers.map(User.toResponse);
    }

    async getOne(id: string): Promise<UserToResponse | null> {
        const user = await this.usersRepository.findOne(id);
        if (user) {
            return User.toResponse(user);
        } 
            return null;
        
    }

    async add(user: IUser): Promise<UserToResponse | null> {
        const password = await bcrypt.hash(user.password, 10);
        const userWithHash = { ...user, password };
        const createdUser = await this.usersRepository.create(userWithHash);
        const savedUser = await this.usersRepository.save(createdUser);
        return User.toResponse(savedUser);
    }

    async update(id: string, user: IUser): Promise<UserToResponse | null> {
        const foundUser = await this.usersRepository.findOne(id);
        if (foundUser) {
            const password = await bcrypt.hash(user.password, SALT_ROUNDS);
            const userToUpdate = { ...user, password };
            const updatedUser = await this.usersRepository.save({ ...userToUpdate, id });
            return User.toResponse(updatedUser);
        } 
            return null;
        
    }

    async delete(id: string): Promise<UserToResponse | null> {
        const userToDelete = await this.usersRepository.findOne(id);
        if (userToDelete) {
            await this.usersRepository.delete(id);
            return User.toResponse(userToDelete);
        } 
            return null;
        
    }

    async getUserByLogin(login: string) {
        const user = await this.usersRepository.findOne({where: {login}})
        return user;
    }
}