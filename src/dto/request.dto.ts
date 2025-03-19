import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({ description: 'Тема обращения', example: 'Проблема с сервисом' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ description: 'Текст обращения', example: 'Не работает функция отправки сообщений' })
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CompleteRequestDto {
  @ApiProperty({ description: 'Решение проблемы', example: 'Проблема решена путем обновления сервиса' })
  @IsNotEmpty()
  @IsString()
  solution: string;
}

export class CancelRequestDto {
  @ApiProperty({ description: 'Причина отмены', example: 'Обращение отменено по запросу пользователя' })
  @IsNotEmpty()
  @IsString()
  cancellationReason: string;
}

export class FilterRequestsDto {
  @ApiProperty({ description: 'Начальная дата диапазона', required: false, type: Date })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({ description: 'Конечная дата диапазона', required: false, type: Date })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ description: 'Конкретная дата для фильтрации', required: false, type: Date })
  @IsOptional()
  @IsDate()
  date?: Date;
} 