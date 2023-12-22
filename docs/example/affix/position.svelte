<script lang="ts">
	import { KAffix } from '@ikun-ui/affix';
	import { KTag } from '@ikun-ui/tag';

	let containerRef: HTMLElement | undefined = undefined;
	const listenTo = () => {
		return containerRef as HTMLElement;
	};
</script>

<div class="pr h-200px w-full">
	<div bind:this={containerRef} class="h-200px overflow-auto rounded bg-orange-100">
		<div class="h-150px w-full bg-orange-200" />
		<div class="h-600px flex">
			<div style="display: inline-block; width: 50%">
				<KAffix triggerTop={50} {listenTo} positionOption="absolute">
					<KTag>triggerTop 50px</KTag>
				</KAffix>
			</div>

			<div style="display: inline-block; width: 50%">
				<KAffix triggerBottom={60} {listenTo} positionOption="absolute">
					<KTag>triggerBottom 60px</KTag>
				</KAffix>
			</div>
		</div>
	</div>
</div>
