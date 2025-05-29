import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareTask } from './care-task.entity';
import { CareTasksService } from './care-tasks.service';
import { CareTasksController } from './care-tasks.controller';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [TypeOrmModule.forFeature([CareTask]), PetsModule],
  providers: [CareTasksService],
  controllers: [CareTasksController],
  exports: [CareTasksService],
})
export class CareTasksModule {}
