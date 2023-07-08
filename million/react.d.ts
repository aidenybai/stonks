import * as react from 'react';
import { ComponentType } from 'react';
import { MillionProps, Options, MillionArrayProps } from './types.js';
export { r as renderReactScope, u as unwrap } from './utils-21172a62.js';
import './block-66d65920.js';
import './types-0b3c4385.js';

declare const block: <P extends MillionProps>(fn: ComponentType<P> | null, { block: compiledBlock, shouldUpdate, svg }?: Options) => (props: P) => react.FunctionComponentElement<{
    children?: react.ReactNode;
}>;

declare const For: <T>({ each, children, memo, svg, }: MillionArrayProps<T>) => react.DOMElement<react.DOMAttributes<HTMLElement>, HTMLElement>;

declare const REGISTRY: Map<ComponentType<{}>, any>;

declare const macro: (expression: any) => any;

export { For, REGISTRY, block, macro };
