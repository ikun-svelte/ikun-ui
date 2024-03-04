import path from 'path';
import fs from 'fs-extra';
const pathCWD = process.cwd();
const packageJsonPath = path.join(pathCWD, 'package.json');
const packageJson = fs.readJsonSync(packageJsonPath);

packageJson.export = {
	exports: {
		'.': {
			types: './dist/index.d.ts',
			svelte: './dist/index.js'
		}
	}
};

Reflect.deleteProperty(packageJson, 'svelte');
fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 4 });
