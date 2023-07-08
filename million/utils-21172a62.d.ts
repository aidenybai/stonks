import * as react from 'react';
import { ReactNode } from 'react';
import { V as VNode } from './types-0b3c4385.js';

declare const renderReactScope: (vnode: ReactNode) => react.DetailedReactHTMLElement<react.HTMLAttributes<HTMLElement>, HTMLElement> | ((el: HTMLElement | null) => HTMLElement);
declare const unwrap: (vnode?: ReactNode) => VNode;

export { renderReactScope as r, unwrap as u };
