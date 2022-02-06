import { MinLength, MaxLength, IsString, IsUUID, IsOptional } from 'class-validator';

export class IUser {
    @IsOptional()
    @IsUUID("4")
    id?: string;

    @IsString()
    @MinLength(1)
    name!: string;

    @IsString()
    @MinLength(1)
    login!: string;

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    password!: string;
}

export type IUserLogin = Omit<IUser, "name">;