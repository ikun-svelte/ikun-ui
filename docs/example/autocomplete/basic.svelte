<script>
	import { KAutoComplete } from '@ikun-ui/auto-complete';
	import { KCol, KRow } from '@ikun-ui/grid';
	import { KDivider } from '@ikun-ui/divider';
	let value = '';
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

<KRow gutter={20}>
	<KCol span={12}>
		<KDivider contentPosition="center">Trigger input suggestions while typing</KDivider>
		<KAutoComplete clsInput="w-300px" {value} on:updateValue={doUpdate} fetchSuggestions={fetchFn}
		></KAutoComplete>
	</KCol>
	<KCol span={12}>
		<KDivider contentPosition="center">Trigger input suggestions when focused</KDivider>
		<KAutoComplete
			clsInput="w-300px"
			{value}
			triggerOnFocus
			on:updateValue={doUpdate}
			fetchSuggestions={fetchFn}
		></KAutoComplete>
	</KCol>
</KRow>

<div class="mt-2">{value}</div>
