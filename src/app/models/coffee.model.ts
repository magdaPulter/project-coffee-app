export interface CoffeeModel {
    readonly name: string;
    readonly origin: string;
    readonly image: string;
    readonly description: string;
    readonly process: string;
    readonly characteristic: string[];
    readonly id?: number 
}
