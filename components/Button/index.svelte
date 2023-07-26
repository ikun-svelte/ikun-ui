<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '../Icon/index.svelte';

	const dispatch = createEventDispatcher();

	export let to = false;
	export let icon = '';
	export let customClass = '';
	export let attrs = {};
	export let type = 'primary';
	export let disabled = false;
	// small medium large
	// export let size = 'medium'
	const typeClass = {
		success: 'bg-green-400:10 text-green-400 border-green-400:10',
		error: 'bg-rose-400:10 text-rose-400 border-rose-400:10',
		warning: 'bg-amber-400:10 text-amber-400 border-amber-400:10',
		info: 'bg-slate-400:10 text-slate-400 border-slate-400:10',
		primary: 'bg-teal-400:10 text-teal-400 border-teal-400:10'
	};

	const typeClassHover = {
		success: 'hover:border-success-c',
		error: 'hover:border-error-c',
		warning: 'hover:border-warning-c',
		info: 'hover:border-infk-c',
		primary: 'hover:border-primary-c'
	};

	const typeClassActive = {
		success: 'active:border-success-c active:ui-button-shadow--success',
		error: 'active:border-error-c active:ui-button-shadow--error',
		warning: 'active:border-warning-c active:ui-button-shadow--warning',
		info: 'active:border-infk-c active:ui-button-shadow--info',
		primary: 'active:border-primary-c active:ui-button-shadow--primary'
	};

	const typeClassFocusVisible = {
		success: 'focus-visible:border-success-c focus-visible:ui-button-shadow--success',
		error: 'focus-visible:border-error-c focus-visible:ui-button-shadow--error',
		warning: 'focus-visible:border-warning-c focus-visible:ui-button-shadow--warning',
		info: 'focus-visible:border-infk-c focus-visible:ui-button-shadow--info',
		primary: 'focus-visible:border-primary-c focus-visible:ui-button-shadow--primary'
	};

	const iconClass = {
		success: 'text-green-400',
		error: 'text-rose-400',
		warning: 'text-amber-400',
		info: 'text-slate-400',
		primary: 'color-teal-400'
	};

	const handleClick = (e) => {
		if (!to) dispatch('click', e);
	};

	$: tag = to ? 'a' : 'button';
</script>

<svelte:element
	this={tag}
	on:click={handleClick}
	{...attrs}
	class="
        flex-c
        px-2
        py-1
        rounded
        border-solid
        border
        cursor-pointer
        {typeClass[type]}
        {typeClassHover[type]}
        {typeClassActive[type]}
        {typeClassFocusVisible[type]}
        {disabled ? 'ui-disabled-cursor' : ''}
        {customClass}"
>
	{#if icon}
		<Icon {icon} colorCls={iconClass[type]} customClass="mr-2" />
	{/if}
	<slot />
</svelte:element>
