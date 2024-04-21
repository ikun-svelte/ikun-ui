<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import type { KMenuInstance, KMenuInstanceOption, KMenuItemProps, SubMenuType } from './types';
	import { getPrefixCls, menuKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { KDivider } from '@ikun-ui/divider';
	import { KMenu } from '@ikun-ui/menu';
	import { getUidPath } from './utils';
	import { KPopover } from '@ikun-ui/popover';
	import type { OffsetsFunction, OffsetsFnPa  } from '@ikun-ui/popover';
	export let items: KMenuItemProps['items'] = [];
	export let cls: KMenuItemProps['cls'] = undefined;
	export let attrs: KMenuItemProps['attrs'] = {};
	export let level: KMenuItemProps['level'] = 1;
	export let ctxKey: KMenuItemProps['ctxKey'] = '';
	const dispatch = createEventDispatcher();
	const hasSub = (it: SubMenuType) => !!(it.children && it.children.length);
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
		if (level === 1) {
			itemsList = initOpenSelectedStatus().children;
		}
	}

	function initOpenSelectedStatus(list = itemsList, inGroup: boolean = false) {
		let res: SubMenuType[] = [];
		let deps: string[] = [];
		list.forEach((value) => {
			const defaultSelected = menuCtx.__selectedUids?.has(value.uid || '');
			const defaultOpen = menuCtx.__openUids?.has(value.uid || '');
			value.selected = defaultSelected;
			value.inGroup = inGroup
			menuCtx.syncSelectedItems(value, value.selected ? 'set' : 'delete');
			value.open = defaultOpen;
			if (defaultSelected) {
				deps.push(value.uid!);
			}

			if (hasSub(value) && ctxProps.mode === 'inline') {
				const recRes = initOpenSelectedStatus(value.children!);
				value.children = recRes.children;
				if (!isGroup(value)) {
					!value.selectedDeps && (value.selectedDeps = new Set());
					recRes.deps.forEach((d) => {
						value.selectedDeps!.add(d);
					});
					value.selected = !!value.selectedDeps.size;
					if (value.selected) {
						deps.push(value.uid!);
					}
				} else {
					deps = recRes.deps;
				}
			}

			if(hasSub(value) && ctxProps.mode === 'vertical'){
				const recRes = initOpenSelectedStatus(value.children!, isGroup(value));
				if (!isGroup(value)) {
					value.children = recRes.children;
					!value.selectedDeps && (value.selectedDeps = new Set());
					recRes.deps.forEach((d) => {
						value.selectedDeps!.add(d);
					});
					value.selected = !!value.selectedDeps.size;
					if (value.selected) {
						deps.push(value.uid!);
					}
				} else {
					const { children } = value
					value.children = []
					res.push({ ...value });
					res = res.concat(children!)
					deps = recRes.deps;
					return
				}
			}
			res.push({ ...value });
		});

		return {
			children: res,
			deps
		};
	}

	const menuCtx = getContext(menuKey) as KMenuInstance;
	let ctxProps: KMenuInstanceOption = {};
	let resolvedExpandIcon = 'i-carbon-chevron-down';
	function setExpandIcon() {
		resolvedExpandIcon =
			ctxProps.mode === 'vertical' ? `${ctxProps.expandIcon} -rotate-90` : ctxProps.expandIcon!;
	}
	function updatedCtxProps(props: Record<any, any>) {
		ctxProps = { ...props };
		menuCtx.syncUids(ctxProps.openUids || [], 'open');
		menuCtx.syncUids(ctxProps.selectedUids || [], 'selected');
		itemsList = initOpenSelectedStatus().children;
		setExpandIcon();
	}
	if (menuCtx) {
		ctxProps = { ...menuCtx.__dynamicProps };
		setExpandIcon();
		menuCtx.__propHandleEvtMap.push(updatedCtxProps);
		if (level === 1) {
			menuCtx.__org_items = items;
		}
	}

	function handleSelectedRecursion(
		e:
			| CustomEvent<{ selected: boolean; uid: string }>
			| { detail: { selected: boolean; uid: string } },
		index: number
	) {

		const { selected, uid } = e.detail;
		const it = itemsList[index];
		if (!isGroup(it)) {
			!it.selectedDeps && (it.selectedDeps = new Set());
			if (selected) {
				it.selectedDeps.add(uid);
			} else if (it.selectedDeps.has(uid)) {
				it.selectedDeps.delete(uid);
			}

			it.selected = !!it.selectedDeps.size;

			itemsList[index] = it;
			dispatch('selectedRecursion', {
				selected: it.selected,
				uid: it.uid
			});
		} else {
			dispatch('selectedRecursion', e.detail);
		}
	}

	function setOpenAndSelectStatus(it: SubMenuType, list = itemsList) {
		return list.map((value) => {
			if (value.uid === it.uid && !isGroup(it)) {
				// set selected
				if (ctxProps.selectable) {
					value.selected = !value.selected;
				}

				// set open
				if (hasSub(it)) {
					value.open = !value.open;
					if (value.selectedDeps && ctxProps.selectable) {
						value.selected = !!value.selectedDeps!.size;
					}

					if (menuCtx) {
						menuCtx.syncUids(value.uid!, 'open', value.open ? 'add' : 'delete');
						menuCtx.onOpenChange([...menuCtx.__openUids!]);
					}
				}

				if (ctxProps.selectable) {
					/**
					 * @internal
					 */
					dispatch('selectedRecursion', {
						selected: value.selected,
						uid: value.uid
					});
				}
			}
			if (hasSub(value)) {
				value.children = setOpenAndSelectStatus(it, value.children);
			}
			return value;
		});
	}
	async function handleSelect(it: SubMenuType, e: MouseEvent) {
		itemsList = setOpenAndSelectStatus(it);
		if (menuCtx) {
			const uidPath = getUidPath(it.uid!, menuCtx.__org_items!) || [];
			menuCtx.onClick({
				item: it,
				uid: it.uid!,
				uidPath,
				e
			});
			if (!hasSub(it) && !isGroup(it) && ctxProps.selectable) {
				menuCtx.syncUids(it.uid!, 'selected', it.selected ? 'add' : 'delete');
				menuCtx.syncSelectedItems(it, it.selected ? 'set' : 'delete');
				menuCtx.onSelect({
					item: it,
					uid: it.uid!,
					uidPath,
					selectedUids: [...menuCtx.__selectedUids!],
					selectedItems: Array.from(menuCtx.__selectedItems!.values()),
					selectedUidPaths: Array.from(menuCtx.__selectedItems!.keys()).map(
						(uid) => getUidPath(uid, menuCtx.__org_items!) || []
					),
					e
				});
			}
		}
	}

	const menuPrefixCls = getPrefixCls('menu');
	const prefixCls = getPrefixCls('menu-item');
	$: cnames = (it: SubMenuType) => {
		return clsx(
			prefixCls,
			{
				[`${prefixCls}-${ctxProps.mode}-group`]: isGroup(it),
				[`${prefixCls}-${ctxProps.mode}`]: !isGroup(it),
				[`${prefixCls}-selected`]: !isGroup(it) && !hasSub(it) && isNotHorizontal() && it.selected,
				[`${prefixCls}-selected-ih`]:
					!isGroup(it) && hasSub(it) && isNotHorizontal() && it.selected,
				[`${prefixCls}-hover-ih`]: !isGroup(it) && isNotHorizontal() && !it.selected,
				[`${prefixCls}-vh-child`]: !isGroup(it) && isNotHorizontal() && hasSub(it)
			},
			cls
		);
	};

	const iconCls = clsx(`${prefixCls}-icon`);
	const iconRootCls = clsx(`${prefixCls}-icon-root`);

	$: expendIconCls = (it: SubMenuType) => {
		if (ctxProps.mode === 'vertical') {
			return resolvedExpandIcon;
		}
		return it.open
			? `${resolvedExpandIcon} rotate-180 k-icon-transition`
			: `${resolvedExpandIcon} k-icon-transition`;
	};

	const titleContentCls = (hasIcon: boolean) => {
		return clsx({
			[`${menuPrefixCls}-title-content`]: !hasIcon,
			[`${menuPrefixCls}-title-content-i`]: hasIcon
		});
	};
	const dividerCls = clsx(`${prefixCls}-divider`);
	const subMenuCls = (isGroup: boolean) => {
		return clsx(`${menuPrefixCls}-sub`, {
			[`${menuPrefixCls}-sub-bg`]: !isGroup
		});
	};

	const popoverContentCls = clsx(`${prefixCls}-popover-content p-0 box-border`);
	const popoverTriggerCls = clsx(`${prefixCls}-popover-trigger-v`);
	$:getIndent = (it: SubMenuType) => {
		if(ctxProps.mode !== 'inline') {
			return `${it.inGroup ? (ctxProps.inlineIndent || 24) * 2 : ctxProps.inlineIndent}px`
		}
		return `${(ctxProps.inlineIndent || 24) * getLevel(it, level)}px`
	}

	const setPopoverOffset: OffsetsFunction  = ({popper, placement, reference}: OffsetsFnPa) => {
		return [popper.height / 2 - reference.height / 2, 4]
	}

