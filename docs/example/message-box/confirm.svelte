<script>
    import { KButton } from '@ikun-ui/button'
    import { KMsgBox } from '@ikun-ui/message-box'
    const renderMsgBox = () => {
        KMsgBox.confirm({
            title: '🎤 ！！',
            content: 'Just one more look and it\'ll explode',
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
    <KButton type="primary" cls="mx-2"
             on:click={()=> renderMsgBox()}>
        trigger confirm
    </KButton>
</div>
