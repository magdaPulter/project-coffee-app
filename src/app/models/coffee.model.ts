import { ProcessModel } from "./process-model.model";

export interface CoffeeModel {
    readonly name: string;
    readonly origin: string;
    readonly image: string;
    readonly description: string;
    readonly process: ProcessModel;
    readonly characteristic: string[];
    readonly id?: number 
}
