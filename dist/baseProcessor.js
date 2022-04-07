"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProcessor = void 0;
const prettier_1 = __importDefault(require("prettier"));
class BaseProcessor {
    _content = '';
    get content() {
        return this._content;
    }
    formatDocument(parser = 'css') {
        this._content = prettier_1.default.format(this._content, { parser });
    }
}
exports.BaseProcessor = BaseProcessor;
//# sourceMappingURL=baseProcessor.js.map