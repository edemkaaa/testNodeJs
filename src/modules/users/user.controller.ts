import { Controller, Post, Body, HttpCode, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('api/v1/users') 
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @ApiBody({ type: UserCreateDto })
  @Post('register')
  register(@Body() userCreateDto: UserCreateDto) {
    return this.userService.createUser(userCreateDto);
  }

  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно авторизован' })
  @ApiBody({ type: UserLoginDto })
  @Post('login')
  @HttpCode(200)
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.userService.login(userLoginDto);
    return new UserResponseDto(user);
  }
}   