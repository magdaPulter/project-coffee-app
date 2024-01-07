import { ProcessModel } from "./process.model";

export interface CoffeeModel {
    readonly name: string;
    readonly origin: string;
    readonly image: string;
    readonly description: string;
    readonly process: ProcessModel;
    readonly characteristic: Record<number, boolean> ;
    readonly id?: number 
}