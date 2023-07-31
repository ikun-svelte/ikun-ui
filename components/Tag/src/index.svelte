<script>
	export let attrs = {};
	export let cls = '';
	export let type = 'primary';
</script>

<span class="k-tag--base k-tag--{type} {cls}"
	  {...attrs}>
	<slot />
</span>
