<script lang="ts">
	import { createCls } from '@ikun-ui/utils';
	import type { KProgressProps } from './types';

	export let percentage: KProgressProps['percentage'] = 0;
	export let status: KProgressProps['status'] = 'primary';
	export let type: KProgressProps['type'] = 'line';
	export let strokeWidth: KProgressProps['strokeWidth'] = 6;
	export let width: KProgressProps['width'] = 126;
	export let color: KProgressProps['color'] = '';
	export let textInside: KProgressProps['textInside'] = false;
	export let format: KProgressProps['format'] = '';
	export let duration: KProgressProps['duration'] = 0.28;
	export let showText: KProgressProps['showText'] = true;
	export let cls: KProgressProps['cls'] = '';

	let rate = type === 'dashboard' ? 0.75 : 1
	let circleRadius = (width - strokeWidth * 2) / 2;
	let perimeter = 2 * Math.PI * circleRadius;
	let strokeDashoffset = -1 * perimeter * (1 - rate) / 2;
	const strokeLinecap = 'round'

	// circle progress theme
	const STATUS_COLOR_MAP: Record<string, string> = {
		primary: '#ccfbf1',
		success: '#dcfce7',
		error: '#ffe4e6',
		warning: '#fef3c7'
	}

	const getCurrentCircleStorkeColor = (status: string) => {
		return STATUS_COLOR_MAP[status]
	}

	$: prefixCls = `k-progress--${status}`;
	$: cnames = createCls('k-progress--base', cls);
</script>

{#if type === 'line'}
	<div class="k-progress--container">
		<div
			class={`${cnames}`}
			style="width: {showText
				? `90%`
				: ''}; height: {strokeWidth}px; border-radius: {strokeWidth}px;"
		>
			<div class="k-progress--runway">
				<div
					class={`k-progress--bar ${prefixCls}`}
					style="width: {percentage}%; left: 0%; bg-[{color}]; border-radius: {strokeWidth}px; transition-duration: {duration}s"
				>
					<div class="k-progress-content--textInside">
						{#if showText && textInside}
							{#if $$slots.default}
								<slot />
							{:else}
								<span>{format || `${percentage}%`}</span>
							{/if}
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="k-progress-content--textOutside">
			{#if showText && !textInside}
				{#if $$slots.default}
					<slot />
				{:else}
					<span>{format || `${percentage}%`}</span>
				{/if}
			{/if}
		</div>
	</div>
{:else if ['circle', 'dashboard'].includes(type)}
	<div class="pr inline-block" style="height: {width}px; width: {width}px;">
		<svg {width} height={width} viewBox="0 0 {width} {width}">
			<circle
					cx="{width / 2}"
					cy="{width / 2}"
					r="{circleRadius}"
					stroke="#f2f2f2"
					stroke-width="{strokeWidth}"
					stroke-linecap="{strokeLinecap}"
					stroke-dasharray="{perimeter * rate} {perimeter}"
					stroke-dashoffset="{strokeDashoffset}"
					fill="none"
					transform="rotate({type === 'dashboard' ? 90 : -90}, 100, {width/2})"
			/>
			<circle
					cx="{width / 2}"
					cy="{width / 2}"
					r="{circleRadius}"
					stroke="{color || getCurrentCircleStorkeColor(status)}"
					stroke-width="{strokeWidth}"
					stroke-linecap="{strokeLinecap}"
					stroke-dasharray="{perimeter * rate * (percentage / 100)} {perimeter}"
					stroke-dashoffset="{strokeDashoffset}"
					fill="none"
					transform="rotate({type === 'dashboard' ? 90 : -90}, 100, {width/2})"
					{...{'ui-progress-bar': true}}
			/>
		</svg>
		<div class="pa left-50% top-50% translate--50%">
			{#if showText}
				{#if $$slots.default}
					<slot />
				{:else}
					<span>{format || `${percentage}%`}</span>
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	[ui-progress-bar] {
		transition: stroke-dasharray 0.28s linear;
	}
</style>
