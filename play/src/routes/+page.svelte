<script lang="ts">
	import { KBadge } from '@ikun-ui/badge';
	import { KButton } from '@ikun-ui/button';
	import { KButtonGroup } from '@ikun-ui/button-group';
	import { KIcon } from '@ikun-ui/icon';
	import { KCollapse } from '@ikun-ui/collapse';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KDrawer } from '@ikun-ui/drawer';
	import { KEyeDropper } from '@ikun-ui/eye-dropper';
	import { KInput } from '@ikun-ui/input';
	import { KPopover } from '@ikun-ui/popover';
	import { KTooltip } from '@ikun-ui/tooltip';
	import { KModal } from '@ikun-ui/modal';
	import { KTag } from '@ikun-ui/tag';
	import { KNotify } from '@ikun-ui/notify';
	import { KSwitch } from '@ikun-ui/switch';
	import { KSelect } from '@ikun-ui/select';
	import { KMsgBox } from '@ikun-ui/message-box';
	import { KRadio } from '@ikun-ui/radio';
	import 'virtual:uno.css';
	import { KForm, createKFormInstance, KFormItem } from '@ikun-ui/form';
	import type { IKunFormInstance } from '@ikun-ui/utils';
	let checked = true;
	let radioChecked = false;
	let openDrawer = false;
	let openModal = false;
	let inputValue = '';

	let badgeNumber = 98;
	let form: IKunFormInstance = createKFormInstance();

	const handleNotify = () => {
		KNotify.success({
			title: 'Notify Success',
			duration: 99999,
			autoClose: true,
			content: 'Notify Success'
		});
	};

	const handleMsgBox = () => {
		KMsgBox.prompt({
			title: 'message box title',
			content: 'message box content',
			layout: 'center',
			inputValidator: /[a-z]/,
			inputErrorMessage: '只能输入英文',
			onCancel: () => {
				console.log('onCancel');
			},
			onConfirm: (r, v) => {
				console.log('onConfirm', r, v);
			}
		});
	};

	let switchVal = false;
	let selectVal = '';
</script>

<KForm bind:form>
	----Form----
	<KFormItem label={'name'} field={'name'}>
		<KInput placeholder="inputValue"></KInput>
	</KFormItem>
	<KFormItem label={'password'} field={'password'}>
		<KInput placeholder="inputValue"></KInput>
	</KFormItem>

	<KFormItem field={'another'}>
		<KFormItem label={'a'} field={'a'}>
			<KInput placeholder="inputValue"></KInput>
		</KFormItem>
		<KFormItem label={'b'} field={'b'}>
			<KInput placeholder="inputValue"></KInput>
		</KFormItem>
	</KFormItem>
	<KFormItem label={'accept'} field={'accept'}>
		<KCheckbox></KCheckbox>
	</KFormItem>
	<KFormItem label={'darkMode'} field={'darkMode'}>
		<KSwitch></KSwitch>
	</KFormItem>
	<KFormItem label={'Ikun'} field={'Ikun'}>
		<KRadio></KRadio>
	</KFormItem>
	<KFormItem label={'select'} field={'select'}>
		<KSelect value={selectVal} iconPrefix="i-carbon-settings" placeholder="selectValue">
			{#each ['Tiny', 'Small', 'Normal', 'Large', 'Huge'] as item (item)}
				<option>{item}</option>
			{/each}
		</KSelect>
	</KFormItem>

	<KButton on:click={() => console.log(form.submit())}>Submit</KButton>
	<KButton
		on:click={() => {
			form.setValues({
				name: 'ikun',
				password: '1145142333',
				another: { a: 1, b: 2 },
				accept: true,
				darkMode: true,
				Ikun: true,
				select: 'Large'
			});
		}}>setValue</KButton
	>
	----Form----
</KForm>
<div class="flex fle-gap-2 p-2">
	<KButton>Normal Button</KButton>
	<KButton disabled>Disabled Button</KButton>
	<KButton to="https://github.com/ikun-svelte/ikun-ui">Link</KButton>
</div>
<KButton icon="i-carbon-settings" type="primary" on:click={() => (openDrawer = true)}>
	drawer
</KButton>

<KButtonGroup cls="my-10px">
	<KButton icon="i-carbon-settings" type="primary" round="10">drawer</KButton>
	<KButton icon="i-carbon-settings" type="primary">drawer</KButton>
	<KButton icon="i-carbon-settings" type="primary">drawer</KButton>
</KButtonGroup>

<KIcon icon="i-carbon-settings" btn></KIcon>
<KCollapse>
	<span slot="title">title</span>
	<span slot="content">content</span>
</KCollapse>
<KCheckbox value={checked} on:updateValue={(e) => (checked = e.detail)} label={`${checked}`}
></KCheckbox>
<KRadio
	value={radioChecked}
	on:updateValue={(e) => (radioChecked = e.detail)}
	label={`${radioChecked}`}
></KRadio>
<KDrawer value={openDrawer} on:close={() => (openDrawer = false)}>KDrawer</KDrawer>
<KEyeDropper let:open>
	<KButton type="primary" on:click={() => open()}>KEyeDropper</KButton>
</KEyeDropper>

<KInput value={inputValue} placeholder="inputValue" iconPrefix="i-carbon-settings"></KInput>

<KTooltip content="KTooltip - content" placement="bottom">
	<KButton type="warning" slot="triggerEl">KTooltip - trigger</KButton>
</KTooltip>

<KPopover placement="bottom">
	<span slot="contentEl">KPopover - content</span>
	<KButton type="error" slot="triggerEl">KPopover - trigger</KButton>
</KPopover>

<KButton icon="i-carbon-settings" to type="success" on:click={() => (openModal = true)}>
	KModal
</KButton>

<div class="my-10px">
	<div class="mb-10px">KBadge</div>
	<KBadge cls="mr-40px" value={badgeNumber}>
		<KButton on:click={() => badgeNumber++}>Click Me</KButton>
	</KBadge>

	<KBadge cls="mr-40px" value="new" type="success">
		<KButton>IKunUI</KButton>
	</KBadge>

	<KBadge cls="mr-40px" value="new" type="success" isDot>
		<KButton>IKunUI</KButton>
	</KBadge>

	<KBadge cls="mr-40px" value="Can't See Me" show={false}>
		<KButton>IKunUI</KButton>
	</KBadge>
</div>

<KModal show={openModal} title="KModal" on:close={(v) => (openModal = v.detail)}>
	<span>KModal</span>
</KModal>

<KTag type="success">success KTag</KTag>
<KTag type="info">info KTag</KTag>
<KTag type="primary">primary KTag</KTag>
<KTag type="error">error KTag</KTag>
<KTag type="warning">warning KTag</KTag>

<KButton on:click={handleNotify}>handleNotify</KButton>
<KButton on:click={handleMsgBox} type="info">handleMsgBox</KButton>
<KSwitch value={switchVal} on:updateValue={(v) => (switchVal = v.detail)}></KSwitch>

<KSelect value={selectVal} iconPrefix="i-carbon-settings" placeholder="selectValue">
	{#each ['Tiny', 'Small', 'Normal', 'Large', 'Huge'] as item (item)}
		<option>{item}</option>
	{/each}
</KSelect>
