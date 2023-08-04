<script>
    import { KButton } from '@ikun-ui/button'
    import { KMessage } from '@ikun-ui/message'
    const renderMessage = ( content) => {
        KMessage({
            title: 'message',
            content
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderMessage('right-top', 'To be or not to be, that is the question.')}>
        render message
    </KButton>
</div>
