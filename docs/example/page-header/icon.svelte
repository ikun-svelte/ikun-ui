<script lang="ts">
	import { KPageHeader } from '@ikun-ui/page-header';
	import { KMessage } from '@ikun-ui/message';
	const goBack = () => {
		KMessage({
			content: 'go back !! 🎯',
			type: 'success'
		});
	};
</script>

<KPageHeader on:back={goBack} icon="i-carbon-logo-vue">
	<span class="text-large font-600 mr-3 dark:text-white" slot="content"> Title </span>
</KPageHeader>
