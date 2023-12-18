<script lang="ts">
	import { getContext, tick } from 'svelte';
	import type { KDescriptionsCtx, KDescriptionsProps } from '@ikun-ui/descriptions';
	import type { KDescriptionsItemProps } from './types';
	import { descriptionsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let label: KDescriptionsItemProps['label'] = '';
	export let cls: KDescriptionsItemProps['cls'] = undefined;
	export let attrs: KDescriptionsItemProps['attrs'] = {};

	const ctx = getContext<KDescriptionsCtx>(descriptionsKey);

	let column = ctx?.column ?? 3;
	let border = ctx?.border ?? false;
	let direction = ctx?.direction ?? 'horizontal';
	let size = ctx?.size ?? 'md';

	$: lastGridColStart = ctx?.descriptionsItemMap?.size ? ctx.descriptionsItemMap.size % column : 0;

	function setColumn(v: KDescriptionsProps['column']) {
		column = v;
	}

	function setBorder(v: KDescriptionsProps['border']) {
		border = v;
	}

	function setDirection(v: KDescriptionsProps['direction']) {
		direction = v;
	}

	function setSize(v: KDescriptionsProps['size']) {
		size = v;
	}

	function setLabelRef() {
		if (labelRef && ctx) {
			const op = ctx.descriptionsItemMap.get(`${symbolPrefix}-${uid}`);
			if (op) {
				op.labelRef = labelRef;
			}
		}
	}

	async function setLabelMinWidth() {
		if (labelRef && direction === 'horizontal' && border && ctx) {
			Array.from(ctx.descriptionsItemMap.values()).forEach((f) => {
				if (f?.labelRef) {
					f.labelRef.style.minWidth = '';
				}
			});
			await tick();
			const labelsWidth = Array.from(ctx.descriptionsItemMap.values()).map((m) => {
				if (m?.labelRef) {
					return m?.labelRef?.offsetWidth;
				}
				return 0;
			});
			const groupPosition = uid % column;
			const groupLabelsWidth = labelsWidth
				.map((m, i) => {
					if (i % column === groupPosition) {
						return m;
					} else {
						return null;
					}
				})
				.filter(Boolean) as number[];
			const groupMaxLabelWidth = Math.max(...groupLabelsWidth);
			labelRef.style.minWidth = `${groupMaxLabelWidth}px`;
		}
	}

	let labelRef: HTMLElement | null = null;

	let uid: number = 0;
	let symbolPrefix: string = 'descriptions-item';
	function doRegisterDescriptionsItem() {
		if (ctx) {
			uid = ctx.descriptionsItemMap.size;
			ctx.registerDescriptionsItem(`${symbolPrefix}-${uid}`, {
				setColumn,
				setBorder,
				setDirection,
				setSize,
				labelRef,
				setLabelRef,
				setLabelMinWidth
			});
		}
	}
	doRegisterDescriptionsItem();

	const prefixCls = getPrefixCls('descriptions-item');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}__dark`,
		`${prefixCls}--${size}`,
		`${prefixCls}__${direction}`,
		`ikun-last:${prefixCls}--col-${lastGridColStart}`,
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
