<script lang="ts">
	import { isNumber } from 'baiwusanyu-utils';
	import type { IKunTypePro } from '@ikun-ui/utils';

	export let value: string | number = '';
	export let max: number = 99;
	export let isDot: boolean = false;
	export let hidden: boolean = false;
	export let type: IKunTypePro = 'error';
	export let cls: string = '';

	let content = `${value}`;
	$: if (isDot) {
		content = '';
	}
	$: if (isNumber(value) && isNumber(max)) {
		content = max < (value as number) ? `${max}+` : `${value}`;
	}

	$: prefixCls = `k-badge--content-${type}`;
</script>

<div class="k-badge--base {cls}">
	<slot />
	{#if !hidden && (content || isDot)}
		<sup
			class="
			k-badge--content
			{prefixCls}
			k-badge--content-fixed
			{isDot ? 'k-badge--content-dot' : ''}
			k-badge--content__dark">{content}</sup
		>
	{/if}
</div>
