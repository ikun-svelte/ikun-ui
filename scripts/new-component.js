import fs from 'fs-extra';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { log, setGlobalPrefix, extend, deepClone } from 'baiwusanyu-utils';
import ora from 'ora';
import { runCommand } from './utils.js';

const kebabToPascal = (name) => {
	return name
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
};

const require = createRequire(import.meta.url);

const args = process.argv;
const originalCompName = args[2];
const libName = `@ikun-ui/${originalCompName}`;

const __dirname = fileURLToPath(new URL('../', import.meta.url));
const componentsRoot = 'components/';
const presetRoot = 'preset/';
const pkgPath = path.join(__dirname, 'package.json');
const rootPKG = require(pkgPath);

const upperReg = /[A-Z]/;

const compDevDeps = ['@tsconfig/svelte', '@sveltejs/package', 'tslib', 'typescript'];
const getDeps = (dep) => `"${dep}": "${rootPKG.dependencies[dep]}"`;
const _write = async (file, content, witreSpinner) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, content, async (err) => {
			if (err) {
				witreSpinner.fail(`failed to create file ${file}, rolling back operation.`);
				await rollback(err);
				reject(err);
				process.exit(1);
			}
			witreSpinner.succeed(`file ${file} created successfully.`);
			resolve(null);
		});
	});
};

const write = (file, content) => writeFnSpinnerRegister(file, content, _write);

createComponent().catch(async (err) => {
	await rollback(err);
	process.exit(1);
});

async function createComponent() {
	setGlobalPrefix('[ikun-ui]: ');
	const compName = createCompName(originalCompName);
	const compBaseDir = `${componentsRoot}${compName}`;
	const compMainDir = `${compBaseDir}/src`;
	const compTestDir = `${compBaseDir}/__test__`;
	const indexFileDir = `${componentsRoot}index.ts`;
	const shortcutsIndexFileDir = `${presetRoot}src/shortcuts/`;
	await appendDepToPkg(originalCompName);
	mkCompDirsSync(compBaseDir, compMainDir, compTestDir);
	// writes files
	await Promise.all([
		writeIndex(indexFileDir, originalCompName),
		writePreset(shortcutsIndexFileDir, originalCompName),
		writeTsConfig(compBaseDir),
		writePkgJson(compBaseDir, originalCompName),
		writeComponent(compMainDir, originalCompName),
		writeEntry(compMainDir, compName),
		writeTypeDTs(compMainDir, compName),
		writeTest(compTestDir, compName, originalCompName)
	]);

	// excutes the required commands
	await devDependenciesInstall();

	log(
		'success',
		`${originalCompName} has been created successfully. Thank you for your contribution, and enjoy your coding!`
	);
}
function mkCompDirsSync(...dirs) {
	dirs.forEach((dir) => fs.mkdirSync(dir));
}

/**
 * checks whether the component name is kabab case, and wether the
 * component already exists.
 * returns a string that has been convertd.
 */
function createCompName(componentName) {
	if (!originalCompName || upperReg.test(originalCompName)) {
		log('error', `Please name a compnent with the kebab case. e.g, pnpm run new check-box`);
		process.exit(1);
	}
	const _compName = kebabToPascal(componentName);
	const compPath = componentsRoot + kebabToPascal(componentName);
	if (fs.existsSync(compPath)) {
		log('error', `${_compName} already exists`);
		process.exit(1);
	}
	return _compName;
}

async function writeTsConfig(baseDir) {
	const file = `${baseDir}/tsconfig.json`;
	const tsConfigContent = `{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "compilerOptions": {
    "noImplicitAny": true,
    "strict": true,
    "declaration": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.svelte"],
  "exclude": ["node_modules/*", "**/*.spec.ts"]
}
  `;

	write(file, tsConfigContent);
}

async function writePkgJson(baseDir, originalCompName) {
	const file = `${baseDir}/package.json`;
	const version = rootPKG.version;
	const pkgContent = `{
  "name": "@ikun-ui/${originalCompName}",
  "version": "${version}",
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.d.ts",
  "svelte": "src/index.ts",
  "keywords": [
    "svelte",
    "svelte3",
    "web component",
    "component",
    "react",
    "vue",
    "svelte-kit",
    "dx"
  ],
 "files": [
  "dist",
  "package.json"
 ],
  "scripts": {
    "build": "svelte-package -i src",
    "publish:pre": "node ../../scripts/pre-publish.js",
    "publish:npm": "pnpm run publish:pre && pnpm publish --no-git-checks --access public"
  },
  "publishConfig": {
	"access": "public",
	"main": "dist/index.js",
	"module": "dist/index.js",
	"svelte": "dist/index.js",
	"types": "dist/index.d.ts"
  },
  "dependencies": {
    "@ikun-ui/icon": "workspace:*",
    "@ikun-ui/utils": "workspace:*",
    "svelte": "^4.2.7",
	"clsx": "^2.0.0",
    ${getDeps('baiwusanyu-utils')}
  },
  "devDependencies": {
	"@tsconfig/svelte": "^5.0.0",
  "@sveltejs/package": "^2.0.0",
	"tslib": "^2.6.1",
	"typescript": "^5.1.6"
	}
}
  `;
	write(file, pkgContent);
}

