import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DataSourceOptions from '../ormconfig';
import { CompaniesModule } from './company/company.module';
import { StationsTypesModule } from './station_type/station_type.module';
import { StationsModule } from './station/station.module';
@Module({
  imports: [
    CompaniesModule,
    StationsTypesModule,
    StationsModule,
    TypeOrmModule.forRoot(DataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
