<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
</script>

<p>Trigger is click</p>
<KCarousel count={6} initialIndex={0} autoplay={false} trigger="click">
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>0</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>1</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>2</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>3</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>4</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>5</h1></div>
</KCarousel>

<p>Trigger is hover</p>
<KCarousel count={6} initialIndex={1} autoplay={false} trigger="hover">
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>0</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>1</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>2</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>3</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>4</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>5</h1></div>
</KCarousel>
