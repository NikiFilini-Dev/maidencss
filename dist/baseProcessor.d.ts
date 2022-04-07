import prettier from 'prettier';
export declare class BaseProcessor {
    protected _content: string;
    get content(): string;
    protected formatDocument(parser?: prettier.BuiltInParserName): void;
}
