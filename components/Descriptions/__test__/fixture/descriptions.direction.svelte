<script>
	import { KDescriptions } from '@ikun-ui/descriptions';
	import { KDescriptionsItem } from '@ikun-ui/descriptions-item';

	let direction = 'horizontal';

	function changeDirection() {
		direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
	}
</script>

<KDescriptions {direction}>
	<KDescriptionsItem label="name">IKun</KDescriptionsItem>
	<KDescriptionsItem label="phone">18868686868</KDescriptionsItem>
	<KDescriptionsItem label="age">1</KDescriptionsItem>
</KDescriptions>

<div id="show-direction">{direction}</div>
<button on:click={changeDirection}>change direction</button>
