import theme from 'vitepress/theme';
import { h } from 'vue';
// import DemoBlock from '../components/demo-block';
// import { highlight } from '../components/highlight';
import './style.css';
import 'uno.css';

export default {
	...theme,
	enhanceApp({ app }) {
		// app.component('Demo', DemoBlock);
		// app.component('highlight', highlight);
	},
	Layout() {
		return h(theme.Layout);
	}
};
