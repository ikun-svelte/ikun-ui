import { log, setGlobalPrefix } from 'baiwusanyu-utils';
import { runCommand } from './utils.js';
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

async function doBuildComponents() {
	// set log prefix
	setGlobalPrefix('[ikun-ui]: ');
	const rootDir = path.resolve('components');
	const targetFile = ['**/package.json'];
	const buildCommand = 'pnpm run build';

	function getPkgPath(includeCompile, dir) {
		return fg.sync(includeCompile, {
			ignore: ['src', '**/node_modules/**'],
			cwd: dir
		});
	}
	const pkgList = getPkgPath(targetFile, rootDir);
	for (let i = 0; i < pkgList.length; i++) {
		const packageJsonPath = `${rootDir.replaceAll('\\', '/')}/${pkgList[i]}`;
		try {
			const packageJsonData = fs.readFileSync(packageJsonPath, 'utf8');
			const packageJson = JSON.parse(packageJsonData);
			if (packageJson.scripts && packageJson.scripts.build) {
				try {
					log('info', `build ${packageJson.name}`);
					await runCommand(buildCommand, packageJsonPath.replaceAll('package.json', ''));
					log('success', `build ${packageJson.name} complete`);
				} catch (error) {
					log('error', `build error at ${packageJson.name}`, error);
					log('error', error);
				}
			}
		} catch (error) {
			log('error', `Error reading or parsing package.json at ${packageJsonPath}`);
			log('error', error);
		}
	}
}

doBuildComponents();
