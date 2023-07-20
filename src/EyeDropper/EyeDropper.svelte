<script lang="ts">
     import {onMount} from "svelte";

     interface EyeDropperOpenOptions {
        signal?: AbortSignal
    }

     interface EyeDropper {
        new(): EyeDropper
        open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>
        [Symbol.toStringTag]: 'EyeDropper'
    }

     interface UseEyeDropperOptions {
        initialValue?: string
    }

     export let options:UseEyeDropperOptions = {
         initialValue: ''
     }

    let sRGBHex = ''
    let  isSupported = true
    function initEyeDropper(options: UseEyeDropperOptions = {}) {
        const { initialValue = '' } = options
        isSupported = typeof window !== 'undefined' && 'EyeDropper' in window
        sRGBHex = initialValue
    }

     async function open(openOptions?: EyeDropperOpenOptions) {
         if (!isSupported)
             return
         const eyeDropper: EyeDropper = new (window as any).EyeDropper()
         const result = await eyeDropper.open(openOptions)
         sRGBHex = result.sRGBHex
         return result
     }

     onMount(initEyeDropper)

</script>
<div class="ui-eye-dropper">
    <slot  {sRGBHex} {open} {isSupported}></slot>
</div>
<style>
    .ui-eye-dropper{
        width: 100%;
        height: 100%;
    }
</style>
