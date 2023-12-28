<script lang="ts">
	import { KPageHeader } from '@ikun-ui/page-header';
	import { KMessage } from '@ikun-ui/message';
	import { KBreadcrumb } from '@ikun-ui/breadcrumb';
	import { KBreadcrumbItem } from '@ikun-ui/breadcrumb-item';
	const goBack = () => {
		KMessage({
			content: 'go back !! 🎯',
			type: 'success'
		});
	};
</script>

<KPageHeader on:back={goBack}>
	<span class="text-large font-600 mr-3 dark:text-white" slot="content"> Title </span>
	<KBreadcrumb separator="/" slot="breadcrumb">
		<KBreadcrumbItem href="/">ikun ui</KBreadcrumbItem>
		<KBreadcrumbItem href="/">components</KBreadcrumbItem>
		<KBreadcrumbItem>pager header</KBreadcrumbItem>
	</KBreadcrumb>
</KPageHeader>
