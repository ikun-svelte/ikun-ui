<script>
    import { KButton } from '@ikun-ui/button'
    import { KNotify } from '@ikun-ui/notify'
    let notifyInstance = null
    const renderNotify = (placement, content) => {
        notifyInstance = KNotify({
            title: placement,
            placement,
            content,
        })
    }

    const updateNotify = () => {
        KNotify.update(notifyInstance, {
            title: 'updated !!',
            content: '<div class="text-red">updated content</div>',
            type: 'success'
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('right-top', 'To be or not to be, that is the question.')}>
        render
    </KButton>
    <KButton cls="mx-2"
             on:click={()=> updateNotify()}>
        update
    </KButton>
</div>
