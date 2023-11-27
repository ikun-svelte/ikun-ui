<script>
	import { KPopover } from '@ikun-ui/popover';
	import { KButton } from '@ikun-ui/button';
</script>

<KPopover>
	<KButton slot="triggerEl">trigger KPopover</KButton>
	<div slot="contentEl" class="flex flex-col">
		<p class="!my-2">亲手点燃黑暗森林的火星</p>
		<KButton type="info">前进四</KButton>
	</div>
</KPopover>
