import { log, setGlobalPrefix } from 'baiwusanyu-utils';
import { deleteAsync } from 'del';

const PKGS_NODE_MODULES = ['components/**/node_modules', 'play/**/node_modules', 'dos/**/node_modules'];
async function doCleanDeps() {
	// set log prefix
	setGlobalPrefix('[ikun-ui]: ');

	log('info', 'Start clearing all deps.');

	try {
		// remove node_modules from packages
		await deleteAsync(PKGS_NODE_MODULES);

		log('info', 'Finished cleaning all deps.');
	} catch (e) {
		log('error', e);
	}
}

doCleanDeps();
