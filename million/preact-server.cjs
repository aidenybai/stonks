'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const preact = require('preact');
const hooks = require('preact/hooks');
const constants = require('./chunks/constants2.cjs');
const utils = require('./chunks/utils2.cjs');
require('react');

let millionModule;
const block = (Component) => {
  let blockFactory;
  function MillionBlockLoader(props) {
    hooks.useEffect(() => {
      const importSource = async () => {
        millionModule = await import('./preact.cjs');
        if (!blockFactory) {
          blockFactory = millionModule.block(Component);
        }
      };
      try {
        void importSource();
      } catch (e) {
        throw new Error("Failed to load Million library");
      }
      return () => {
        blockFactory = null;
      };
    }, []);
    if (!blockFactory) {
      return preact.h(constants.RENDER_SCOPE, null, preact.h(Component, props));
    }
    return preact.h(blockFactory, props);
  }
  return MillionBlockLoader;
};
function For(props) {
  const [_, forceUpdate] = hooks.useReducer((x) => x + 1, 0);
  hooks.useEffect(() => {
    const importSource = async () => {
      millionModule = await import('./preact.cjs');
      forceUpdate(0);
    };
    try {
      void importSource();
    } catch (e) {
      throw new Error("Failed to load Million library");
    }
  }, []);
  if (millionModule) {
    return preact.h(millionModule.For, props);
  }
  return preact.h(constants.RENDER_SCOPE, null, ...props.each.map(props.children));
}

exports.renderPreactScope = utils.renderPreactScope;
exports.For = For;
exports.block = block;
