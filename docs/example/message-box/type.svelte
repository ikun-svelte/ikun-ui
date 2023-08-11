<script>
    import { KButton } from '@ikun-ui/button'
    import { KMsgBox } from '@ikun-ui/message-box'
    const renderMsgBox = (emoType) => {
        KMsgBox.confirm({
            title: '只因你太美',
            emoType,
            content: 'Get closer, get closer, and melt',
            onCancel(){
                console.log('cancel')
            },
            onConfirm(){
                console.log('confirm')
            }
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="info" cls="mx-2"
             on:click={()=> renderMsgBox('info')}>
        info confirm
    </KButton>
    <KButton type="warning" cls="mx-2"
             on:click={()=> renderMsgBox('warning')}>
        warning confirm
    </KButton>
    <KButton type="success" cls="mx-2"
             on:click={()=> renderMsgBox('success')}>
        success confirm
    </KButton>
    <KButton type="error" cls="mx-2"
             on:click={()=> renderMsgBox('error')}>
        error confirm
    </KButton>
</div>
