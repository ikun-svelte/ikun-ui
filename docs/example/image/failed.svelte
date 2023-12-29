<script lang="ts">
	import { KImage } from '@ikun-ui/image';
	import { KIcon } from '@ikun-ui/icon';
</script>

<div class="demo-image__error">
	<div class="block">
		<span class="demonstration">Default</span>
		<KImage />
	</div>
	<div class="block">
		<span class="demonstration">Custom</span>
		<KImage>
			<div class="image-slot" slot="error">
				<KIcon icon="i-carbon-image" width="30px" height="30px"></KIcon>
			</div>
		</KImage>
	</div>
</div>

<style>
	.demo-image__error .block {
		padding: 30px 0;
		text-align: center;
		display: inline-block;
		width: 49%;
		box-sizing: border-box;
		vertical-align: top;
	}
	.demo-image__error .demonstration {
		display: block;
		color: var(--vp-c-text-1);
		font-size: 14px;
		margin-bottom: 20px;
	}
	:global(.demo-image__error .k-image) {
		padding: 0 5px;
		max-width: 300px;
		max-height: 200px;
		width: 100%;
		height: 200px;
	}

	.demo-image__error .image-slot {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: #f3f4f6;
		color: var(--vp-c-text-1);
		font-size: 30px;
	}
</style>
