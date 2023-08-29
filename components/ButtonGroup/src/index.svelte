<script lang="ts">
	import { createCls, getPrefixCls } from '@ikun-ui/utils';

	export let cls = '';
	export let attrs = {};

	// class names
	$: prefixCls = getPrefixCls('button-group');
	$: cnames = createCls(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
</div>
