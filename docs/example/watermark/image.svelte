<script lang="ts">
	import { KWatermark } from '@ikun-ui/watermark';
	import { KClientOnly } from '@ikun-ui/client-only';
</script>

<KClientOnly></KClientOnly>

<KClientOnly>
	<KWatermark image="https://ikun-ui.netlify.app/logo.svg" width={60} height={50} gap={[50, 50]}>
		<div style="height: 500px" />
	</KWatermark>
</KClientOnly>
