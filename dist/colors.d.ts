import { BaseProcessor } from './baseProcessor';
import { Schema } from './types';
export declare class ColorsProcessor extends BaseProcessor {
    protected schema: Schema;
    constructor(schema: Schema);
    generateSingleColorVars(name: any, value: any): string;
    generateSingleColorRules(name: any, value: any): string;
}