async function writeComponent(baseDir, originalCompName) {
	const propsName = `K${originalCompName.replace(/^\w/, (char) => char.toUpperCase())}Props`;
	const file = `${baseDir}/index.svelte`;
	const svelteContent = `<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
  import type { ${propsName} } from "./types";
  
  export let cls: ${propsName}["cls"] = undefined;
  export let attrs: ${propsName}["attrs"] = {};
 
  const prefixCls = getPrefixCls('${originalCompName}');
  $: cnames = clsx(prefixCls, {
    [\`$\{prefixCls}--base\`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
  `;
	write(file, svelteContent);
}

async function writeEntry(baseDir, compName) {
	const file = `${baseDir}/index.ts`;
	const entryContent = `/// <reference types="./types" />
import ${compName} from './index.svelte';
export { ${compName} as K${compName} };

export default ${compName};`;
	write(file, entryContent);
}

async function writeTypeDTs(baseDir, compName) {
	const imp = "import type { ClassValue } from 'clsx';";
	const file = `${baseDir}/types.d.ts`;
	const typeDtsContent = `/// <reference types="svelte" />
${imp}
export type K${compName}Props = {
  cls: ClassValue,
  attrs: Record<string, string>
}`;
	write(file, typeDtsContent);
}

/**
 * add dependence of current component into the package.json dependeces.
 */
async function appendDepToPkg(compName) {
	const pkgCopy = deepClone(rootPKG);
	const depName = `@ikun-ui/${compName}`;
	if (depName in pkgCopy.dependencies) {
		log('error', `${depName} alredy exists in the pakeage.json.`);
		process.exit(1);
	}
	pkgCopy.dependencies = extend(pkgCopy.dependencies, { [`${depName}`]: 'workspace:*' });
	write(pkgPath, JSON.stringify(pkgCopy, null, 2));
}

/**
 * to installs the devDependencies.
 *
 * this section is can not be written in the `writePkgJson`. the reason is that thier
 * versions might change in future, and thier are not preset in root `package.json`.
 */
async function devDependenciesInstall() {
	const spinners = ora('installing dependencies...').start();
	await runCommand(`pnpm -F=${libName} install ${compDevDeps.join(' ')} --save-dev`, __dirname, {
		silent: true
	}).catch((err) => {
		spinners.fail(`Failed to install dependencies. Please check the issue and try again.\n ${err}`);
	});
	spinners.clear();
	spinners.succeed('dependencies installed successfully.');
}

async function writeTest(baseDir, compName, originalCompName) {
	const file = `${baseDir}/${originalCompName}.spec.ts`;
	const testContent = `import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import K${compName} from '../src';

let host;

const initHost = () => {
	host = globalThis.document.createElement('div');
	host.setAttribute('id', 'host');
	globalThis.document.body.appendChild(host);
};
beforeEach(() => {
	initHost();
	vi.useFakeTimers();
});
afterEach(() => {
	host.remove();
	vi.useRealTimers();
});

describe('Test: K${compName}', () => {
	test('props: cls', async () => {
		const instance = new K${compName}({
			target: host,
			props: {
				cls: 'k-${originalCompName}--test'
			}
		});
		expect(instance).toBeTruthy();
		expect(
			(host)!.innerHTML.includes('k-${originalCompName}--test')
		).toBeTruthy();
		expect(host.innerHTML).matchSnapshot();
	});
})
	`;
	await write(file, testContent);
}

/**
 * if any files have been changed but the scripts encounter errors, perform a rollback to
 * a previous state.
 */
async function rollback(err) {
	log('error', `rollback err: ${err}`);
	await write(pkgPath, JSON.stringify(rootPKG, null, 2));
	process.exit(1);
}

async function writeFnSpinnerRegister(file, content, fn) {
	const witreSpinner = ora(`createing file: ${file}`).start();
	await fn(file, content, witreSpinner);
}

async function writeIndex(indexFileDir, originalCompName) {
	const file = await fs.readFile(indexFileDir);
	let contextStr = `${file.toString()}export * from '@ikun-ui/${originalCompName}';`;
	await fs.outputFileSync(indexFileDir, contextStr);
}

async function writePreset(shortcutsIndexFileDir, originalCompName) {
	// create shortcuts file
	const srcDir = `${shortcutsIndexFileDir}/src`;
	const fileDir = `${srcDir}/${originalCompName}.ts`;
	const content = `export const ${originalCompName}Shortcuts: Record<string, string> = {
  'k-${originalCompName}': ''
}`;
	await fs.outputFileSync(fileDir, content);

	// rewrite index
	const indexDir = `${shortcutsIndexFileDir}/index.ts`;
	const file = await fs.readFile(indexDir);
	let indexContent = `${file.toString()}export { ${originalCompName}Shortcuts } from './src/${originalCompName}';\n`;
	indexContent =
		`import { ${originalCompName}Shortcuts } from './src/${originalCompName}';\n` + indexContent;
	indexContent = indexContent.replaceAll(
		'// anchor shortcuts',
		`// anchor shortcuts
\tconst ${originalCompName}List = Object.keys(${originalCompName}Shortcuts);`
	);

	indexContent = indexContent.replaceAll(
		'// anchor list',
		`// anchor list
		.concat(${originalCompName}List)`
	);

	indexContent = indexContent.replaceAll(
		'// anchor defaultShortcuts',
		`// anchor defaultShortcuts
	// ${originalCompName}
	${originalCompName}Shortcuts,`
	);

	await fs.outputFileSync(indexDir, indexContent);
}
