<script lang="ts">
	import { KTabsPane, KTabs } from '@ikun-ui/tabs';
	import { tick } from 'svelte';
	let value = '2';
	let eventValue = '';
	let navOptions = [
		{
			label: 'label1',
			value: 'label1',
			uid: '1'
		},
		{
			label: 'label2',
			value: 'label2',
			uid: '2'
		}
	];

	const handleRemove = (e: CustomEvent) => {
		navOptions = [...navOptions.filter((_, index) => index !== e.detail.index)];
	};

	const handleChange = (e: CustomEvent) => {
		value = e.detail.uid;
	};

	const handleEdit = (e: CustomEvent) => {
		eventValue = JSON.stringify(e.detail);
	};
	let index = 2;
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

<KTabs
	{navOptions}
	editable
	{value}
	eventValue="JSON.stringify(e.detail)"
	on:remove={handleRemove}
	on:edit={handleEdit}
	on:add={handleAddTab}
	on:change={handleChange}
>
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
<p data-test-id="result">{value}</p>
<p data-test-id="event">{eventValue}</p>
