import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Company } from '../company/company.entity';
import { StationType } from '../station_type/station_type.entity';

@Entity('station')
export class Station extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  @OneToOne(() => Company, (company: Company) => company.id)
  company_id: number;

  @Column()
  @IsNumber()
  @OneToOne(() => StationType, (stationType: StationType) => stationType.id)
  station_type_id: number;
}
