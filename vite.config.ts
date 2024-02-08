/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import viteTsConfigPaths from 'vite-tsconfig-paths';

import tsconfigBase from './tsconfig.json';

const resolve = (p: string) => path.resolve(__dirname, p);
const tsconfigBaseAliases = (rootOffset: string): Record<string, string> => {
  const paths = tsconfigBase.compilerOptions?.paths || [];
  const aliases: Record<string, string> = {
    root: __dirname,
    build: {
      outDir: 'dist',
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
  for (const [name, path] of Object.entries(paths)) {
    aliases[name] = resolve(`${rootOffset}/${path}`);
  }
  return aliases;
};

export default defineConfig({
  cacheDir: './node_modules/.vite/project',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [
          ['import', { libraryName: 'antd', style: true }],
          'transform-react-inline-elements',
          [
            'babel-plugin-styled-components',
            {
              displayName: process.env.NODE_ENV !== 'production',
              ssr: true,
              pure: true,
              minify: process.env.NODE_ENV === 'production',
              transpileTemplateLiterals: process.env.NODE_ENV === 'production',
            },
          ],
        ],
      },
    }),
    nxViteTsPaths(),
    viteTsConfigPaths({ root: '.' }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '.',
  //    }),
  //  ],
  // },

  build: {
    sourcemap: true,
    outDir: './dist',
    rollupOptions: {
      output: {
        manualChunks: {
          helpers: ['lodash-es', 'yup', 'axios', 'dayjs', 'url', 'qrcode'],
          components: ['@ant-design/icons', 'antd', 'styled-components', 'react-responsive'],
          'code-block': ['react-code-blocks'],
          chart: ['recharts'],
          store: ['react-redux', '@reduxjs/toolkit'],
          render: ['react', 'react-dom', 'react-is', 'react-router-dom', '@sentry/react'],
        },
      },
    },
  },

  resolve: {
    alias: {
      ...tsconfigBaseAliases('.'),
    },
  },

  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
    },
  },
});
