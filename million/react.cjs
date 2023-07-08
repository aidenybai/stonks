'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const react = require('react');
const block$1 = require('./chunks/block.cjs');
const constants$1 = require('./chunks/constants.cjs');
const utils = require('./chunks/utils.cjs');
const constants = require('./chunks/constants2.cjs');
require('react-dom/client');

const block = (fn, { block: compiledBlock, shouldUpdate, svg } = {}) => {
  const block2 = constants$1.MapHas$.call(constants.REGISTRY, fn) ? constants$1.MapGet$.call(constants.REGISTRY, fn) : fn ? block$1.block(fn, utils.unwrap, shouldUpdate, svg) : compiledBlock;
  const MillionBlock = (props) => {
    const ref = react.useRef(null);
    const patch = react.useRef(null);
    props = utils.processProps(props);
    patch.current?.(props);
    const effect = react.useCallback(() => {
      const currentBlock = block2(props, props.key);
      if (ref.current && patch.current === null) {
        block$1.queueMicrotask$(() => {
          block$1.mount$.call(currentBlock, ref.current, null);
        });
        patch.current = (props2) => {
          block$1.queueMicrotask$(() => {
            block$1.patch(currentBlock, block2(props2, props2.key, shouldUpdate));
          });
        };
      }
    }, []);
    const marker = react.useMemo(() => {
      return react.createElement(svg ? constants.SVG_RENDER_SCOPE : constants.RENDER_SCOPE, {
        ref
      });
    }, []);
    const vnode = react.createElement(
      react.Fragment,
      null,
      marker,
      react.createElement(constants.Effect, { effect })
    );
    return vnode;
  };
  if (!constants$1.MapHas$.call(constants.REGISTRY, fn)) {
    constants$1.MapSet$.call(constants.REGISTRY, fn, block2);
  }
  return MillionBlock;
};

const MillionArray = ({
  each,
  children,
  memo: memo2,
  svg
}) => {
  const ref = react.useRef(null);
  const fragmentRef = react.useRef(null);
  const cache = react.useRef({
    each: null,
    children: null
  });
  if (fragmentRef.current && (each !== cache.current.each || !memo2)) {
    block$1.queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache, memo2);
      block$1.arrayPatch$.call(fragmentRef.current, block$1.mapArray(newChildren));
    });
  }
  react.useEffect(() => {
    if (fragmentRef.current)
      return;
    block$1.queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache, memo2);
      fragmentRef.current = block$1.mapArray(newChildren);
      block$1.arrayMount$.call(fragmentRef.current, ref.current);
    });
  }, []);
  return react.createElement(svg ? constants.SVG_RENDER_SCOPE : constants.RENDER_SCOPE, { ref });
};
const typedMemo = react.memo;
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
    if (constants$1.MapHas$.call(constants.REGISTRY, vnode.type)) {
      if (!currentCache.block) {
        currentCache.block = constants$1.MapGet$.call(constants.REGISTRY, vnode.type);
      }
      children[i] = currentCache.block(vnode.props);
    } else {
      const block = block$1.block((props) => {
        return {
          type: constants.RENDER_SCOPE,
          props: { children: [props?.__scope] }
        };
      });
      const currentBlock = (props) => {
        return block(
          {
            props,
            __scope: utils.renderReactScope(react.createElement(vnode.type, props))
          },
          vnode.key
        );
      };
      constants$1.MapSet$.call(constants.REGISTRY, vnode.type, currentBlock);
      currentCache.block = currentBlock;
      children[i] = currentBlock(vnode.props);
    }
  }
  currentCache.each = each;
  currentCache.children = children;
  return children;
};

const macro = (expression) => expression;

exports.renderReactScope = utils.renderReactScope;
exports.unwrap = utils.unwrap;
exports.REGISTRY = constants.REGISTRY;
exports.For = For;
exports.block = block;
exports.macro = macro;
