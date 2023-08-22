<script lang="ts">
	import { setContext } from 'svelte';
	import { getPrefixCls, createCls, BreadcrumbKey } from '@ikun-ui/utils';

	export let separator: string = '/';
	export let separatorIcon: string = '';
	export let cls: string = '';
	export let attrs: Record<string, string> = {};

	setContext(BreadcrumbKey, {
		separator,
		separatorIcon
	});

	// class names
	const prefixCls = getPrefixCls('breadcrumb');
	$: cnames = createCls(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
