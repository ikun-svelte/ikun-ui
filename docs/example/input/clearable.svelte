<script>
	import { KInput } from '@ikun-ui/input';

	let value = 'clearable input';

	const onInput = (e) => (value = e.detail);
	const onUpdateValue = (e) => (value = e.detail);
</script>

<KInput
	cls="mx-2"
	placeholder="Please input value"
	{value}
	clearable
	on:input={onInput}
	on:updateValue={onUpdateValue}
></KInput>
<p class="px-2">{value}</p>
