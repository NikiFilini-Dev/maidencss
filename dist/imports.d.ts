import { BaseProcessor } from './baseProcessor';
import { Schema } from './types';
export declare class ImportsProcessor extends BaseProcessor {
    protected schema: Schema;
    constructor(schema: Schema);
}
