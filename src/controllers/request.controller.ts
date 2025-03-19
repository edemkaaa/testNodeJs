import { Controller, Post, Put, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RequestService } from '../services/request.service';
import { CancelRequestDto, CompleteRequestDto, CreateRequestDto, FilterRequestsDto } from 'src/dto/request.dto';
import { Request } from '../entities/request.entity';

@ApiTags('requests')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({ summary: 'Создать новое обращение' })
  @ApiResponse({ status: 201, description: 'Обращение успешно создано', type: Request })
  @ApiBody({ type: CreateRequestDto })
  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @ApiOperation({ summary: 'Взять обращение в работу' })
  @ApiResponse({ status: 200, description: 'Обращение взято в работу', type: Request })
  @ApiParam({ name: 'id', description: 'ID обращения' })
  @Put(':id/take')
  takeInProgress(@Param('id') id: number) {
    return this.requestService.takeInProgress(id);
  }

  @ApiOperation({ summary: 'Завершить обработку обращения' })
  @ApiResponse({ status: 200, description: 'Обращение завершено', type: Request })
  @ApiParam({ name: 'id', description: 'ID обращения' })
  @ApiBody({ type: CompleteRequestDto })
  @Put(':id/complete')
  complete(
    @Param('id') id: number,
    @Body() completeRequestDto: CompleteRequestDto
  ) {
    return this.requestService.complete(id, completeRequestDto);
  }

  @ApiOperation({ summary: 'Отменить обращение' })
  @ApiResponse({ status: 200, description: 'Обращение отменено', type: Request })
  @ApiParam({ name: 'id', description: 'ID обращения' })
  @ApiBody({ type: CancelRequestDto })
  @Put(':id/cancel')
  cancel(
    @Param('id') id: number,
    @Body() cancelRequestDto: CancelRequestDto
  ) {
    return this.requestService.cancel(id, cancelRequestDto);
  }

  @ApiOperation({ summary: 'Отменить все обращения в работе' })
  @ApiResponse({ status: 200, description: 'Все обращения в работе отменены' })
  @Put('cancel-all-in-progress')
  cancelAllInProgress() {
    return this.requestService.cancelAllInProgress();
  }

  @ApiOperation({ summary: 'Получить список обращений' })
  @ApiResponse({ status: 200, description: 'Список обращений', type: [Request] })
  @Get()
  filter(@Query() filterDto: FilterRequestsDto) {
    return this.requestService.filter(filterDto);
  }
} 