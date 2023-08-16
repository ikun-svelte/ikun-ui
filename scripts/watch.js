import chokidar from 'chokidar'
import { runTask } from './utils.js'
import { log, setGlobalPrefix } from 'baiwusanyu-utils'

setGlobalPrefix('[ikun-ui]: ')

function getComponentName(path) {
	return path.split(/[\\/]/)[1]
}

chokidar
	.watch('./components', {
		ignored: /(dist)|(node_modules)/ // ignore dotfiles
	})
	.on('ready', () => log('success', 'Initial scan complete. Ready for changes'))
	.on('change', (path) => {
		const component = getComponentName(path);
		log('success', `${component} has been changed, rebuilding now.....`)
		runTask(`npm run build`, `components/${component}`, 'watch', {
			silent: false
		})
	})
