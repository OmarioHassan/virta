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
import { Company } from './company.entity';
import { CompaniesService } from './company.service';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  findAll() {
    return this.companiesService.getCompanies();
  }

  @Get('details')
  findAllStations(@Query('id', ParseIntPipe) id) {
    console.log('xyz');
    return this.companiesService.getCompaniesDetails(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.companiesService.findOne(id);
  }

  @Post() create(@Body() company: Company) {
    return this.companiesService
      .createCompany(company)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  @Patch()
  async editCompany(
    @Body() company: Company,
    @Query('id') id: number,
  ): Promise<Company> {
    const companyEdited = await this.companiesService.editCompany(id, company);
    return companyEdited;
  }

  @Delete()
  remove(@Query('id', ParseIntPipe) id) {
    this.companiesService.remove(id);
  }
}
