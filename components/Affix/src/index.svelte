<script lang="ts">
	import type { KAffixProps } from './types';
	import { KAFFIXPOSITION } from './types';

	export let offset: KAffixProps['offset'] = 0;
	export let position: KAffixProps['position'] = KAFFIXPOSITION['top'];
	export let target: KAffixProps['target'] = '';
	export let z: KAffixProps['z'] = 100;
</script>

<div>
	Affix
	<slot />
</div>
