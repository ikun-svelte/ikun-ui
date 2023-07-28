<script lang="ts">
	import { onMount } from 'svelte';
	export let cls = '';
	export let attrs = {}
	interface EyeDropperOpenOptions {
		signal?: AbortSignal;
	}

	interface UseEyeDropperOptions {
		initialValue?: string;
	}

	let sRGBHex = '';
	let isSupported = true;
	function initEyeDropper(options: UseEyeDropperOptions = {}) {
		const { initialValue = '' } = options;
		isSupported = typeof window !== 'undefined' && 'EyeDropper' in window;
		sRGBHex = initialValue;
	}

	async function open(openOptions?: EyeDropperOpenOptions) {
		if (!isSupported) return;
		const eyeDropper = new (window as any).EyeDropper();
		const result = await eyeDropper.open(openOptions);
		sRGBHex = result.sRGBHex;
		return result;
	}

	onMount(initEyeDropper);
</script>

<div class="k-eyedropper--base {cls}" {...attrs}>
	<slot {sRGBHex} {open} {isSupported} />
</div>
