<script>
	import { KButton } from '@ikun-ui/button';
</script>

<div class="flex items-center flex-wrap">
	<KButton type="info" cls="mx-2" size="lg">lg</KButton>
	<KButton type="error" cls="mx-2" size="md">md</KButton>
	<KButton type="success" cls="mx-2" size="sm">sm</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" cls="mx-2" size="lg">settings</KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" cls="mx-2" size="md">svelte</KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" cls="mx-2" size="sm">wechat</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" round="20" cls="mx-2" size="lg">
		settings
	</KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" round="20" cls="mx-2" size="md">
		svelte
	</KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" round="20" cls="mx-2" size="sm">
		wechat
	</KButton>
</div>

<div class="flex items-center mt-3 flex-wrap">
	<KButton icon="i-carbon-settings" type="info" circle cls="mx-2" size="lg"></KButton>
	<KButton icon="i-carbon-logo-svelte" type="error" circle cls="mx-2" size="md"></KButton>
	<KButton icon="i-carbon-logo-wechat" type="success" circle cls="mx-2" size="sm"></KButton>
</div>
