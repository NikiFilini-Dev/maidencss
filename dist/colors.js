"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorsProcessor = void 0;
const lodash_deepmerge_1 = __importDefault(require("lodash-deepmerge"));
const baseProcessor_1 = require("./baseProcessor");
const presets_1 = require("./presets");
class ColorsProcessor extends baseProcessor_1.BaseProcessor {
    schema;
    constructor(schema) {
        super();
        this.schema = schema;
        let colors = schema.colors.palette;
        if (schema.colors._extend) {
            let extended = {};
            if (typeof schema.colors._extend === 'string')
                schema.colors._extend = [schema.colors._extend];
            schema.colors._extend.forEach((presetName) => {
                extended = lodash_deepmerge_1.default.merge(extended, presets_1.colorPresets[presetName]);
            });
            colors = lodash_deepmerge_1.default.merge(extended, colors);
        }
        delete colors._extend;
        for (const colorName of Object.keys(colors)) {
            if (typeof colors[colorName] === 'string') {
                this._content += `// Color - ${colorName}\n`;
                this._content += ':root {\n';
                this._content += this.generateSingleColorVars(colorName, colors[colorName]);
                this._content += '}\n\n';
                this._content += this.generateSingleColorRules(colorName, colors[colorName]);
                this._content += '\n';
                continue;
            }
            for (const colorSubname of Object.keys(colors[colorName])) {
                const fullName = colorName + '-' + colorSubname;
                this._content += `// Color - ${colorName}\n`;
                this._content += ':root {\n';
                this._content += this.generateSingleColorVars(fullName, colors[colorName][colorSubname]);
                this._content += '}\n\n';
                this._content += this.generateSingleColorRules(fullName, colors[colorName][colorSubname]);
                this._content += '\n';
            }
        }
        this.formatDocument();
    }
    generateSingleColorVars(name, value) {
        return `--${name}: ${value};\n`;
    }
    generateSingleColorRules(name, value) {
        let s = '';
        s += `.clr-${name} {color: ${value}}\n`;
        s += `.bg-${name} {background-color: ${value}}\n`;
        return s;
    }
}
exports.ColorsProcessor = ColorsProcessor;
//# sourceMappingURL=colors.js.map