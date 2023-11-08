<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
  import type { KPaginationProps } from "./types";
  import PagerComp from './pager.svelte'

  export let cls: KPaginationProps["cls"] = undefined;
  export let attrs: KPaginationProps["attrs"] = {};

  // 这四个都应该动态
  export let total: KPaginationProps["total"] = 0
  export let pagerCount: KPaginationProps["pagerCount"] = 7
  export let pageSize: KPaginationProps["pageSize"] = 10
  export let currentPage: KPaginationProps["currentPage"] = 1

  $:isEven = pagerCount % 2 === 0
  // total pages
  $:pagerTotal = Number((total / pageSize).toFixed())
  $:isShowAll = pagerCount >= pagerTotal
  // Exclude the first and last pages,
  // and the pager displayed in the middle
  $:midPagerCount = pagerCount - 2
  // Median of pagerCount
  $:mid = Number((pagerCount / 2).toFixed())
  // The number of pagers displayed before and after
  // the pager corresponding to the median
  $:offset = Math.floor(midPagerCount / 2)
  $: currentPageInner = currentPage > pagerTotal ? pagerTotal : currentPage < 0 ? 1 : currentPage
  let isShowNextExpand = false
  let isShowPrevExpand = false
  //TODO: refactor
  function updatedExpend(){
      isShowNextExpand = (currentPageInner <= (pagerTotal - (isEven ? mid + 1 : mid)))
      isShowPrevExpand = currentPageInner > mid;
  }
  $:{
    !isShowAll && (isShowNextExpand = (currentPageInner <= (pagerTotal - (isEven ? mid + 1 : mid))))
    !isShowAll && (isShowPrevExpand = currentPageInner > mid)
  }

  let arr: number[] = []
  function fillList(start: number, end: number){
    arr = []
    for (let i = start ; i <= end; i++) {
      arr.push(i)
    }
  }
  $:if(!isShowAll){
    updatedList();
    if(!isShowNextExpand){
      fillList(pagerTotal - midPagerCount, pagerTotal - 1)
    }
    if(!isShowPrevExpand){
      fillList(2, midPagerCount + 1)
    }
  } else {
    fillList(2, pagerTotal - 1)
  }

  function getStartEnd(){
      let end = currentPageInner + offset
      let start = currentPageInner - (isEven ? offset - 1 : offset)
      return [start, end]
  }
  function updatedList(){
    if(isShowPrevExpand && isShowNextExpand){
      const [start, end] = getStartEnd()
      fillList(start, end)
    }
  }
  const handleNext = () => {
    // compute current page
    currentPageInner++
    // limit current page
    currentPageInner >= pagerTotal && (currentPageInner = pagerTotal);
    if(!isShowAll){
      updatedExpend();
      updatedList();
      if(!isShowNextExpand){
        fillList(pagerTotal - midPagerCount, pagerTotal - 1)
      }
    }
  }
  const handlePrev = () => {
      // compute current page
    currentPageInner--
      // limit current page
    currentPageInner <= 0 && (currentPageInner = 1);
    if(!isShowAll){
      updatedExpend();
      updatedList();
      if(!isShowPrevExpand){
        fillList(2, midPagerCount + 1)
      }
    }
  }
  // TODO: 偶数next测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
  // TODO: 奇数next测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
  // TODO: 偶数prev测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
  // TODO: 奇数prev测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
  // TODO: 奇数showAll = true 测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
  // TODO: 偶数showAll = true 测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)





  const prefixCls = getPrefixCls('pagination');
  const pagerCls = getPrefixCls('pagination--pager');
  $: cnames = clsx(prefixCls, {}, cls);
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
  <li class={pagerCls} on:click={handlePrev} aria-hidden="true">
    prev
  </li>
  <PagerComp index={1}
             isActive="{1 === currentPageInner}">
  </PagerComp>
  {#if isShowPrevExpand}
    <li class={pagerCls} aria-hidden="true">
      ...
    </li>
  {/if}

  {#each arr as item}
    <PagerComp index={item}
               isActive="{item === currentPageInner}">
    </PagerComp>
   {/each}

  {#if isShowNextExpand}
    <li class={pagerCls} aria-hidden="true">
      ...
    </li>
  {/if}
  <PagerComp index={pagerTotal}
             isActive="{pagerTotal === currentPageInner}">
  </PagerComp>
   <li class={pagerCls} on:click={handleNext} aria-hidden="true">
      next
   </li>
</ul>
{currentPageInner}
{arr}
{isShowAll}
