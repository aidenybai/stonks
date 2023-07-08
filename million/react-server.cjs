'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const react = require('react');
const constants = require('./chunks/constants2.cjs');
const utils = require('./chunks/utils.cjs');
require('react-dom/client');

let millionModule;
const block = (Component, options = {}) => {
  let blockFactory = millionModule ? millionModule.block(Component) : null;
  function MillionBlockLoader(props) {
    const [ready, setReady] = react.useState(Boolean(blockFactory));
    react.useEffect(() => {
      if (!blockFactory) {
        const importSource = async () => {
          if (!millionModule)
            millionModule = await import('./react.cjs');
          blockFactory = millionModule.block(Component, options);
          setReady(true);
        };
        try {
          void importSource();
        } catch (e) {
          throw new Error("Failed to load Million.js");
        }
      }
      return () => {
        blockFactory = null;
      };
    }, []);
    if (!ready || !blockFactory) {
      if (options.ssr === false)
        return null;
      return react.createElement(
        constants.RENDER_SCOPE,
        null,
        react.createElement(options.original, props.__props)
      );
    }
    return react.createElement(blockFactory, props);
  }
  return MillionBlockLoader;
};
function For({ each, children, ssr, svg }) {
  const [ready, setReady] = react.useState(false);
  react.useEffect(() => {
    if (millionModule)
      return;
    const importSource = async () => {
      millionModule = await import('./react.cjs');
      setReady(true);
    };
    try {
      void importSource();
    } catch (e) {
      throw new Error("Failed to load Million.js");
    }
  }, []);
  if (!ready || !millionModule) {
    if (ssr === false)
      return null;
    return react.createElement(
      svg ? constants.SVG_RENDER_SCOPE : constants.RENDER_SCOPE,
      null,
      ...each.map(children)
    );
  }
  return react.createElement(millionModule.For, {
    each,
    children,
    ssr,
    svg
  });
}

exports.renderReactScope = utils.renderReactScope;
exports.For = For;
exports.block = block;
