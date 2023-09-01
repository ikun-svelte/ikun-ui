<script lang="ts">
  import type { KProgressProps } from "./types";
  import { createCls, getPrefixCls } from "@ikun-ui/utils";

  export let size: number = 126
  export let strokeWidth: KProgressProps['strokeWidth'] = 6;
  export let type: KProgressProps['type'] = 'line';
  export let status: KProgressProps['status'] = 'primary';
  export let percentage: KProgressProps['percentage'] = 0;
  export let color: KProgressProps['color'] = '';

  let rate = type === 'dashboard' ? 0.75 : 1;
  $:circleRadius = (size - strokeWidth * 2) / 2;
  $:perimeter = 2 * Math.PI * circleRadius;
  $:strokeDashoffset = (-1 * perimeter * (1 - rate)) / 2;

  $:strokeDasharrayRunway = perimeter * rate
  $:strokeDasharrayBar = perimeter * rate * (percentage / 100)
  $:circleRotate = `rotate(${type === 'dashboard' ? 90 : -90}, ${size / 2}, ${size / 2})`

  // class
  const prefixCls = getPrefixCls('progress');
  $: circleDashboardBarCls = createCls(
    `${prefixCls}--bar__cd`,
    {
      [`${prefixCls}--stroke--${status}`]: !color
    },
  )

  $: circleDashboardRunwayCls =  createCls(
    `${prefixCls}--stroke--runway`,
    `${prefixCls}--stroke--runway__dark`
  )
</script>

<circle
  cx={size / 2}
  cy={size / 2}
  r={circleRadius}
  stroke-width={strokeWidth}
  stroke-linecap='round'
  stroke-dasharray="{strokeDasharrayRunway} {perimeter}"
  stroke-dashoffset={strokeDashoffset}
  fill="none"
  transform="{circleRotate}"
  class="{circleDashboardRunwayCls}"
/>
<circle
  cx={size / 2}
  cy={size / 2}
  r={circleRadius}
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap='round'
  stroke-dasharray="{strokeDasharrayBar} {perimeter}"
  stroke-dashoffset={strokeDashoffset}
  fill="none"
  transform="{circleRotate}"
  class={circleDashboardBarCls}
/>
