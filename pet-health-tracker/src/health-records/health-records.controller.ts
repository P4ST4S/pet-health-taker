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
import { HealthRecordsService } from './health-records.service';
import {
  CreateHealthRecordDto,
  UpdateHealthRecordDto,
} from './dto/health-record.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('health-records')
@UseGuards(JwtAuthGuard)
export class HealthRecordsController {
  constructor(private readonly healthRecordsService: HealthRecordsService) {}

  @Post()
  create(@Body() createHealthRecordDto: CreateHealthRecordDto) {
    return this.healthRecordsService.create(createHealthRecordDto);
  }

  @Get()
  findAll() {
    return this.healthRecordsService.findAll();
  }

  @Get('pet/:petId')
  findByPet(@Param('petId') petId: string) {
    return this.healthRecordsService.findByPet(petId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthRecordsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealthRecordDto: UpdateHealthRecordDto,
  ) {
    return this.healthRecordsService.update(id, updateHealthRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthRecordsService.remove(id);
  }
}
