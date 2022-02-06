import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { IUser } from "../users/interfaces/user.interface";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: IUser) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { userId: user.id, login: user.login }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: IUser) {
        const user = await this.userService.getUserByLogin(userDto.login);
        if (!user) {
            throw new ForbiddenException({ message: 'Некорректный логин или пароль' });
        } else {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (!passwordEquals) {
                throw new ForbiddenException({ message: 'Некорректный логин или пароль' });
            }
        }
        return user;
    }
}
