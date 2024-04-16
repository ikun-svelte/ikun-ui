<script lang="ts">
	import { getContext, tick } from "svelte";
	import { KIcon } from "@ikun-ui/icon";
	import type { KMenuInstance, KMenuInstanceOption, KMenuItemProps, SubMenuType } from "./types";
	import { getPrefixCls, menuKey } from "@ikun-ui/utils";
	import { clsx } from "clsx";
	import { KDivider } from "@ikun-ui/divider";
	import { KMenu } from "@ikun-ui/menu";
	export let items: KMenuItemProps['items'] = [];
	export let cls: KMenuItemProps['cls'] = undefined;
	export let attrs: KMenuItemProps['attrs'] = {};
	export let level: KMenuItemProps['level'] = 1;

	const hasSub = (it: SubMenuType) => it.children && it.children.length
	const isNotHorizontal = () => ctxProps.mode !== 'horizontal'
	const isGroup = (it: SubMenuType) => it.type === 'group'
	const getLevel = (it: SubMenuType, lv: number) => {
		if(isGroup(it)){
			return lv - 1
		}
		return lv
	}


	const menuCtx = getContext(menuKey) as KMenuInstance
	let ctxProps:KMenuInstanceOption = {}
	function updatedCtxProps(props: Record<any, any>){
		ctxProps = {...props}
	}
	if(menuCtx){
		ctxProps = {...menuCtx.__dynamicProps}
		menuCtx.__propHandleEvtMap.push(updatedCtxProps)
	}


	let itemsList = items
	$: {
		itemsList = items
	}

	function setOpenAndSelectStatus(it: SubMenuType, list = itemsList){
		return list.map(value => {
			if(value.uid === it.uid && !isGroup(it)){
				// set selected
				it.selected = value.selected = !value.selected
				it.selected = value.selected = ctxProps.selectedUids?.includes(value.uid || '') || value.selected
				// set open
				it.open = value.open = !value.open
				it.open = value.open = ctxProps.openUids?.includes(value.uid || '') || value.open
			}
			if(hasSub(value)){
				it.children = value.children = setOpenAndSelectStatus(it, value.children)
			}
			return value
		})
	}
	async function handleSelect(it: SubMenuType){

		const parent = document.querySelector('#bwsy');
		// parent.style.maxHeight =  parent.scrollHeight + 'px';

		itemsList = setOpenAndSelectStatus(it)
		setTimeout(async () => {
			console.log(parent?.getClientRects().height)
			console.log(it.open, parent.scrollHeight)
			parent.style.height =  parent.scrollHeight + 'px';
		}, 100)

		await tick()
		setTimeout(() => {
			parent.style.height =  'auto'
			console.log('RRRRRRRRRRRRRRR')
		}, 500)
	}

	const menuPrefixCls = getPrefixCls('menu');
	const prefixCls = getPrefixCls('menu-item');
	$: cnames = (it: SubMenuType) => {
		return clsx(
			prefixCls,
			{
				[`${prefixCls}-${ctxProps.mode}-group`]: isGroup(it),
				[`${prefixCls}-${ctxProps.mode}`]: !isGroup(it),
				[`${prefixCls}-selected`]: !isGroup(it) && isNotHorizontal() && ctxProps.selectedUids?.includes(it.uid || '') || it.selected,
				[`${prefixCls}-hover-ih`]: !isGroup(it) && isNotHorizontal() && !(ctxProps.selectedUids?.includes(it.uid || '') || it.selected),
				[`${prefixCls}-vh-child`]: !isGroup(it) && isNotHorizontal() && hasSub(it)
			},
			cls);
	}

	const iconCls = clsx(
		`${prefixCls}-icon`,
		);

	const expendIconCls = (it: SubMenuType) => {
		return it.open ? `${ctxProps.expandIcon} rotate-180 k-icon-transition` : `${ctxProps.expandIcon} k-icon-transition`
	}

	const titleContentCls = (hasIcon: boolean) => {
		return clsx({
			[`${menuPrefixCls}-title-content`]: !hasIcon,
			[`${menuPrefixCls}-title-content-i`]: hasIcon
		})
	}
	const dividerCls = clsx(`${prefixCls}-divider`)
	$: subMenuCls = clsx(`${menuPrefixCls}-sub`, ctxProps.cls)
</script>

{#each itemsList as it (it.uid)}
	{#if it.type !== 'divider'}
		<li
			on:click={() => handleSelect(it)}
			aria-hidden="true"
			style:padding-left={`${(ctxProps.inlineIndent || 24 ) * getLevel(it, level)}px`}
			class={cnames(it)}
			{...$$restProps}
			{...attrs}>
			<slot name="item" item={it}>
				<div>
					<slot name="icon" item={it}>
						{#if it.icon}
							<KIcon width="14px"
										 cls={iconCls}
										 height="14px"
										 icon={it.icon}>
							</KIcon>
						{/if}
					</slot>
					<span class={titleContentCls(!!it.icon)}>{it.label}</span>
				</div>

				{#if hasSub(it) && !isGroup(it)}
					<slot name="expandIcon" item={it}>
						<KIcon width="14px"
									 cls={iconCls}
									 height="14px"
									 icon={expendIconCls(it)}>
						</KIcon>
					</slot>
				{/if}
			</slot>


		</li>

		{#if (hasSub(it) && it.open) || isGroup(it)}
			<KMenu {...ctxProps} cls={subMenuCls}>
				<svelte:self items={it.children} level={getLevel(it, level) + 1}>
					<svelte:fragment let:item slot="item">


						<slot name="item" item={item}>
							<div>
								<slot name="icon" item={item}>
									{#if item.icon}
										<KIcon width="14px"
													 cls={iconCls}
													 height="14px"
													 icon={item.icon}>
										</KIcon>
									{/if}
								</slot>
								<span class={titleContentCls(!!item.icon)}>self {item.label}</span>
							</div>

							{#if hasSub(item) && !isGroup(item)}
								<slot name="expandIcon" item={item}>
									<KIcon width="14px"
												 cls={iconCls}
												 height="14px"
												 icon={expendIconCls(item)}>
									</KIcon>
								</slot>
							{/if}

						</slot>

					</svelte:fragment>
				</svelte:self>
			</KMenu>
		{/if}
		{:else}
		<KDivider cls={dividerCls}></KDivider>
	{/if}
{/each}

