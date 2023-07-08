import { h, Fragment } from 'preact';
import { useRef, useCallback, useMemo, useEffect } from 'preact/hooks';
import { b as block$1, q as queueMicrotask$, d as mount$, p as patch, e as arrayPatch$, a as mapArray, g as arrayMount$ } from './chunks/block.mjs';
import { M as Map$, j as MapHas$, k as MapGet$, h as MapSet$ } from './chunks/constants.mjs';
import { a as RENDER_SCOPE, E as Effect } from './chunks/constants2.mjs';
import { p as processProps } from './chunks/utils.mjs';
import { u as unwrap, r as renderPreactScope } from './chunks/utils2.mjs';
export { r as renderReactScope, u as unwrap } from './chunks/utils2.mjs';
import 'react';
import 'react-dom/client';

const REGISTRY = new Map$();
const block = (fn, options = {}) => {
  const block2 = MapHas$.call(REGISTRY, fn) ? MapGet$.call(REGISTRY, fn) : fn ? block$1(fn, unwrap) : options.block;
  function MillionBlock(props) {
    const ref = useRef(null);
    const patch$1 = useRef(null);
    processProps(props);
    patch$1.current?.(props);
    const effect = useCallback(() => {
      const currentBlock = block2(props, props.key, options.shouldUpdate);
      if (ref.current && patch$1.current === null) {
        queueMicrotask$(() => {
          mount$.call(currentBlock, ref.current, null);
        });
        patch$1.current = (props2) => {
          queueMicrotask$(() => {
            patch(currentBlock, block2(props2));
          });
        };
      }
    }, []);
    const marker = useMemo(() => {
      return h(RENDER_SCOPE, { ref });
    }, []);
    const vnode = h(Fragment, null, marker, h(Effect, { effect }));
    return vnode;
  }
  if (!MapHas$.call(REGISTRY, MillionBlock)) {
    MapSet$.call(REGISTRY, MillionBlock, block2);
  }
  return MillionBlock;
};

const For = ({ each, children }) => {
  const ref = useRef(null);
  const fragmentRef = useRef(null);
  const cache = useRef({
    each: null,
    children: null
  });
  if (fragmentRef.current && each !== cache.current.each) {
    queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache);
      arrayPatch$.call(fragmentRef.current, mapArray(newChildren));
    });
  }
  useEffect(() => {
    if (fragmentRef.current)
      return;
    queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache);
      fragmentRef.current = mapArray(newChildren);
      arrayMount$.call(fragmentRef.current, ref.current);
    });
  }, []);
  return h(RENDER_SCOPE, { ref });
};
const createChildren = (each, getComponent, cache) => {
  const children = Array(each.length);
  const currentCache = cache.current;
  for (let i = 0, l = each.length; i < l; ++i) {
    if (currentCache.each && currentCache.each[i] === each[i]) {
      children[i] = currentCache.children?.[i];
      continue;
    }
    const vnode = getComponent(each[i], i);
    if (MapHas$.call(REGISTRY, vnode.type)) {
      if (!currentCache.block) {
        currentCache.block = MapGet$.call(REGISTRY, vnode.type);
      }
      if (cache.current.block) {
        children[i] = cache.current.block(vnode.props);
      }
    } else {
      const block = block$1((props) => {
        return {
          type: RENDER_SCOPE,
          props: { children: [props?.__scope] }
        };
      });
      const currentBlock = (props) => {
        return block({
          props,
          __scope: renderPreactScope(h(vnode.type, props))
        });
      };
      MapSet$.call(REGISTRY, vnode.type, currentBlock);
      currentCache.block = currentBlock;
      children[i] = currentBlock(vnode.props);
    }
  }
  currentCache.each = each;
  currentCache.children = children;
  return children;
};

export { For, REGISTRY, block };
