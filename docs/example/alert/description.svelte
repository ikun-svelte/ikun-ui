<script>
	import { KAlert } from '@ikun-ui/alert';
</script>

<div>
	<KAlert
		cls="my-10px"
		type="success"
		title="Description Attribute"
		description="This is the description"
		showIcon
	></KAlert>
	<KAlert cls="my-10px" type="error" title="Description Slot" closable={false}
		>This is the description</KAlert
	>
</div>
