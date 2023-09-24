<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { KButton } from '@ikun-ui/button';
</script>

<KPopconfirm title="Delete the task" type="warning" content="Are you sure to delete this task?">
	<KButton type="error" plain>delete</KButton>
</KPopconfirm>
