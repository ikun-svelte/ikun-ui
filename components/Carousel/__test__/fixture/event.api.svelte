<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
	let res = '';
	const handleChange = (e: CustomEvent) => {
		res = JSON.stringify(e.detail);
	};

	let KCarouselRef: any = null;
	const handleClick = (type: 'next' | 'prev') => {
		type === 'prev' ? KCarouselRef.prev() : KCarouselRef.next();
	};
	function handleGoto() {
		KCarouselRef.goto(2);
	}
</script>

<KCarousel
	autoplay={false}
	count={3}
	bind:this={KCarouselRef}
	on:change={handleChange}
	initialIndex={1}
>
	<div style:height="280px" class="bg-green-400/15"></div>
	<div style:height="280px" class="bg-red-500/15"></div>
	<div style:height="280px" class="bg-blue-600/15"></div>
</KCarousel>
<div>{res}</div>
<button id="btn_goto" on:click={handleGoto}>goto</button>
<button id="btn_prev" on:click={() => handleClick('prev')}>prev</button>
<button id="btn_next" on:click={() => handleClick('next')}>next</button>
