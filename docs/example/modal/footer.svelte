<script>
    import { KModal } from '@ikun-ui/modal'
    import {KButton} from "@ikun-ui/button";
    let show = false
</script>
<KButton on:click={() => show = true}>
    open modal(footer)
</KButton>

<KModal title="Pride and Prejudice"
        footer
        on:close={()=> show = false}
        show={show}>
    <p class="text-center !my-2">
        💕 A lady’s imagination is very rapid; it jumps from admiration to love,
        from love to matrimony in a moment.
    </p>
</KModal>
