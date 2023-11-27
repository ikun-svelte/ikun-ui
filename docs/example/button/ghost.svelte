<script>
	import { KButton } from '@ikun-ui/button';
</script>

<div class="flex items-center flex-wrap">
	<KButton type="info" cls="mx-2" ghost={true}>info</KButton>
	<KButton type="error" cls="mx-2" ghost={true}>error</KButton>
	<KButton type="success" cls="mx-2" ghost={true}>success</KButton>
	<KButton type="primary" cls="mx-2" ghost={true}>primary</KButton>
	<KButton type="warning" cls="mx-2" ghost={true}>warning</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" cls="mx-2" ghost={true}>settings</KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" cls="mx-2" ghost={true}>svelte</KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" cls="mx-2" ghost={true}>wechat</KButton>
	<KButton icon="i-carbon-logo-google" type="primary" cls="mx-2" ghost={true}>google</KButton>
	<KButton icon="i-carbon-aperture" type="warning" cls="mx-2" ghost={true}>aperture</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" round="20" cls="mx-2" ghost={true}>
		settings
	</KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" round="20" cls="mx-2" ghost={true}>
		svelte
	</KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" round="20" cls="mx-2" ghost={true}>
		wechat
	</KButton>
	<KButton icon="i-carbon-logo-google" type="primary" round="20" cls="mx-2" ghost={true}>
		google
	</KButton>
	<KButton icon="i-carbon-aperture" type="warning" round="10" cls="mx-2" ghost={true}>
		aperture
	</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" circle cls="mx-2" ghost={true}></KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" circle cls="mx-2" ghost={true}></KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" circle cls="mx-2" ghost={true}></KButton>
	<KButton icon="i-carbon-logo-google" type="primary" circle cls="mx-2" ghost={true}></KButton>
	<KButton icon="i-carbon-aperture" type="warning" circle cls="mx-2" ghost={true}></KButton>
</div>
