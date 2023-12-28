<script lang="ts">
	import { KPageHeader } from '@ikun-ui/page-header';
	import { KMessage } from '@ikun-ui/message';
	import { KAvatar } from '@ikun-ui/avatar';
	import { KTag } from '@ikun-ui/tag';
	import { KButton } from '@ikun-ui/button';
	import { KBreadcrumb } from '@ikun-ui/breadcrumb';
	import { KBreadcrumbItem } from '@ikun-ui/breadcrumb-item';
	const goBack = () => {
		KMessage({
			content: 'go back !! 🎯',
			type: 'success'
		});
	};
	const src = 'https://ikun-ui.netlify.app/logo.svg';
</script>

<KPageHeader on:back={goBack}>
	<KBreadcrumb separator="/" slot="breadcrumb">
		<KBreadcrumbItem href="/">ikun ui</KBreadcrumbItem>
		<KBreadcrumbItem href="/">components</KBreadcrumbItem>
		<KBreadcrumbItem>pager header</KBreadcrumbItem>
	</KBreadcrumb>
	<div class="fcc" slot="content">
		<KAvatar {src} size="30px" radius="50%"></KAvatar>
		<KTag type="info" cls="mx-2" icon="i-carbon-settings" closeIcon="i-carbon-close-outline">
			千军万马是 ikun,ikun 永远爱坤坤
		</KTag>
	</div>
	<div class="fcc" slot="extra">
		<KButton type="primary">Confirm</KButton>
		<KButton type="primary" ghost>Edit</KButton>
	</div>
	<div class="p-2">
		A lady’s imagination is very rapid; it jumps from admiration to love, from love to matrimony in
		a moment.
	</div>
</KPageHeader>
