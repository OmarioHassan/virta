import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
  ) {}
  async getCompanies(): Promise<Company[]> {
    return await this.companiesRepository.find();
  }

  async getCompaniesDetails(id: number): Promise<Company[]> {
    return await this.companiesRepository
      .createQueryBuilder('c')
      .select('*')
      .leftJoin('station', 's', 'c.id=s.company_id OR c.parent_id=s.company_id')
      .leftJoin('station_type', 'st', 's.station_type_id=st.id')
      .where(`c.id=${id}`)
      .andWhere(`s.company_id=${id}`)
      .orWhere(`c.parent_id=${id}`)
      .andWhere('s.company_id=c.id')
      .printSql()
      .getRawMany();
  }

  findOne(id: number): Promise<Company> {
    return this.companiesRepository.findOne({ where: { id: id } });
  }

  async createCompany(company: Company) {
    if (!company.is_parent) {
      if (!company.parent_id) {
        throw new NotFoundException('Child Company must have a parent id');
      }
      if (!(await this.findOne(company.parent_id))) {
        throw new NotFoundException('Parent Company not found');
      }
    }
    this.companiesRepository.save(company);
  }

  async remove(id: string): Promise<void> {
    await this.companiesRepository.delete(id);
  }

  async editCompany(id: number, company: Company): Promise<Company> {
    const editedCompany = await this.companiesRepository.findOne({
      where: { id: id },
    });
    if (!editedCompany) {
      throw new NotFoundException('Company is not found');
    }
    editedCompany.name = company.name;
    editedCompany.is_parent = company.is_parent;
    editedCompany.parent_id = company.parent_id;
    await editedCompany.save();
    return editedCompany;
  }
}
