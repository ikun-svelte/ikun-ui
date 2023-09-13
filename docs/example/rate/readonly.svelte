<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 2.7;
	const scoreTemplate = '{value} points';
</script>

<div class="fcc">
	<div class="flex-1 fcc flex-col">
		<div class="mb-6px text-13px color-#909399">default</div>
		<KRate {value} showScore {scoreTemplate} readonly></KRate>
	</div>
	<div class="flex-1 fcc flex-col">
		<div class="mb-6px text-13px color-#909399">customize voidIcon and voidColor</div>
		<KRate {value} readonly readonlyVoidIcon="i-carbon-settings" readonlyVoidColor="pink"></KRate>
	</div>
</div>
