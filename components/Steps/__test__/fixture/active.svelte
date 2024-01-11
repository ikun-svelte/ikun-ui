<script>
	import { KSteps } from '@ikun-ui/steps';
	let active = 2;
	const items = [
		{
			index: 1,
			title: 'title 1',
			subTitle: 'sub title 1',
			description: 'description 1',
			status: 'error'
		},
		{
			index: 2,
			title: 'title 2',
			subTitle: 'sub title 2',
			description: 'description 2'
		},
		{
			index: 3,
			title: 'title 3',
			subTitle: 'sub title 3',
			description: 'description 3',
			status: 'finish'
		},
		{
			index: 4,
			title: 'title 4',
			subTitle: 'sub title 4',
			description: 'description 4'
		}
	];
</script>

<KSteps {items} on:change={(e) => (active = e.detail.index)} {active}></KSteps>
<button on:click={() => (active = 4)}>next</button>
<p id="test_active">{active}</p>
