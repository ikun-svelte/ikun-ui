<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
  import type { KPaginationProps } from "./types";
  import PagerComp from './pager.svelte'

  export let cls: KPaginationProps["cls"] = undefined;
  export let attrs: KPaginationProps["attrs"] = {};
  export let total: KPaginationProps["total"] = 0
  export let pagerCount: KPaginationProps["pagerCount"] = 7
  export let pageSize: KPaginationProps["pageSize"] = 10
  export let currentPage: KPaginationProps["currentPage"] = 1

  let pagerTotal = Number((total / pageSize).toFixed())
  let arr: number[] = []
  arr.length = Number(pagerCount)
  let isShowNextExpand = currentPage < (pagerTotal - pagerCount)
  let isShowPrevExpand = currentPage > pagerCount

   debugger

  const handleNext = () => {
    currentPage++
    currentPage >= pagerTotal && (currentPage = pagerTotal)
  }

  const handlePrev = () => {
    currentPage--
    currentPage <= 0 && (currentPage = 1)
  }

  const prefixCls = getPrefixCls('pagination');
  const pagerCls = getPrefixCls('pagination--pager');
  $: cnames = clsx(prefixCls, {}, cls);
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
  <li class={pagerCls} on:click={handlePrev} aria-hidden="true">
    prev
  </li>
  {#if isShowNextExpand}
    <li class={pagerCls} aria-hidden="true">
      ...
    </li>
  {/if}

  {#each arr as _, index}
    <PagerComp index={index + 1}
               isActive="{index + 1 === currentPage}">
    </PagerComp>
   {/each}

  {#if isShowPrevExpand}
    <li class={pagerCls} aria-hidden="true">
      ...
    </li>
  {/if}

   <li class={pagerCls} on:click={handleNext} aria-hidden="true">
      next
   </li>
</ul>
