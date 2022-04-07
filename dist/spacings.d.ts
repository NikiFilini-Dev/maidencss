import { BaseProcessor } from './baseProcessor';
import { Schema, Spacing } from './types';
export declare class SpacingsProcessor extends BaseProcessor {
    private schema;
    default: {
        spacing: Spacing;
        end: number;
    };
    constructor(schema: Schema);
    generateSpacingRules(name: string, spacing: Spacing, start: number, end: number): string;
    generateSpacingVars(name: string, spacing: Spacing, start: number, end: number): string;
    findEnd(spacing: Spacing, start?: number): number;
}
