<script lang="ts">
	import { KWatermark } from '@ikun-ui/watermark';
	import { KClientOnly } from '@ikun-ui/client-only';
</script>

<KClientOnly></KClientOnly>

<KClientOnly>
	<KWatermark image="../../public/logo.svg" width={60} height={50} gap={[50, 50]}>
		<div style="height: 500px" />
	</KWatermark>
</KClientOnly>
