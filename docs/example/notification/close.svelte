<script>
    import { KButton } from '@ikun-ui/button'
    import { KNotify } from '@ikun-ui/notify'
    const renderNotifyClose = (title, content) => {
        KNotify({
            title,
            content,
            close: false
        })
    }

    const renderNotifyAutoClose = (title, content) => {
        KNotify({
            title,
            content,
            autoClose: true
        })
    }

    let time = 5
    const renderNotifyDuration = (title, content) => {
        KNotify({
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

    const renderNotifyCb = (title, content) => {
        KNotify({
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
             on:click={()=> renderNotifyClose(
                 'Hamlet',
                 'To be or not to be, that is the question.',
                 'info')
                 }>
        can't manually close
    </KButton>

    <KButton cls="mx-2"
             on:click={()=> renderNotifyAutoClose(
                 'Hamlet',
                 'To be or not to be, that is the question.',
                 'info')
                 }>
        auto close
    </KButton>

    <KButton cls="mx-2"
             on:click={()=> renderNotifyDuration(
                 'Hamlet',
                 'To be or not to be, that is the question.',
                 'info')
                 }>
        duration {time}s
    </KButton>

    <KButton cls="mx-2"
             on:click={()=> renderNotifyCb(
                 'close callback',
                 'click the close icon',
                 'info')
                 }>
        close callback
    </KButton>
</div>
