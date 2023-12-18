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
			closeable: false,
			uid: '1'
		},
		{
			label: 'label2',
			value: 'label2',
			uid: '2'
		}
	];
	const trigger = () => (value = '1');
</script>

<KTabs {navOptions} closeable on:click={handleClick} {value}>
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
<button on:click={trigger}></button>
