<script lang="ts">
	import { KTabsPane, KTabs } from '@ikun-ui/tabs';
	let value = '2';
	let eventValue = '';
	const handleClick = (e: CustomEvent) => {
		eventValue = JSON.stringify(e.detail);
		value = e.detail.uid;
	};

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
</script>

<KTabs {navOptions} on:click={handleClick} {value}>
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
<p data-test-id="result">{value}</p>
<p data-test-id="event">{eventValue}</p>
