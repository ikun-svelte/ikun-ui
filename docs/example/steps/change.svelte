<script>
	import { KSteps } from '@ikun-ui/steps';
	import { KButton } from '@ikun-ui/button';
	let active = 2;
	const items = [
		{
			index: 1,
			title: 'title 1',
			description: 'description 1'
		},
		{
			index: 2,
			title: 'title 2',
			description: 'description 2'
		},
		{
			index: 3,
			title: 'title 3',
			subTitle: 'sub title 3',
			description: 'description 3'
		}
	];
	const handleChange = (e) => {
		active = e.detail.index;
	};
</script>

<KSteps on:change={handleChange} canClick {items} {active}></KSteps>
<p>current: {active}</p>
<div class="flex">
	<KButton ghost on:click={() => active--}>prev</KButton>
	<KButton on:click={() => active++}>next</KButton>
</div>
