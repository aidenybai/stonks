import * as t from '@babel/types';
import * as _babel_core from '@babel/core';
import * as _esbuild from 'esbuild';
import * as unplugin from 'unplugin';
import * as _vite from 'vite';

interface Options {
    optimize?: boolean;
    server?: boolean;
    mode?: 'react' | 'preact' | 'react-server' | 'preact-server' | 'vdom';
    mute?: boolean;
}

declare const vite: (options?: Options | undefined) => _vite.Plugin | _vite.Plugin[];
declare const webpack: (options?: Options | undefined) => WebpackPluginInstance;
declare const rollup: (options?: Options | undefined) => unplugin.RollupPlugin | unplugin.RollupPlugin[];
declare const rspack: (options?: Options | undefined) => RspackPluginInstance;
declare const esbuild: (options?: Options | undefined) => _esbuild.Plugin;
declare const next: (nextConfig?: Record<string, any>) => {
    webpack(config: Record<string, any>, options: Record<string, any>): any;
};
declare const _default: {
    vite: (options?: Options | undefined) => _vite.Plugin | _vite.Plugin[];
    webpack: (options?: Options | undefined) => WebpackPluginInstance;
    rollup: (options?: Options | undefined) => unplugin.RollupPlugin | unplugin.RollupPlugin[];
    rspack: (options?: Options | undefined) => RspackPluginInstance;
    esbuild: (options?: Options | undefined) => _esbuild.Plugin;
    next: (nextConfig?: Record<string, any>) => {
        webpack(config: Record<string, any>, options: Record<string, any>): any;
    };
    unplugin: unplugin.UnpluginInstance<Options | undefined, boolean>;
    babel: (api: object, options: Options | null | undefined, dirname: string) => {
        name: string;
        visitor: {
            CallExpression(this: _babel_core.PluginPass, path: _babel_core.NodePath<t.CallExpression>): void;
        };
    };
};

export { _default as default, esbuild, next, rollup, rspack, vite, webpack };
