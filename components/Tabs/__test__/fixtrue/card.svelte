<script lang="ts">
	import { KTabsPane, KTabs } from '@ikun-ui/tabs';
	let value = '2';
	const handleClick = (e: CustomEvent) => {
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

<KTabs {navOptions} on:click={handleClick} {value} type="card">
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
