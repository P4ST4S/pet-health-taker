import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from '../pets/pet.entity';

export enum ReminderStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DISMISSED = 'dismissed',
}

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  reminderDate: Date;

  @Column({
    type: 'enum',
    enum: ReminderStatus,
    default: ReminderStatus.PENDING,
  })
  status: ReminderStatus;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({ nullable: true })
  recurringIntervalDays: number;

  @ManyToOne(() => Pet, (pet) => pet.reminders, { onDelete: 'CASCADE' })
  pet: Pet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
