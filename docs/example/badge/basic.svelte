<script>
	import { KButton } from '@ikun-ui/button';
	import { KBadge } from '@ikun-ui/badge';

	let count = 12;
</script>

<KBadge value={count} cls="mr-40px">
	<KButton on:click={() => count++}>🐔太美</KButton>
</KBadge>

<KBadge value={666} type="warning" cls="mr-40px">
	<KButton type="error">卤出鸡脚了吧</KButton>
</KBadge>

<KBadge value="666" type="primary" hidden cls="mr-40px">
	<KButton type="warning">看不见我</KButton>
</KBadge>
