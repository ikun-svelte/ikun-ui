import path from 'path';
import fs from 'fs-extra';
const pathCWD = process.cwd();
const packageJsonPath = path.join(pathCWD, 'package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
packageJson.svelte = 'dist/index.js';
packageJson.export = {
	'.': {
		svelte: './dist/index.js'
	}
};
fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 4 });
