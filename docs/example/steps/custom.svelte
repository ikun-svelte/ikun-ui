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
		}
	];

	function handleChange(e: CustomEvent) {
		active = e.detail.index;
	}

	// labelPlacement="vertical"
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
			<div class="custom-icon" slot="icon">🏀</div>
			<div class="custom-title" slot="title">{item.title} 💃</div>
			<div slot="subTitle" class="custom-sub-title">
				{#if index === 1}
					{item.subTitle} 🎤
				{/if}
			</div>
			<div slot="description">{item.description} 🤟</div>
		</KStep>
	{/each}
</KSteps>

<style>
	.custom-icon {
		--at-apply: flex justify-center items-center w-32px h-32px;
	}
	.custom-title {
		--at-apply: inline;
	}
	.custom-sub-title {
		--at-apply: inline;
	}
</style>
