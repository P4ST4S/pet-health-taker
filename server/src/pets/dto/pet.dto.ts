import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty({
    description: 'The name of the pet',
    example: 'Fluffy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The species of the pet',
    example: 'Dog',
  })
  @IsString()
  @IsNotEmpty()
  species: string;

  @ApiProperty({
    description: 'The breed of the pet',
    example: 'Golden Retriever',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({
    description: 'The birth date of the pet',
    example: '2020-01-01',
  })
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiPropertyOptional({
    description: 'The color of the pet',
    example: 'Golden',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    description: 'The weight of the pet in kg',
    example: 25.5,
  })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({
    description: 'The microchip number of the pet',
    example: '123456789012345',
  })
  @IsString()
  @IsOptional()
  microchipNumber?: string;

  @ApiPropertyOptional({
    description: "URL to the pet's photo",
    example: 'https://example.com/pet-photo.jpg',
  })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional({
    description: 'Additional notes about the pet',
    example: 'Allergic to chicken',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    description: "The ID of the pet's owner",
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsOptional()
  ownerId?: string;
}

export class UpdatePetDto {
  @ApiPropertyOptional({
    description: 'The name of the pet',
    example: 'Fluffy',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'The species of the pet',
    example: 'Dog',
  })
  @IsString()
  @IsOptional()
  species?: string;

  @ApiPropertyOptional({
    description: 'The breed of the pet',
    example: 'Golden Retriever',
  })
  @IsString()
  @IsOptional()
  breed?: string;

  @ApiPropertyOptional({
    description: 'The birth date of the pet',
    example: '2020-01-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthDate?: Date;

  @ApiPropertyOptional({
    description: 'The color of the pet',
    example: 'Golden',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    description: 'The weight of the pet in kg',
    example: 25.5,
  })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({
    description: 'The microchip number of the pet',
    example: '123456789012345',
  })
  @IsString()
  @IsOptional()
  microchipNumber?: string;

  @ApiPropertyOptional({
    description: "URL to the pet's photo",
    example: 'https://example.com/pet-photo.jpg',
  })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional({
    description: 'Additional notes about the pet',
    example: 'Allergic to chicken',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    description: "The ID of the pet's owner",
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsOptional()
  ownerId?: string;
}
