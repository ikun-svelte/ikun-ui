<script lang="ts">
	import { KImage } from '@ikun-ui/image';
	const urls = [
		'https://pic4.zhimg.com/80/v2-e7776d7562f28493260b153e55fc6f57_1440w.webp',
		'https://pic4.zhimg.com/v2-75e369bfa397c7915448eb70b016b497_b.jpg',
		'https://pic1.zhimg.com/v2-8fc3d581a0a474d553bf4c4b8e2e5334_b.jpg',
		'https://pic4.zhimg.com/v2-7b0225735eeb663dd83aeb2dcf3aa367_b.jpg',
		'https://pic1.zhimg.com/v2-65d0f0492a3565184adeb9b7febcc68c_b.jpg',
		'https://pic3.zhimg.com/v2-f0f6615f256bdd3aeb77ec0637bab192_b.jpg',
		'https://pic4.zhimg.com/v2-766d5a7e7700bf2cb1c3ab0e26d06d0f_b.jpg',
		'https://pic1.zhimg.com/v2-d71a1212872e8c8912a7bc62abbd9a64_b.jpg'
	];
</script>

<div class="demo-image__preview">
	<KImage src={urls[0]} previewSrcList={urls} />
</div>

<style>
	.demo-image__preview {
		height: 100px;
		width: 100px;
	}
</style>
