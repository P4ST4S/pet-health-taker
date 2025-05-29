import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecordType } from '../health-record.entity';

export class CreateHealthRecordDto {
  @IsEnum(RecordType)
  @IsNotEmpty()
  type: RecordType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  veterinarian?: string;

  @IsString()
  @IsOptional()
  clinic?: string;

  @IsNumber()
  @IsOptional()
  cost?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  attachmentUrl?: string;

  @IsUUID()
  @IsNotEmpty()
  petId: string;
}

export class UpdateHealthRecordDto {
  @IsEnum(RecordType)
  @IsOptional()
  type?: RecordType;

  @IsString()
  @IsOptional()
  title?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  veterinarian?: string;

  @IsString()
  @IsOptional()
  clinic?: string;

  @IsNumber()
  @IsOptional()
  cost?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  attachmentUrl?: string;
}
