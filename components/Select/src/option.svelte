<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { clsx } from 'clsx';
  import { getPrefixCls } from '@ikun-ui/utils';
  import type { KSelectProps } from './types';

  export let value: KSelectProps['value'] = '';
  export let label: KSelectProps['value'] = '';
  export let cls: KSelectProps['cls'] = undefined;
  export let disabled: KSelectProps['disabled'] = false;
  export let attrs: KSelectProps['attrs'] = {};
  // updateValue
  const dispatch = createEventDispatcher();
  const handleClick = () => {
    if (disabled) return;
    dispatch('click', value);
  };


  // class names
  const prefixCls = getPrefixCls('select--option');
  $: cnames = clsx(
    `${prefixCls}`,
    `${prefixCls}__dark`,
    `${prefixCls}__hover`,
    `${prefixCls}__active`,
    {
      [`${prefixCls}--base__disabled__dark`]: disabled
    },
    cls
  );


</script>

<slot>
  <option class="{cnames}"
          {...$$restProps}
          {...attrs}
          on:click={handleClick}>
    {label}
  </option>
</slot>
