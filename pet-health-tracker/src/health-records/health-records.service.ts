import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthRecord } from './health-record.entity';
import {
  CreateHealthRecordDto,
  UpdateHealthRecordDto,
} from './dto/health-record.dto';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class HealthRecordsService {
  constructor(
    @InjectRepository(HealthRecord)
    private healthRecordsRepository: Repository<HealthRecord>,
    private petsService: PetsService,
  ) {}

  async create(
    createHealthRecordDto: CreateHealthRecordDto,
  ): Promise<HealthRecord> {
    const pet = await this.petsService.findOne(createHealthRecordDto.petId);

    const healthRecord = this.healthRecordsRepository.create({
      ...createHealthRecordDto,
      pet,
    });

    return this.healthRecordsRepository.save(healthRecord);
  }

  async findAll(): Promise<HealthRecord[]> {
    return this.healthRecordsRepository.find({ relations: ['pet'] });
  }

  async findByPet(petId: string): Promise<HealthRecord[]> {
    return this.healthRecordsRepository.find({
      where: { pet: { id: petId } },
      relations: ['pet'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string): Promise<HealthRecord> {
    const healthRecord = await this.healthRecordsRepository.findOne({
      where: { id },
      relations: ['pet'],
    });

    if (!healthRecord) {
      throw new NotFoundException(`Health record with ID ${id} not found`);
    }

    return healthRecord;
  }

  async update(
    id: string,
    updateHealthRecordDto: UpdateHealthRecordDto,
  ): Promise<HealthRecord> {
    const healthRecord = await this.findOne(id);

    Object.assign(healthRecord, updateHealthRecordDto);

    return this.healthRecordsRepository.save(healthRecord);
  }

  async remove(id: string): Promise<void> {
    const healthRecord = await this.findOne(id);
    await this.healthRecordsRepository.remove(healthRecord);
  }
}
