<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
</script>

<KCarousel test-id="loop_open" loop arrow="always" autoplay={false} count={3} initialIndex={2}>
	<div style:height="280px" class="bg-green-400/15"></div>
	<div style:height="280px" class="bg-red-500/15"></div>
	<div style:height="280px" class="bg-blue-600/15"></div>
</KCarousel>

<KCarousel
	test-id="loop_close"
	loop={false}
	arrow="always"
	autoplay={false}
	count={3}
	initialIndex={2}
>
	<div style:height="280px" class="bg-green-400/15"></div>
	<div style:height="280px" class="bg-red-500/15"></div>
	<div style:height="280px" class="bg-blue-600/15"></div>
</KCarousel>
