<script lang="ts">
	import { onMount } from 'svelte';
	import { clsx, type ClassValue } from 'clsx';

	export let cls: ClassValue = undefined;
	export let attrs: Record<string, string> = {};

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

<div class={clsx('k-eyedropper--base', cls)} {...attrs}>
	<slot {sRGBHex} {open} {isSupported} />
</div>
