<script lang="ts">
	import { getPrefixCls, collapseWrapperKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { onMount, setContext } from 'svelte';
	import type { collapseMapType, KCollapseWrapperProps } from './types';

	export let cls: KCollapseWrapperProps['cls'] = undefined;
	export let accordion: KCollapseWrapperProps['accordion'] = false;
	export let attrs: KCollapseWrapperProps['attrs'] = {};

	const collapseMap: collapseMapType = {};
	const setCollapseMap = (key: string, cb: () => void) => {
		collapseMap[key] = cb;
	};

	const closeCollapse = (key: string) => {
		Object.keys(collapseMap).forEach((k) => {
			if (k !== key) {
				collapseMap[k]();
			}
		});
	};
	if (accordion) {
		setContext(collapseWrapperKey, {
			setCollapseMap,
			closeCollapse
		});
	}

	let wrapperRef: HTMLElement | null = null;
	onMount(() => {
		if (wrapperRef) {
			let lastCollapse = [...wrapperRef.querySelectorAll('.k-collapse--base--wrapper')].pop();
			lastCollapse && ((lastCollapse as HTMLElement).style.border = '0');
		}
	});

	const prefixCls = getPrefixCls('collapse-wrapper');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs} bind:this={wrapperRef}>
	<slot />
</div>
