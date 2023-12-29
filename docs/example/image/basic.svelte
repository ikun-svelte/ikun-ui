<script lang="ts">
	import { KImage } from '@ikun-ui/image';
	const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];
	const url = 'https://pic3.zhimg.com/80/v2-f0f6615f256bdd3aeb77ec0637bab192_1440w.webp';
</script>

<div class="demo-image">
	{#each fits as fit (fit)}
		<div class="block">
			<span class="demonstration">{fit}</span>
			<KImage style="width: 100px; height: 100px" src={url} {fit} />
		</div>
	{/each}
</div>

<style>
	.demo-image .block {
		padding: 30px 0;
		text-align: center;
		border-right: solid 1px rgb(226 232 240);
		display: inline-block;
		width: 20%;
		box-sizing: border-box;
		vertical-align: top;
	}
	.demo-image .block:last-child {
		border-right: none;
	}
	.demo-image .demonstration {
		display: block;
		color: var(--vp-c-text-1);
		font-size: 14px;
		margin-bottom: 20px;
	}
</style>
