<script lang="ts">
    import {onDestroy, tick} from "svelte";
    import { fade } from 'svelte/transition';
    export let modelValue = false
    export let target = null
    let drawerRef = null
    let drawerWidth = '100%'
    let drawerHeight =  '100%'
    let drawerTop = 0
    let drawerLeft = 0

    const updatedPosition = () => {
        const containerDomRect = target ? target.getBoundingClientRect() : drawerRef.parentElement.getBoundingClientRect()
        if(containerDomRect){
            drawerWidth= containerDomRect.width ? `${containerDomRect.width}px` : '100%'
            drawerHeight = containerDomRect.height ? `${containerDomRect.height}px` : '100%'
            drawerTop = containerDomRect.top
            drawerLeft =containerDomRect.left
        }
    }

    async function setParent(){
        if(!target && modelValue){
            await tick()
            drawerRef && (drawerRef.parentElement.style.overflow = 'hidden')
            drawerRef && (drawerRef.parentElement.style.position = 'relative')
            updatedPosition()
            window.addEventListener('resize', updatedPosition)
        }

        if(target && modelValue){
            await tick()
            drawerRef && (target.style.overflow = 'hidden')
            drawerRef && (target.style.position = 'relative')
            updatedPosition()
            window.addEventListener('resize', updatedPosition)
        }
    }

    const reset = () => {
        drawerRef && (drawerRef.parentElement.style.overflow = '')
        drawerRef && (drawerRef.parentElement.style.position = '')
        window.removeEventListener('resize', updatedPosition)
    }
    onDestroy(reset)

    $: if(modelValue){
        setParent()
    }else{
        reset()
    }
</script>

{#if modelValue}
    <div bind:this={drawerRef}
         out:fade = {{duration: 300}}
         in:fade = {{duration: 300}}
         style="top:{drawerTop}px;left:{drawerLeft}px;width:{drawerWidth};height:{drawerHeight}"
         class="ui-mask bg-black:50 absolute z-999 fixed">
        <slot></slot>
    </div>
{/if}