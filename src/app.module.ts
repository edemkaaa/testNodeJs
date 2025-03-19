import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestModule } from './modules/request.module';
import { Request } from './entities/request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'edem',
      password: '',
      database: 'request_system',
      entities: [Request],
      synchronize: true,
    }),
    RequestModule,
  ],
})
export class AppModule {} 