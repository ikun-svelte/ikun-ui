<script>
	import { KAvatar } from '@ikun-ui/avatar';

	const src = 'https://ikun-ui.netlify.app/logo.svg';
</script>

<div class="flex items-center justify-around">
	<KAvatar {src}></KAvatar>
	<KAvatar {src} radius={0}></KAvatar>
	<KAvatar {src} size={60} radius={10}></KAvatar>
	<KAvatar {src} size="5rem" radius="50%"></KAvatar>
</div>
