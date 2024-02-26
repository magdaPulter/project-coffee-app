export interface CoffeeModel {
  readonly name: string;
  readonly code: number;
  readonly category: string[];
  readonly price: string;
  readonly quantity: string;
  readonly quantityUnit: string;
  readonly quantityInStock: number;
  readonly discount: number;
  readonly description: string;
  readonly longDescription: string;
  readonly date: string;
  readonly image: string;
  readonly published: boolean;
  readonly id?: number;
}
