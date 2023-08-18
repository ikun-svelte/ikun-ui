<script lang="ts">
	import { KTooltip } from '@ikun-ui/tooltip';
	import type { IKunPlacement } from '@ikun-ui/utils';
	export let value: number = 0;
	export let min: number = 0;
	export let max: number = 100;
	export let disabled: boolean = false;
	export let placement: IKunPlacement = 'top';

	let content: string = '0';
</script>

<div class="k-slider--base">
	<div class="k-slider--runway">
		<div class="k-slider--bar"></div>
		<div class="k-slider--button-wrapper">
			<KTooltip {content} {placement}></KTooltip>
		</div>
	</div>
</div>
