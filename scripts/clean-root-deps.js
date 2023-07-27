import { rm } from 'fs';

const ROOT_NODE_MODULES = 'node_modules';
async function doCleanRootDeps() {
	rm(ROOT_NODE_MODULES, { recursive: true }, (e) => {
		if (e) {
			console.error(e);
		} else {
			console.log('[ikun-ui]: Finished cleaning root deps.');
		}
	});
}

doCleanRootDeps();
