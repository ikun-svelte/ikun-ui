import typescriptPlugin from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
const config = [
	{
		external: ['svelte'],
		input: 'components/index.ts', // 必须，入口文件
		output: [
			{
				file: 'dist/index.js',
				format: 'es',
				name: 'ikun-ui',
				globals: {
					svelte: 'svelte'
				}
			},
			/*{
				file: 'dist/index.cjs',
				format: 'cjs',
				name: 'ikun-ui',
				globals: {
					svelte: 'svelte' // 告诉rollup全局变量Vue即是vue
				}
			}*/
		],
		plugins: [
			svelte({
				typescript: true,
				html:true,
				compilerOptions: {
					generate: 'dom',
				}
			}),
			/*resolve({
				browser: true,
				exportConditions: ['svelte'],
				extensions: ['.svelte']
			}),
			commonjs()*/
		]
	}
];

export default config;
