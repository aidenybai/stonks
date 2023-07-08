import { useEffect } from 'react';

const RENDER_SCOPE = "slot";
const SVG_RENDER_SCOPE = "g";
const REACT_ROOT = "__react_root";
const Effect = ({ effect }) => {
  useEffect(effect, []);
  return null;
};
const REGISTRY = /* @__PURE__ */ new Map();

export { Effect as E, REGISTRY as R, SVG_RENDER_SCOPE as S, RENDER_SCOPE as a, REACT_ROOT as b };
