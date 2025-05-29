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

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  breed: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ nullable: true })
  microchipNumber: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;

  @OneToMany(() => HealthRecord, (healthRecord) => healthRecord.pet)
  healthRecords: HealthRecord[];

  @OneToMany(() => CareTask, (careTask) => careTask.pet)
  careTasks: CareTask[];

  @OneToMany(() => Reminder, (reminder) => reminder.pet)
  reminders: Reminder[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
