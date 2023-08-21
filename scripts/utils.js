import shell from 'shelljs';
import { log, setGlobalPrefix } from 'baiwusanyu-utils';
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
export async function runCommand(command, dir, userOptions) {
	return new Promise((resolve, reject) => {
		try {
			shell.exec(
				command,
				{
					cwd: dir,
					shell: true,
					encoding: 'GBK',
					async: true,
					silent: userOptions?.silent === undefined ? true : userOptions?.silent,
					...userOptions
				},
				(code, output, err) => {
					if (code === 0) {
						resolve(true);
					} else if (err) {
						reject(err);
					}

					const outputStr = output.toString();
					if (outputStr && !(userOptions?.silent ?? true)) {
						console.log(outputStr);
					}
				}
			);
		} catch (e) {
			reject(e.message);
		}
	});
}

/**
 * Avoid excessive execution of 'watch.js'.
 */
class TaskRunnerState {
	/**@type {boolean}`*/
	_value;
	/**@type {TaskRunnerState | null} */
	static instance = null;
	constructor() {
		if (TaskRunnerState.instance) {
			return TaskRunnerState.instance;
		}
		this._value = false;
		TaskRunnerState.instance = this;
	}
	get value() {
		return this._value;
	}
	/**
	 * @param {boolean} val
	 * @returns {void}
	 */
	set value(val) {
		this._value = val;
	}
}

export async function runTask(buildCommand, root, action, userOptions) {
	const taskRunnerState = new TaskRunnerState();
	if (taskRunnerState.value) return;
	taskRunnerState.value = true;
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
					await runCommand(
						buildCommand,
						packageJsonPath.replaceAll('package.json', ''),
						userOptions
					);
					log('success', `${action} ${packageJson.name} complete`);
				} catch (error) {
					log('error', `${action} error at ${packageJson.name}`, error);
					log('error', error);
				}
			}
		} catch (error) {
			log('error', `Error reading or parsing package.json at ${packageJsonPath}`);
			log('error', error);
		} finally {
			taskRunnerState.value = false;
		}
	}
}
