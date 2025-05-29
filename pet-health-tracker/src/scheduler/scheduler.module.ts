import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksSchedulerService } from './tasks-scheduler.service';
import { RemindersModule } from '../reminders/reminders.module';
import { CareTasksModule } from '../care-tasks/care-tasks.module';
import { SchedulerController } from './scheduler.controller';

@Module({
  imports: [ScheduleModule.forRoot(), RemindersModule, CareTasksModule],
  providers: [TasksSchedulerService],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
