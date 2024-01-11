<script lang="ts">
	import { KSteps } from '@ikun-ui/steps';
	let active = 2;
	const items = [
		{
			index: 1,
			title: 'title 1',
			subTitle: 'sub title 1',
			description: 'description 1'
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
			description: 'description 3'
		},
		{
			index: 4,
			title: 'title 4',
			subTitle: 'sub title 4',
			description: 'description 4'
		}
	];

	let dot = true;
</script>

<KSteps
	{items}
	canClick
	{dot}
	navigation
	direction="vertical"
	on:change={(e) => (active = e.detail.index)}
	{active}
></KSteps>

<KSteps
	{items}
	canClick
	cls="my-8"
	{dot}
	navigation
	direction="horizontal"
	on:change={(e) => (active = e.detail.index)}
	{active}
></KSteps>

<KSteps
	{items}
	canClick
	{dot}
	navigation
	labelPlacement="vertical"
	on:change={(e) => (active = e.detail.index)}
	{active}
></KSteps>
