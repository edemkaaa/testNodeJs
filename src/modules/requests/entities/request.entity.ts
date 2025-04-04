import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { RequestStatus } from '../enums/request-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('api/v1/requests')
export class Request {
  @ApiProperty({ description: 'Уникальный идентификатор обращения', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Тема обращения', example: 'Проблема с сервисом' })
  @Column()
  subject: string;

  @ApiProperty({ description: 'Текст обращения', example: 'Не работает функция отправки сообщений' })
  @Column()
  text: string;

  @ApiProperty({ 
    description: 'Статус обращения', 
    enum: RequestStatus,
    example: RequestStatus.NEW 
  })
  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.NEW
  })
  status: RequestStatus;

  @ApiProperty({ 
    description: 'Решение проблемы', 
    example: 'Проблема решена путем обновления сервиса', 
    required: false 
  })
  @Column({ nullable: true })
  solution?: string;

  @ApiProperty({ 
    description: 'Причина отмены', 
    example: 'Обращение отменено по запросу пользователя',
    required: false 
  })
  @Column({ nullable: true })
  cancellationReason?: string;

  @ApiProperty({ description: 'Дата создания обращения' })
  @CreateDateColumn()
  createdAt: Date;
} 