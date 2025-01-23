<script lang="ts">
	import { KTabsPane, KTabs } from '@ikun-ui/tabs';
	import { tick } from 'svelte';
	let value = '2';
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

	let tabRef: any = null;
	let index = 2;
	const doAdd = async () => {
		index++;
		await tabRef.addTab();
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

<KTabs {navOptions} bind:this={tabRef} {value}>
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
<button id="add_btn" on:click={doAdd}>add</button>
<p data-test-id="result">{value}</p>
