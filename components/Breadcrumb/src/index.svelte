<script lang="ts">
	import { setContext } from 'svelte';
	import { getPrefixCls, breadcrumbKey } from '@ikun-ui/utils';
	import { clsx, type ClassValue } from 'clsx';

	export let separator: string = '/';
	export let separatorIcon: string = '';
	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};

	setContext(breadcrumbKey, {
		separator,
		separatorIcon
	});

	// class names
	const prefixCls = getPrefixCls('breadcrumb');
	$: cnames = clsx(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
