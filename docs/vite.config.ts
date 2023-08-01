import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
// @ts-ignore
import { svelte } from '@sveltejs/vite-plugin-svelte'
export default defineConfig({
  plugins: [
    svelte(),
    UnoCSS(),
  ],
})
