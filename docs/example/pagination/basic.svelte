<script lang="ts">
	import KPagination from '@ikun-ui/pagination';
	let currentPage = 1;
	const handlePage = (e: CustomEvent) => {
		currentPage = e.detail;
	};
</script>

<KPagination total={500} on:currentChange={handlePage} {currentPage}></KPagination>
