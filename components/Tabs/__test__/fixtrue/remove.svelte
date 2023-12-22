<script lang="ts">
	import { KTabsPane, KTabs } from '@ikun-ui/tabs';
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
		eventValue = JSON.stringify(e.detail);
		navOptions = [...navOptions.filter((_, index) => index !== e.detail.index)];
	};

	const handleChange = (e: CustomEvent) => {
		value = e.detail.uid;
	};
</script>

<KTabs {navOptions} closeable {value} on:remove={handleRemove} on:change={handleChange}>
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
<p data-test-id="result">{value}</p>
<p data-test-id="event">{eventValue}</p>
