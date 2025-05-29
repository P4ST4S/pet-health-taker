import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Reminder, ReminderStatus } from './reminder.entity';
import { CreateReminderDto, UpdateReminderDto } from './dto/reminder.dto';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private remindersRepository: Repository<Reminder>,
    private petsService: PetsService,
  ) {}

  async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
    const pet = await this.petsService.findOne(createReminderDto.petId);

    const reminder = this.remindersRepository.create({
      ...createReminderDto,
      pet,
    });

    return this.remindersRepository.save(reminder);
  }

  async findAll(): Promise<Reminder[]> {
    return this.remindersRepository.find({
      relations: ['pet'],
      order: { reminderDate: 'ASC' },
    });
  }

  async findByPet(petId: string): Promise<Reminder[]> {
    return this.remindersRepository.find({
      where: { pet: { id: petId } },
      relations: ['pet'],
      order: { reminderDate: 'ASC' },
    });
  }

  async findPendingReminders(): Promise<Reminder[]> {
    const now = new Date();

    return this.remindersRepository.find({
      where: {
        status: ReminderStatus.PENDING,
        reminderDate: LessThan(now),
      },
      relations: ['pet', 'pet.owner'],
      order: { reminderDate: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Reminder> {
    const reminder = await this.remindersRepository.findOne({
      where: { id },
      relations: ['pet'],
    });

    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }

    return reminder;
  }

  async update(
    id: string,
    updateReminderDto: UpdateReminderDto,
  ): Promise<Reminder> {
    const reminder = await this.findOne(id);

    Object.assign(reminder, updateReminderDto);

    return this.remindersRepository.save(reminder);
  }

  async markAsSent(id: string): Promise<Reminder> {
    const reminder = await this.findOne(id);

    reminder.status = ReminderStatus.SENT;

    return this.remindersRepository.save(reminder);
  }

  async dismiss(id: string): Promise<Reminder> {
    const reminder = await this.findOne(id);

    reminder.status = ReminderStatus.DISMISSED;

    return this.remindersRepository.save(reminder);
  }

  async remove(id: string): Promise<void> {
    const reminder = await this.findOne(id);
    await this.remindersRepository.remove(reminder);
  }
}
