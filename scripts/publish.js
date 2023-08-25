import { runTask } from './utils.js';

runTask('pnpm run publish:npm', 'components', 'publish').finally(() => {
	runTask('pnpm run publish:npm', 'preset', 'publish').finally(() => {
		runTask('pnpm run publish:npm', 'utils', 'publish');
	});
});
