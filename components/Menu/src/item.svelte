<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, onMount, tick } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import type { KMenuInstance, KMenuInstanceOption, KMenuItemProps, SubMenuType } from './types';
	import { getPrefixCls, menuKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { KDivider } from '@ikun-ui/divider';
	import KMenu from './index';
	import { getUidPath } from './utils';
	import { KPopover } from '@ikun-ui/popover';
	import { KTooltip } from '@ikun-ui/tooltip';
	import type { OffsetsFunction, OffsetsFnPa } from '@ikun-ui/popover';
	import { jsonClone } from 'baiwusanyu-utils';
	import { BROWSER } from 'esm-env';
	export let items: KMenuItemProps['items'] = [];
	export let cls: KMenuItemProps['cls'] = undefined;
	export let attrs: KMenuItemProps['attrs'] = {};
	export let level: KMenuItemProps['level'] = 1;
	export let ctxKey: KMenuItemProps['ctxKey'] = '';

	const dispatch = createEventDispatcher();
	const hasSub = (it: SubMenuType) => !!(it.children && it.children.length);
	const isNotHorizontalTop = () => {
		if (ctxProps.mode === 'horizontal') {
			return level > 1;
		}
		return true;
	};
	const isGroup = (it: SubMenuType) => it.type === 'group';
	const getLevel = (it: SubMenuType, lv: number) => {
		if (isGroup(it)) {
			return Math.max(lv - 1, 1);
		}
		return lv;
	};

	let itemsList = level === 1 ? jsonClone(items) : items;
	$: {
		itemsList = level === 1 ? jsonClone(items) : items;
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
			value.inGroup = inGroup;
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

			if (hasSub(value) && ctxProps.mode !== 'inline') {
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
					const { children } = value;
					value.children = [];
					res.push({ ...value });
					res = res.concat(children!);
					deps = recRes.deps;
					return;
				}
			}
			res.push({ ...value });
		});

		return {
			children: res,
			deps
		};
	}

	const menuCtx = getContext(ctxKey || menuKey) as KMenuInstance;
	let ctxProps: KMenuInstanceOption = {};

	function updatedCtxProps(props: Record<any, any>) {
		ctxProps = { ...props };
		menuCtx.syncUids(ctxProps.openUids || [], 'open');
		menuCtx.syncUids(ctxProps.selectedUids || [], 'selected');
		itemsList = initOpenSelectedStatus().children;
	}
	if (menuCtx) {
		ctxProps = { ...menuCtx.__dynamicProps };
		menuCtx.__propHandleEvtMap.push(updatedCtxProps);
		if (level === 1) {
			menuCtx.__org_items = items;
		}
	}

	function handleSelectedRecursion(
		e: CustomEvent<{ selected: boolean; uid: string; isLeaf: boolean; item: SubMenuType }>,
		index: number
	) {
		const { selected, uid } = e.detail;
		const it = itemsList[index] || moreItem;
		if (!isGroup(it)) {
			!it.selectedDeps && (it.selectedDeps = new Set());
			if (selected) {
				it.selectedDeps.add(uid);
			} else if (it.selectedDeps.has(uid)) {
				it.selectedDeps.delete(uid);
			}

			it.selected = !!it.selectedDeps.size;

			// 重置当前点击层所在树的其他项选择状态
			if (!ctxProps.multiple && e.detail.isLeaf) {
				if (it.selected && itemsList[index]) {
					itemsList = cancelSelected(itemsList, it);
					if (hasSub(it)) {
						it.children = cancelSelected(it.children!, e.detail.item);
					}
				}
				if (level === 1) {
					// 到第一层时如果是单选，则遍历取消其他项的选择状态
					if (itemsList[index]) {
						itemsList = cancelSelected(itemsList, it);
					} else {
						itemsList = cancelSelected(itemsList, e.detail.item);
					}
				}
			}

			if (itemsList[index]) {
				itemsList[index] = it;
			} else {
				moreItem = it;
			}
			dispatch('selectedRecursion', {
				selected: it.selected,
				uid: it.uid,
				isLeaf: e.detail.isLeaf,
				item: it
			});
		} else {
			dispatch('selectedRecursion', e.detail);
		}
		onSubItemSelect(index);
	}

	function cancelSelected(list: SubMenuType[], it: SubMenuType) {
		return list.map((value) => {
			if (!ctxProps.multiple && value.uid !== it.uid && !isGroup(it)) {
				value.selected = false;
				value.selectedDeps && value.selectedDeps.clear();
				menuCtx.syncUids(value.uid!, 'selected', 'delete');
				menuCtx.syncSelectedItems(value, 'delete');
				if (hasSub(value)) {
					value.children = cancelSelected(value.children!, it);
				}
			}
			return value;
		});
	}

	function setOpenAndSelectStatus(it: SubMenuType, list = itemsList, parentOpen?: boolean) {
		return list.map((value) => {
			if (value.uid === it.uid && !isGroup(it)) {
				// set selected
				const resolveSelected = !value.selected;
				if (ctxProps.selectable && !hasSub(it)) {
					// 重置当前点击层其他项选择状态
					if (!ctxProps.multiple && resolveSelected) {
						list = cancelSelected(list, it);

						if (moreItem.children && moreItem.children.length > 0) {
							moreItem.children = cancelSelected(moreItem.children, it);
							moreItem.selected = false;
							moreItem.selectedDeps && moreItem.selectedDeps.clear();
						}
					}
					value.selected = resolveSelected;
				}

				// set open
				if (hasSub(it)) {
					const orgOpen = value.open;
					if (value.selectedDeps && ctxProps.selectable) {
						value.selected = !!value.selectedDeps!.size;
					}

					if (menuCtx) {
						if ((ctxProps.mode === 'vertical' && !orgOpen) || ctxProps.mode !== 'vertical') {
							value.open = !value.open;
							menuCtx.syncUids(value.uid!, 'open', value.open ? 'add' : 'delete');
							menuCtx.onOpenChange([...menuCtx.__openUids!]);
						}
					}
				}

				if (ctxProps.selectable) {
					/**
					 * @internal
					 */
					dispatch('selectedRecursion', {
						selected: value.selected,
						uid: value.uid,
						isLeaf: !hasSub(value),
						item: value
					});
				}
			}

			if (ctxProps.mode !== 'inline' && parentOpen !== undefined && hasSub(it) && !isGroup(it)) {
				value.open = false;
				if (menuCtx) {
					menuCtx.syncUids(value.uid!, 'open', 'delete');
				}
			}

			if (hasSub(value)) {
				value.children = setOpenAndSelectStatus(it, value.children, value.open);
			}
			return value;
		});
	}
	async function handleSelect(it: SubMenuType, e: MouseEvent) {
		if (it.disabled || it.disabledParent) return;
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
				const params = {
					item: it,
					uid: it.uid!,
					uidPath,
					selectedUids: [...menuCtx.__selectedUids!],
					selectedItems: Array.from(menuCtx.__selectedItems!.values()),
					selectedUidPaths: Array.from(menuCtx.__selectedItems!.keys()).map(
						(uid) => getUidPath(uid, menuCtx.__org_items!) || []
					),
					e
				};
				if (it.selected) {
					menuCtx.onSelect(params);
				} else {
					menuCtx.onDeSelect(params);
				}
			} else if (hasSub(it) || isGroup(it)) {
				dispatchTitleClick(it, e, uidPath);
			}
		}
	}

	function dispatchTitleClick(it: SubMenuType, e: MouseEvent, uidPath: string[]) {
		dispatch('titleClick', {
			it,
			e,
			uidPath
		});
	}

	let popoverRef: any = [];
	let subMenuRef: any = [];
	let isDirty = true;
	async function showSubMenuPopover() {
		ctxProps.mode !== 'inline' &&
			isDirty &&
			subMenuRef.forEach((ref: any) => {
				ref && ref.showPopoverManual && ref.showPopoverManual();
			});
		isDirty = false;
	}
	let hiddenIndex: Set<number> = new Set();
	export function showPopoverManual() {
		if (level === 1) {
			popoverRef.forEach((ref: any, index: number) => {
				if (hiddenIndex.has(index)) return;
				const it = itemsList[index] || moreItem;
				if (it.open) {
					ref && ref.updateShow && ref.updateShow(it.open);
				}
			});
		} else {
			setTimeout(() => {
				popoverRef.forEach((ref: any, index: number) => {
					const it = itemsList[index] || moreItem;
					if (it.open) {
						ref && ref.updateShow && ref.updateShow(it.open);
					}
				});
			}, 300);
		}
	}

	let parentDom: HTMLElement | null = null;
	let itemEls: HTMLElement[] | null = null;
	let prevParentDomWidth = -1;
	let ops = Array(items.length).fill(level === 1 ? '0' : '1');
	let widths = Array(items.length).fill(level === 1 ? 'auto' : '100%');
	let moreItems: Array<{
		item: SubMenuType;
		width: number;
		index: number;
	}> = [];
	$: showMoreItems = moreItems.length;
	let moreItem: SubMenuType = {};
	function genMoreItem(
		mIt: Array<{
			item: SubMenuType;
			width: number;
			index: number;
		}>
	) {
		const open = mIt.some((it) => {
			return it.item.open;
		});
		const selected = mIt.some((it) => {
			return it.item.selected;
		});

		moreItem = {
			children: mIt.map((it) => it.item),
			selected,
			uid: 'more-item',
			open
		} as SubMenuType;

		if (popoverRef[itemsList.length]) {
			isDirty = true;
			showPopoverManual();
		}
	}
	$: {
		genMoreItem(moreItems);
	}
	function adjustLayout() {
		if (parentDom && level === 1) {
			let resolvedMoreItems = moreItems;
			const parentWidth = parentDom.offsetWidth;
			let toS = false;
			let init = false;
			if (prevParentDomWidth === -1) {
				init = true;
				prevParentDomWidth = parentWidth;
			}

			if (prevParentDomWidth < parentWidth) {
				toS = false;
			}

			if (prevParentDomWidth > parentWidth) {
				toS = true;
			}
			prevParentDomWidth = parentWidth;

			let totalWidth = 0;
			itemEls!.forEach((child: any, index: number) => {
				const offsetWidth = (child as HTMLElement).offsetWidth;
				totalWidth += offsetWidth;
				if (totalWidth > parentWidth && (toS || init)) {
					(child as HTMLElement).style.opacity = '0';
					(child as HTMLElement).style.height = '0';
					(child as HTMLElement).style.overflowY = 'hidden';
					(child as HTMLElement).style.position = 'absolute';
					(child as HTMLElement).style.pointerEvents = 'none';
					widths[index] = '0';
					if (popoverRef[index] && itemsList[index].open) {
						popoverRef[index] &&
							popoverRef[index].updateShow &&
							popoverRef[index].updateShow(false);
					}
					const has = resolvedMoreItems.some((it) => it.index === index);
					if (!has) {
						resolvedMoreItems.push({
							index,
							item: itemsList[index],
							width: offsetWidth
						});
						moreItems = [...resolvedMoreItems];
					}
					hiddenIndex.add(index);
					init &&
						(moreItems = [
							...resolvedMoreItems.sort((a, b) => {
								return b.index - a.index;
							})
						]);
				} else {
					ops[index] = '1';
				}
			});

			if (toS === false && !init) {
				let spaceAvailable = Math.abs(totalWidth - parentWidth);
				const moreItemsLen = resolvedMoreItems.length;
				const lastItem = resolvedMoreItems[moreItemsLen - 1];
				if (lastItem) {
					const lastItemWidth = lastItem.width;
					if (resolvedMoreItems.length > 0 && spaceAvailable >= lastItemWidth) {
						const index = resolvedMoreItems.pop()!.index;
						moreItems = [...resolvedMoreItems];
						const dom = itemEls![index];
						if (dom) {
							(dom as HTMLElement).style.opacity = '1';
							(dom as HTMLElement).style.removeProperty('height');
							(dom as HTMLElement).style.removeProperty('overflow-y');
							(dom as HTMLElement).style.removeProperty('position');
							(dom as HTMLElement).style.removeProperty('pointer-events');
							widths[index] = 'auto';
							hiddenIndex.delete(index);
							if (popoverRef[index] && itemsList[index].open) {
								isDirty = true;
								popoverRef[index] &&
									popoverRef[index].updateShow &&
									popoverRef[index].updateShow(true);
							}
						}
					}
				}
			}
		}
	}

	onMount(async () => {
		if (level === 1 && ctxProps.mode === 'vertical') {
			showPopoverManual();
		}
		if (BROWSER && level === 1 && ctxProps.mode == 'horizontal') {
			parentDom = menuCtx.getParentDom()!;
			if (parentDom) {
				itemEls = Array.from(parentDom.querySelectorAll('[data-k-menu-h="1"]'));
			}
			adjustLayout();
			await tick();
			window.addEventListener('resize', adjustLayout);
			showPopoverManual();
		}
		menuCtx.removeBorderStyleBg();
	});

	onDestroy(() => {
		if (BROWSER) {
			window.removeEventListener('resize', adjustLayout);
		}
	});

	const menuPrefixCls = getPrefixCls('menu');
	const prefixCls = getPrefixCls('menu-item');
	$: isDark = (it: SubMenuType) =>
		(it.theme || ctxProps.theme) === 'dark' || (it.theme || ctxProps.theme) === undefined;
	$: themeValue = (it: SubMenuType) => it.theme || ctxProps.theme;
	$: cnames = (it: SubMenuType) => {
		let basicCls = {
			[`${prefixCls}-active`]: (!isGroup(it) && isNotHorizontalTop()) || ctxProps.mode === 'inline',
			[`${prefixCls}__dark`]: isGroup(it) && isDark(it),

			[`${prefixCls}-selected-danger`]:
				!isGroup(it) && !hasSub(it) && isNotHorizontalTop() && it.selected && it.danger,

			[`${prefixCls}-selected-danger__dark`]:
				!isGroup(it) &&
				!hasSub(it) &&
				isNotHorizontalTop() &&
				it.selected &&
				it.danger &&
				isDark(it),

			[`${prefixCls}-danger`]: it.danger,

			[`${prefixCls}-selected`]:
				!isGroup(it) && !hasSub(it) && isNotHorizontalTop() && it.selected && !it.danger,
			[` ${prefixCls}-selected__dark`]:
				!isGroup(it) &&
				!hasSub(it) &&
				isNotHorizontalTop() &&
				it.selected &&
				!it.danger &&
				isDark(it),

			[`${prefixCls}-selected-group`]:
				!isGroup(it) && hasSub(it) && isNotHorizontalTop() && it.selected,
			[`${prefixCls}-hover`]: !isGroup(it) && isNotHorizontalTop() && !it.selected,

			[`${prefixCls}-selected-h`]:
				!isGroup(it) && !hasSub(it) && !isNotHorizontalTop() && it.selected,
			[`${prefixCls}-selected-group-h`]:
				!isGroup(it) && hasSub(it) && !isNotHorizontalTop() && it.selected,
			[`${prefixCls}-hover-h`]: !isGroup(it) && !isNotHorizontalTop() && !it.selected
		};
		if (it.disabled || it.disabledParent) {
			basicCls = {
				[`${prefixCls}-disabled`]: level !== 1,
				[`${prefixCls}-disabled__dark`]: isDark(it),
				[`${prefixCls}-disabled-l1`]: level === 1
			};
			if (hasSub(it)) {
				it.children = it.children!.map((item) => {
					return {
						...item,
						disabledParent: true
					};
				});
			}
		}
		return clsx(
			prefixCls,
			{
				[`${prefixCls}-${ctxProps.mode}-group`]: isGroup(it),
				[`${prefixCls}-${ctxProps.mode}`]:
					!isGroup(it) || (ctxProps.mode === 'horizontal' && level === 1),
				[`${prefixCls}-${ctxProps.mode}-not-top`]: !isGroup(it) && isNotHorizontalTop(),
				...basicCls,
				[`${prefixCls}-child`]: !isGroup(it) && hasSub(it)
			},
			cls
		);
	};

	$: iconCls = (it: SubMenuType) => {
		return clsx(`${prefixCls}-icon`, {
			[`${prefixCls}-icon__dark`]: isDark(it)
		});
	};
	const iconRootCls = (isInlineCollapsed?: boolean) => {
		return clsx({
			[`${prefixCls}-icon-root`]: !isInlineCollapsed,
			[`${prefixCls}-icon-root--collapsed`]: isInlineCollapsed
		});
	};

	$: expendIconCls = (it: SubMenuType) => {
		const icon = ctxProps.expandIcon || 'i-carbon-chevron-down ';
		if (ctxProps.mode !== 'inline') {
			return `${icon} -rotate-90`;
		}
		return it.open ? `${icon} rotate-180 k-icon-transition` : `${icon} k-icon-transition`;
	};

	const titleContentCls = (hasIcon: boolean) => {
		return clsx({
			[`${menuPrefixCls}-title-content`]: !hasIcon,
			[`${menuPrefixCls}-title-content-i`]: hasIcon
		});
	};
	const dividerCls = clsx({
		[`${prefixCls}-divider`]: isNotHorizontalTop(),
		[`${prefixCls}-divider-horizontal`]: !isNotHorizontalTop()
	});
	const subMenuCls = (isGroup: boolean) => {
		return clsx(`${menuPrefixCls}-sub`, `${menuPrefixCls}-sub-${ctxProps.mode}`, {
			[`${menuPrefixCls}-sub-bg`]: !isGroup
		});
	};

	$: popoverContentCls = (it?: SubMenuType) => {
		return clsx(`${prefixCls}-popover-content`, it?.popupClassName);
	};
	const popoverTriggerCls = (isDivider: boolean = false) => {
		return clsx({
			[`${prefixCls}-popover-trigger-${ctxProps.mode}`]: !isDivider && isNotHorizontalTop(),
			[`${prefixCls}-popover-trigger-${ctxProps.mode}-divider`]: isDivider && !isNotHorizontalTop()
		});
	};
	$: getIndent = (it: SubMenuType, isInlineCollapsed?: boolean) => {
		// horizontal mode
		if (ctxProps.mode === 'horizontal' && level === 1) return '16px';
		// inline mode
		if (isInlineCollapsed) return '';
		// vertical mode
		if (ctxProps.mode !== 'inline') {
			return `${it.inGroup ? (ctxProps.inlineIndent || 24) * 2 : ctxProps.inlineIndent}px`;
		}
		return `${(ctxProps.inlineIndent || 24) * getLevel(it, level)}px`;
	};
	const setPopoverOffset: OffsetsFunction = ({ popper, reference }: OffsetsFnPa) => {
		if (ctxProps.mode === 'horizontal' && level === 1) {
			return [0, 4];
		}
		return [popper.height / 2 - reference.height / 2, 4];
	};
	const popoverContentWidth = (index: number) => {
		const ref = popoverRef[index];
		if (ref) {
			const triggerEl = ref.getPopoverContainerRef();
			const { width } = triggerEl.getBoundingClientRect();
			return `${width}px`;
		}
		return '100%';
	};

	const resolveLabel = (it: SubMenuType, isInlineCollapsed?: boolean) => {
		if (!it.label) return '';
		if (!isInlineCollapsed) return it.label;
		return isInlineCollapsed && !it.icon ? it.label[0] : it.label;
	};

	const resolveDisabledTooltip = (it: SubMenuType, isInlineCollapsed?: boolean) => {
		// 有子节点的不显示
		if ((it.children && it.children.length > 0 && it.type !== 'group') || !isInlineCollapsed) {
			return true;
			// 收起时且非水平模式
		} else {
			return false;
		}
	};

	const resolveTitle = (it: SubMenuType, isInlineCollapsed?: boolean, isTooltip?: boolean) => {
		let res = '';
		// 有子节点的不显示
		if (it.children && it.children.length > 0 && it.type !== 'group') {
			res = '';
			// 收起时且非水平模式
		} else if (isInlineCollapsed && ctxProps.mode !== 'horizontal') {
			res = it.title || it.label || '';
			if (!isTooltip) {
				res = '';
			}
			// 收起时或水平模式无默认值，只展示 title
		} else if (!isInlineCollapsed || ctxProps.mode === 'horizontal') {
			res = it.title || '';
		}
		return res;
	};

	function clearVerticalOpenStatus(it: SubMenuType, list = itemsList) {
		return list.map((value) => {
			if (value.uid === it.uid && !isGroup(it)) {
				// set open
				if (hasSub(it)) {
					value.open = false;
					if (menuCtx) {
						menuCtx.syncUids(value.uid!, 'open', 'delete');
						menuCtx.onOpenChange([...menuCtx.__openUids!]);
					}
				}
			}

			if (hasSub(value)) {
				value.children = clearVerticalOpenStatus(it, value.children);
			}
			return value;
		});
	}
	function onVerticalPopoverChange(it: SubMenuType, e: CustomEvent) {
		if (it.disabled || it.disabledParent || e.detail) return;
		itemsList = clearVerticalOpenStatus(it);
	}

	function onSubItemSelect(index: number) {
		if (level == 1 && !ctxProps.multiple) {
			popoverRef[index] && popoverRef[index].updateShow && popoverRef[index].updateShow(false);
		}
	}
