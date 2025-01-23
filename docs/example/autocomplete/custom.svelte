<script>
	import { KAutoComplete } from '@ikun-ui/auto-complete';
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

<KAutoComplete
	clsInput="w-300px"
	{value}
	let:label
	let:data
	let:isActive
	let:onSelect
	triggerOnFocus
	on:updateValue={doUpdate}
	fetchSuggestions={fetchFn}
>
	<div
		on:click={onSelect(data)}
		class={`${
			isActive ? 'text-ikun-main' : ''
		} cursor-pointer flex px-2 py-1 h-32px hover:(bg-ikun-main text-white)`}

	>
		🎯{label}🤡
	</div>
</KAutoComplete>

<div class="mt-2">{value}</div>
