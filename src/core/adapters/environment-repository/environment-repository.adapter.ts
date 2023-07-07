import { Singleton } from '@/helpers/singleton.decorator';
import { config } from 'dotenv';
import { join } from 'path';
import { IEnvironmentRepository } from './environment-repository.contract';

@Singleton
export class EnvironmentRepository implements IEnvironmentRepository {
  constructor() {
    config({
      path: join(process.cwd(), '.env'),
    });
  }

  get(key: string): string | undefined {
    const value = process.env[key];
    return value;
  }
}
