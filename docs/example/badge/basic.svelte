<script>
	import { KButton } from '@ikun-ui/button';
	import { KBadge } from '@ikun-ui/badge';

	let count = 12;
</script>

<KBadge value={count} cls="mr-40px">
	<KButton on:click={() => count++}>Chicken So Beautiful</KButton>
</KBadge>

<KBadge value={66} type="warning" cls="mr-40px">
	<KButton type="error">Chicken Feet Marinated</KButton>
</KBadge>

<KBadge value="666" type="primary" show={false} cls="mr-40px">
	<KButton type="warning">Can't See Me</KButton>
</KBadge>
