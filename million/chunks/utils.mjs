import { createElement, Fragment, isValidElement } from 'react';
import { createRoot } from 'react-dom/client';
import { a as RENDER_SCOPE, b as REACT_ROOT } from './constants2.mjs';

const processProps = (props) => {
  const processedProps = {};
  for (const key in props) {
    const value = props[key];
    if (isValidElement(value)) {
      processedProps[key] = renderReactScope(value);
      continue;
    }
    processedProps[key] = props[key];
  }
  return processedProps;
};
const renderReactScope = (vnode) => {
  if (typeof window === "undefined") {
    return createElement(RENDER_SCOPE, null, vnode);
  }
  return (el) => {
    const parent = el ?? document.createElement(RENDER_SCOPE);
    const root = REACT_ROOT in parent ? parent[REACT_ROOT] : parent[REACT_ROOT] = createRoot(parent);
    root.render(vnode);
    return parent;
  };
};
const unwrap = (vnode) => {
  if (typeof vnode !== "object" || vnode === null || !("type" in vnode)) {
    if (typeof vnode === "number" || vnode === true) {
      return String(vnode);
    } else if (!vnode) {
      return void 0;
    }
    return vnode;
  }
  const type = vnode.type;
  if (typeof type === "function") {
    return unwrap(type(vnode.props ?? {}));
  }
  if (typeof type === "object" && "$" in type)
    return type;
  const props = { ...vnode.props };
  const children = vnode.props?.children;
  if (children !== void 0 && children !== null) {
    props.children = flatten(vnode.props.children).map(
      (child) => unwrap(child)
    );
  }
  return {
    type,
    props
  };
};
const flatten = (rawChildren) => {
  if (rawChildren === void 0 || rawChildren === null)
    return [];
  if (typeof rawChildren === "object" && "type" in rawChildren && rawChildren.type === Fragment) {
    return flatten(rawChildren.props.children);
  }
  if (!Array.isArray(rawChildren) || typeof rawChildren === "object" && "$" in rawChildren) {
    return [rawChildren];
  }
  const flattenedChildren = rawChildren.flat(Infinity);
  const children = [];
  for (let i = 0, l = flattenedChildren.length; i < l; ++i) {
    children.push(...flatten(flattenedChildren[i]));
  }
  return children;
};

export { processProps as p, renderReactScope as r, unwrap as u };
