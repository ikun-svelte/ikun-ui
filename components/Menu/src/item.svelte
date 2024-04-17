<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	import { KIcon } from '@ikun-ui/icon';
	import type { KMenuInstance, KMenuInstanceOption, KMenuItemProps, SubMenuType } from './types';
	import { getPrefixCls, menuKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { KDivider } from '@ikun-ui/divider';
	import { KMenu } from '@ikun-ui/menu';
	export let items: KMenuItemProps['items'] = [];
	export let cls: KMenuItemProps['cls'] = undefined;
	export let attrs: KMenuItemProps['attrs'] = {};
	export let level: KMenuItemProps['level'] = 1;

	const hasSub = (it: SubMenuType) => it.children && it.children.length;
	const isNotHorizontal = () => ctxProps.mode !== 'horizontal';
	const isGroup = (it: SubMenuType) => it.type === 'group';
	const getLevel = (it: SubMenuType, lv: number) => {
		if (isGroup(it)) {
			return lv - 1;
		}
		return lv;
	};

	let itemsList = items;
	$: {
		itemsList = items;
		// itemsList = initOpenSelectedStatus()
	}
	function initOpenSelectedStatus(list = itemsList) {
		return list.map((value) => {
			const defaultSelected = ctxProps.selectedUids?.includes(value.uid || '')
			const defaultOpen = ctxProps.openUids?.includes(value.uid || '')
			value.selected = defaultSelected
			value.open = defaultOpen
			if (hasSub(value)) {
				value.children = initOpenSelectedStatus(value.children!);
			}
			return value;
		});
	}
	const menuCtx = getContext(menuKey) as KMenuInstance;
	let ctxProps: KMenuInstanceOption = {};
	function updatedCtxProps(props: Record<any, any>) {
		ctxProps = { ...props };
		itemsList = initOpenSelectedStatus()
	}
	if (menuCtx) {
		ctxProps = { ...menuCtx.__dynamicProps };
		itemsList = initOpenSelectedStatus()
		console.log(itemsList)
		menuCtx.__propHandleEvtMap.push(updatedCtxProps);
	}


	function handleSelectedRecursion(e: CustomEvent, index: number){
		const { selected, uid } = e.detail
		const it = itemsList[index]
		if(!isGroup(it)){
			!it.selectedDeps && (it.selectedDeps = new Set())
			if(selected){
				it.selectedDeps.add(uid)
			} else if(it.selectedDeps.has(uid)) {
				it.selectedDeps.delete(uid)
			}

			it.selected = !!it.selectedDeps.size;

			itemsList[index] = it
			dispatch('selectedRecursion', {
				selected: it.selected,
				uid: it.uid
			})
		} else {
			dispatch('selectedRecursion', e.detail)
		}

	}

	const dispatch = createEventDispatcher();
	function setOpenAndSelectStatus(it: SubMenuType, list = itemsList) {
		return list.map((value) => {
			if (value.uid === it.uid && !isGroup(it)) {
				// set selected
				value.selected = !value.selected;
				// set open
				if (hasSub(it)) {
					value.open = !value.open;
					value.selected = false
				}
				/**
				 * @internal
				 */
				dispatch('selectedRecursion', {
					selected: value.selected,
					uid: value.uid
				})
			}
			if (hasSub(value)) {
				value.children = setOpenAndSelectStatus(it, value.children);
			}
			return value;
		});
	}
	async function handleSelect(it: SubMenuType) {
		itemsList = setOpenAndSelectStatus(it);
	}

	const menuPrefixCls = getPrefixCls('menu');
	const prefixCls = getPrefixCls('menu-item');
	$: cnames = (it: SubMenuType) => {
		return clsx(
			prefixCls,
			{
				[`${prefixCls}-${ctxProps.mode}-group`]: isGroup(it),
				[`${prefixCls}-${ctxProps.mode}`]: !isGroup(it),
				[`${prefixCls}-selected`]:
				!isGroup(it) && !hasSub(it) && isNotHorizontal() && (it.selected),
				[`${prefixCls}-selected-ih`]:
				!isGroup(it) && hasSub(it) && isNotHorizontal() && (it.selected),
				[`${prefixCls}-hover-ih`]:
					!isGroup(it) &&
					isNotHorizontal() &&
					!(it.selected),
				[`${prefixCls}-vh-child`]: !isGroup(it) && isNotHorizontal() && hasSub(it)
			},
			cls
		);
	};

	const iconCls = clsx(`${prefixCls}-icon`);

	const expendIconCls = (it: SubMenuType) => {
		return it.open
			? `${ctxProps.expandIcon} rotate-180 k-icon-transition`
			: `${ctxProps.expandIcon} k-icon-transition`;
	};

	const titleContentCls = (hasIcon: boolean) => {
		return clsx({
			[`${menuPrefixCls}-title-content`]: !hasIcon,
			[`${menuPrefixCls}-title-content-i`]: hasIcon
		});
	};
	const dividerCls = clsx(`${prefixCls}-divider`);
	const subMenuCls = (isGroup: boolean) => {
		return clsx(
			`${menuPrefixCls}-sub`,
			{
				[`${menuPrefixCls}-sub-bg`]: !isGroup
			}
		);
	}
</script>

{#each itemsList as it, index (it.uid)}
	{#if it.type !== 'divider'}
		<li
			on:click={() => handleSelect(it)}
			aria-hidden="true"
			style:padding-left={`${(ctxProps.inlineIndent || 24) * getLevel(it, level)}px`}
			class={cnames(it)}
			{...$$restProps}
			{...attrs}
		>
			<slot name="item" item={it}>
				<slot name="icon" item={it}>
					{#if it.icon}
						<KIcon width="14px" cls={iconCls} height="14px" icon={it.icon}></KIcon>
					{/if}
				</slot>
				<span class={titleContentCls(!!it.icon)}>{it.label}</span>

				{#if hasSub(it) && !isGroup(it)}
					<slot name="expandIcon" item={it}>
						<KIcon width="14px"
							   cls={iconCls}
							   height="14px"
							   icon={expendIconCls(it)}></KIcon>
					</slot>
				{/if}
			</slot>
		</li>
		<!--render submenu-->
		<KMenu {...ctxProps} show={(hasSub(it) && it.open) || isGroup(it)} cls={subMenuCls(isGroup(it))}>
			<svelte:self
				on:selectedRecursion={(e) => handleSelectedRecursion(e, index)}
				items={it.children}
				level={getLevel(it, level) + 1}>
				<svelte:fragment let:item slot="item">
					<slot name="item" {item}>
						<slot name="icon" {item}>
							{#if item.icon}
								<KIcon width="14px" cls={iconCls} height="14px" icon={item.icon}></KIcon>
							{/if}
						</slot>
						<span class={titleContentCls(!!item.icon)}>self {item.label}</span>

						{#if hasSub(item) && !isGroup(item)}
							<slot name="expandIcon" {item}>
								<KIcon width="14px"
									   cls={iconCls}
									   height="14px"
									   icon={expendIconCls(item)}></KIcon>
							</slot>
						{/if}
					</slot>
				</svelte:fragment>
			</svelte:self>
		</KMenu>
	{:else}
		<KDivider cls={dividerCls}></KDivider>
	{/if}
{/each}
