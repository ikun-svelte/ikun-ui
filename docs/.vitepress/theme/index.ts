import theme from 'vitepress/theme';
import { h } from 'vue';
import DemoBlock from '../components/demo-block';
import { highlight } from '../components/highlight';
import ThemeColor from '../components/theme-color';
import './style.css';
import 'uno.css';

export default {
	...theme,
	enhanceApp({ app }) {
		app.component('Demo', DemoBlock);
		app.component('highlight-code', highlight);
		app.component('theme-color', ThemeColor);
	},
	Layout() {
		return h(theme.Layout);
	}
};
