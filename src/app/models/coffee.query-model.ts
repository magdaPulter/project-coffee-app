import { ProcessModel } from "./process-model.model";
import { TasteModel } from "./taste.model";

export interface CoffeeQueryModel {
    readonly name: string;
    readonly origin: string;
    readonly image: string;
    readonly description: string;
    readonly process: ProcessModel;
    readonly characteristic: {name: string, id: string}[];
    readonly id?: number 
}
