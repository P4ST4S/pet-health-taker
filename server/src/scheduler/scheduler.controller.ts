import { Controller, Post, UseGuards } from '@nestjs/common';
import { TasksSchedulerService } from './tasks-scheduler.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('scheduler')
@UseGuards(JwtAuthGuard)
export class SchedulerController {
  constructor(private readonly tasksSchedulerService: TasksSchedulerService) {}

  @Post('process-reminders')
  async processReminders() {
    await this.tasksSchedulerService.handlePendingReminders();
    return { message: 'Reminders processed successfully' };
  }

  @Post('process-tasks')
  async processTasks() {
    await this.tasksSchedulerService.handleRecurringTasks();
    return { message: 'Recurring tasks processed successfully' };
  }
}
