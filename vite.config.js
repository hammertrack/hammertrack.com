import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  plugins: [
    svelte({
      preprocess: preprocess(),
      /* plugin options */
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})
