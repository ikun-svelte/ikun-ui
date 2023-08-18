<script>
    import { KButton } from '@ikun-ui/button'
    import { KMessage } from '@ikun-ui/message'
    const renderMessage= (placement, content, offset) => {
        KMessage({
            title: placement,
            content,
            offset
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton cls="mx-2"
             on:click={()=> renderMessage('offset', '哇，真的是你啊~', 120)}>
        offset
    </KButton>
</div>
