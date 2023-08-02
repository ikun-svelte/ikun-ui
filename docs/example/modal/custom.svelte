<script>
    import { KModal } from '@ikun-ui/Modal'
    import { KButton } from "@ikun-ui/button";
    import { KIcon } from "@ikun-ui/icon";
    let show = false
</script>
<KButton on:click={() => show = true}>
    open modal(custom)
</KButton>

<KModal footer
        on:close={()=> show = false}
        show={show}>
    <span class="flex" slot="header">
      <KIcon icon="i-carbon-logo-twitter"
                 slot="footer"
                 cls="text-blue">
      </KIcon>
        Pride and Prejudice
    </span>
    <p class="text-center !my-2">
        💕 A lady’s imagination is very rapid; it jumps from admiration to love,
        from love to matrimony in a moment.
    </p>
    <div class="fc w-full" slot="footer">
        <KButton icon="i-carbon-logo-wechat"
                 on:click={()=> show = false}
                 type="success">
            Cancel
        </KButton>
    </div>
</KModal>
