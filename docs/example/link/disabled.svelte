<script lang="ts">
	import { KLink } from '@ikun-ui/link';
	const url = 'https://github.com/ikun-svelte/ikun-ui';
</script>

<div class="demo-link">
	<KLink disabled href={url} target="_blank">default</KLink>
	<KLink disabled href={url} target="_blank" type="success">success</KLink>
	<KLink disabled href={url} target="_blank" type="warning">warning</KLink>
	<KLink disabled href={url} target="_blank" type="error">error</KLink>
	<KLink disabled href={url} target="_blank" type="primary">primary</KLink>
	<KLink disabled href={url} target="_blank" type="info">info</KLink>
</div>
