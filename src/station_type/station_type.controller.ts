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
import { StationType } from './station_type.entity';
import { StationsTypesService } from './station_type.service';

@Controller('stations_types')
export class StationsTypesController {
  constructor(private stationsTypesService: StationsTypesService) {}

  @Get()
  findAll() {
    return this.stationsTypesService.getStationsTypes();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.stationsTypesService.findOne(id);
  }

  @Post() create(@Body() stationType: StationType) {
    return this.stationsTypesService.createStationType(stationType);
  }

  @Patch()
  async editStationType(
    @Body() stationType: StationType,
    @Query('id') id: number,
  ): Promise<StationType> {
    const stationTypeEdited = await this.stationsTypesService.editStationType(
      id,
      stationType,
    );
    return stationTypeEdited;
  }

  @Delete()
  remove(@Query('id', ParseIntPipe) id) {
    console.log('delete', id);
    this.stationsTypesService.remove(id);
  }
}
