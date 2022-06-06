import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './station.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationsRepository: Repository<Station>,
  ) {}
  async getStations(): Promise<Station[]> {
    return await this.stationsRepository.find();
  }

  findOne(id: number): Promise<Station> {
    return this.stationsRepository.findOne({ where: { id: id } });
  }

  async createStation(station: Station) {
    this.stationsRepository.save(station);
  }

  async remove(id: string): Promise<void> {
    await this.stationsRepository.delete(id);
  }

  async editStation(id: number, station: Station): Promise<Station> {
    const editedStation = await this.stationsRepository.findOne({
      where: { id: id },
    });

    if (!editedStation) {
      throw new NotFoundException('Station is not found');
    }
    console.log('edit');
    editedStation.name = station.name;
    editedStation.company_id = station.company_id;
    editedStation.station_type_id = station.station_type_id;
    await editedStation.save();
    return editedStation;
  }
}