</script>

{#each itemsList as it, index (it.uid)}
	{#if ctxProps.mode === 'inline'}
		{#if it.type !== 'divider'}
			<li
				on:click={(e) => handleSelect(it, e)}
				aria-hidden="true"
				style:padding-left={`${getIndent(it)}`}
				class={cnames(it)}
				{...$$restProps}
				{...attrs}
			>
				<slot name="item" item={it}>
					<span class={iconRootCls}>
						<slot name="icon" item={it} cls={iconCls}>
							{#if it.icon}
								<KIcon width="14px" cls={iconCls} height="14px" icon={it.icon}></KIcon>
							{/if}
						</slot>
						<span class={titleContentCls(!!it.icon)}>{it.label}</span>
					</span>

					{#if hasSub(it) && !isGroup(it)}
						<slot name="expandIcon" item={it} cls={iconCls}>
							<KIcon width="14px" cls={iconCls} height="14px" icon={expendIconCls(it)}></KIcon>
						</slot>
					{/if}
				</slot>
			</li>
			<!--render submenu-->
			<KMenu
				{...ctxProps}
				{ctxKey}
				show={(hasSub(it) && it.open) || isGroup(it)}
				cls={subMenuCls(isGroup(it))}
			>
				<svelte:self
					uid={it.uid}
					on:selectedRecursion={(e) => handleSelectedRecursion(e, index)}
					items={it.children}
					level={getLevel(it, level) + 1}
				>
					<svelte:fragment let:item slot="item">
						<slot name="item" {item}>
							<span class={iconRootCls}>
								<slot name="icon" {item}>
									{#if item.icon}
										<KIcon width="14px" cls={iconCls} height="14px" icon={item.icon}></KIcon>
									{/if}
								</slot>
								<span class={titleContentCls(!!item.icon)}>{item.label}</span>
							</span>

							{#if hasSub(item) && !isGroup(item)}
								<slot name="expandIcon" {item} cls={iconCls}>
									<KIcon width="14px" cls={iconCls} height="14px" icon={expendIconCls(item)}
									></KIcon>
								</slot>
							{/if}
						</slot>
					</svelte:fragment>
				</svelte:self>
			</KMenu>
		{:else}
			<KDivider cls={dividerCls}></KDivider>
		{/if}
	{/if}

	{#if ctxProps.mode === 'vertical'}
		<KPopover
			arrow={false}
			width="100%"
			placement="right"
			offset={setPopoverOffset}
			trigger={ctxProps.triggerSubMenuAction}
			cls={popoverContentCls}
			clsTrigger={popoverTriggerCls}
			disabled={!((hasSub(it)) || isGroup(it))}
		>
			<svelte:fragment slot="triggerEl">
				{#if it.type !== 'divider'}
					<li
						on:click={(e) => handleSelect(it, e)}
						aria-hidden="true"
						style:padding-left={`${getIndent(it)}`}
						class={cnames(it)}
						{...$$restProps}
						{...attrs}
					>
						<slot name="item" item={it}>
							<span class={iconRootCls}>
								<slot name="icon" item={it} cls={iconCls}>
									{#if it.icon}
										<KIcon width="14px" cls={iconCls} height="14px" icon={it.icon}></KIcon>
									{/if}
								</slot>
								<span class={titleContentCls(!!it.icon)}>{it.label}</span>
							</span>

							{#if hasSub(it) && !isGroup(it)}
								<slot name="expandIcon" item={it} cls={iconCls}>
									<KIcon width="14px" cls={iconCls} height="14px" icon={expendIconCls(it)}></KIcon>
								</slot>
							{/if}
						</slot>
					</li>
				{:else}
					<KDivider cls={dividerCls}></KDivider>
				{/if}
			</svelte:fragment>
			<div slot="contentEl">
				<KMenu
					{...ctxProps}
					{ctxKey}
					show={(hasSub(it)) && !isGroup(it)}
					cls={subMenuCls(false)}
				>
					<svelte:self
						uid={it.uid}
						on:selectedRecursion={(e) => handleSelectedRecursion(e, index)}
						items={it.children}
						level={getLevel(it, level) + 1}
					>
						<svelte:fragment let:item slot="item">
							<slot name="item" {item}>
								<span class={iconRootCls}>
									<slot name="icon" {item}>
										{#if item.icon}
											<KIcon width="14px" cls={iconCls} height="14px" icon={item.icon}></KIcon>
										{/if}
									</slot>
									<span class={titleContentCls(!!item.icon)}>{item.label}</span>
								</span>
								{#if hasSub(item)}
									<slot name="expandIcon" {item} cls={iconCls}>
										<KIcon width="14px" cls={iconCls} height="14px" icon={expendIconCls(item)}
										></KIcon>
									</slot>
								{/if}
							</slot>
						</svelte:fragment>
					</svelte:self>
				</KMenu>
			</div>
		</KPopover>
	{/if}
{/each}
