<script lang="ts">
	import { KAvatar } from '@ikun-ui/avatar';
	import { KBadge } from '@ikun-ui/badge';
	import { KBreadcrumb } from '@ikun-ui/breadcrumb';
	import { KBreadcrumbItem } from '@ikun-ui/breadcrumb-item';
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
	import { KSpin } from '@ikun-ui/spin';
	import { KBacktop } from '@ikun-ui/backtop';
    import { KSlider } from '@ikun-ui/slider';
	import 'virtual:uno.css';

	let checked = true;
	let radioChecked = false;
	let openDrawer = false;
	let openModal = false;
	let inputValue = '';

	let badgeNumber = 98;

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

	const spinOptions = {
		show: false,
		text: 'loading...',
		fullScreen: true
	};

	const handleToggleSpin = () => {
		spinOptions.show = !spinOptions.show;
	};

	$: breadcrumbList = [
		{ label: 'home', href: '/' },
		{ label: 'breadcrumb', href: '' }
	];
	const addBreadcrumb = () => {
		breadcrumbList.push({ label: 'test', href: '' });
		breadcrumbList = breadcrumbList;
	};
	const delBreadcrumb = () => {
		breadcrumbList.pop();
		breadcrumbList = breadcrumbList;
	};
</script>

<div class="my-10px">
	<div class="my-10px">KInput</div>
	<KInput
		bind:value={inputValue}
		placeholder="inputValue"
		iconPrefix="i-carbon-settings"
		on:input={() => {
			console.log('on:input =>', inputValue);
		}}
		on:compositionInput={() => {
			console.log('on:compositionInput =>', inputValue);
		}}
	></KInput>
</div>

