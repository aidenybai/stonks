import { useState, useEffect, createElement } from 'react';
import { S as SVG_RENDER_SCOPE, a as RENDER_SCOPE } from './chunks/constants2.mjs';
export { r as renderReactScope } from './chunks/utils.mjs';
import 'react-dom/client';

let millionModule;
const block = (Component, options = {}) => {
  let blockFactory = millionModule ? millionModule.block(Component) : null;
  function MillionBlockLoader(props) {
    const [ready, setReady] = useState(Boolean(blockFactory));
    useEffect(() => {
      if (!blockFactory) {
        const importSource = async () => {
          if (!millionModule)
            millionModule = await import('./react.mjs');
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
      return createElement(
        RENDER_SCOPE,
        null,
        createElement(options.original, props.__props)
      );
    }
    return createElement(blockFactory, props);
  }
  return MillionBlockLoader;
};
function For({ each, children, ssr, svg }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (millionModule)
      return;
    const importSource = async () => {
      millionModule = await import('./react.mjs');
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
    return createElement(
      svg ? SVG_RENDER_SCOPE : RENDER_SCOPE,
      null,
      ...each.map(children)
    );
  }
  return createElement(millionModule.For, {
    each,
    children,
    ssr,
    svg
  });
}

export { For, block };
