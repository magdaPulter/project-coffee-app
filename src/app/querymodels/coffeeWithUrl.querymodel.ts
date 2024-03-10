export interface CoffeeWithUrlQueryModel {
  readonly name: string;
  readonly code: number;
  readonly category: string[];
  readonly price: string;
  readonly quantity: string;
  readonly producer: string[];
  readonly discount: number;
  readonly discountToggle: boolean;
  readonly description: string;
  readonly longDescription: string;
  readonly date: string;
  readonly image: string;
  readonly unPublished: boolean;
  readonly id?: number;
  readonly imageUrl: string;
}
