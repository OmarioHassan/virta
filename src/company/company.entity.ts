import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

@Entity('company')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  @MinLength(1)
  @MaxLength(45)
  @IsString()
  name: string;

  @Column()
  @IsBoolean()
  is_parent: boolean;

  @Column('int', { default: 0 })
  @IsOptional()
  @IsNumber()
  parent_id: number;
}
