<script>
    import { KButton } from '@ikun-ui/button'
    import { KMessage } from '@ikun-ui/message'
    const renderMessage = (title, content, type) => {
        KMessage({
            title,
            content,
            type
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderMessage(
                 'Hamlet',
                 '哇，真的是你啊~',
                 'info')
                 }>
        info
    </KButton>
    <KButton type="success" cls="mx-2"
             on:click={()=> renderMessage(
                 'Requiem for a Nun',
                 '香精煎鱼',
                 'success')
                 }>
        success
    </KButton>
    <KButton type="warning" cls="mx-2"
             on:click={()=> renderMessage(
                 'One Hundred Years of Solitude',
                 '香翅捞饭' +
                  '',
                  'warning')
                  }>
        warning
    </KButton>
    <KButton type="error" cls="mx-2"
             on:click={()=> renderMessage(
                 'A Tale of Two Cities',
                 '食不食油饼',
                 'error'
                 )}>
        error
    </KButton>
</div>
