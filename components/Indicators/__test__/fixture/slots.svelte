<script lang="ts">
	import { KIndicators } from '@ikun-ui/indicators';
	let index = 0;
</script>

<KIndicators count={6} defaultPageIndex={index} on:change={(e) => (index = e.detail.index)}>
	<div slot="item" let:activeIndex>{activeIndex}</div>
</KIndicators>
