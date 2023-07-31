import shell from 'shelljs';
import { log, setGlobalPrefix } from 'baiwusanyu-utils';
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
export async function runCommand(command, dir) {
	return new Promise((resolve, reject) => {
		try {
			shell.exec(
				command,
				{
					cwd: dir,
					shell: true,
					encoding: 'GBK',
					async: true,
					silent: true
				},
				(code, output, err) => {
					if (code === 0) {
						resolve(true);
					} else if (err) {
						reject(err);
					}

					const outputStr = output.toString();
					if (outputStr) {
						console.log(outputStr);
					}
				}
			);
		} catch (e) {
			reject(e.message);
		}
	});
}

export async function runTask(buildCommand, root, action) {
	// set log prefix
	setGlobalPrefix('[ikun-ui]: ');
	const rootDir = path.resolve(root);
	const targetFile = ['**/package.json'];

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
					await runCommand(buildCommand, packageJsonPath.replaceAll('package.json', ''));
					log('success', `${action} ${packageJson.name} complete`);
				} catch (error) {
					log('error', `${action} error at ${packageJson.name}`, error);
					log('error', error);
				}
			}
		} catch (error) {
			log('error', `Error reading or parsing package.json at ${packageJsonPath}`);
			log('error', error);
		}
	}
}
