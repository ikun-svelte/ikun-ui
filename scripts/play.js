/**
 * Create play template
 */
import * as fs from 'fs';
const PLAY_PATH = 'play/src/routes';
const content = `<script lang="ts">
import 'virtual:uno.css';
import { KButton } from '@ikun-ui/button'
</script>
<KButton type="info" cls="mx-2">
info
</KButton>
`;
function createPlayTemplate() {
	if (!fs.existsSync(`${PLAY_PATH}/+page.svelte`)) {
		fs.mkdirSync(PLAY_PATH, { recursive: true });
		fs.writeFile(`${PLAY_PATH}/+page.svelte`, content, (err) => {
			if (err) {
				console.error('Error writing file:', err);
			} else {
				console.log(`File +page.svelte has been created with the specified content.`);
			}
		});
	}
}
createPlayTemplate();
