<script lang="ts">
	import { KWatermark } from '@ikun-ui/watermark';
	import { KClientOnly } from '@ikun-ui/client-only';
</script>

<KClientOnly></KClientOnly>

<KClientOnly>
	<KWatermark image="ikun ui">
		<div style="height: 500px" id="watermark_slot" />
	</KWatermark>
</KClientOnly>
