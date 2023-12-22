<script lang="ts">
	import { KAffix } from '@ikun-ui/affix';
	import { KTag } from '@ikun-ui/tag';

	let containerLeftRef: HTMLElement | undefined = undefined;
	const listenLeftTo = () => {
		return containerLeftRef as HTMLElement;
	};

	let containerRightRef: HTMLElement | undefined = undefined;
	const listenRightTo = () => {
		return containerRightRef as HTMLElement;
	};
</script>

<div class="fcc">
	<div bind:this={containerLeftRef} class="flex-1 h-200px rounded overflow-auto bg-orange-100 mr-2">
		<div class="h-150px w-full bg-orange-200" />
		<div class="h-600px">
			<KAffix top={120} triggerTop={60} listenTo={listenLeftTo}>
				<KTag>top 120px triggerTop 60px</KTag>
			</KAffix>
		</div>
	</div>

	<div bind:this={containerRightRef} class="flex-1 h-200px rounded overflow-auto bg-orange-100">
		<div class="h-150px w-full bg-orange-200" />
		<div class="h-600px">
			<KAffix bottom={120} triggerBottom={60} listenTo={listenRightTo}>
				<KTag>bottom 120px triggerBottom 60px</KTag>
			</KAffix>
		</div>
	</div>
</div>
