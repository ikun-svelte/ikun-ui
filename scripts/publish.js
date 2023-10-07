import { runTask } from './utils.js';
async function doPublish() {
	try {
		await runTask('pnpm run publish:npm', 'components', 'publish');
		await runTask('pnpm run publish:npm', 'preset', 'publish');
		await runTask('pnpm run publish:npm', 'utils', 'publish');
	} catch (e) {
		console.error(e);
	}
}

doPublish();
