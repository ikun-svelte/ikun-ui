import { runTask } from './utils.js';

runTask('pnpm run publish:npm', 'components', 'publish');
runTask('pnpm run publish:npm', 'preset', 'publish');
