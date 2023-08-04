<script>
    import { KButton } from '@ikun-ui/button'
    import { KMessage } from '@ikun-ui/message'
    let messageInstance = null
    const renderMessage = (content) => {
        messageInstance = KMessage({
            title: 'title',
            content,
        })
    }

    const updateMessage = () => {
        KMessage.update(messageInstance, {
            title: 'updated !!',
            content: '<div class="text-red">updated content</div>',
            type: 'success'
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderMessage('right-top', 'To be or not to be, that is the question.')}>
        render
    </KButton>
    <KButton cls="mx-2"
             on:click={()=> updateMessage()}>
        update
    </KButton>
</div>
