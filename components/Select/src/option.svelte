<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { clsx } from 'clsx';
  import { getPrefixCls } from '@ikun-ui/utils';
  import type { KSelectProps } from './types';

  export let label: KSelectProps['label'] = '';
  export let cls: KSelectProps['cls'] = undefined;
  export let disabled: KSelectProps['disabled'] = false;
  export let isActive: KSelectProps['isActive'] = false;
  export let attrs: KSelectProps['attrs'] = {};
  export let fitInputWidth: boolean = false;
  const dispatch = createEventDispatcher();
  const handleClick = () => {
    if (disabled) return;
    dispatch('click');
  };


  // class names
  const prefixCls = getPrefixCls('select--option');
  $:cnames = clsx(
    `${prefixCls}`,
    `${prefixCls}__dark`,
    `${prefixCls}__hover`,
    {
      [`${prefixCls}--base__disabled__dark`]: disabled,
      [`${prefixCls}__fit`]: fitInputWidth,

    },
    cls
  );
  $:activeCls = isActive ? `${prefixCls}__active` : ''
</script>

<slot>
  <option class="{`${cnames} ${activeCls}`}"
          {...$$restProps}
          {...attrs}
          on:click={handleClick}>
    {label}
  </option>
</slot>
