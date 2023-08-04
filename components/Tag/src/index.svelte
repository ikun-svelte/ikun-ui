<script lang="ts">
	import type { IKunTypePro } from "@ikun-ui/utils";
	export let attrs = {};
	export let cls = '';
	export let type:IKunTypePro = 'primary';
</script>

<span class="k-tag--base k-tag--{type} {cls}"
	  {...attrs}>
	<slot />
</span>
