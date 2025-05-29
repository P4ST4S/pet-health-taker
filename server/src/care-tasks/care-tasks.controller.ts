import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CareTasksService } from './care-tasks.service';
import { CreateCareTaskDto, UpdateCareTaskDto } from './dto/care-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('care-tasks')
@UseGuards(JwtAuthGuard)
export class CareTasksController {
  constructor(private readonly careTasksService: CareTasksService) {}

  @Post()
  create(@Body() createCareTaskDto: CreateCareTaskDto) {
    return this.careTasksService.create(createCareTaskDto);
  }

  @Get()
  findAll() {
    return this.careTasksService.findAll();
  }

  @Get('pet/:petId')
  findByPet(@Param('petId') petId: string) {
    return this.careTasksService.findByPet(petId);
  }

  @Get('pending')
  findPendingTasks() {
    return this.careTasksService.findPendingTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careTasksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCareTaskDto: UpdateCareTaskDto,
  ) {
    return this.careTasksService.update(id, updateCareTaskDto);
  }

  @Put(':id/complete')
  complete(@Param('id') id: string) {
    return this.careTasksService.complete(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careTasksService.remove(id);
  }
}
