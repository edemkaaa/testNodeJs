import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string; 

  @ApiProperty({ description: 'Email пользователя', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}