<script>
	import { KSteps } from '@ikun-ui/steps';
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
</script>

<KSteps {items} {active} labelPlacement="vertical"></KSteps>
