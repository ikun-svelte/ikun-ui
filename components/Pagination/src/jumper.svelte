<script lang="ts">
  import { getPrefixCls } from '@ikun-ui/utils';
  import { clsx } from 'clsx';
  import type { KPaginationProps } from "./types";

  export let cls: KPaginationProps["cls"] = undefined;
  export let attrs: KPaginationProps["attrs"] = {};
  export let total: KPaginationProps["total"] = 0
  export let pagerCount: KPaginationProps["pagerCount"] = 7
  export let pageSize: KPaginationProps["pageSize"] = 10
  export let currentPage: KPaginationProps["currentPage"] = 1

  const prefixCls = getPrefixCls('pagination');
  $: cnames = clsx(prefixCls, {
    [`${prefixCls}`]: true
  }, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>

</div>
