<script>
	import KSelect from '@ikun-ui/select';
	let value = 'item 11';
	const onSelect = (e) => {
		value = e.detail;
	};
	let states = [];
	for (let i = 0; i < 200; i++) {
		states.push(`item ${i}`);
	}

	const search = (params, cb) => {
		setTimeout(() => {
			if (states.includes(params)) {
				cb(states);
			} else {
				cb([]);
			}
		}, 1000);
	};
</script>

<KSelect {value} remote={search} on:updateValue={onSelect}></KSelect>
<p class="px-2">{JSON.stringify(value)}</p>
