import { ProcessModel } from '../models/process.model';

export interface CoffeeQueryModel {
  readonly name: string;
  readonly origin: string;
  readonly image: string;
  readonly imageUrl: string;
  readonly description: string;
  readonly process: ProcessModel;
  readonly characteristic: { name: string; id: string }[];
  readonly id?: number;
}
