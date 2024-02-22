<script>
	import { KAutoComplete } from '../../src/index';
	const handleInput = (event) => {
		value = event.detail;
	};

	let value = 'vue';
	const restaurants = [
		{
			value: 'vuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevue',
			link: 'https://github.com/vuejs/vue'
		},
		{ value: 'element', link: 'https://github.com/ElemeFE/element' },
		{ value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
		{ value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
		{ value: 'vuex', link: 'https://github.com/vuejs/vuex' },
		{ value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
		{ value: 'babel', link: 'https://github.com/babel/babel' }
	];
	const createFilter = (queryString) => {
		return (restaurant) => {
			return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
		};
	};
	const fetchFn = (queryString, cb) => {
		const results = queryString ? restaurants.filter(createFilter(queryString)) : restaurants;
		cb(results);
	};
</script>

<KAutoComplete
	{value}
	append="i-carbon-logo-svelte"
	prepend="i-carbon-search"
	placeholder="please select"
	let:data
	fitInputWidth
	on:updateValue={handleInput}
	fetchSuggestions={fetchFn}
>
	<div>test {data.label}</div>
</KAutoComplete>
