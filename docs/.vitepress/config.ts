import { defineConfig } from 'vitepress';
import { applyPlugins } from './plugins/code';
// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'ikun-ui',
	description: 'Documentation site for ikun-ui',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Guide', link: '/markdown-examples' },
			{
				text: 'Components',
				items: [
					{
						text: 'KIcon',
						link: 'components/KIcon'
					}
				]
			},
			{ text: 'Theme', link: '/markdown-examples' }
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' }
				]
			}
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
	},
	markdown: {
		config: (md) => {
			applyPlugins(md);
		},
		theme: {
			light: 'vitesse-light',
			dark: 'vitesse-dark'
		}
	}
});
