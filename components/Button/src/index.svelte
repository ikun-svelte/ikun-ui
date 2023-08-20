<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { KIcon } from '@ikun-ui/icon'
	import { extend } from 'baiwusanyu-utils'
	import { createCls, type IKunTypePro } from '@ikun-ui/utils'
	export let to: HTMLAnchorElement['href'] = ''
	export let icon = ''
	export let round: string | number = ''
	export let circle = false
	export let cls = ''
	export let attrs = {}
	export let type: IKunTypePro = 'primary'
	export let disabled = false
  export let size: 'normal' | 'small' | 'large' = 'normal'
  export let isBorder = false
	// todo: button size

	const dispatch = createEventDispatcher()
	const handleClick = (e: Event) => {
		if (disabled) {
			e.preventDefault()
		}
		if (!to && !disabled) dispatch('click', e)
	}

	$: prefixCls = `k-button--${type}`
	$: cnames = createCls(
		'k-button--base',
		prefixCls,
		{
			[`${prefixCls}__active ${prefixCls}__focus ${prefixCls}__hover`]: !disabled,
			'k-cur-disabled k-button--disabled': disabled,
			'k-button--circle': circle,
      'k-button--circle--small': circle && size === 'small',
      'k-button--circle--large': circle && size === 'large',

		},
    {
      'k-button--small': size === 'small',
      'k-button--large': size === 'large'
    },
    {
      [`k-button--${type}__border`]: isBorder
    },
		cls
	)
	$: attrsInner = extend(attrs, to ? { href: to } : {})
</script>

<svelte:element
	this={to ? 'a' : 'button'}
	style="border-radius: {round ? `${round}` : '4'}px"
	class={cnames}
	aria-hidden="true"
	on:click={handleClick}
	{...attrsInner}
	{...$$restProps}>
	{#if icon}
		<KIcon {icon} color={`k-button--${type}__icon`} />
	{/if}

	{#if $$slots.default && icon}
		<div class="ml-2" />
	{/if}

	<slot />
</svelte:element>
