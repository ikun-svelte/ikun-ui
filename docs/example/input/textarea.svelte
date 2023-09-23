<script>
	import { KInput } from '@ikun-ui/input';
	let value = '';
	const onInput = (e) => {
		value = e.detail;
	};
	const autoSize = {
		minRows: 4,
		maxRows: 7
	};
</script>

<KInput
	placeholder="Please input value"
	on:input={onInput}
	type="textarea"
	autosize
	{value}
	cls="mx-2"
></KInput>
<KInput
	placeholder="Please input value"
	on:input={onInput}
	type="textarea"
	rows={1}
	autosize={autoSize}
	{value}
	cls="mx-2 my-4"
></KInput>
<p class="px-2">{value}</p>
