<script lang="ts">
	import KPagination from '@ikun-ui/pagination';
	let currentPage = 1;
	const handlePage = (e: CustomEvent) => {
		currentPage = e.detail;
	};
</script>

<KPagination
	total={50}
	cls="mb-2"
	pagerCount={5}
	nextText="next"
	prevText="prev"
	on:currentChange={handlePage}
	{currentPage}
></KPagination>

<KPagination
	total={50}
	pagerCount={5}
	nextIcon="i-carbon-logo-svelte"
	prevIcon="i-carbon-logo-vue"
	isBg
	on:currentChange={handlePage}
	{currentPage}
></KPagination>