<div class="my-10px">
	<div class="mb-10px">Breadcrumb</div>
	<KBreadcrumb separator="/">
		{#each breadcrumbList as breadcrumb}
			<KBreadcrumbItem href={breadcrumb.href}>{breadcrumb.label}</KBreadcrumbItem>
		{/each}
	</KBreadcrumb>

	<KBreadcrumb separator="→" separatorIcon="i-carbon:arrow-right">
		{#each breadcrumbList as breadcrumb}
			<KBreadcrumbItem href={breadcrumb.href}>{breadcrumb.label}</KBreadcrumbItem>
		{/each}
	</KBreadcrumb>

	<div class="fi">
		<KButton cls="mt-10px" on:click={addBreadcrumb}>增加一个</KButton>
		<KButton cls="mt-10px ml-10px" on:click={delBreadcrumb}>删除一个</KButton>
	</div>
</div>

<KButton icon="i-carbon-settings" type="primary" on:click={() => (openDrawer = true)}>
	drawer
</KButton>

<div class="my-10px">
	<div>Button Type</div>
	<div class="flex flex-gap-2 p-2">
		<KButton>Normal Button</KButton>
		<KButton type="success">Success Button</KButton>
		<KButton type="error">Error Button</KButton>
		<KButton type="warning">Warning Button</KButton>
		<KButton type="info">Info Button</KButton>
		<KButton to="https://github.com/ikun-svelte/ikun-ui">Link Button</KButton>
	</div>
	<div>Button Size</div>
	<div class="flex-gap-2 p-2">
		<KButton cls="inline-flex" size="sm">SM Button</KButton>
		<KButton cls="inline-flex" size="md">MD Button</KButton>
		<KButton cls="inline-flex" size="lg">LG Button</KButton>
	</div>
	<div>Button Other Attrs</div>
	<div class="flex flex-gap-2 p-2">
		<KButton icon="i-carbon-settings" round="50">Icon Button</KButton>
		<KButton icon="i-carbon-settings" circle></KButton>
		<KButton isBorder>Border Button</KButton>
		<KButton disabled>Disabled Button</KButton>
	</div>
</div>

<div class="my-10px">
	<div class="my-10px">KButtonGroup Type & Size</div>
	<div class="flex-gap-2 p-2">
		<KButtonGroup type="success" size="sm">
			<KButton icon="i-carbon-settings" round="20"></KButton>
			<KButton icon="i-carbon-add">add</KButton>
			<KButton icon="i-carbon-edit">edit</KButton>
			<KButton icon="i-carbon-view">view</KButton>
			<KButton icon="i-carbon-trash-can" type="warning" size="md">delelte</KButton>
		</KButtonGroup>

		<KButtonGroup type="error" size="md">
			<KButton icon="i-carbon-settings" round="20"></KButton>
			<KButton icon="i-carbon-add">add</KButton>
			<KButton icon="i-carbon-edit">edit</KButton>
			<KButton icon="i-carbon-view">view</KButton>
			<KButton icon="i-carbon-trash-can" type="warning" size="md">delelte</KButton>
		</KButtonGroup>

		<KButtonGroup type="error" size="lg">
			<KButton icon="i-carbon-settings" round="20"></KButton>
			<KButton icon="i-carbon-add">add</KButton>
			<KButton icon="i-carbon-edit">edit</KButton>
			<KButton icon="i-carbon-view">view</KButton>
			<KButton icon="i-carbon-trash-can" type="warning" size="md">delelte</KButton>
		</KButtonGroup>
	</div>
	<div class="my-10px">KButtonGroup Other Attrs</div>
	<div class="flex-gap-2 p-2">
		<KButtonGroup type="success" size="md" disabled>
			<KButton icon="i-carbon-settings" round="20"></KButton>
			<KButton icon="i-carbon-add">add</KButton>
			<KButton icon="i-carbon-edit">edit</KButton>
			<KButton icon="i-carbon-view">view</KButton>
			<KButton icon="i-carbon-trash-can" type="warning" size="sm">delelte</KButton>
		</KButtonGroup>

		<KButtonGroup type="error" size="md" disabled={false}>
			<KButton icon="i-carbon-settings" round="20"></KButton>
			<KButton icon="i-carbon-add">add</KButton>
			<KButton icon="i-carbon-edit">edit</KButton>
			<KButton icon="i-carbon-view">view</KButton>
			<KButton icon="i-carbon-trash-can" type="warning" size="lg" disabled={true}>delelte</KButton>
		</KButtonGroup>

		<KButtonGroup type="warning" size="md" isBorder>
			<KButton icon="i-carbon-settings" round="20"></KButton>
			<KButton icon="i-carbon-add">add</KButton>
			<KButton icon="i-carbon-edit">edit</KButton>
			<KButton icon="i-carbon-view">view</KButton>
			<KButton icon="i-carbon-trash-can" type="primary" size="lg">delelte</KButton>
		</KButtonGroup>

		<KButtonGroup type="info" size="md" isBorder={false}>
			<KButton icon="i-carbon-settings" round="20"></KButton>
			<KButton icon="i-carbon-add">add</KButton>
			<KButton icon="i-carbon-edit">edit</KButton>
			<KButton icon="i-carbon-view">view</KButton>
			<KButton icon="i-carbon-trash-can" type="warning" size="sm" isBorder={true}>delelte</KButton>
		</KButtonGroup>
	</div>
	<div class="my-10px">KButtonGroup IconSize</div>
	<KButtonGroup iconSize={20}>
		<KButton icon="i-carbon-settings"></KButton>
		<KButton icon="i-carbon-add">add</KButton>
		<KButton icon="i-carbon-edit">edit</KButton>
		<KButton icon="i-carbon-view">view</KButton>
		<KButton icon="i-carbon-trash-can" iconSize={10}>delelte</KButton>
	</KButtonGroup>
</div>

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
	<KAvatar>User</KAvatar>
	<KAvatar icon="i-carbon-settings" size={30} radius="50%"></KAvatar>
	<KAvatar src="https://ikun-ui.netlify.app/logo.svg"></KAvatar>
	<KAvatar src="https://ikun-ui.netlify.app/logo.svg" size="60px" radius={8}></KAvatar>
	<KAvatar src="https://ikun-ui.netlify.app/logo.svg" size={100} radius="50%"></KAvatar>
</div>

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

<div class="my-10px">
	<KTag
		type="success"
		icon="i-carbon-settings"
		closeIcon="i-carbon-settings"
		closable
		on:click={(e) => console.log('KTag click', e)}
		on:close={(e) => console.log('KTag close', e)}
		>success KTag
	</KTag>
	<KTag type="info" icon="i-carbon-settings"></KTag>
	<KTag type="primary" icon="i-carbon-settings" closable textColor="black">primary KTag</KTag>
	<KTag type="error" closable>error KTag</KTag>
	<KTag type="warning" border bgColor="red" textColor="#ffffff">warning KTag</KTag>
</div>

<KButton on:click={handleNotify}>handleNotify</KButton>
<KButton on:click={handleMsgBox} type="info">handleMsgBox</KButton>
<KSwitch value={switchVal} on:updateValue={(v) => (switchVal = v.detail)}></KSwitch>

<KSelect value={selectVal} iconPrefix="i-carbon-settings" placeholder="selectValue">
	{#each ['Tiny', 'Small', 'Normal', 'Large', 'Huge'] as item (item)}
		<option>{item}</option>
	{/each}
</KSelect>
<KButton on:click={handleToggleSpin}>ToggleSpin</KButton>
<div use:KSpin={spinOptions} class="w-200px h-50px bg-red"></div>

<KBacktop bottom={100} right={100} show-height="100" />
<div class="px-4">
    <KSlider on:input={(v) => {console.log("ipnut", v.detail)}} on:change={(v) => {console.log("change", v.detail)}} >
        <div slot="buttonRender" class="text-6">🏀</div>
    </KSlider>
</div>
