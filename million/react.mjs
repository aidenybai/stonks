import { useRef, useCallback, useMemo, createElement, Fragment, useEffect, memo } from 'react';
import { b as block$1, q as queueMicrotask$, d as mount$, p as patch, e as arrayPatch$, a as mapArray, g as arrayMount$ } from './chunks/block.mjs';
import { j as MapHas$, k as MapGet$, h as MapSet$ } from './chunks/constants.mjs';
import { u as unwrap, p as processProps, r as renderReactScope } from './chunks/utils.mjs';
export { r as renderReactScope, u as unwrap } from './chunks/utils.mjs';
import { R as REGISTRY, S as SVG_RENDER_SCOPE, a as RENDER_SCOPE, E as Effect } from './chunks/constants2.mjs';
export { R as REGISTRY } from './chunks/constants2.mjs';
import 'react-dom/client';

const block = (fn, { block: compiledBlock, shouldUpdate, svg } = {}) => {
  const block2 = MapHas$.call(REGISTRY, fn) ? MapGet$.call(REGISTRY, fn) : fn ? block$1(fn, unwrap, shouldUpdate, svg) : compiledBlock;
  const MillionBlock = (props) => {
    const ref = useRef(null);
    const patch$1 = useRef(null);
    props = processProps(props);
    patch$1.current?.(props);
    const effect = useCallback(() => {
      const currentBlock = block2(props, props.key);
      if (ref.current && patch$1.current === null) {
        queueMicrotask$(() => {
          mount$.call(currentBlock, ref.current, null);
        });
        patch$1.current = (props2) => {
          queueMicrotask$(() => {
            patch(currentBlock, block2(props2, props2.key, shouldUpdate));
          });
        };
      }
    }, []);
    const marker = useMemo(() => {
      return createElement(svg ? SVG_RENDER_SCOPE : RENDER_SCOPE, {
        ref
      });
    }, []);
    const vnode = createElement(
      Fragment,
      null,
      marker,
      createElement(Effect, { effect })
    );
    return vnode;
  };
  if (!MapHas$.call(REGISTRY, fn)) {
    MapSet$.call(REGISTRY, fn, block2);
  }
  return MillionBlock;
};

const MillionArray = ({
  each,
  children,
  memo: memo2,
  svg
}) => {
  const ref = useRef(null);
  const fragmentRef = useRef(null);
  const cache = useRef({
    each: null,
    children: null
  });
  if (fragmentRef.current && (each !== cache.current.each || !memo2)) {
    queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache, memo2);
      arrayPatch$.call(fragmentRef.current, mapArray(newChildren));
    });
  }
  useEffect(() => {
    if (fragmentRef.current)
      return;
    queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache, memo2);
      fragmentRef.current = mapArray(newChildren);
      arrayMount$.call(fragmentRef.current, ref.current);
    });
  }, []);
  return createElement(svg ? SVG_RENDER_SCOPE : RENDER_SCOPE, { ref });
};
const typedMemo = memo;
const For = typedMemo(MillionArray);
const createChildren = (each, getComponent, cache, memo2) => {
  const children = Array(each.length);
  const currentCache = cache.current;
  for (let i = 0, l = each.length; i < l; ++i) {
    if (memo2 && currentCache.each && currentCache.each[i] === each[i]) {
      children[i] = currentCache.children?.[i];
      continue;
    }
    const vnode = getComponent(each[i], i);
    if (MapHas$.call(REGISTRY, vnode.type)) {
      if (!currentCache.block) {
        currentCache.block = MapGet$.call(REGISTRY, vnode.type);
      }
      children[i] = currentCache.block(vnode.props);
    } else {
      const block = block$1((props) => {
        return {
          type: RENDER_SCOPE,
          props: { children: [props?.__scope] }
        };
      });
      const currentBlock = (props) => {
        return block(
          {
            props,
            __scope: renderReactScope(createElement(vnode.type, props))
          },
          vnode.key
        );
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

const macro = (expression) => expression;

export { For, block, macro };
