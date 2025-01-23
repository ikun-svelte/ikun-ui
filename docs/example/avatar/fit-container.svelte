<script>
	import { KAvatar } from '@ikun-ui/avatar';

	const src = 'https://ikun-ui.netlify.app/logo.svg';
	const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];
</script>

<div class="flex items-center justify-between">
	{#each fits as fit}
		<div>
			<div class="text-center mb-6px text-12px color-#909399">{fit}</div>
			<KAvatar {src} {fit} size={100} />
		</div>
	{/each}
</div>
