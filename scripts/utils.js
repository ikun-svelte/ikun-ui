import shell from 'shelljs';
import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import { log, setGlobalPrefix } from 'baiwusanyu-utils';

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

function runTaskPool(list, limit, asyncHandle) {
	let recursion = (arr) => {
		return asyncHandle(arr.shift()).then(() => {
			if (arr.length !== 0) return recursion(arr);
			else return 'finish';
		});
	};
	let listCopy = [].concat(list);
	limit = listCopy.length >= limit ? limit : listCopy.length;
	while (limit--) {
		recursion(listCopy);
	}
}

function runTaskCommand({ rootDir, pkgPath, buildCommand, userOptions, action, taskRunnerState }) {
	return new Promise((resolve, reject) => {
		const packageJsonPath = path.join(rootDir, pkgPath);
		try {
			const packageJsonData = fs.readFileSync(packageJsonPath, 'utf8');
			const packageJson = JSON.parse(packageJsonData);
			if (packageJson.scripts && packageJson.scripts.build) {
				runCommand(buildCommand, packageJsonPath.replaceAll('package.json', ''), userOptions)
					.then(() => {
						log('success', `${action} ${packageJson.name} complete`);
						resolve();
					})
					.catch((error) => {
						log('error', `${action} error at ${packageJson.name}`, error);
						log('error', error);
						reject();
					});
			}
		} catch (error) {
			log('error', `Error reading or parsing package.json at ${packageJsonPath}`);
			log('error', error);
			reject();
		} finally {
			taskRunnerState.value = false;
		}
	});
}

export function runTask(buildCommand, root, action, userOptions) {
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
	const buildComponentList = pkgList.map((m) => {
		return {
			rootDir,
			buildCommand,
			userOptions,
			action,
			taskRunnerState,
			pkgPath: m
		};
	});

	runTaskPool(buildComponentList, 5, runTaskCommand);
}
