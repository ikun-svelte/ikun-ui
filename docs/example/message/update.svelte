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
            content: '<div class="text-red">再多看一眼就会爆炸！</div>',
            type: 'success'
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderMessage('哇，真的是你啊~')}>
        render
    </KButton>
    <KButton cls="mx-2"
             on:click={()=> updateMessage()}>
        update
    </KButton>
</div>
