<script>
	import { KButton } from '@ikun-ui/button';
</script>

<div class="flex items-center flex-wrap">
	<KButton type="info" cls="mx-2" isBorder plain>large</KButton>
	<KButton type="error" cls="mx-2" isBorder plain>normal</KButton>
	<KButton type="success" cls="mx-2" isBorder plain>small</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" cls="mx-2" isBorder plain>settings</KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" cls="mx-2" isBorder plain>svelte</KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" cls="mx-2" isBorder plain>wechat</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" round="20" cls="mx-2" isBorder plain>
		settings
	</KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" round="20" cls="mx-2" isBorder plain>
		svelte
	</KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" round="20" cls="mx-2" isBorder plain>
		wechat
	</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" circle cls="mx-2" isBorder plain></KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" circle cls="mx-2" isBorder plain></KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" circle cls="mx-2" isBorder plain></KButton>
</div>
