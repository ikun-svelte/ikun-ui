<script>
	import { KInput } from '@ikun-ui/input';
	let value = 'password input';
	const onInput = (e) => {
		value = e.detail;
	};
</script>

<KInput
	placeholder="Please input value"
	on:input={onInput}
	type="password"
	{value}
	cls="mx-2"
></KInput>
<p class="px-2">{value}</p>
