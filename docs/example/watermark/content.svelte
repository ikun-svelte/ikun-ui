<script lang="ts">
	import { KWatermark } from '@ikun-ui/watermark';
	import { KClientOnly } from '@ikun-ui/client-only';
</script>

<KClientOnly></KClientOnly>

<KClientOnly>
	<KWatermark content={['ikun ui', '鸡你太美']} gap={[50, 50]}>
		<div style="height: 500px" />
	</KWatermark>
</KClientOnly>
