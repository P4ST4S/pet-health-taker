import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskFrequency, TaskStatus } from '../care-task.entity';

export class CreateCareTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsEnum(TaskFrequency)
  @IsOptional()
  frequency?: TaskFrequency;

  @IsNumber()
  @IsOptional()
  customFrequencyDays?: number;

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsUUID()
  @IsNotEmpty()
  petId: string;
}

export class UpdateCareTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;

  @IsEnum(TaskFrequency)
  @IsOptional()
  frequency?: TaskFrequency;

  @IsNumber()
  @IsOptional()
  customFrequencyDays?: number;

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}
