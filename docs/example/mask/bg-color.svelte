<script>
	import { KMask } from '@ikun-ui/mask';
	import { KButton } from '@ikun-ui/button';
	let show = false;
</script>

<div class="flex items-center flex-wrap">
	<KButton on:click={() => (show = true)}>open mask</KButton>
	<KMask target={document.body} color="rgba(255, 119, 7, 0.4)" value={show}>
		<KButton on:click={() => (show = false)} cls="fixed z-1001 top-1/2 left-1/2">
			close mask
		</KButton>
	</KMask>
</div>
