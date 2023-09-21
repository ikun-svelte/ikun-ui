<script>
	import { KInput } from '@ikun-ui/input';
	import { KMessage } from '@ikun-ui/message';
	let value = '';
	const onSearch = (e) => {
		KMessage({
			content: `search: ${e.detail}`,
			type: 'success'
		});
	};
</script>

<KInput
	placeholder="Please input value"
	append="i-carbon-search"
	on:search={onSearch}
	{value}
	search
	cls="mx-2"
></KInput>
<p class="px-2">{value}</p>
