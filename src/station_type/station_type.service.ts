import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationType } from './station_type.entity';

@Injectable()
export class StationsTypesService {
  constructor(
    @InjectRepository(StationType)
    private stationsTypesRepository: Repository<StationType>,
  ) {}
  async getStationsTypes(): Promise<StationType[]> {
    return await this.stationsTypesRepository.find();
  }

  findOne(id: number): Promise<StationType> {
    return this.stationsTypesRepository.findOne({ where: { id: id } });
  }

  async createStationType(stationType: StationType) {
    this.stationsTypesRepository.save(stationType);
  }

  async remove(id: string): Promise<void> {
    await this.stationsTypesRepository.delete(id);
  }

  async editStationType(
    id: number,
    stationType: StationType,
  ): Promise<StationType> {
    const editedStationType = await this.stationsTypesRepository.findOne({
      where: { id: id },
    });

    if (!editedStationType) {
      throw new NotFoundException('StationType is not found');
    }
    editedStationType.name = stationType.name;
    editedStationType.max_power = stationType.max_power;
    await editedStationType.save();
    return editedStationType;
  }
}
