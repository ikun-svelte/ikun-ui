<script>
	import { KIcon } from '@ikun-ui/icon';
	const toggle = () => {
		window.document.documentElement.classList.toggle('dark');
	};
</script>

<header>
	<div class="p4 fbc shadow color-ikun-black dark:(shadow-light-50 color-ikun-white)">
		<div class="font-bold">IKun UI Play</div>
		<KIcon class="i-carbon:sun dark:i-carbon:moon" on:click={toggle}></KIcon>
	</div>
</header>

<main class="p4">
	<slot />
</main>

<style>
	@import '../app.css';
</style>
