import {Body, Controller, Post} from '@nestjs/common';
import {IUserLogin} from "../users/interfaces/user.interface";
import {AuthService} from "./auth.service";

@Controller('login')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    login(@Body() userDto: IUserLogin) {
        return this.authService.login(userDto)
    }
}