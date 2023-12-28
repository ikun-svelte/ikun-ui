<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KScrollbarProps } from './types';
	import { genCSSVariable, scrollDefaultProps } from './utils';

	export let css: KScrollbarProps['css'] = scrollDefaultProps.css;
	export let trackBackground: KScrollbarProps['trackBackground'] =
		scrollDefaultProps.trackBackground;
	export let trackRadius: KScrollbarProps['trackRadius'] = scrollDefaultProps.trackRadius;
	export let width: KScrollbarProps['width'] = scrollDefaultProps.width;
	export let height: KScrollbarProps['height'] = scrollDefaultProps.height;
	export let thumbBackground: KScrollbarProps['thumbBackground'] =
		scrollDefaultProps.thumbBackground;
	export let thumbRadius: KScrollbarProps['thumbRadius'] = scrollDefaultProps.thumbRadius;
	export let cls: KScrollbarProps['cls'] = scrollDefaultProps.cls;
	export let attrs: KScrollbarProps['attrs'] = scrollDefaultProps.attrs;

	let style = css;
	$: {
		style = genCSSVariable({
			css,
			trackBackground,
			trackRadius,
			width,
			height,
			thumbBackground,
			thumbRadius,
			cls,
			attrs
		});
	}
	let element: HTMLDivElement | null = null;
	export function getElm() {
		return element;
	}
	const prefixCls = getPrefixCls('scrollbar');
	$: cnames = clsx(prefixCls, cls);
</script>

<div class={cnames} bind:this={element} {...$$restProps} {...attrs} {style}>
	<slot />
</div>

<style>
	:global(.k-scrollbar::-webkit-scrollbar-track-piece) {
		background: var(--k-scrollbar--track);
		border-radius: var(--k-scrollbar--track__radius);
	}

	:global(.k-scrollbar::-webkit-scrollbar) {
		width: var(--k-scrollbar__w);
		height: var(--k-scrollbar__h);
	}

	:global(.k-scrollbar::-webkit-scrollbar-thumb) {
		background: var(--k-scrollbar--thumb);
		border-radius: var(--k-scrollbar--thumb__radius);
	}
</style>
