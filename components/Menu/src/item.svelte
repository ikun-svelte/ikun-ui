<script lang="ts">
	import { getContext } from 'svelte';
	import type { KMenuInstance, KMenuInstanceOption, KMenuItemProps } from "./types";
	import { getPrefixCls, menuKey } from "@ikun-ui/utils";
	import { clsx } from "clsx";
	export let items: KMenuItemProps['items'] = [];
	export let cls: KMenuItemProps['cls'] = undefined;
	export let attrs: KMenuItemProps['attrs'] = {};

	const menuCtx = getContext(menuKey) as KMenuInstance
	let ctxProps:KMenuInstanceOption = {}
	function updatedCtxProps(props: Record<any, any>){
		ctxProps = {...props}
		console.log(ctxProps)
	}
	if(menuCtx){
		ctxProps = {...menuCtx.__dynamicProps}
		menuCtx.__propHandleEvtMap.push(updatedCtxProps)
	}

	const prefixCls = getPrefixCls('menu-item');
	$: cnames = clsx(prefixCls, cls);
</script>

{#each items as it (it.uid)}
	<div
		class={cnames}
		{...$$restProps}
		{...attrs}>
		<slot name="item" item={it}>

			<div>
				{it.label}
				<slot name="ic" item={it}></slot>
			</div>

		</slot>
		{#if it.children && it.children.length}
			<svelte:self items={it.children}>
				<svelte:fragment let:item slot="item">
					<slot name="item" item={item}>

						<div>
							{item.label}
							<slot name="ic" item={it}></slot>
						</div>

					</slot>
				</svelte:fragment>
			</svelte:self>
		{/if}
	</div>
{/each}

