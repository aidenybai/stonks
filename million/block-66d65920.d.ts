import { P as Props, a as VElement, V as VNode, A as AbstractBlock, E as Edit } from './types-0b3c4385.js';

declare const block: (fn: (props?: Props) => VElement, unwrap?: ((vnode: any) => VNode) | undefined, shouldUpdate?: ((oldProps: Props, newProps: Props) => boolean) | undefined, svg?: boolean) => <T extends Props>(props?: T | null | undefined, key?: string, shouldUpdateCurrentBlock?: ((oldProps: Props, newProps: Props) => boolean) | undefined) => Block;
declare const mount: (block: AbstractBlock, parent?: HTMLElement) => HTMLElement;
declare const patch: (oldBlock: AbstractBlock, newBlock: AbstractBlock) => HTMLElement;
declare class Block extends AbstractBlock {
    r: HTMLElement;
    e: Edit[];
    constructor(root: HTMLElement, edits: Edit[], props?: Props | null, key?: string | null, shouldUpdate?: ((oldProps: Props, newProps: Props) => boolean) | null, getElements?: ((root: HTMLElement) => HTMLElement[]) | null);
    m(parent?: HTMLElement, refNode?: Node | null): HTMLElement;
    p(newBlock: AbstractBlock): HTMLElement;
    v(block?: AbstractBlock | null, refNode?: Node | null): void;
    x(): void;
    u(_oldProps: Props, _newProps: Props): boolean;
    s(): string;
    t(): HTMLElement | null | undefined;
}
declare const stringToDOM: (content: string, svg?: boolean) => HTMLElement;
declare const withKey: (value: any, key: string) => any;

export { Block as B, block as b, mount as m, patch as p, stringToDOM as s, withKey as w };
