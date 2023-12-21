<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
</script>

<KCarousel count={6} initialIndex={0} autoplay={false}>
	<div style:height="180px" class="bg-orange-100 fcc text-black"><h1>0</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>1</h1></div>
	<div style:height="380px" class="bg-orange-100 fcc text-black"><h1>2</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>3</h1></div>
	<div style:height="180px" class="bg-orange-100 fcc text-black"><h1>4</h1></div>
	<div style:height="380px" class="bg-orange-200 fcc text-black"><h1>5</h1></div>
</KCarousel>
