import chokidar from 'chokidar';
import { runTask } from './utils.js';
import { log, setGlobalPrefix } from 'baiwusanyu-utils';

setGlobalPrefix('[ikun-ui]: ');

function getComponentName(path) {
	return path.split(/[\\/]/)[1];
}

function getRoot(filePath) {
	return filePath.split(/[\\/]/)[0];
}
function runReBuild(path) {
	runTask(`npm run build`, path, 'watch', {
		silent: false
	});
}

chokidar
	.watch(['./components', './utils', './preset'], {
		ignored: /(dist)|(node_modules)|(__test__)/ // ignore dotfiles
	})
	.on('ready', () => log('success', 'Initial scan complete. Ready for changes'))
	.on('change', (filePath) => {
		const root = getRoot(filePath);
		switch (root) {
			case 'components': {
				const component = getComponentName(filePath);
				log('success', `${component} has been changed, rebuilding now.....`);
				runReBuild(`components/${component}`);
				break;
			}
			case 'utils': {
				log('success', `utlis has been changed, rebuilding now.....`);
				runReBuild('utils');
				break;
			}
			case 'preset': {
				log('success', `preset has been changed, rebuilding now.....`);
				runReBuild('preset');
				break;
			}
			default: {
				log('warning', `unexpected path ${filePath}`);
			}
		}
	});
