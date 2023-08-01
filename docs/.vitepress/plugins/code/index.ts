import { demoBlockPlugin } from './plugin-demo-block'
import { fencePlugin } from './fencePlugin'

export function applyPlugins(md: any) {
  md.use(fencePlugin)
  md.use(demoBlockPlugin)
}
