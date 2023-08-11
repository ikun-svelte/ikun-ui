<script>
    import { KButton } from '@ikun-ui/button'
    import { KMsgBox } from '@ikun-ui/message-box'
    import CustomContent from './custom-content.svelte'
    import CustomTitle from './custom-title.svelte'
    const renderMsgBox = () => {
        KMsgBox.confirm({
            title: CustomTitle,
            content: CustomContent,
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
        trigger custom
    </KButton>
</div>
