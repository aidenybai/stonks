import { b as block } from './block-66d65920.js';
import { P as Props } from './types-0b3c4385.js';
import { ComponentType, ReactNode } from 'react';

type MillionProps = Record<string, any>;
interface Options {
    shouldUpdate?: (oldProps: Props, newProps: Props) => boolean;
    block?: any;
    original?: ComponentType<any>;
    ssr?: boolean;
    svg?: boolean;
}
interface MillionArrayProps<T> {
    each: T[];
    children: (value: T, i: number) => ReactNode;
    memo?: true;
    ssr?: boolean;
    svg?: boolean;
}
interface ArrayCache<T> {
    each: T[] | null;
    children: T[] | null;
    block?: ReturnType<typeof block>;
}

export { ArrayCache, MillionArrayProps, MillionProps, Options };
