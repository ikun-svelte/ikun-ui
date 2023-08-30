import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
	const componentsDir = path.join(process.cwd(), './components');
	const dirs = await fs.readdir(path.join(componentsDir));

	for (const dir of dirs) {
		const isDir = (await fs.stat(path.join(componentsDir, `/${dir}`))).isDirectory();
		if (!isDir) continue;
		const PKG_PATH = path.join(componentsDir, `/${dir}/package.json`);

		const pkgContent = await fs.readFile(PKG_PATH, 'utf-8');
		const pkgJson = JSON.parse(pkgContent);

		const exportsDefineObject = {
			exports: pkgJson.exports,
			main: pkgJson.main,
			module: pkgJson.module,
			svelte: pkgJson.svelte,
			types: pkgJson.types
		};

		for (const key in exportsDefineObject) {
			if (exportsDefineObject[key] === undefined) {
				delete exportsDefineObject[key];
			}
		}

		const rawPublishConfig = pkgJson.publishConfig || {};
		const nextPublishConfig = {
			...rawPublishConfig,
			...exportsDefineObject
		};

		// Transform original package.JSON

		pkgJson.publishConfig = nextPublishConfig;
		delete pkgJson.exports;
		delete pkgJson.module;
		delete pkgJson.svelte;

		pkgJson.main = './src/index.ts';

		await fs.writeFile(path.join(PKG_PATH), JSON.stringify(pkgJson, null, 2));
	}
}

main();
