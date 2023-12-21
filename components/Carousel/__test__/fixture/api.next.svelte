<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
	let KCarouselRef: any = null;
	const handleClick = () => {
		KCarouselRef.next();
	};
</script>

<KCarousel autoplay={false} count={3} bind:this={KCarouselRef} initialIndex={1}>
	<div style:height="280px" class="bg-green-400/15"></div>
	<div style:height="280px" class="bg-red-500/15"></div>
	<div style:height="280px" class="bg-blue-600/15"></div>
</KCarousel>
<button on:click={handleClick}>next</button>
