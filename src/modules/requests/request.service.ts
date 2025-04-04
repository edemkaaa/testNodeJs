import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Equal } from 'typeorm';
import { Request } from './entities/request.entity';
import { RequestStatus } from './enums/request-status.enum';
import { CreateRequestDto, CompleteRequestDto, CancelRequestDto, FilterRequestsDto } from './dto/request.dto';

@Injectable()
export class RequestService {
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

  async filter(filterDto: FilterRequestsDto): Promise<Request[]> {
    const where: any = {};
    
    if (filterDto.date) {
      where.createdAt = Equal(filterDto.date);
    } else if (filterDto.startDate && filterDto.endDate) {
      where.createdAt = Between(filterDto.startDate, filterDto.endDate);
    }
    
    return this.requestRepository.find({ where });
  }
} 