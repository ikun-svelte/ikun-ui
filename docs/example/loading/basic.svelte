<script>
	import { KLoading } from '@ikun-ui/loading';
	import { KButton } from '@ikun-ui/button';
	const loadingOptions = {
		show: false,
		text: 'loading...'
	};

	const handleLoading = () => {
		loadingOptions.show = true;
		setTimeout(() => {
			loadingOptions.show = false;
		}, 3000);
	};
</script>

<div use:KLoading={loadingOptions} class="w-full h-200px">
	<KButton on:click={handleLoading}>Loading</KButton>
</div>
