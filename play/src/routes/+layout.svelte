<script>
	import { KIcon } from '@ikun-ui/icon';
	import { BROWSER } from 'esm-env';
	const toggle = () => {
		const res = window.document.documentElement.classList.toggle('dark');
		localStorage.setItem('isDark', res)
	};

	function initDark(){
		if(BROWSER){
			const isDark = localStorage.getItem('isDark')
			if (isDark === 'true') {
				window.document.documentElement.classList.toggle('dark');
			}
		}
	}
	initDark()
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
