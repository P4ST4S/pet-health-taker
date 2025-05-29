import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
    private usersService: UsersService,
  ) {}
  async create(createPetDto: CreatePetDto, ownerId?: string): Promise<Pet> {
    const pet = this.petsRepository.create(createPetDto);

    if (ownerId || createPetDto.ownerId) {
      const userId = ownerId || createPetDto.ownerId;
      if (userId) {
        const owner = await this.usersService.findOne(userId);
        pet.owner = owner;
      }
    }

    return this.petsRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find({ relations: ['owner'] });
  }

  async findByOwner(ownerId: string): Promise<Pet[]> {
    return this.petsRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['healthRecords', 'careTasks', 'reminders'],
    });
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petsRepository.findOne({
      where: { id },
      relations: ['owner', 'healthRecords', 'careTasks', 'reminders'],
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);

    if (updatePetDto.ownerId) {
      const owner = await this.usersService.findOne(updatePetDto.ownerId);
      pet.owner = owner;
      delete updatePetDto.ownerId;
    }

    Object.assign(pet, updatePetDto);

    return this.petsRepository.save(pet);
  }

  async remove(id: string): Promise<void> {
    const pet = await this.findOne(id);
    await this.petsRepository.remove(pet);
  }
}
