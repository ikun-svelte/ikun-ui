import { demoBlockPlugin } from './plugin-demo-block';

export function applyPlugins(md: any) {
	md.use(demoBlockPlugin);
}
