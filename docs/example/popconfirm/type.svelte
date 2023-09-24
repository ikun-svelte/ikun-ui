<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { KButton } from '@ikun-ui/button';
</script>

<div class="flex">
	<KPopconfirm title="Delete the task" type="warning" content="Are you sure to delete this task?">
		<KButton type="warning" plain cls="mx-1">delete</KButton>
	</KPopconfirm>

	<KPopconfirm title="Delete the task" type="error" content="Are you sure to delete this task?">
		<KButton type="error" plain cls="mx-1">delete</KButton>
	</KPopconfirm>

	<KPopconfirm title="Delete the task" type="success" content="Are you sure to delete this task?">
		<KButton type="success" plain cls="mx-1">delete</KButton>
	</KPopconfirm>

	<KPopconfirm title="Delete the task" type="info" content="Are you sure to delete this task?">
		<KButton type="info" plain cls="mx-1">delete</KButton>
	</KPopconfirm>
</div>
