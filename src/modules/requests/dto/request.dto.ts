import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
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
  @ApiProperty({ description: 'Конкретная дата для фильтрации (YYYY-MM-DD)', required: false, example: '2023-10-15' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ description: 'Начальная дата диапазона (YYYY-MM-DD)', required: false, example: '2023-10-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'Конечная дата диапазона (YYYY-MM-DD)', required: false, example: '2023-10-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
} 