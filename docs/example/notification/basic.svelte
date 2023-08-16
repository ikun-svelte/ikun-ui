<script>
    import { KButton } from '@ikun-ui/button'
    import { KNotify } from '@ikun-ui/notify'
    const renderNotify = (placement, content) => {
        KNotify({
            title: placement,
            placement,
            content
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('right-top', '哇，真的是你啊~')}>
        right-top
    </KButton>
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('left-top', '香精煎鱼')}>
        left-top
    </KButton>
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('right-bottom', '香翅捞饭')}>
        right-bottom
    </KButton>
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('left-bottom', '食不食油饼')}>
        left-bottom
    </KButton>
</div>
