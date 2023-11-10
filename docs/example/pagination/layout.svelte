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
	size="sm"
	pagerCount={5}
	layout={['jumper', 'pager', 'total', 'sizes']}
	on:currentChange={handlePage}
	{currentPage}
></KPagination>

<KPagination
	total={50}
	pagerCount={5}
	size="sm"
	isBg
	layout={['total', 'pager', 'jumper', 'sizes']}
	on:currentChange={handlePage}
	{currentPage}
></KPagination>
