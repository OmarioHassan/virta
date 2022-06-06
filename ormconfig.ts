import { DataSourceOptions } from 'typeorm';

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'sqluser',
  password: 'Omar123#',
  database: 'virta',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // synchronize: true,
  logging: true,
} as DataSourceOptions;
