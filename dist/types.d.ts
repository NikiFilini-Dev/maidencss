import { ColorPresetName } from './presets/index';
export declare type Spacing = {
    [key: number]: string;
    add?: number;
    xy?: boolean;
    short?: string;
};
export declare type Color = {
    [key: number | string]: string;
};
export declare type Schema = {
    out: string;
    colors: {
        _extend?: ColorPresetName | ColorPresetName[];
        palette: {
            [key: string]: string | Color;
        };
    };
    spacings: {
        [key: string]: Spacing;
    };
};
