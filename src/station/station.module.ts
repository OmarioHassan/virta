import { Module } from '@nestjs/common';
import { StationsService } from './station.service';
import { StationsController } from './station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  providers: [StationsService],
  controllers: [StationsController],
})
export class StationsModule {}
