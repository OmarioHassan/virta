import { Module } from '@nestjs/common';
import { StationsTypesService } from './station_type.service';
import { StationsTypesController } from './station_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationType } from './station_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationType])],
  providers: [StationsTypesService],
  controllers: [StationsTypesController],
})
export class StationsTypesModule {}
