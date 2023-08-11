<script>
    import { KButton } from '@ikun-ui/button'
    import { KMsgBox } from '@ikun-ui/message-box'
    const renderMsgBox = () => {
        KMsgBox.prompt({
            title: 'You are real ikun',
            content: 'Please enter the number',
            inputErrorMessage: 'Invalid input',
            inputValidator: /^\d+$/,
            onCancel(){
                console.log('cancel')
            },
            onConfirm(r, v){
                console.log('confirm')
                console.log('verified', r)
                console.log('value', v)
            }
        })
    }
</script>

<div class="flex items-center flex-wrap">
    <KButton type="primary" cls="mx-2"
             on:click={()=> renderMsgBox()}>
        trigger prompt
    </KButton>
</div>
