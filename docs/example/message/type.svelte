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
                 'To be or not to be, that is the question.',
                 'info')
                 }>
        info
    </KButton>
    <KButton type="success" cls="mx-2"
             on:click={()=> renderMessage(
                 'Requiem for a Nun',
                 'The past is never dead. It\'s not even past.',
                 'success')
                 }>
        success
    </KButton>
    <KButton type="warning" cls="mx-2"
             on:click={()=> renderMessage(
                 'One Hundred Years of Solitude',
                 'Time flowed in a circle in the family, ' +
                  'never-ending.',
                  'warning')
                  }>
        warning
    </KButton>
    <KButton type="error" cls="mx-2"
             on:click={()=> renderMessage(
                 'A Tale of Two Cities',
                 'It was the best of times, it was the worst of times.',
                 'error'
                 )}>
        error
    </KButton>
</div>
