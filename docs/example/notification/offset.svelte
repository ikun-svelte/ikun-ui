<script>
    import { KButton } from '@ikun-ui/button'
    import { KNotify } from '@ikun-ui/notify'
    const renderNotify = (placement, content, offset) => {
        KNotify({
            title: placement,
            placement,
            content,
            offset
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderNotify('right-top', 'To be or not to be, that is the question.', 120)}>
        right-top
    </KButton>
    <KButton  cls="mx-2"
             on:click={()=> renderNotify('left-bottom', 'It was the best of times, it was the worst of times.', 120)}>
        left-bottom
    </KButton>
</div>
