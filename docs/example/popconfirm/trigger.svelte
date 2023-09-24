<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { KButton } from '@ikun-ui/button';
</script>

<div class="flex">
	<KPopconfirm
		title="Delete the task"
		type="warning"
		trigger="click"
		content="Are you sure to delete this task?"
	>
		<KButton plain cls="mx-1">click</KButton>
	</KPopconfirm>

	<KPopconfirm
		title="Delete the task"
		type="warning"
		trigger="manual"
		content="Are you sure to delete this task?"
	>
		<KButton plain cls="mx-1">manual</KButton>
	</KPopconfirm>

	<KPopconfirm
		title="Delete the task"
		type="warning"
		trigger="hover"
		content="Are you sure to delete this task?"
	>
		<KButton plain cls="mx-1">hover</KButton>
	</KPopconfirm>
</div>
