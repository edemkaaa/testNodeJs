import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    this.logger.log(`Создание нового пользователя с email: ${userCreateDto.email}`);
    try {
      const user = this.userRepository.create(userCreateDto);
      const savedUser = await this.userRepository.save(user);
      this.logger.log(`Пользователь успешно создан с ID: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Ошибка при создании пользователя: ${error.message}`, error.stack);
      throw error;
    }
  }

  async login(userLoginDto: UserLoginDto): Promise<Omit<User, 'password'>> {
    this.logger.log(`Попытка входа пользователя с email: ${userLoginDto.email}`);
    try {
      const user = await this.userRepository.findOne({
        where: { email: userLoginDto.email },
      });
      
      if (!user) {
        this.logger.warn(`Неудачная попытка входа: пользователь с email ${userLoginDto.email} не найден`);
        throw new UnauthorizedException('Неверный email или пароль');
      }
      
      if (user.password !== userLoginDto.password) {
        this.logger.warn(`Неудачная попытка входа: неверный пароль для пользователя ${userLoginDto.email}`);
        throw new UnauthorizedException('Неверный email или пароль');
      }
      
      this.logger.log(`Успешный вход пользователя: ${user.email}`);
      
      // Создаем новый объект без пароля
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      
      return userResponse;
    } catch (error) {
      if (!(error instanceof UnauthorizedException)) {
        this.logger.error(`Ошибка при входе пользователя: ${error.message}`, error.stack);
      }
      throw error;
    }
  }
}

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
}   