import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from '../pets/pet.entity';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
}

export enum TaskFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom',
  ONCE = 'once',
}

@Entity()
export class CareTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: TaskFrequency,
    default: TaskFrequency.ONCE,
  })
  frequency: TaskFrequency;

  @Column({ nullable: true })
  customFrequencyDays: number;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Pet, (pet) => pet.careTasks, { onDelete: 'CASCADE' })
  pet: Pet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
