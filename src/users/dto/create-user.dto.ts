import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsBoolean()
    // admin: boolean = false; //confirmar o false automatico
    admin: boolean;

    @IsNotEmpty()
    name: string;

    @IsString()
    date_of_birth: string;
    
    @IsString()
    gender: string;

    @IsString()
    cpf: string;

    @IsPhoneNumber()
    phone: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsString()
    city: string;

    @IsString()
    street: string;

    @IsString()
    state: string;

    @IsString()
    cep: string;

    @IsString()
    image: string;
}