import {defineConfig, HeadConfig} from 'vitepress';
import { applyPlugins } from './plugins/code';

const guides = [
	{ text: 'Quick Start', link: '/guide/quick-start' },
	{ text: 'Installation', link: '/guide/install' },
	{ text: 'I18n', link: '/guide/i18n' }
	// { text: 'Changelog', link: '/guide/changelog' },
];

const components = [
	{
		text: 'Basic',
		collapsed: false,
		items: [
			{
				text: 'Button',
				link: '/components/KButton'
			},
			{
				text: 'Icon',
				link: '/components/KIcon'
			},
		]
	},
	{
		text: 'Form',
		collapsed: false,
		items: [
			{
				text: 'Checkbox',
				link: '/components/KCheckbox'
			},
			{
				text: 'Switch',
				link: '/components/KSwitch'
			},
			{
				text: 'Input',
				link: '/components/KInput'
			},
			{
				text: 'Select',
				link: '/components/KSelect'
			}
		]
	},
	{
		text: 'Data',
		collapsed: false,
		items: [
			{
				text: 'Tag',
				link: '/components/KTag'
			}
		]
	},
	/*{
		text: 'Navigation',
		collapsed: false,
		items: [

		],
	},*/
	{
		text: 'Feedback',
		collapsed: false,
		items: [
			{
				text: 'Notification',
				link: '/components/KNotification'
			},
			{
				text: 'Message',
				link: '/components/KMessage'
			},
			{
				text: 'Popover',
				link: '/components/KPopover'
			},
			{
				text: 'Tooltip',
				link: '/components/KTooltip'
			},
			{
				text: 'Collapse',
				link: '/components/KCollapse'
			},
			{
				text: 'Drawer',
				link: '/components/KDrawer'
			},
			{
				text: 'Modal',
				link: '/components/KModal'
			}
		]
	},
	{
		text: 'Other',
		collapsed: false,
		items: [
			{
				text: 'Mask',
				link: '/components/KMask'
			},
			{
				text: 'EyeDropper',
				link: '/components/KEyeDropper'
			},
			{
				text: 'ClientOnly',
				link: '/components/KClientOnly'
			}
		]
	}
];

const sidebar = {
	'/guide': [
		{
			text: 'Developer Guide',
			items: guides
		}
	],
	'/components': components
};

const head = [
	['meta', { property: 'og:title', content: 'Onu UI' }],
	[
		'meta',
		{
			property: 'og:description',
			content: 'Popular, beautiful and fast UnoCSS component library'
		}
	],
	['meta', { property: 'og:url', content: 'https://github.com/ikun-svelte/ikun-ui' }],
	['meta', { name: 'referrer', content: 'no-referrer' }],
	['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
	[
		'link',
		{
			href: 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;400;600&display=swap',
			rel: 'stylesheet'
		}
	],
	[
		'link',
		{
			href: 'https://gw.alipayobjects.com/os/k/font/lxgwwenkaiscreenr.css',
			rel: 'stylesheet'
		}
	]
] as HeadConfig[];
const nav = [
	{ text: 'Home', link: '/' },
	{ text: 'Guide', items: guides },
	{ text: 'Components', items: components },
	{ text: 'Theme', link: '/markdown-examples' }
];
export default defineConfig({
	title: 'ikun-ui',
	description: 'Documentation site for ikun-ui',
	head,
	themeConfig: {
		logo: '/logo.svg',
		socialLinks: [{ icon: 'github', link: 'https://github.com/ikun-svelte/ikun-ui' }],
		footer: {
			message: 'MIT Licensed',
			copyright: 'Copyright © 2023-present baiwusanyu-c'
		},
		nav,
		sidebar
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
