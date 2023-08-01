import theme from 'vitepress/theme'
import { h } from 'vue'
import DemoBlock from '../components/demo-block'
import './style.css'
import 'uno.css'

export default {
	...theme,
	enhanceApp({ app }) {
		app.component('Demo', DemoBlock)
	},
	Layout() {
		return h(theme.Layout)
	},
}
