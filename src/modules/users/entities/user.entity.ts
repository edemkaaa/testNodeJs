import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
@Entity('api/v1/users')
export class User {
  @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Email пользователя', example: 'john.doe@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'password' })
  @Column()
  password: string;
}