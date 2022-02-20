import { Environment } from '@/core/contracts/Environment/Environment.contract';
import dotenv from 'dotenv';
import { join } from 'path/posix';

export class ProcessEnvironment implements Environment {
  private static instance: ProcessEnvironment;

  private constructor() {
    dotenv.config({
      path: join(process.cwd(), '.env'),
    });
  }

  static create() {
    if (!this.instance) this.instance = new ProcessEnvironment();
    return this.instance;
  }

  get(key: string): string {
    const value = process.env[key];
    if (!value) throw EvalError(`variable ${key} not found`);
    return value;
  }
}
