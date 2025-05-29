import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RemindersService } from '../reminders/reminders.service';
import { CareTasksService } from '../care-tasks/care-tasks.service';
import { ReminderStatus } from '../reminders/reminder.entity';
import { TaskFrequency, TaskStatus } from '../care-tasks/care-task.entity';

@Injectable()
export class TasksSchedulerService {
  private readonly logger = new Logger(TasksSchedulerService.name);

  constructor(
    private readonly remindersService: RemindersService,
    private readonly careTasksService: CareTasksService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handlePendingReminders() {
    this.logger.debug('Checking for pending reminders...');

    const pendingReminders = await this.remindersService.findPendingReminders();

    for (const reminder of pendingReminders) {
      this.logger.debug(
        `Processing reminder: ${reminder.title} for pet: ${reminder.pet.name}`,
      );

      // Here we would send notifications (email, push, etc.)
      // For now, we just mark it as sent
      await this.remindersService.markAsSent(reminder.id);

      // If it's a recurring reminder, create the next occurrence
      if (reminder.isRecurring && reminder.recurringIntervalDays) {
        const nextReminderDate = new Date(reminder.reminderDate);
        nextReminderDate.setDate(
          nextReminderDate.getDate() + reminder.recurringIntervalDays,
        );

        await this.remindersService.create({
          title: reminder.title,
          description: reminder.description,
          reminderDate: nextReminderDate,
          isRecurring: reminder.isRecurring,
          recurringIntervalDays: reminder.recurringIntervalDays,
          petId: reminder.pet.id,
          status: ReminderStatus.PENDING,
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleRecurringTasks() {
    this.logger.debug('Processing recurring tasks...');

    const tasks = await this.careTasksService.findAll();
    const completedTasks = tasks.filter(
      (task) =>
        task.status === TaskStatus.COMPLETED && task.isRecurring === true,
    );

    for (const task of completedTasks) {
      this.logger.debug(
        `Processing completed recurring task: ${task.title} for pet: ${task.pet.name}`,
      );

      let daysToAdd = 1; // Default to daily

      switch (task.frequency) {
        case TaskFrequency.DAILY:
          daysToAdd = 1;
          break;
        case TaskFrequency.WEEKLY:
          daysToAdd = 7;
          break;
        case TaskFrequency.BIWEEKLY:
          daysToAdd = 14;
          break;
        case TaskFrequency.MONTHLY:
          daysToAdd = 30;
          break;
        case TaskFrequency.CUSTOM:
          daysToAdd = task.customFrequencyDays || 1;
          break;
        default:
          continue; // Skip ONCE tasks
      }

      const nextDueDate = new Date(task.dueDate);
      nextDueDate.setDate(nextDueDate.getDate() + daysToAdd);

      await this.careTasksService.create({
        title: task.title,
        description: task.description,
        dueDate: nextDueDate,
        frequency: task.frequency,
        customFrequencyDays: task.customFrequencyDays,
        isRecurring: task.isRecurring,
        notes: task.notes,
        petId: task.pet.id,
        status: TaskStatus.PENDING,
      });
    }
  }
}
