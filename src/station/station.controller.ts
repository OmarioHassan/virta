import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Station } from './station.entity';
import { StationsService } from './station.service';

@Controller('stations')
export class StationsController {
  constructor(private stationsService: StationsService) {}

  @Get()
  findAll() {
    return this.stationsService.getStations();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.stationsService.findOne(id);
  }

  @Post() create(@Body() station: Station) {
    return this.stationsService.createStation(station);
  }

  @Patch()
  async editStation(
    @Body() station: Station,
    @Query('id') id: number,
  ): Promise<Station> {
    const stationEdited = await this.stationsService.editStation(id, station);
    return stationEdited;
  }

  @Delete()
  remove(@Query('id', ParseIntPipe) id) {
    console.log('delete', id);
    this.stationsService.remove(id);
  }
}
