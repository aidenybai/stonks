import * as preact from 'preact';
import { ComponentType, ComponentProps } from 'preact';
export { r as renderPreactScope } from './utils-faa7742b.js';
import './types-0b3c4385.js';

declare const block: (Component: ComponentType<any>) => (props: ComponentProps<any>) => preact.VNode<any>;
declare function For(props: {
    each: any[];
    children: (item: any, index: number) => any;
}): preact.VNode<any>;

export { For, block };
