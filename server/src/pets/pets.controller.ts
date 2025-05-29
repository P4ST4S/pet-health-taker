import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto, UpdatePetDto } from './dto/pet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Pet } from './pet.entity';

@ApiTags('pets')
@ApiBearerAuth()
@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiCreatedResponse({
    description: 'The pet has been successfully created',
    type: Pet,
  })
  create(@Body() createPetDto: CreatePetDto, @Request() req) {
    return this.petsService.create(createPetDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiOkResponse({ description: 'Return all pets', type: [Pet] })
  findAll() {
    return this.petsService.findAll();
  }

  @Get('my-pets')
  @ApiOperation({ summary: 'Get all pets for the current user' })
  @ApiOkResponse({
    description: 'Return all pets for the current user',
    type: [Pet],
  })
  findMyPets(@Request() req) {
    return this.petsService.findByOwner(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pet by ID' })
  @ApiOkResponse({
    description: 'Return the pet with the specified ID',
    type: Pet,
  })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a pet' })
  @ApiOkResponse({
    description: 'The pet has been successfully updated',
    type: Pet,
  })
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet' })
  @ApiOkResponse({ description: 'The pet has been successfully deleted' })
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
