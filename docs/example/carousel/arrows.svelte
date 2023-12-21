<script lang="ts">
	import { KCarousel } from '@ikun-ui/carousel';
</script>

<p>Trigger is always</p>
<KCarousel count={6} initialIndex={0} arrow="always">
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>0</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>1</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>2</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>3</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>4</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>5</h1></div>
</KCarousel>

<p>Arrow is hover</p>
<KCarousel count={6} initialIndex={1} arrow="hover">
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>0</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>1</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>2</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>3</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>4</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>5</h1></div>
</KCarousel>

<p>Arrow is never</p>
<KCarousel count={6} initialIndex={0} arrow="never">
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>0</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>1</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>2</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>3</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>4</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>5</h1></div>
</KCarousel>
