import { log, setGlobalPrefix } from 'baiwusanyu-utils';
import { deleteAsync } from 'del';

const OUTPUT_NODE_MODULES = [
	'dist',
	'components/**/dist',
	'preset/**/dist',
	'docs/.vitepress/**/dist',
	'play/**/dist',
	'docs/**/dist',
	'utils/**/dist'
];
async function doCleanOutput() {
	// set log prefix
	setGlobalPrefix('[ikun-ui]: ');

	log('info', 'Start clearing all output.');
	try {
		// remove dist from packages
		await deleteAsync(OUTPUT_NODE_MODULES);

		log('info', 'Finished cleaning all output.');
	} catch (e) {
		log('error', e);
	}
}

doCleanOutput();
