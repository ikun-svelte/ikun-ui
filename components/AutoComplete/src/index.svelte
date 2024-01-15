<script lang="ts">
    import type {AutoCompleteItems, KAutoCompleteProps} from './types';
    import { createEventDispatcher, tick, getContext } from 'svelte';
    import { KInput } from '@ikun-ui/input';
    import { formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
    import clsx from 'clsx';
    import { isObject } from 'baiwusanyu-utils';
    import type { CSSObject } from 'unocss';
    import type { IKunFormInstance } from '@ikun-ui/form';

    export let size: KAutoCompleteProps['size'] = 'md';
    export let value: KAutoCompleteProps['value'] = '';
    export let placeholder: KAutoCompleteProps['placeholder'] = '';
    export let disabled: KAutoCompleteProps['disabled'] = false;
    export let iconPrefix: KAutoCompleteProps['iconPrefix'] = '';
    export let iconSuffix: KAutoCompleteProps['iconSuffix'] = '';
    export let append: KAutoCompleteProps['append'] = '';
    export let prepend: KAutoCompleteProps['prepend'] = '';
    export let cls: KAutoCompleteProps['cls'] = undefined;
    export let attrs: KAutoCompleteProps['attrs'] = {};
    export let triggerOnFocus: KAutoCompleteProps['triggerOnFocus'] = false
    export let fetchSuggestions: KAutoCompleteProps['fetchSuggestions'] = undefined
    export let useCompositionInput: KAutoCompleteProps['useCompositionInput'] = false;
    /**
     * @internal
     */
    export let isError: KAutoCompleteProps['isError'] = false;
    /**
     * @internal
     */
    export let center: KAutoCompleteProps['center'] = false;
    export let clearable: KAutoCompleteProps['clearable'] = false;
    // class names
    const prefixCls = getPrefixCls('auto-complete');
    const cname = clsx(prefixCls, cls)

    const dispatch = createEventDispatcher()
    let list = [] as AutoCompleteItems[]
    const handleInput = (e: CustomEvent) => {
        dispatch('input', e.detail)
        if(fetchSuggestions){
            list = fetchSuggestions(e.detail)
        }
    }
    const handleEnter = (e: CustomEvent) => {
        dispatch('enter', e.detail)
    }
    const handleKeydown= (e: CustomEvent) => {
        dispatch('keydown', e.detail)
    }
    const handleChange = (e: CustomEvent) => {
        dispatch('change', e.detail)
    }
    const handleCompositionstart = (e: CustomEvent) => {
        dispatch('compositionstart', e.detail)
    }

    const handleCompositionend = (e: CustomEvent) => {
        dispatch('compositionend', e.detail)
    }

    const handleCompositionInnput = (e: CustomEvent) => {
        dispatch('compositionInput', e.detail)
    }

    const handleTriggerPrepend = (e: CustomEvent) => {
        dispatch('triggerPrepend', e.detail)
    }

    const handleTriggerAppend = (e: CustomEvent) => {
        dispatch('triggerAppend', e.detail)
    }

</script>
<div class={cname}
     {...$$restProps}
     {...attrs}>
    <KInput on:input={handleInput}
            on:enter={handleEnter}
            on:keydown={handleKeydown}
            on:change={handleChange}
            on:compositionstart={handleCompositionstart}
            on:compositionend={handleCompositionend}
            on:compositionInput={handleCompositionInnput}
            on:triggerPrepend={handleTriggerPrepend}
            on:triggerAppend={handleTriggerAppend}
            {size}
            {value}
            {placeholder}
            {disabled}
            {iconPrefix}
            {iconSuffix}
            {append}
            {prepend}
            {clearable}
            {useCompositionInput}
            type="text"
    />
    {JSON.stringify(list)}
</div>

