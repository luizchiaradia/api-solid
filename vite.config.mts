import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: ['**/node_modules/**', '**/build/**'],
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
  }
})