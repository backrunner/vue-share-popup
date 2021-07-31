import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

const buildConfig: UserConfigExport =
  process.env.BUILD_BUNDLE === 'true'
    ? {
        plugins: [vue()],
        optimizeDeps: {
          exclude: ['vue-demi'],
        },
        build: {
          outDir: 'dist-bundled',
          lib: {
            entry: path.resolve(__dirname, './src/lib/entry-bundle.ts'),
            name: 'vue-share-popper',
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
      }
    : {
        plugins: [vue(), dts()],
        optimizeDeps: {
          exclude: ['vue-demi'],
        },
        build: {
          lib: {
            entry: path.resolve(__dirname, './src/lib/main.ts'),
            name: 'vue-share-popper',
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

// https://vitejs.dev/config/
export default defineConfig(buildConfig);
