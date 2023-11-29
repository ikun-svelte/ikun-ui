import { defineConfig, HeadConfig, DefaultTheme } from 'vitepress';
import { applyPlugins } from './plugins/code';

const guides = [
	{ text: 'Quick Start', link: '/guide/quick-start' },
	{ text: 'Installation', link: '/guide/install' }
	// { text: 'I18n', link: '/guide/i18n' }
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
				text: 'Contextmenu',
				link: '/components/KContextmenu'
			},
			{
				text: 'Icon',
				link: '/components/KIcon'
			},
			{
				text: 'Link',
				link: '/components/KLink'
			}
		]
	},
	{
		text: 'Layout',
		collapsed: false,
		items: [
			{
				text: 'Grid',
				link: '/components/KGrid'
			},
			{
				text: 'Layout',
				link: '/components/KLayout'
			},
			{
				text: 'Divider',
				link: '/components/KDivider'
			}
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
				text: 'From',
				link: '/components/KForm'
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
				text: 'Radio',
				link: '/components/KRadio'
			},
			{
				text: 'Rate',
				link: '/components/KRate'
			},
			{
				text: 'Select',
				link: '/components/KSelect'
			},
			{
				text: 'Slider',
				link: '/components/KSlider'
			}
		]
	},
	{
		text: 'Data',
		collapsed: false,
		items: [
			{
				text: 'Avatar',
				link: '/components/KAvatar'
			},
			{
				text: 'Badge',
				link: '/components/KBadge'
			},
			{
				text: 'Card',
				link: '/components/KCard'
			},
			{
				text: 'Collapse',
				link: '/components/KCollapse'
			},
			{
				text: 'Descriptions',
				link: '/components/KDescriptions'
			},
			{
				text: 'Ellipsis',
				link: '/components/KEllipsis'
			},
			{
				text: 'Empty',
				link: '/components/KEmpty'
			},
			{
				text: 'Infinite',
				link: '/components/KInfinite'
			},
			{
				text: 'Tag',
				link: '/components/KTag'
			},
			{
				text: 'Pagination',
				link: '/components/KPagination'
			},
			{
				text: 'Progress',
				link: '/components/KProgress'
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
				text: 'VirtualList',
				link: '/components/KVirtualList'
			}
		]
	},
	{
		text: 'Navigation',
		collapsed: false,
		items: [
			{
				text: 'Breadcrumb',
				link: '/components/KBreadcrumb'
			},
			{
				text: 'Backtop',
				link: '/components/KBacktop'
			}
		]
	},
	{
		text: 'Feedback',
		collapsed: false,
		items: [
			{
				text: 'Alert',
				link: '/components/KAlert'
			},
			{
				text: 'Notification',
				link: '/components/KNotification'
			},
			{
				text: 'Message',
				link: '/components/KMessage'
			},
			{
				text: 'MessageBox',
				link: '/components/KMessageBox'
			},
			{
				text: 'Drawer',
				link: '/components/KDrawer'
			},
			{
				text: 'Modal',
				link: '/components/KModal'
			},
			{
				text: 'Spin',
				link: '/components/KSpin'
			},
			{
				text: 'Popconfirm',
				link: '/components/KPopconfirm'
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
const theme = [
	{
		text: 'Basic',
		link: '/theme/Basic'
	},
	{
		text: 'Preset Api',
		link: '/theme/Api'
	},
	{
		text: 'Advanced',
		link: '/theme/Advanced'
	}
];

const sidebar = {
	'/guide': [
		{
			text: 'Developer Guide',
			items: guides
		}
	],
	'/components': components,
	'/theme': theme
};

const head = [
	['meta', { property: 'og:title', content: 'ikun-ui' }],
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
	{ text: 'Theme', items: theme }
] as DefaultTheme.NavItem[];
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
