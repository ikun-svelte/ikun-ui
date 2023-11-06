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
  function initList(start: number, end: number){
      arr = []
      for (let i = start ; i < end; i++) {
          arr.push(i)
      }
  }
  initList(1, pagerCount)


  let mid = Number((pagerCount / 2).toFixed())
  let isShowNextExpand = false
  // $:{
  //   isShowNextExpand = currentPage < (pagerTotal - pagerCount)
  // }

  let isShowPrevExpand = false
  // $:{
  //   isShowPrevExpand = currentPage > pagerCount
  // }
  function updatedExpend(){
      isShowNextExpand = !(currentPage > (pagerTotal - mid))
      isShowPrevExpand = currentPage > mid;
  }
  updatedExpend()


  function getInitStartEnd(){
      // TODO: 偶数
      let midNum = pagerCount - 2
      let offset = Number(((midNum) / 2).toFixed())
      let end = currentPage + offset
      let start =   currentPage > pagerTotal - offset ? pagerTotal - midNum: currentPage - offset + 1
      return {
          end, start
      }
  }
  const handleNext = () => {
    // compute current page
    currentPage++
    // limit current page
    currentPage >= pagerTotal && (currentPage = pagerTotal);

    updatedExpend();

    const {start, end } = getInitStartEnd()
    isShowPrevExpand && initList(
        start,
        end > pagerTotal ? pagerTotal : end
    )
  }

  const handlePrev = () => {
      // compute current page
    currentPage--
      // limit current page
    currentPage <= 0 && (currentPage = 1);

    updatedExpend();

    const {start, end } = getInitStartEnd()
    isShowNextExpand && initList(
        start < mid - 1 ? 1 : start,
        start < mid - 1 ? pagerCount : end,
    )
  }








  const prefixCls = getPrefixCls('pagination');
  const pagerCls = getPrefixCls('pagination--pager');
  $: cnames = clsx(prefixCls, {}, cls);
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
  <li class={pagerCls} on:click={handlePrev} aria-hidden="true">
    prev
  </li>
  {#if isShowPrevExpand}
      <li class={pagerCls} aria-hidden="true">
          1
      </li>
    <li class={pagerCls} aria-hidden="true">
      ...
    </li>
  {/if}

  {#each arr as item}
    <PagerComp index={item}
               isActive="{item === currentPage}">
    </PagerComp>
   {/each}

  {#if isShowNextExpand}
    <li class={pagerCls} aria-hidden="true">
      ...
    </li>
  {/if}
    {#if isShowNextExpand || currentPage >= pagerTotal - 5}
        <PagerComp index={pagerTotal}
                   isActive="{pagerTotal === currentPage}">
        </PagerComp>
    {/if}

   <li class={pagerCls} on:click={handleNext} aria-hidden="true">
      next
   </li>
</ul>
{currentPage}
{arr}
