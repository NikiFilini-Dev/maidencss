#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const colors_1 = require("./colors");
const imports_1 = require("./imports");
const spacings_1 = require("./spacings");
const coolImport = require('@nikifilini/maiden-config-loader');
async function main() {
    const root = process.cwd();
    let schema;
    if (fs_extra_1.default.existsSync(path.join(root, 'schema.maiden.js'))) {
        schema = require(path.join(root, 'schema.maiden.js'));
    }
    else if (fs_extra_1.default.existsSync(path.join(root, 'schema.maiden.ts'))) {
        schema = await coolImport(root, 'schema.maiden.ts', 'schema.maiden.mjs');
    }
    else {
        throw new Error('Config not found');
    }
    const outDir = path.join(root, schema.out);
    await fs_extra_1.default.ensureDir(outDir);
    if ('spacings' in schema) {
        const spacingsGenerator = new spacings_1.SpacingsProcessor(schema);
        await fs_extra_1.default.writeFile(path.join(outDir, 'spacings.css'), spacingsGenerator.content);
    }
    if ('colors' in schema) {
        const colorsGenerator = new colors_1.ColorsProcessor(schema);
        await fs_extra_1.default.writeFile(path.join(outDir, 'colors.css'), colorsGenerator.content);
    }
    const importsGenerator = new imports_1.ImportsProcessor(schema);
    await fs_extra_1.default.writeFile(path.join(outDir, 'index.css'), importsGenerator.content);
}
main();
__exportStar(require("./utils"), exports);
//# sourceMappingURL=index.js.map