import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'components/index',
  ],
  clean: false,
  declaration: true,
  externals: [
    'svelte',
  ],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
