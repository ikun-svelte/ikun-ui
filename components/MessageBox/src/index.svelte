<script lang="ts">
    import { KModal } from "@ikun-ui/modal";
    import { KIcon } from "@ikun-ui/icon";
    import {createEventDispatcher} from "svelte";
    import {isFunction, isString} from "baiwusanyu-utils";
    import type {MsgBoxEmoType} from "./types";
    import {KButton} from "@ikun-ui/button";
    export let show = false;
    export let attrs = {};
    export let cls = '';
    export let title: any = ''
    export let emoType:MsgBoxEmoType | null = null

    export let cancelBtnText: string = 'Cancel'
    export let confirmBtnText: string = 'Confirm'
    export let cancelBtnCls: string = ''
    export let confirmBtnCls: string = ''
    export let content: any = ''
    // center、right
    export let layout:'center' | 'right' = 'right';
    // close、cancel、confirm
    const dispatch = createEventDispatcher();
    $: showInner = show;

    const handleClose = () => {
        showInner = false
    }

    const handleCancel= () => {

    }

    const handleConfirm = () => {

    }
</script>
<KModal show="{showInner}"
        cls="k-msg-box--base k-msg-box--base__dark {cls}"
        {attrs}
        footer
        {layout}>
    <div slot="header">
        {#if title && isString(title)}
            <h1 class="k-msg-box--header--title k-msg-box--header--title__dark">
                {#if emoType}
                    <KIcon icon='k-msg-box--icon--{emoType}'
                           on:click={handleClose}
                           cls="k-msg-box--icon"
                           color="k-msg-box--{emoType}" />
                {/if}
                {@html title}
            </h1>
        {:else if title && isFunction(title)}
            <svelte:component this={title} />
        {/if}
    </div>

    {#if content}
		<div class="k-msg-box--content">
			{#if isString(content)}
				{@html content}
			{:else if isFunction(content)}
				<svelte:component this={content} />
			{/if}
		</div>
	{/if}
    <div slot="footer"
         class="k-msg-box--footer { layout === 'center' ? 'justify-center' : 'justify-end'}">
        <KButton cls="k-msg-box--footer--btn {cancelBtnCls}"
                 on:click={handleCancel}
                 type="info">
            {cancelBtnText}
        </KButton>
        <KButton cls="k-msg-box--footer--btn {confirmBtnCls}"
                 on:click={handleConfirm}
                 type="primary">
            {confirmBtnText}
        </KButton>
    </div>
</KModal>
