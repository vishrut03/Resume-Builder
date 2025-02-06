import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser{
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
};