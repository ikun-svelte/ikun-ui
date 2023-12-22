<script>
	import { KDescriptions } from '@ikun-ui/descriptions';
	import { KDescriptionsItem } from '@ikun-ui/descriptions-item';
	import { KTag } from '@ikun-ui/tag';
	import { KRadioGroup } from '@ikun-ui/radio-group';
	import { KRadio } from '@ikun-ui/radio';
	import { KButton } from '@ikun-ui/button';

	let size = 'sm';
	const changeSize = (e) => {
		size = e.detail;
	};
</script>

<KRadioGroup value={size} on:updateValue={changeSize}>
	<KRadio uid="sm">sm</KRadio>
	<KRadio uid="md">md</KRadio>
	<KRadio uid="lg">lg</KRadio>
</KRadioGroup>

<KDescriptions cls="my-20px" title="With border" border {size}>
	<div slot="extra">
		<KButton>Options</KButton>
	</div>
	<KDescriptionsItem label="Username">ikun svelte</KDescriptionsItem>
	<KDescriptionsItem label="Telephone">18868686868</KDescriptionsItem>
	<KDescriptionsItem label="Place">Zhengzhou</KDescriptionsItem>
	<KDescriptionsItem label="Remarks">
		<KTag>🎤</KTag>
		<KTag>💃</KTag>
		<KTag>🤟</KTag>
		<KTag>🏀</KTag>
	</KDescriptionsItem>
	<KDescriptionsItem label="Address"
		>No.666, Jinshui District, Zhengzhou, Henan Province</KDescriptionsItem
	>
</KDescriptions>

<KDescriptions title="Without border" {size}>
	<div slot="extra">
		<KButton>Options</KButton>
	</div>
	<KDescriptionsItem label="Username">ikun svelte</KDescriptionsItem>
	<KDescriptionsItem label="Telephone">18868686868</KDescriptionsItem>
	<KDescriptionsItem label="Place">Zhengzhou</KDescriptionsItem>
	<KDescriptionsItem label="Remarks">
		<KTag>🎤</KTag>
		<KTag>💃</KTag>
		<KTag>🤟</KTag>
		<KTag>🏀</KTag>
	</KDescriptionsItem>
	<KDescriptionsItem label="Address"
		>No.666, Jinshui District, Zhengzhou, Henan Province</KDescriptionsItem
	>
</KDescriptions>
