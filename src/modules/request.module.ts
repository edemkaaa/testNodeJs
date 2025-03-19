import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../entities/request.entity';
import { RequestController } from '../controllers/request.controller';
import { RequestService } from '../services/request.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {} 