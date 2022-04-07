"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportsProcessor = void 0;
const baseProcessor_1 = require("./baseProcessor");
class ImportsProcessor extends baseProcessor_1.BaseProcessor {
    schema;
    constructor(schema) {
        super();
        this.schema = schema;
        if ('colors' in schema)
            this._content += "@import './colors.css';\n";
        if ('spacings' in schema)
            this._content += "@import './spacings.css';\n";
        this.formatDocument();
    }
}
exports.ImportsProcessor = ImportsProcessor;
//# sourceMappingURL=imports.js.map