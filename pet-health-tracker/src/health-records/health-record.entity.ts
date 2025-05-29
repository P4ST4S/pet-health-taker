import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from '../pets/pet.entity';

export enum RecordType {
  VACCINATION = 'vaccination',
  VET_VISIT = 'vet_visit',
  MEDICATION = 'medication',
  ILLNESS = 'illness',
  SURGERY = 'surgery',
  OTHER = 'other',
}

@Entity()
export class HealthRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RecordType,
    default: RecordType.OTHER,
  })
  type: RecordType;

  @Column()
  title: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  veterinarian: string;

  @Column({ nullable: true })
  clinic: string;

  @Column({ nullable: true })
  cost: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  attachmentUrl: string;

  @ManyToOne(() => Pet, (pet) => pet.healthRecords, { onDelete: 'CASCADE' })
  pet: Pet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
