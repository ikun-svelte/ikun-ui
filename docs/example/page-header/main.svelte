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

<KPageHeader on:back={goBack}>
	<span class="text-large font-600 mr-3 dark:text-white" slot="content"> Title </span>
	<div class="p-2">
		A lady’s imagination is very rapid; it jumps from admiration to love, from love to matrimony in
		a moment.
	</div>
</KPageHeader>
