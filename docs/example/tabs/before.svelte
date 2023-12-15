<script lang="ts">
	import { KTabsPane, KTabs } from '@ikun-ui/tabs';
	import { KNotify } from '@ikun-ui/notify';
	let value = '1';
	const handleClick = (e) => {
		value = e.detail.uid;
	};

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
	async function onLeave(oldActiveTabValue, activeTabValue) {
		if (activeTabValue === '2') {
			KNotify({
				title: 'warning',
				content: "label2 can't switch",
				type: 'warning'
			});
			return false;
		}
		return true;
	}
</script>

<KTabs {navOptions} beforeLeave={onLeave} on:click={handleClick} {value}>
	{#each navOptions as option (option.uid)}
		<KTabsPane uid={option.uid}>
			<h1 class="py-30px">{option.value}</h1>
		</KTabsPane>
	{/each}
</KTabs>
