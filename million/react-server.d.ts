import * as react from 'react';
import { ComponentType } from 'react';
import { MillionProps, Options, MillionArrayProps } from './types.js';
export { r as renderReactScope } from './utils-21172a62.js';
import './block-66d65920.js';
import './types-0b3c4385.js';

declare const block: <P extends MillionProps>(Component: ComponentType<P>, options?: Options) => (props: P) => react.ReactElement<P, string | react.JSXElementConstructor<any>> | react.FunctionComponentElement<P> | null;
declare function For<T>({ each, children, ssr, svg }: MillionArrayProps<T>): react.DOMElement<react.DOMAttributes<Element>, Element> | react.CElement<{
    each: T[];
    children: (value: T, i: number) => react.ReactNode;
    ssr: boolean | undefined;
    svg: boolean | undefined;
}, react.Component<{
    each: T[];
    children: (value: T, i: number) => react.ReactNode;
    ssr: boolean | undefined;
    svg: boolean | undefined;
}, any, any>> | null;

export { For, block };
