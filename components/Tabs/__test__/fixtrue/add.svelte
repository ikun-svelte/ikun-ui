<script lang="ts">
	import { KTabsPane, KTabs } from '@ikun-ui/tabs';
	import { tick } from 'svelte';
	let value = '1';

	let navOptions = [
		{
			label: 'label1',
			value: 'In the spring I saw the earth recovery and all things grow',
			uid: '1'
		},
		{
			label: 'label2',
			value: 'In the summer I saw the willow branches danced in the air Lotus blossom',
			uid: '2'
		},
		{ label: 'label3', value: 'In the autumn I saw the fruit is ripe eyeful golden', uid: '3' },
		{
			label: 'label4',
			value: 'In the winter I saw the snow in succession and the land is silver',
			uid: '4'
		}
	];

	let index = 4;
	const handleAddTab = async () => {
		index++;
		navOptions = [
			...navOptions,
			{
				label: `label${index}`,
				value: `value${index}`,
				uid: `${index}`
			}
		];
		await tick();
		value = `${index}`;
	};
</script>

<KTabs editable type="border" on:add={handleAddTab} {navOptions} {value}>
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
<p data-test-id="result">{value}</p>
