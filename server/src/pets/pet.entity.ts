import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { HealthRecord } from '../health-records/health-record.entity';
import { CareTask } from '../care-tasks/care-task.entity';
import { Reminder } from '../reminders/reminder.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pet {
  @ApiProperty({
    description: 'The unique identifier for the pet',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the pet',
    example: 'Fluffy',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The species of the pet',
    example: 'Dog',
  })
  @Column()
  species: string;

  @ApiProperty({
    description: 'The breed of the pet',
    example: 'Golden Retriever',
  })
  @Column()
  breed: string;

  @ApiProperty({
    description: 'The birth date of the pet',
    example: '2020-01-01',
  })
  @Column({ type: 'date' })
  birthDate: Date;

  @ApiProperty({
    description: 'The color of the pet',
    example: 'Golden',
    required: false,
  })
  @Column({ nullable: true })
  color: string;

  @ApiProperty({
    description: 'The weight of the pet in kg',
    example: 25.5,
    required: false,
  })
  @Column({ type: 'float', nullable: true })
  weight: number;

  @ApiProperty({
    description: 'The microchip number of the pet',
    example: '123456789012345',
    required: false,
  })
  @Column({ nullable: true })
  microchipNumber: string;

  @ApiProperty({
    description: "URL to the pet's photo",
    example: 'https://example.com/pet-photo.jpg',
    required: false,
  })
  @Column({ nullable: true })
  photo: string;

  @ApiProperty({
    description: 'Additional notes about the pet',
    example: 'Allergic to chicken',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty({
    description: 'The owner of the pet',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.pets)
  owner: User;

  @ApiProperty({
    description: 'Health records for the pet',
    type: () => HealthRecord,
    isArray: true,
  })
  @OneToMany(() => HealthRecord, (healthRecord) => healthRecord.pet)
  healthRecords: HealthRecord[];

  @ApiProperty({
    description: 'Care tasks for the pet',
    type: () => CareTask,
    isArray: true,
  })
  @OneToMany(() => CareTask, (careTask) => careTask.pet)
  careTasks: CareTask[];

  @ApiProperty({
    description: 'Reminders for the pet',
    type: () => Reminder,
    isArray: true,
  })
  @OneToMany(() => Reminder, (reminder) => reminder.pet)
  reminders: Reminder[];

  @ApiProperty({
    description: 'Timestamp of pet creation',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp of last pet update',
    example: '2023-01-01T00:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
