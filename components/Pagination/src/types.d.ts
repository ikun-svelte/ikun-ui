/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KPaginationProps = {
  cls: ClassValue,
  attrs: Record<string, string>
  total: number
  pagerCount: number
  pageSize: number
  currentPage: number

  // pager
  index: number
  isActive: boolean
  isBg: boolean
}
// TODO: props: size -- three size
// TODO: props: bg -- background
// TODO: props: layout --
// TODO: props: disabled

// TODO: props: total -- 总条数
// TODO: props: pagerCount -- 超过最大显示数就省略折叠
// TODO: props: pageSize -- 每页显示条目数
// TODO: props: currentPage -- 每页显示条目数

// TODO: props: prevText -- 下一页按钮的文字
// TODO: props: prevIcon -- 下一页按钮的图标 优先级高
// TODO: props: nextText -- 上一页按钮的文字
// TODO: props: nextIcon -- 上一页按钮的图标 优先级高

// TODO: props: infinite -- 无限翻页

// TODO: on:sizeChange
// TODO: on:currentChange
