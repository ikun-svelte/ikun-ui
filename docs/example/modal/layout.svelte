<script>
    import { KModal } from '@ikun-ui/Modal'
    import {KButton} from "@ikun-ui/button";
    let show = false
</script>
<KButton on:click={() => show = true}>
    open modal(layout)
</KButton>

<KModal title="Germinal"
        footer
        layout="right"
        on:close={()=> show = false}
        show={show}>
    <p class="text-center !my-2">
        🍞 Bread! Bread! We want to bread!
    </p>
</KModal>
