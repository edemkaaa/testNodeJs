import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Request } from './entities/request.entity';
import { RequestStatus } from './enums/request-status.enum';
import { CreateRequestDto, CompleteRequestDto, CancelRequestDto, FilterRequestsDto } from './dto/request.dto';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const request = this.requestRepository.create(createRequestDto);
    return this.requestRepository.save(request);
  }

  async takeInProgress(id: number): Promise<Request> {
    const request = await this.requestRepository.findOne({ where: { id } });
    if (!request) throw new NotFoundException();
    
    request.status = RequestStatus.IN_PROGRESS;
    return this.requestRepository.save(request);
  }

  async complete(id: number, completeRequestDto: CompleteRequestDto): Promise<Request> {
    const request = await this.requestRepository.findOne({ where: { id } });
    if (!request) throw new NotFoundException();
    
    request.status = RequestStatus.COMPLETED;
    request.solution = completeRequestDto.solution;
    return this.requestRepository.save(request);
  }

  async cancel(id: number, cancelRequestDto: CancelRequestDto): Promise<Request> {
    const request = await this.requestRepository.findOne({ where: { id } });
    if (!request) throw new NotFoundException();
    
    request.status = RequestStatus.CANCELLED;
    request.cancellationReason = cancelRequestDto.cancellationReason;
    return this.requestRepository.save(request);
  }

  async cancelAllInProgress(): Promise<void> {
    await this.requestRepository.update(
      { status: RequestStatus.IN_PROGRESS },
      { status: RequestStatus.CANCELLED }
    );
  }

  async findAll(filterDto: FilterRequestsDto): Promise<Request[]> {
    this.logger.log(`Получение списка обращений с фильтрами: ${JSON.stringify(filterDto)}`);
    
    const queryBuilder = this.requestRepository.createQueryBuilder('request');
    
    // Применяем фильтры по датам
    if (filterDto.date) {
      const date = new Date(filterDto.date);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      
      queryBuilder.andWhere(
        'request.createdAt >= :date AND request.createdAt < :nextDay',
        { date, nextDay }
      );
      
      this.logger.log(`Применен фильтр по конкретной дате: ${filterDto.date}`);
    }
    
    if (filterDto.startDate && filterDto.endDate) {
      const startDate = new Date(filterDto.startDate);
      const endDate = new Date(filterDto.endDate);
      endDate.setDate(endDate.getDate() + 1);
      
      queryBuilder.andWhere(
        'request.createdAt >= :startDate AND request.createdAt < :endDate',
        { startDate, endDate }
      );
      
      this.logger.log(`Применен фильтр по диапазону дат: ${filterDto.startDate} - ${filterDto.endDate}`);
    } else if (filterDto.startDate) {
      const startDate = new Date(filterDto.startDate);
      
      queryBuilder.andWhere('request.createdAt >= :startDate', { startDate });
      this.logger.log(`Применен фильтр по начальной дате: ${filterDto.startDate}`);
    } else if (filterDto.endDate) {
      const endDate = new Date(filterDto.endDate);
      endDate.setDate(endDate.getDate() + 1); 
      
      queryBuilder.andWhere('request.createdAt < :endDate', { endDate });
      this.logger.log(`Применен фильтр по конечной дате: ${filterDto.endDate}`);
    }
    
    try {
      const requests = await queryBuilder.getMany();
      this.logger.log(`Найдено ${requests.length} обращений`);
      return requests;
    } catch (error) {
      this.logger.error(`Ошибка при получении списка обращений: ${error.message}`, error.stack);
      throw error;
    }
  }
} 