import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CareTask, TaskStatus } from './care-task.entity';
import { CreateCareTaskDto, UpdateCareTaskDto } from './dto/care-task.dto';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class CareTasksService {
  constructor(
    @InjectRepository(CareTask)
    private careTasksRepository: Repository<CareTask>,
    private petsService: PetsService,
  ) {}

  async create(createCareTaskDto: CreateCareTaskDto): Promise<CareTask> {
    const pet = await this.petsService.findOne(createCareTaskDto.petId);

    const careTask = this.careTasksRepository.create({
      ...createCareTaskDto,
      pet,
    });

    return this.careTasksRepository.save(careTask);
  }

  async findAll(): Promise<CareTask[]> {
    return this.careTasksRepository.find({
      relations: ['pet'],
      order: { dueDate: 'ASC' },
    });
  }

  async findByPet(petId: string): Promise<CareTask[]> {
    return this.careTasksRepository.find({
      where: { pet: { id: petId } },
      relations: ['pet'],
      order: { dueDate: 'ASC' },
    });
  }

  async findPendingTasks(): Promise<CareTask[]> {
    return this.careTasksRepository.find({
      where: {
        status: TaskStatus.PENDING,
        dueDate: LessThan(new Date()),
      },
      relations: ['pet', 'pet.owner'],
      order: { dueDate: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CareTask> {
    const careTask = await this.careTasksRepository.findOne({
      where: { id },
      relations: ['pet'],
    });

    if (!careTask) {
      throw new NotFoundException(`Care task with ID ${id} not found`);
    }

    return careTask;
  }

  async update(
    id: string,
    updateCareTaskDto: UpdateCareTaskDto,
  ): Promise<CareTask> {
    const careTask = await this.findOne(id);

    Object.assign(careTask, updateCareTaskDto);

    return this.careTasksRepository.save(careTask);
  }

  async complete(id: string): Promise<CareTask> {
    const careTask = await this.findOne(id);

    careTask.status = TaskStatus.COMPLETED;

    return this.careTasksRepository.save(careTask);
  }

  async remove(id: string): Promise<void> {
    const careTask = await this.findOne(id);
    await this.careTasksRepository.remove(careTask);
  }
}
