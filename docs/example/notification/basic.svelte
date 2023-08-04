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
             on:click={()=> renderNotify('right-top', 'To be or not to be, that is the question.')}>
        right-top
    </KButton>
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('left-top', 'The past is never dead. It\'s not even past.')}>
        left-top
    </KButton>
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('right-bottom', 'Time flowed in a circle in the family, never-ending.')}>
        right-bottom
    </KButton>
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('left-bottom', 'It was the best of times, it was the worst of times.')}>
        left-bottom
    </KButton>
</div>
