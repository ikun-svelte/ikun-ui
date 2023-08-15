import { runTask } from './utils.js';
import chokidar from 'chokidar';

function getComponentName(path) {
	return path.split('\\')[1];
}

chokidar
	.watch('./components', {
		ignored: /(dist)|(node_modules)/ // ignore dotfiles
	})
	.on('ready', () => console.log('Initial scan complete. Ready for changes'))
	.on('change', (path) => {
		const component = getComponentName(path);
		console.log(`${component} change,noew rebuilding.....`);
		runTask(`npm run build`, `components/${component}`, 'watch', {
			silent: false
		});
	});
