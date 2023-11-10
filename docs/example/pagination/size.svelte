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
	isBg
	size="sm"
	on:currentChange={handlePage}
	{currentPage}
></KPagination>

<KPagination
	total={50}
	pagerCount={5}
	cls="mb-2"
	isBg
	on:currentChange={handlePage}
	{currentPage}
></KPagination>

<KPagination
	total={50}
	pagerCount={5}
	isBg
	size="lg"
	on:currentChange={handlePage}
	{currentPage}
></KPagination>
