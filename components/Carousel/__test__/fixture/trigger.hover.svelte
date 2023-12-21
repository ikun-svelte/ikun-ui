<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
</script>

<KCarousel autoplay={false} trigger="hover" count={3} initialIndex={1}>
	<div style:height="280px" class="bg-green-400/15"></div>
	<div style:height="280px" class="bg-red-500/15"></div>
	<div style:height="280px" class="bg-blue-600/15"></div>
</KCarousel>
