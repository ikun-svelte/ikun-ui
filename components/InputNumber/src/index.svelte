<script lang="ts">
  import type { KInputNumberProps } from './types';
  import { createEventDispatcher, getContext } from 'svelte';
  import { KButton } from '@ikun-ui/button';
  import { formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
  import clsx from 'clsx';
  import type { IKunFormInstance } from '@ikun-ui/form';

  export let size: KInputNumberProps['size'] = 'md';
  export let value: KInputNumberProps['value'] = null;
  export let min: KInputNumberProps['value'] = -Infinity;
  export let max: KInputNumberProps['value'] = Infinity;
  export let step: KInputNumberProps['step'] = 1;
  export let stepStrictly: KInputNumberProps['stepStrictly'] = false;
  export let precision: KInputNumberProps['precision'] = null;
  export let controls: KInputNumberProps['controls'] = true;
  export let valueOnClear: KInputNumberProps['valueOnClear'] = '';
  export let disabled: KInputNumberProps['disabled'] = false;
  export let append: KInputNumberProps['append'] = '';
  export let prepend: KInputNumberProps['prepend'] = '';
  export let cls: KInputNumberProps['cls'] = undefined;
  export let attrs: KInputNumberProps['attrs'] = {};
  export let useCompositionInput: KInputNumberProps['useCompositionInput'] = false;
  /**
   * native attr
   */
  export let placeholder: KInputNumberProps['placeholder'] = '';
  /**
   * native attr
   */
  export let readonly: KInputNumberProps['readonly'] = false;
  /**
   * native attr
   */
  export let id: KInputNumberProps['id'] = '';
  /**
   * native attr
   */
  export let label: KInputNumberProps['label'] = '';
  /**
   * native attr
   */
  export let name: KInputNumberProps['name'] = '';
  /**
   * @internal
   */
  export let isError: KInputNumberProps['isError'] = false;
  /**
   * @internal
   */
  export let center: KInputNumberProps['center'] = false;
  /*********************** TODO: KForm logic start ************************/
  let disabledFrom = false;
  $: disabledInner = disabledFrom || disabled;
  let sizeFrom = '';
  $: sizeInner = sizeFrom || size;
  let isErrorForm = false;
  $: isErrorInner = isErrorForm || isError;
  const formContext = getContext(formItemKey) as string;
  const formInstance = getContext(formKey) as IKunFormInstance;
  let field: string | undefined = '';
  // Initialize the KInput value based
  // on the form value in the KFormItem context
  function formUpdateField(init = false) {
    field = formContext.split('&').pop();
    value = formInstance.getValueByPath(
      field,
      init ? formInstance.__default_value : formInstance.__value
    );
  }
  function formPropsChangeCb(props: Record<any, any>) {
    disabledFrom = props.disabled;
    sizeFrom = props.size;
  }

  function fromFieldError(error: boolean) {
    isErrorForm = error;
  }

  // Register event, KForm can set KInput value
  if (formContext && formInstance) {
    formUpdateField(true);
    formPropsChangeCb(formInstance.__dynamicProps);
    formInstance.__itemCompMap[field] = {
      update: formUpdateField,
      type: 'input'
    };
    formInstance.__errorCompEvtMap[field] = fromFieldError;
    formInstance.__propHandleEvtMap.push(formPropsChangeCb);
  }
  /*********************** KForm logic end ************************/

  const dispatch = createEventDispatcher();
  const onInput = (e: Event) => {
    if (disabledInner) return;
    const { value: inputValue } = e.target as HTMLInputElement;
    dispatch('input', inputValue, e);
    formInstance && formInstance?.updateField(field!, inputValue, !formInstance.__manual_validate);
    if (!useCompositionInput || !isComposing) {
      value = inputValue;
      if (useCompositionInput && !isComposing) {
        dispatch('compositionInput', inputValue, e);
      }
    }
  };

  const onChange = (e: Event) => {
    if (disabledInner) return;
    dispatch('change', e);
    formInstance &&
    formInstance?.updateField(
      field!,
      (e?.target as HTMLInputElement)?.value,
      !formInstance.__manual_validate
    );
  };

  const onEnter = (e: KeyboardEvent) => {
    if (disabledInner) return;
    if (e.key === 'Enter') {
      dispatch('enter', e);
    } else dispatch('keydown', e);
  };

  let isComposing = false;
  const onCompositionStart = (e: CompositionEvent) => {
    if (disabledInner) return;
    dispatch('compositionstart', e);
    isComposing = true;
  };

  const onCompositionEnd = (e: CompositionEvent) => {
    if (disabledInner) return;
    dispatch('compositionend', e);

    if (!isComposing) {
      return;
    }
    isComposing = false;
    if (useCompositionInput) {
      e.target?.dispatchEvent(new Event('input'));
    }
  };

  let inputRef: null | HTMLInputElement | HTMLTextAreaElement = null;
  const handlePrependClick = () => {
    if (disabledInner) return;
    inputRef && dispatch('triggerPrepend', inputRef.value);
  };

  const handleAppendClick = () => {
    if (disabledInner) return;
    inputRef && dispatch('triggerAppend', inputRef.value);
  };

  let valueInner = value;
  $: if (value !== valueInner) {
    valueInner = value;
  }

  // class names
  const prefixCls = getPrefixCls('input');
  $: baseCls = clsx(prefixCls, cls);
  $: inputWrapperCls = clsx(
    `${prefixCls}--base`,
    {
      [`${prefixCls}__${sizeInner}`]: true
    },
    `${prefixCls}__dark`,
    {
      [`${prefixCls}__disabled`]: disabledInner,
      [`${prefixCls}__disabled__dark`]: disabledInner
    },
    {
      [`${prefixCls}__error`]: isErrorInner,
      [`${prefixCls}__hover`]: !isErrorInner,
      [`${prefixCls}__focus`]: !isErrorInner
    },
    {
      [`${prefixCls}__rounded`]: !$$slots.append && !append && !$$slots.prepend && !prepend,
      [`${prefixCls}__rounded__left`]: ($$slots.append || append) && !$$slots.prepend && !prepend,
      [`${prefixCls}__rounded__right`]: !$$slots.append && !append && ($$slots.prepend || prepend)
    }
  );
  $: inputCls = clsx(
    `${prefixCls}--inner`,
    {
      [`${prefixCls}--inner__dark`]: !disabledInner,
      [`${prefixCls}__disabled`]: disabledInner,
      [`${prefixCls}__disabled__dark`]: disabledInner
    }
  );
  $: prependCls = clsx(`${prefixCls}--prepend`, `${prefixCls}--prepend__${sizeInner}`);
  $: appendgCls = clsx(`${prefixCls}--append`, `${prefixCls}--append__${sizeInner}`);
</script>
  <div class={baseCls}>
    {#if $$slots.prepend || prepend}
      <KButton
        cls={prependCls}
        hiddenSlot
        type="main"
        icon={prepend}
        on:click={handlePrependClick}
        disabled={disabledInner}
      >
        {#if $$slots.prepend}
          <slot name="prepend" />
        {/if}
      </KButton>
    {/if}
    <div class={inputWrapperCls}>
      <input
        class={inputCls}
        {value}
        disabled={disabledInner}
        bind:this={inputRef}
        on:input={onInput}
        on:change={onChange}
        on:keydown={onEnter}
        on:compositionstart={onCompositionStart}
        on:compositionend={onCompositionEnd}
        style:text-align={center ? 'center' : undefined}
        {placeholder}
        {name}
        {id}
        {readonly}
        {label}
        {...attrs}
      />
    </div>
    {#if $$slots.append || append}
      <KButton
        cls={appendgCls}
        hiddenSlot
        type="main"
        icon={append}
        on:click={handleAppendClick}
        disabled={disabledInner}
      >
        {#if $$slots.append}
          <slot name="append" />
        {/if}
      </KButton>
    {/if}
  </div>
