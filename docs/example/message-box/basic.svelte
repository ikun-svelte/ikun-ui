<script>
    import { KButton } from '@ikun-ui/button'
    import { KMsgBox } from '@ikun-ui/message-box'
    const renderMsgBox = () => {
        KMsgBox({
            title: '🐔 ！！',
            content: 'just because you are so beautiful',
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
             on:click={()=> renderMsgBox()}>
        ikun trigger
    </KButton>
</div>
