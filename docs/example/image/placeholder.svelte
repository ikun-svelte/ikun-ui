<script lang="ts">
	import { KImage } from '@ikun-ui/image';
	const src = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg';
</script>

<div class="demo-image__placeholder">
	<div class="block">
		<span class="demonstration">Default</span>
		<KImage {src} />
	</div>
	<div class="block">
		<span class="demonstration">Custom</span>
		<KImage {src}>
			<div class="image-slot" slot="placeholder">Loading<span class="dot">...</span></div>
		</KImage>
	</div>
</div>

<style>
	.demo-image__placeholder .block {
		padding: 30px 0;
		text-align: center;
		display: inline-block;
		width: 49%;
		box-sizing: border-box;
		vertical-align: top;
	}
	.demo-image__placeholder .demonstration {
		display: block;
		color: var(--vp-c-text-1);
		font-size: 14px;
		margin-bottom: 20px;
	}
	:global(.demo-image__placeholder .k-image) {
		padding: 0 5px;
		max-width: 300px;
		max-height: 200px;
	}

	:global(.demo-image__placeholder.image-slot) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: #909399;
		color: var(--vp-c-text-1);
		font-size: 14px;
	}
	.demo-image__placeholder .dot {
		animation: dot 2s infinite steps(3, start);
		overflow: hidden;
	}
</style>
