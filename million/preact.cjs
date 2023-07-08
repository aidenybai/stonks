'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const preact = require('preact');
const hooks = require('preact/hooks');
const block$1 = require('./chunks/block.cjs');
const constants = require('./chunks/constants.cjs');
const constants$1 = require('./chunks/constants2.cjs');
const utils$1 = require('./chunks/utils.cjs');
const utils = require('./chunks/utils2.cjs');
require('react');
require('react-dom/client');

const REGISTRY = new constants.Map$();
const block = (fn, options = {}) => {
  const block2 = constants.MapHas$.call(REGISTRY, fn) ? constants.MapGet$.call(REGISTRY, fn) : fn ? block$1.block(fn, utils.unwrap) : options.block;
  function MillionBlock(props) {
    const ref = hooks.useRef(null);
    const patch = hooks.useRef(null);
    utils$1.processProps(props);
    patch.current?.(props);
    const effect = hooks.useCallback(() => {
      const currentBlock = block2(props, props.key, options.shouldUpdate);
      if (ref.current && patch.current === null) {
        block$1.queueMicrotask$(() => {
          block$1.mount$.call(currentBlock, ref.current, null);
        });
        patch.current = (props2) => {
          block$1.queueMicrotask$(() => {
            block$1.patch(currentBlock, block2(props2));
          });
        };
      }
    }, []);
    const marker = hooks.useMemo(() => {
      return preact.h(constants$1.RENDER_SCOPE, { ref });
    }, []);
    const vnode = preact.h(preact.Fragment, null, marker, preact.h(constants$1.Effect, { effect }));
    return vnode;
  }
  if (!constants.MapHas$.call(REGISTRY, MillionBlock)) {
    constants.MapSet$.call(REGISTRY, MillionBlock, block2);
  }
  return MillionBlock;
};

const For = ({ each, children }) => {
  const ref = hooks.useRef(null);
  const fragmentRef = hooks.useRef(null);
  const cache = hooks.useRef({
    each: null,
    children: null
  });
  if (fragmentRef.current && each !== cache.current.each) {
    block$1.queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache);
      block$1.arrayPatch$.call(fragmentRef.current, block$1.mapArray(newChildren));
    });
  }
  hooks.useEffect(() => {
    if (fragmentRef.current)
      return;
    block$1.queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache);
      fragmentRef.current = block$1.mapArray(newChildren);
      block$1.arrayMount$.call(fragmentRef.current, ref.current);
    });
  }, []);
  return preact.h(constants$1.RENDER_SCOPE, { ref });
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
    if (constants.MapHas$.call(REGISTRY, vnode.type)) {
      if (!currentCache.block) {
        currentCache.block = constants.MapGet$.call(REGISTRY, vnode.type);
      }
      if (cache.current.block) {
        children[i] = cache.current.block(vnode.props);
      }
    } else {
      const block = block$1.block((props) => {
        return {
          type: constants$1.RENDER_SCOPE,
          props: { children: [props?.__scope] }
        };
      });
      const currentBlock = (props) => {
        return block({
          props,
          __scope: utils.renderPreactScope(preact.h(vnode.type, props))
        });
      };
      constants.MapSet$.call(REGISTRY, vnode.type, currentBlock);
      currentCache.block = currentBlock;
      children[i] = currentBlock(vnode.props);
    }
  }
  currentCache.each = each;
  currentCache.children = children;
  return children;
};

exports.renderReactScope = utils.renderPreactScope;
exports.unwrap = utils.unwrap;
exports.For = For;
exports.REGISTRY = REGISTRY;
exports.block = block;
