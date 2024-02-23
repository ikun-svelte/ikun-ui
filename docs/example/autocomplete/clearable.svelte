<script>
	import { KAutoComplete } from '@ikun-ui/auto-complete';
	let value = 'svelte';
	const list = [
		{ value: 'svelte', link: 'https://svelte.dev/' },
		{ value: 'svelte-kit', link: 'https://kit.svelte.dev/' },
		{ value: 'ikun-ui', link: 'https://github.com/ikun-svelte/ikun-ui' },
		{ value: 'ikun', link: 'https://www.weibo.com/p/1005052839635900/photos?from=page_100505' }
	];

	const createFilter = (queryString) => {
		return (list) => {
			return list.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
		};
	};
	const fetchFn = (queryString, cb) => {
		const results = queryString ? list.filter(createFilter(queryString)) : list;
		cb(results);
	};

	const doUpdate = (e) => {
		value = e.detail;
	};
</script>

<KAutoComplete
	clsInput="w-300px"
	{value}
	clearable
	triggerOnFocus
	on:updateValue={doUpdate}
	fetchSuggestions={fetchFn}
></KAutoComplete>

<div class="mt-2">{value}</div>
