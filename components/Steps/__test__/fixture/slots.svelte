<script lang="ts">
	import { KSteps, KStep } from '@ikun-ui/steps';
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

	function handleChange(e: CustomEvent) {
		active = e.detail.index;
	}
</script>

<KSteps {items} canClick {active}>
	{#each items as item, index}
		<KStep
			on:change={handleChange}
			{item}
			eachIndex={index + 1}
			{active}
			canClick
			last={index === items.length - 1}
			index={item.index}
		>
			<div slot="icon">🏀</div>
			<div slot="title">{item.title} 💃</div>
			<div slot="subTitle">{item.subTitle} 🎤</div>
			<div slot="description">{item.description} 🤟</div>
		</KStep>
	{/each}
</KSteps>
