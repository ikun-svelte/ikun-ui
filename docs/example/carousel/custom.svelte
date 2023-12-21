<script lang="ts">
	import { KCarousel, KCarouselArrow, KIndicators } from '@ikun-ui/carousel';
	import { clsx } from 'clsx';

	$: itemCls = (index: number, activeIndex: number) =>
		clsx(`demo-carousel-item`, {
			[`demo-carousel-item--active`]: activeIndex === index
		});
</script>

<KCarousel style="height: 300px" count={6} initialIndex={0} autoplay={true}>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>0</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>1</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>2</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>3</h1></div>
	<div style:height="280px" class="bg-orange-100 fcc text-black"><h1>4</h1></div>
	<div style:height="280px" class="bg-orange-200 fcc text-black"><h1>5</h1></div>
	<div slot="indicators" let:onChange let:defaultPageIndex let:count let:trigger>
		<KIndicators cls="demo-indicators" {count} {trigger} {defaultPageIndex} on:change={onChange}>
			<div slot="item" let:hoverJump let:clickJump let:activeIndex class="flex">
				{#each [...Array(count).keys()] as item}
					<div
						class={itemCls(item, activeIndex)}
						role="button"
						aria-hidden="true"
						on:mouseenter={() => hoverJump(item)}
						on:click={() => clickJump(item)}
					></div>
				{/each}
			</div>
		</KIndicators>
	</div>
	<div slot="arrow" class="flex" let:show let:loop let:onChange let:defaultPageIndex let:count>
		<KCarouselArrow {show} {loop} {defaultPageIndex} on:change={onChange} {count}>
			<div
				aria-hidden="true"
				class="ml-10px cursor-pointer"
				slot="prev"
				let:gotoPrev
				on:click={gotoPrev}
			>
				🏀
			</div>
			<div
				aria-hidden="true"
				class="mr-10px cursor-pointer"
				slot="next"
				let:gotoNext
				on:click={gotoNext}
			>
				🏀
			</div>
		</KCarouselArrow>
	</div>
</KCarousel>

<style>
	:global(.demo-indicators) {
		--at-apply: -bottom-2px;
	}
	.demo-carousel-item {
		--at-apply: bg-orange-400 w-26px h-8px mx-2px rounded cursor-pointer;
	}
	.demo-carousel-item--active {
		--at-apply: bg-orange-600;
	}
</style>
