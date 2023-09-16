<script>
	import KPopover from '../src';
	import { createEventDispatcher } from 'svelte';
	const dispatcher = createEventDispatcher();
	const handleChange = (e) => {
		dispatcher('change', e.detail);
	};
</script>

<KPopover placement="bottom" on:change={handleChange}>
	<div slot="triggerEl" cls="mx-2">top</div>
	<div slot="contentEl" class="flex flex-col">
		<p class="!my-2">有美一人，清扬婉兮</p>
	</div>
</KPopover>
