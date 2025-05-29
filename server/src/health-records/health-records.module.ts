import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthRecord } from './health-record.entity';
import { HealthRecordsService } from './health-records.service';
import { HealthRecordsController } from './health-records.controller';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [TypeOrmModule.forFeature([HealthRecord]), PetsModule],
  providers: [HealthRecordsService],
  controllers: [HealthRecordsController],
  exports: [HealthRecordsService],
})
export class HealthRecordsModule {}
