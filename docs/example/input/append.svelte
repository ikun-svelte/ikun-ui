<script>
	import { KInput } from '@ikun-ui/input';
	let value = '';
	const onInput = (e) => {
		value = e.detail;
	};
</script>

<KInput
	placeholder="Please input value"
	append="i-carbon-logo-vue"
	on:input={onInput}
	{value}
	cls="mx-2"
></KInput>

<KInput
	placeholder="Please input value"
	prepend="i-carbon-logo-svelte"
	on:input={onInput}
	{value}
	cls="m-2"
></KInput>

<KInput
	placeholder="Please input value"
	append="i-carbon-logo-vue"
	prepend="i-carbon-logo-svelte"
	on:input={onInput}
	{value}
	cls="mx-2"
></KInput>
