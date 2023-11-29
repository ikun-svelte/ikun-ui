<script lang="ts">
	import { getContext } from 'svelte';
	import type { KDescriptionsCtx } from '@ikun-ui/descriptions';
	import type { KDescriptionsItemProps } from './types';
	import { descriptionsKey, getPrefixCls, type ReactiveContext } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let label: KDescriptionsItemProps['label'] = '';
	export let cls: KDescriptionsItemProps['cls'] = undefined;
	export let attrs: KDescriptionsItemProps['attrs'] = {};

	const ctx = getContext<ReactiveContext<KDescriptionsCtx>>(descriptionsKey);

	let column = ctx?.props?.column || 3;
	let border = ctx?.props?.border || false;
	let direction = ctx?.props?.direction || 'horizontal';
	let size = ctx?.props?.size || 'md';

	let colGridStart = 0;
	let colGridPosition = 0;
	let labelRef: HTMLElement | null = null;
	if (ctx) {
		ctxPropsChange(ctx.props);
		ctx.evtMap.push(ctxPropsChange);
		colGridPosition = ctx.evtMap.length;
		colGridStart = ctx.evtMap.length % column;
	}

	function ctxPropsChange(props: KDescriptionsCtx) {
		column = props.column;
		border = props.border;
		direction = props.direction;
		size = props.size;
		updateLabelWidth();
	}

	function updateLabelWidth() {
		if (direction === 'horizontal' && border && ctx && labelRef) {
			// get current label ref and width
			ctx.props.colLabelRefs[colGridPosition] = labelRef;

			const colGroupIndex = (colGridPosition - 1) % column;
			console.log(colGroupIndex);
			if (colGroupIndex >= 0) {
				ctx.props.colGroup[colGroupIndex].push(colGridPosition);

				// get max label width
				let maxLabelWidth = 0;
				ctx.props.colGroup[colGroupIndex].forEach((col) => {
					maxLabelWidth =
						maxLabelWidth > ctx.props.colLabelRefs[col].clientWidth
							? maxLabelWidth
							: ctx.props.colLabelRefs[col].clientWidth;
				});

				if (maxLabelWidth > 0) {
					ctx.props.colGroup[colGroupIndex].forEach((col) => {
						// border 2px
						ctx.props.colLabelRefs[`${col}`].style.minWidth = maxLabelWidth + 2 + 'px';
					});
				}
			}
		}
	}

	$: if (direction === 'horizontal' && border && ctx && labelRef) {
		updateLabelWidth();
	}

	const prefixCls = getPrefixCls('descriptions-item');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}__dark`,
		`${prefixCls}--${size}`,
		`${prefixCls}__${direction}`,
		`ikun-last:${prefixCls}--col-${colGridStart}`,
		{
			[`${prefixCls}--border`]: border
		},
		cls
	);
	$: lableCls = clsx(
		`${prefixCls}--label`,
		`${prefixCls}--label__${direction}`,
		`${prefixCls}--label__${direction}--${size}`,
		{
			[`${prefixCls}--label--${size}--border`]: border
		}
	);
	$: contentCls = clsx(`${prefixCls}--content`, `${prefixCls}--content__${direction}`, {
		[`${prefixCls}--content--${size}--border`]: border
	});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<label bind:this={labelRef} class={lableCls}>
		<slot name="label">
			{label}
		</slot>
	</label>
	<div class={contentCls}>
		<slot />
	</div>
</div>
