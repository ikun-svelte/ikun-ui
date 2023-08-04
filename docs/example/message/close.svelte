<script>
    import { KButton } from '@ikun-ui/button'
    import { KMessage } from '@ikun-ui/message'
    const renderMessageClose = (title, content) => {
        KMessage({
            title,
            content,
            close: false
        })
    }

    const renderMessageAutoClose = (title, content) => {
        KMessage({
            title,
            content,
            autoClose: true
        })
    }

    let time = 5
    const renderMessageDuration = (title, content) => {
        time = 5
        KMessage({
            title,
            autoClose: true,
            content,
            duration: 5000,
        })
        let timer = setInterval(() => {
            if(time === 0){
                clearInterval(timer)
                return
            }
            time--
        },1000)
    }

    const renderMessageCb = (title, content) => {
        KMessage({
            title,
            content,
            onClose: () => {
                window.alert('close! 🎯')
            }
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton cls="mx-2"
             on:click={()=> renderMessageClose(
                 'Hamlet',
                 'To be or not to be, that is the question.',
                 'info')
                 }>
        can't manually close
    </KButton>

    <KButton cls="mx-2"
             on:click={()=> renderMessageAutoClose(
                 'Hamlet',
                 'To be or not to be, that is the question.',
                 'info')
                 }>
        auto close
    </KButton>

    <KButton cls="mx-2"
             on:click={()=> renderMessageDuration(
                 'Hamlet',
                 'To be or not to be, that is the question.',
                 'info')
                 }>
        duration {time}s
    </KButton>

    <KButton cls="mx-2"
             on:click={()=> renderMessageCb(
                 'close callback',
                 'click the close icon',
                 'info')
                 }>
        close callback
    </KButton>
</div>
