<script>
	import { KButton } from '@ikun-ui/button';
	import { KBadge } from '@ikun-ui/badge';

	let count = 12;
</script>

<KBadge value={count} max={12} cls="mr-40px">
	<KButton on:click={() => count++}>让我怎么荔枝</KButton>
</KBadge>

<KBadge value={666} max={25} type="warning" cls="mr-40px">
	<KButton type="info">小黑子</KButton>
</KBadge>
