<script>
	import { KSwitch } from '@ikun-ui/switch';

	let smValue = false;
	let mdValue = false;
	let lgValue = false;
</script>

<div class="fi">
	<KSwitch cls="mx4" size="lg" value={smValue} on:updateValue={(e) => (smValue = e.detail)} />
	<KSwitch cls="mx4" size="md" value={mdValue} on:updateValue={(e) => (mdValue = e.detail)} />
	<KSwitch cls="mx4" size="sm" value={lgValue} on:updateValue={(e) => (lgValue = e.detail)} />
</div>
