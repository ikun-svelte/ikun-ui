<script>
	import { KAlert } from '@ikun-ui/alert';
</script>

<div>
	<KAlert cls="my-10px" type="success" closable={false}>unclosable alert</KAlert>
	<KAlert cls="my-10px" type="error" closeIcon="i-carbon:close-outline"
		>customized close icon</KAlert
	>
	<KAlert cls="my-10px" type="warning">
		customized close button
		<span slot="close">Close Button</span>
	</KAlert>
	<KAlert cls="my-10px" type="info" closeIcon="i-carbon:close-outline">
		slot will cover closeIcon
		<span slot="close">Cover Close Icon</span>
	</KAlert>
</div>
