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
            content: '<div class="text-red">再多看一眼就会爆炸！</div>',
            type: 'success'
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('right-top', '哇，真的是你啊~')}>
        render
    </KButton>
    <KButton cls="mx-2"
             on:click={()=> updateNotify()}>
        update
    </KButton>
</div>
