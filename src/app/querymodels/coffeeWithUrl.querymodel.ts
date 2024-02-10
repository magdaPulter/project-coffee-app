import { ProcessModel } from '../models/process.model';

export interface CoffeeWithUrlQueryModel {
  readonly name: string;
  readonly origin: string;
  readonly image: string;
  readonly imageUrl: string;
  readonly description: string;
  readonly process: ProcessModel;
  readonly characteristic: Record<number, boolean>;
  readonly id?: number;
}
