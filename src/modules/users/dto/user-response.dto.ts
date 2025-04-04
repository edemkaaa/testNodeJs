import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;
  
  @Expose()
  name: string;
  
  @Expose()
  email: string;
  
  @Exclude()
  password: string;
  
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
} 