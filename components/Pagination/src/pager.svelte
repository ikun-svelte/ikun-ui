<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
  import { clsx } from 'clsx';
  import type { KPaginationProps } from "./types";
  import { createEventDispatcher } from 'svelte';


  export let index: KPaginationProps["index"] = 0
  export let isActive: KPaginationProps["isActive"] = false
  export let isBg: KPaginationProps["isBg"] = false

  const dispatch = createEventDispatcher();
  const handleClick = (index: number) => {
    dispatch('click', index)
  }

  const prefixCls = getPrefixCls('pagination--pager');
  $: cnames = clsx(prefixCls, {
    [`${prefixCls}__active`]: isActive,
    [`${prefixCls}__bg`]: isBg
  });
</script>

<li class={cnames} {...$$restProps}
    on:click={() => handleClick(index)}
    aria-hidden="true">
  { index }
</li>
