import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './modules/requests/entities/request.entity';
import { RequestModule } from './modules/requests/request.module';
import { User } from './modules/users/entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'edem',
      password: '',
      database: 'request_system',
      entities: [Request, User],
      synchronize: true,
    }),
    LoggerModule,
    RequestModule,
    UserModule,
  ],
})
export class AppModule {} 