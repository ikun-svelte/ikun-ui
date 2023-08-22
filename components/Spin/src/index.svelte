<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';

	export let show: boolean = false;
	export let text = '';
	export let spinner = '';
	export let background = '';
	export let cls = '';
	// TODO: slot
	// TODO: unit test
	// TODO: full screen
	export let attrs = {};
	export let rotating: boolean = true;
</script>

{#if show}
	<div class="k-spin--mask {cls}" style="background-color: {background};" {...attrs}>
		<div class="k-spin--spinner">
			<div class={rotating ? 'k-spin--spinner__rotating' : ''}>
				<KIcon icon={spinner || 'i-carbon-circle-dash'} color="text-ikun-main" />
			</div>
			{#if text}
				<p class="k-spin--text">{text}</p>
			{/if}
		</div>
	</div>
{/if}
