<script lang="ts">
	import { KPageHeader } from '@ikun-ui/page-header';
	import { KMessage } from '@ikun-ui/message';
	import { KAvatar } from '@ikun-ui/avatar';
	import { KTag } from '@ikun-ui/tag';
	import { KButton } from '@ikun-ui/button';
	const goBack = () => {
		KMessage({
			content: 'go back !! 🎯',
			type: 'success'
		});
	};
	const src = 'https://ikun-ui.netlify.app/logo.svg';
</script>

<KPageHeader on:back={goBack}>
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
</KPageHeader>
