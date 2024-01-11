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
			description: 'description 3'
		}
	];

	const handleChange = (e) => {
		active = e.detail.index;
	};
</script>

<KSteps on:change={handleChange} canClick navigation {items} {active}></KSteps>
<KSteps on:change={handleChange} canClick navigation {items} {active} direction="vertical"></KSteps>
<KSteps
	on:change={handleChange}
	canClick
	navigation
	{items}
	{active}
	labelPlacement="vertical"
></KSteps>
