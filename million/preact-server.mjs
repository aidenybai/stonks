import { h } from 'preact';
import { useReducer, useEffect } from 'preact/hooks';
import { a as RENDER_SCOPE } from './chunks/constants2.mjs';
export { r as renderPreactScope } from './chunks/utils2.mjs';
import 'react';

let millionModule;
const block = (Component) => {
  let blockFactory;
  function MillionBlockLoader(props) {
    useEffect(() => {
      const importSource = async () => {
        millionModule = await import('./preact.mjs');
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
      return h(RENDER_SCOPE, null, h(Component, props));
    }
    return h(blockFactory, props);
  }
  return MillionBlockLoader;
};
function For(props) {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const importSource = async () => {
      millionModule = await import('./preact.mjs');
      forceUpdate(0);
    };
    try {
      void importSource();
    } catch (e) {
      throw new Error("Failed to load Million library");
    }
  }, []);
  if (millionModule) {
    return h(millionModule.For, props);
  }
  return h(RENDER_SCOPE, null, ...props.each.map(props.children));
}

export { For, block };
