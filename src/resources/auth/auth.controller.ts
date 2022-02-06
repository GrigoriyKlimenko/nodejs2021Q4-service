import {Body, Controller, Post} from '@nestjs/common';
import {IUser} from "../users/interfaces/user.interface";
import {AuthService} from "./auth.service";

@Controller('login')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    login(@Body() userDto: IUser) {
        return this.authService.login(userDto)
    }
}