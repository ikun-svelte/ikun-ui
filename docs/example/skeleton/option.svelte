<script lang="ts">
	import {
		KSkeletonImage,
		KSkeletonButton,
		KSkeletonInput,
		KSkeletonAvatar
	} from '@ikun-ui/skeleton';
	import { KCol, KRow } from '@ikun-ui/grid';
	import { KSwitch } from '@ikun-ui/switch';
	import { KFlex } from '@ikun-ui/flex';
	import { KSegmented, KSegmentedItem } from '@ikun-ui/segmented';
	import { KIcon } from '@ikun-ui/icon';
	let size = 'md';
	function changeSize(e) {
		size = e.detail;
	}

	let active = false;
	function changeActive(e) {
		active = e.detail;
	}

	let block = false;
	function changeBlock(e) {
		block = e.detail;
	}

	let shapeBtn = 'round';
	function changeBtn(e) {
		shapeBtn = e.detail;
	}

	let shapeAv = 'round';
	function changeAv(e) {
		shapeAv = e.detail;
	}
</script>

<KRow gutter={20} cls="my-4">
	<KCol span={6} align="center">
		<KFlex align="center">
			Active:
			<KSwitch value={active} on:updateValue={changeActive} cls="ml-2" />
		</KFlex>
	</KCol>
	<KCol span={10}>
		<KFlex align="center">
			Button and Input Block:
			<KSwitch value={block} on:updateValue={changeBlock} cls="ml-2" />
		</KFlex>
	</KCol>
	<KCol span={6}>
		<KFlex align="center">
			Size:
			<KSegmented on:change={changeSize} value={size} size="sm" cls="ml-2">
				<KSegmentedItem value="sm" label="sm" />
				<KSegmentedItem value="md" label="md" />
				<KSegmentedItem value="lg" label="lg" />
			</KSegmented>
		</KFlex>
	</KCol>
</KRow>

<KRow gutter={20} cls="my-4">
	<KCol span={12}>
		<KFlex align="center">
			<span class="text-[12px]"> Button Shape:</span>
			<KSegmented on:change={changeBtn} value={shapeBtn} size="sm" cls="ml-2">
				<KSegmentedItem value="circle" label="circle" />
				<KSegmentedItem value="round" label="round" />
				<KSegmentedItem value="square" label="square" />
			</KSegmented>
		</KFlex>
	</KCol>
	<KCol span={12}>
		<KFlex align="center">
			<span class="text-[12px]"> Avatar Shape:</span>
			<KSegmented on:change={changeAv} value={shapeAv} size="sm" cls="ml-2">
				<KSegmentedItem value="circle" label="circle" />
				<KSegmentedItem value="round" label="round" />
				<KSegmentedItem value="square" label="square" />
			</KSegmented>
		</KFlex>
	</KCol>
</KRow>

<KFlex align="center">
	<KSkeletonButton {active} {size} shape={shapeBtn} cls="mr-[16px]"></KSkeletonButton>
	<KSkeletonAvatar {active} {size} shape={shapeAv}></KSkeletonAvatar>
	<KSkeletonInput {active} {size} cls="ml-[16px]"></KSkeletonInput>
</KFlex>

<KFlex align="center" cls="my-6">
	<KSkeletonButton {active} {size} shape={shapeBtn} cls="mr-[16px]" {block}></KSkeletonButton>
</KFlex>
<KFlex align="center" cls="mb-4">
	<KSkeletonInput
		{active}
		{size}
		shape={shapeBtn}
		cls={`mr-[16px] ${block ? '' : 'w-200px'}`}
		{block}
	></KSkeletonInput>
</KFlex>

<KFlex align="center" cls="mb-4">
	<KSkeletonImage {active}></KSkeletonImage>
	<KSkeletonImage {active} cls="ml-4">
		<KIcon
			cls="k-skeleton-image--icon dark:(bg-ikun-stone-400)"
			icon="i-carbon-chart-scatter"
			width="50px"
			height="50px"
		></KIcon>
	</KSkeletonImage>
</KFlex>
