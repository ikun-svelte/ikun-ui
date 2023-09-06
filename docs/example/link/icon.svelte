<script lang="ts">
	import { KLink } from '@ikun-ui/link';
	import { KIcon } from '@ikun-ui/icon';
	const url = 'https://github.com/ikun-svelte/ikun-ui';
</script>

<div class="demo-link">
	<div>
		<KLink href={url} target="_blank" type="success" icon="i-carbon-logo-vue">vue</KLink>
		<KLink href={url} target="_blank" type="error" icon="i-carbon-logo-svelte">svelte</KLink>
		<KLink href={url} target="_blank" type="primary" icon="i-carbon-logo-react">react</KLink>
	</div>
	<div>
		<KLink href={url} target="_blank" type="success">
			vue
			<KIcon icon="i-carbon-logo-vue" width="auto" height="auto" slot="icon"></KIcon>
		</KLink>
		<KLink href={url} target="_blank" type="error">
			svelte
			<KIcon icon="i-carbon-logo-svelte" width="auto" height="auto" slot="icon"></KIcon>
		</KLink>
		<KLink href={url} target="_blank" type="primary">
			react
			<KIcon icon="i-carbon-logo-react" width="auto" height="auto" slot="icon"></KIcon>
		</KLink>
	</div>
</div>
