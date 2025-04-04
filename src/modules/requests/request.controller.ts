import { Controller, Post, Put, Get, Body, Param, Query, Logger, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { CancelRequestDto, CompleteRequestDto, CreateRequestDto, FilterRequestsDto } from './dto/request.dto';
import { Request } from './entities/request.entity';


@ApiTags('Requests')
@Controller('api/v1/requests')
@UseInterceptors(ClassSerializerInterceptor)
export class RequestController {
  private readonly logger = new Logger(RequestController.name);

  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({ summary: 'Создать новое обращение' })
  @ApiResponse({ status: 200, description: 'Обращение успешно создано', type: Request })
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

  @ApiOperation({ summary: 'Получить список обращений с возможностью фильтрации по датам' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список обращений успешно получен',
    type: [Request]
  })
  @ApiQuery({ name: 'date', required: false, type: String, description: 'Конкретная дата (YYYY-MM-DD)' })
  @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Начальная дата диапазона (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, type: String, description: 'Конечная дата диапазона (YYYY-MM-DD)' })
  @Get()
  async findAll(@Query() filterDto: FilterRequestsDto): Promise<Request[]> {
    this.logger.log(`Запрос на получение списка обращений с фильтрами: ${JSON.stringify(filterDto)}`);
    return this.requestService.findAll(filterDto);
  }
} 