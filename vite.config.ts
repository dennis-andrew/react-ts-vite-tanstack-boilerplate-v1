/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  cacheDir: 'node_modules/.vite', // Cache directory for Vite (includes Vitest)
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    css: false, // Skip CSS processing in tests for speed
    testTimeout: 10000,
    teardownTimeout: 1000,
    hookTimeout: 10000,
    coverage: {
      provider: 'v8',
      include: ['src/shared/components/**', 'src/views/**'],
      exclude: ['src/views/AppComponents'],
      reportsDirectory: './coverage',
      reporter: ['text', 'html'],
      // Uncomment when initialising the project repo
      // thresholds: {
      //   global: {
      //     statements: 80,
      //     branches: 80,
      //     functions: 80,
      //     lines: 80,
      //   },
      // },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        importers: [],
      },
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      routesDirectory: './src/routes/app',
      generatedRouteTree: './src/routeTree.gen.ts',
      routeFileIgnorePattern: '\\.(test|spec)\\.[tj]sx?$',
      autoCodeSplitting: true,
    }),
    react(),
    viteTsconfigPaths(),
    svgr(),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', '@tanstack/react-router'],
          'antd-vendor': ['antd', '@ant-design/icons'],
          'form-vendor': ['react-hook-form', 'yup'],
        },
      },
    },
    chunkSizeWarningLimit: 1100, // Increased to account for antd vendor chunk
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@scssVariables': path.resolve(__dirname, './src/styles/variables.scss'),
      '@scssHelpers': path.resolve(__dirname, './src/styles/helpers.scss'),
      '@scssAntOverrides': path.resolve(
        __dirname,
        './src/styles/antOverrides.scss',
      ),
      '@scssMain': path.resolve(__dirname, './src/styles/main.scss'),
    },
  },
})
