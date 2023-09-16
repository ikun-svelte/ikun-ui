<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { KButton } from '@ikun-ui/button';
</script>

<div class="flex">
	<KPopconfirm
		title="Delete the task"
		type="warning"
		placement="top"
		content="Are you sure to delete this task?"
	>
		<KButton plain cls="mx-1">top</KButton>
	</KPopconfirm>

	<KPopconfirm
		title="Delete the task"
		type="warning"
		placement="right"
		content="Are you sure to delete this task?"
	>
		<KButton plain cls="mx-1">right</KButton>
	</KPopconfirm>

	<KPopconfirm
		title="Delete the task"
		type="warning"
		placement="bottom"
		content="Are you sure to delete this task?"
	>
		<KButton plain cls="mx-1">bottom</KButton>
	</KPopconfirm>

	<KPopconfirm
		title="Delete the task"
		type="warning"
		placement="left"
		content="Are you sure to delete this task?"
	>
		<KButton plain cls="mx-1">left</KButton>
	</KPopconfirm>
</div>
