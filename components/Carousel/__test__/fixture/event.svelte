<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
	let res = '';
	const handleChange = (e: CustomEvent) => {
		res = JSON.stringify(e.detail);
	};
</script>

<KCarousel
	autoplay={false}
	count={3}
	arrow="always"
	trigger="click"
	on:change={handleChange}
	initialIndex={1}
>
	<div style:height="280px" class="bg-green-400/15"></div>
	<div style:height="280px" class="bg-red-500/15"></div>
	<div style:height="280px" class="bg-blue-600/15"></div>
</KCarousel>
<div>{res}</div>
