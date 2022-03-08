import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

let buildConfig: UserConfigExport;

if (process.env.BUILD_PLATFORMS === 'true') {
  buildConfig = {
    plugins: [vue(), dts()],
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    build: {
      sourcemap: true,
      minify: false,
      outDir: 'platforms',
      lib: {
        entry: path.resolve(__dirname, './src/lib/platforms/index.ts'),
        name: 'vue-share-popup/platforms',
        fileName: (format: string) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['vue', 'vue-demi'],
        output: {
          globals: {
            vue: 'Vue',
            'vue-demi': 'vue-demi',
          },
        },
        plugins: [],
      },
    },
  };
} else if (process.env.BUILD_BUNDLE === 'true') {
  buildConfig = {
    plugins: [vue()],
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    build: {
      outDir: 'bundle',
      lib: {
        entry: path.resolve(__dirname, './src/lib/entry-bundle.ts'),
        name: 'vue-share-popup',
        fileName: () => 'vue-share-popup.bundle.js',
        formats: ['iife'],
      },
      rollupOptions: {
        output: {
          extend: true,
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
} else if (process.env.BUILD_DEMO === 'true') {
  buildConfig = {
    plugins: [vue()],
    build: {
      outDir: 'dist-demo',
      sourcemap: false,
      minify: true,
    },
  };
} else {
  buildConfig = {
    plugins: [vue(), dts()],
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    build: {
      sourcemap: true,
      minify: false,
      lib: {
        entry: path.resolve(__dirname, './src/lib/main.ts'),
        name: 'vue-share-popup',
      },
      rollupOptions: {
        external: [
          'vue',
          'vue-demi',
          '@popperjs/core/lib/popper-lite',
          '@popperjs/core/lib/enums',
          '@popperjs/core/lib/modifiers/preventOverflow',
          '@popperjs/core/lib/modifiers/offset',
          '@popperjs/core/lib/modifiers/flip',
        ],
        output: {
          globals: {
            vue: 'Vue',
            'vue-demi': 'vueDemi',
            '@popperjs/core/lib/popper-lite': 'popperLite',
            '@popperjs/core/lib/enums': 'popperEnums',
            '@popperjs/core/lib/modifiers/preventOverflow': 'popperModPreventOverflow',
            '@popperjs/core/lib/modifiers/offset': 'popperModOffset',
            '@popperjs/core/lib/modifiers/flip': 'popperModFlip',
          },
        },
        plugins: [],
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(buildConfig);
