<script lang="ts">
import Mask from "../Mask/Mask.svelte";
import Icon from '../Icon/Icon.svelte'
import {createEventDispatcher} from "svelte";
import Button from "../Button/Button.svelte";
import { fly } from 'svelte/transition';
export let show = false
export let customClass = ''
export let title = ''
export let footer = false
// center、right
export let layout = 'center'
// close、cancel、confirm
const dispatch = createEventDispatcher()
$:showInner = show
const close = () => {
  showInner = !showInner
  dispatch('close', showInner)
}
const cancel = () => {
  dispatch('cancel')
  close()
}

const confirm = () => {
  dispatch('confirm')
  close()
}

</script>
<Mask modelValue={showInner}>
    <div class="ui-dialog
            bg-white
            dark:bg-dark-500
            dark:shadow
            dark:shadow-main
            p-2 origin-center transform -translate-x-1/2 -translate-y-1/2
            rounded shadow absolute min-w-1/3 left-1/2 top-1/2 {customClass}"
         out:fly={{ y: -30, duration: 300 }}
         in:fly={{ y: -30, duration: 300 }}>
        <slot name="header">
            <div class="ui-dialog--header flex justify-between items-center h-8 w-full">
                <h1 class="text-tx dark:text-white  font-bold">
                    {title} {showInner}
                </h1>
                <Icon icon="i-carbon-close"
                      on:click={close}
                      isButton colorCls="hover:text-main"></Icon>
            </div>
        </slot>
        <div class="ui-dialog--body p2">
            <slot/>
        </div>
        {#if footer}
            <slot name="footer">
                <div class="ui-dialog--footer w-full p2 flex items-center {layout === 'center' ?  'justify-center' : 'justify-end'}">
                    <Button customClass="mx-2" on:click={cancel} type="info">Cancel</Button>
                    <Button customClass="mx-2" on:click={confirm} type="primary">Confirm</Button>
                </div>
            </slot>
        {/if}
    </div>
</Mask>
