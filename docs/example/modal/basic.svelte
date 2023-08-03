<script>
    import { KModal } from '@ikun-ui/modal'
    import {KButton} from "@ikun-ui/button";
    let show = false
</script>
<KButton on:click={() => show = true}>
    open modal
</KButton>

<KModal title="Jean-Christophe"
        on:close={()=> show = false}
        show={show}>
    <p class="text-center !my-2">
        🥵 Sadness makes people more acute.
    </p>
</KModal>