</script>

{#each itemsList as it, index (it.uid)}
	{#if ctxProps.mode === 'inline'}
		{#if it.type !== 'divider'}
			<KTooltip
				placement="right"
				trigger="hover"
				width="100%"
				theme={themeValue(it)}
				content={resolveTitle(it, ctxProps.inlineCollapsed, true)}
				disabled={resolveDisabledTooltip(it, ctxProps.inlineCollapsed)}
			>
				<li
					slot="triggerEl"
					on:click={(e) => handleSelect(it, e)}
					aria-hidden="true"
					style:padding-left={`${getIndent(it)}`}
					class={cnames(it)}
					title={resolveTitle(it, ctxProps.inlineCollapsed, false)}
					{...$$restProps}
					{...attrs}
				>
					<slot name="item" item={it}>
						<span class={iconRootCls()}>
							<slot name="icon" item={it} cls={iconCls(it)}>
								{#if it.icon}
									<KIcon
										theme={themeValue(it)}
										width="14px"
										cls={iconCls(it)}
										height="14px"
										icon={it.icon}
									></KIcon>
								{/if}
							</slot>
							<slot name="label" item={it} cls={titleContentCls(!!it.icon)}>
								<span class={titleContentCls(!!it.icon)}>
									{it.label}
								</span>
							</slot>
						</span>

						{#if hasSub(it) && !isGroup(it)}
							<slot name="expandIcon" item={it} cls={iconCls(it)}>
								<KIcon
									theme={themeValue(it)}
									width="14px"
									cls={iconCls(it)}
									height="14px"
									icon={expendIconCls(it)}
								></KIcon>
							</slot>
						{/if}
					</slot>
				</li>
			</KTooltip>

			<!--render submenu-->
			<KMenu
				{...ctxProps}
				{ctxKey}
				show={(hasSub(it) && it.open) || isGroup(it)}
				cls={subMenuCls(isGroup(it))}
			>
				<svelte:self
					uid={it.uid}
					{ctxKey}
					on:selectedRecursion={(e) => handleSelectedRecursion(e, index)}
					items={it.children}
					on:titleClick={(e) => {
						dispatchTitleClick(e.detail.it, e.detail.e, e.detail.uidPath);
					}}
					level={getLevel(it, level) + 1}
				>
					<svelte:fragment let:item slot="item">
						<slot name="item" {item}>
							<span class={iconRootCls()}>
								<slot name="icon" {item}>
									{#if item.icon}
										<KIcon
											theme={themeValue(item)}
											width="14px"
											cls={iconCls(item)}
											height="14px"
											icon={item.icon}
										></KIcon>
									{/if}
								</slot>
								<slot name="label" {item} cls={titleContentCls(!!item.icon)}>
									<span class={titleContentCls(!!item.icon)}>
										{item.label}
									</span>
								</slot>
							</span>

							{#if hasSub(item) && !isGroup(item)}
								<slot name="expandIcon" {item} cls={iconCls(item)}>
									<KIcon
										theme={themeValue(item)}
										width="14px"
										cls={iconCls(item)}
										height="14px"
										icon={expendIconCls(item)}
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
			bind:this={popoverRef[index]}
			arrow={false}
			theme={themeValue(it)}
			width={level === 1 ? 'auto' : '100%'}
			placement="right"
			on:change={(e) => {
				onVerticalPopoverChange(it, e);
			}}
			on:animateStart={showSubMenuPopover}
			offset={setPopoverOffset}
			fallbackPlacements={['right', 'left']}
			mouseEnterDelay={ctxProps.subMenuOpenDelay}
			mouseLeaveDelay={ctxProps.subMenuCloseDelay}
			trigger={ctxProps.triggerSubMenuAction}
			cls={popoverContentCls(it)}
			clsTrigger={popoverTriggerCls(false)}
			disabled={!(hasSub(it) || isGroup(it))}
		>
			<svelte:fragment slot="triggerEl">
				{#if it.type !== 'divider'}
					<KTooltip
						placement="right"
						trigger="hover"
						width="100%"
						theme={themeValue(it)}
						disabled={resolveDisabledTooltip(it, ctxProps.inlineCollapsed)}
						content={resolveTitle(it, ctxProps.inlineCollapsed, true)}
					>
						<li
							slot="triggerEl"
							on:click={(e) => handleSelect(it, e)}
							aria-hidden="true"
							style:padding-left={`${getIndent(it, ctxProps.inlineCollapsed)}`}
							class={cnames(it)}
							title={resolveTitle(it, ctxProps.inlineCollapsed, false)}
							{...$$restProps}
							{...attrs}
						>
							<slot name="item" item={it}>
								<span class={iconRootCls(ctxProps.inlineCollapsed)}>
									<slot name="icon" item={it} cls={iconCls(it)}>
										{#if it.icon}
											<KIcon
												theme={themeValue(it)}
												width="14px"
												cls={iconCls(it)}
												height="14px"
												icon={it.icon}
											></KIcon>
										{/if}
									</slot>
									<slot name="label" item={it} cls={titleContentCls(!!it.icon)}>
										{#if !ctxProps.inlineCollapsed || (ctxProps.inlineCollapsed && it.label && !it.icon)}
											<span class={titleContentCls(!!it.icon)}>
												{resolveLabel(it, ctxProps.inlineCollapsed)}
											</span>
										{/if}
									</slot>
								</span>

								{#if hasSub(it) && !isGroup(it) && !ctxProps.inlineCollapsed}
									<slot name="expandIcon" item={it} cls={iconCls(it)}>
										<KIcon
											theme={themeValue(it)}
											width="14px"
											cls={iconCls(it)}
											height="14px"
											icon={expendIconCls(it)}
										></KIcon>
									</slot>
								{/if}
							</slot>
						</li>
					</KTooltip>
				{:else}
					<KDivider cls={dividerCls}></KDivider>
				{/if}
			</svelte:fragment>
			<div slot="contentEl">
				<KMenu {...ctxProps} {ctxKey} show={hasSub(it) && !isGroup(it)} cls={subMenuCls(false)}>
					<svelte:self
						uid={it.uid}
						{ctxKey}
						bind:this={subMenuRef[index]}
						on:selectedRecursion={(e) => handleSelectedRecursion(e, index)}
						items={it.children}
						on:titleClick={(e) => {
							dispatchTitleClick(e.detail.it, e.detail.e, e.detail.uidPath);
						}}
						level={getLevel(it, level) + 1}
					>
						<svelte:fragment let:item slot="item">
							<slot name="item" {item}>
								<span class={iconRootCls()}>
									<slot name="icon" {item}>
										{#if item.icon}
											<KIcon
												theme={themeValue(item)}
												width="14px"
												cls={iconCls(item)}
												height="14px"
												icon={item.icon}
											></KIcon>
										{/if}
									</slot>
									<slot name="label" {item} cls={titleContentCls(!!item.icon)}>
										<span class={titleContentCls(!!item.icon)}>
											{item.label}
										</span>
									</slot>
								</span>
								{#if hasSub(item)}
									<slot name="expandIcon" {item} cls={iconCls(item)}>
										<KIcon
											theme={themeValue(item)}
											width="14px"
											cls={iconCls(item)}
											height="14px"
											icon={expendIconCls(item)}
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

	{#if ctxProps.mode === 'horizontal'}
		<KPopover
			bind:this={popoverRef[index]}
			width={widths[index]}
			order={index}
			theme={themeValue(it)}
			on:change={(e) => {
				onVerticalPopoverChange(it, e);
			}}
			opacity={ops[index]}
			attrsTrigger={{ 'data-k-menu-h': `${level}` }}
			arrow={false}
			placement={level === 1 ? 'bottom' : 'right'}
			on:animateStart={showSubMenuPopover}
			offset={setPopoverOffset}
			fallbackPlacements={level === 1 ? ['bottom', 'top'] : ['right', 'left']}
			mouseEnterDelay={ctxProps.subMenuOpenDelay}
			mouseLeaveDelay={ctxProps.subMenuCloseDelay}
			trigger={ctxProps.triggerSubMenuAction}
			cls={popoverContentCls(it)}
			clsTrigger={popoverTriggerCls(it.type === 'divider')}
			disabled={!(hasSub(it) || isGroup(it))}
		>
			<svelte:fragment slot="triggerEl">
				{#if it.type !== 'divider'}
					<li
						on:click={(e) => handleSelect(it, e, index)}
						aria-hidden="true"
						style:padding-left={`${getIndent(it, ctxProps.inlineCollapsed)}`}
						class={cnames(it)}
						title={resolveTitle(it, ctxProps.inlineCollapsed, false)}
						{...$$restProps}
						{...attrs}
					>
						<slot name="item" item={it}>
							<span class={iconRootCls()}>
								<slot name="icon" item={it} cls={iconCls(it)}>
									{#if it.icon}
										<KIcon
											theme={themeValue(it)}
											width="14px"
											cls={iconCls(it)}
											height="14px"
											icon={it.icon}
										></KIcon>
									{/if}
								</slot>
								<slot name="label" item={it} cls={titleContentCls(!!it.icon)}>
									<span class={titleContentCls(!!it.icon)}>
										{it.label}
									</span>
								</slot>
							</span>

							{#if hasSub(it) && !isGroup(it) && level !== 1}
								<slot name="expandIcon" item={it} cls={iconCls(it)}>
									<KIcon
										theme={themeValue(it)}
										width="14px"
										cls={iconCls(it)}
										height="14px"
										icon={expendIconCls(it)}
									></KIcon>
								</slot>
							{/if}
						</slot>
					</li>
				{:else}
					<KDivider cls={dividerCls} direction={level === 1 ? 'vertical' : 'horizontal'}></KDivider>
				{/if}
			</svelte:fragment>
			<div slot="contentEl" style:min-width={popoverContentWidth(index)}>
				<KMenu {...ctxProps} {ctxKey} show={hasSub(it) && !isGroup(it)} cls={subMenuCls(false)}>
					<svelte:self
						uid={it.uid}
						{ctxKey}
						bind:this={subMenuRef[index]}
						on:selectedRecursion={(e) => handleSelectedRecursion(e, index)}
						items={it.children}
						on:titleClick={(e) => {
							dispatchTitleClick(e.detail.it, e.detail.e, e.detail.uidPath);
						}}
						level={getLevel(it, level) + 1}
					>
						<svelte:fragment let:item slot="item">
							<slot name="item" {item}>
								<span class={iconRootCls()}>
									<slot name="icon" {item}>
										{#if item.icon}
											<KIcon
												theme={themeValue(item)}
												width="14px"
												cls={iconCls(item)}
												height="14px"
												icon={item.icon}
											></KIcon>
										{/if}
									</slot>
									<slot name="label" {item} cls={titleContentCls(!!item.icon)}>
										<span class={titleContentCls(!!item.icon)}>
											{item.label}
										</span>
									</slot>
								</span>
								{#if hasSub(item)}
									<slot name="expandIcon" {item} cls={iconCls(item)}>
										<KIcon
											theme={themeValue(item)}
											width="14px"
											cls={iconCls(item)}
											height="14px"
											icon={expendIconCls(item)}
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
<!--Omit display in horizontal mode -->
{#if ctxProps.mode === 'horizontal' && showMoreItems && level === 1}
	<KPopover
		arrow={false}
		placement={level === 1 ? 'bottom' : 'right'}
		fallbackPlacements={['bottom', 'top']}
		on:animateStart={showSubMenuPopover}
		mouseEnterDelay={ctxProps.subMenuOpenDelay}
		mouseLeaveDelay={ctxProps.subMenuCloseDelay}
		trigger={ctxProps.triggerSubMenuAction}
		theme={themeValue(moreItem)}
		cls={popoverContentCls()}
		bind:this={popoverRef[itemsList.length]}
		width={widths[itemsList.length]}
		opacity={ops[itemsList.length]}
		order={itemsList.length}
	>
		<li slot="triggerEl" aria-hidden="true" class={cnames(moreItem)} {...$$restProps} {...attrs}>
			...
		</li>
		<div slot="contentEl">
			<KMenu {...ctxProps} {ctxKey} show={hasSub(moreItem)} cls={subMenuCls(false)}>
				<svelte:self
					uid={moreItem.uid}
					{ctxKey}
					bind:this={subMenuRef[itemsList.length]}
					on:selectedRecursion={(e) => handleSelectedRecursion(e, itemsList.length)}
					items={moreItem.children}
					on:titleClick={(e) => {
						dispatchTitleClick(e.detail.it, e.detail.e, e.detail.uidPath);
					}}
					level={getLevel(moreItem, level) + 1}
				>
					<svelte:fragment let:item slot="item">
						<slot name="item" {item}>
							<span class={iconRootCls()}>
								<slot name="icon" {item}>
									{#if item.icon}
										<KIcon
											theme={themeValue(item)}
											width="14px"
											cls={iconCls(item)}
											height="14px"
											icon={item.icon}
										></KIcon>
									{/if}
								</slot>
								<slot name="label" {item} cls={titleContentCls(!!item.icon)}>
									<span class={titleContentCls(!!item.icon)}>
										{item.label}
									</span>
								</slot>
							</span>
							{#if hasSub(item)}
								<slot name="expandIcon" {item} cls={iconCls(item)}>
									<KIcon
										theme={themeValue(item)}
										width="14px"
										cls={iconCls(item)}
										height="14px"
										icon={expendIconCls(item)}
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
<!--TODO: select close-->
