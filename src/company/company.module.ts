import { Module } from '@nestjs/common';
import { CompaniesService } from './company.service';
import { CompaniesController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
