<script>
	import KSelect from '@ikun-ui/select';
	let value = {
		label: 'Connecticut',
		value: 'Connecticut',
		id: 'Connecticut',
	}
	const onSelect = (e) => {
		value = e.detail
	}
	const states = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
	]
	const search = (params, cb) => {
		setTimeout(() => {
			if(states.includes(params)){
				cb(states.map(v => {
					return {
						label: v,
						value: v,
						id: v
					}
				}))
			}else {
				cb([])
			}

		}, 1)
	}
</script>

<KSelect value={value}
				 remote={search}
				 on:updateValue={onSelect}>
</KSelect>
<span id="k_select_remote">{JSON.stringify(value)}</span>
