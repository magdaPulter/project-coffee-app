export interface CoffeeModel {
  readonly name: string;
  readonly code: number;
  readonly category: string[];
  readonly price: string;
  readonly quantity: string;
  readonly producer: string[];
  readonly discount: number;
  readonly description: string;
  readonly longDescription: string;
  readonly date: string;
  readonly image: string;
  readonly published: boolean;
  readonly id?: number;
}
