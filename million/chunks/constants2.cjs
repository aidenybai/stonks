'use strict';

const react = require('react');

const RENDER_SCOPE = "slot";
const SVG_RENDER_SCOPE = "g";
const REACT_ROOT = "__react_root";
const Effect = ({ effect }) => {
  react.useEffect(effect, []);
  return null;
};
const REGISTRY = /* @__PURE__ */ new Map();

exports.Effect = Effect;
exports.REACT_ROOT = REACT_ROOT;
exports.REGISTRY = REGISTRY;
exports.RENDER_SCOPE = RENDER_SCOPE;
exports.SVG_RENDER_SCOPE = SVG_RENDER_SCOPE;
