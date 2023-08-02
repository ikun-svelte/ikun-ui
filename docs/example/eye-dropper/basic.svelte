<script>
    import { KEyeDropper } from '@ikun-ui/eye-dropper'
    import { KButton } from '@ikun-ui/button'
    const handleClick = (support, cb) => {
        if(support){
            cb()
        }
    }
</script>
<KEyeDropper let:open let:isSupported let:sRGBHex>
    <KButton on:click={() => handleClick(isSupported, open)}>
        select color : {sRGBHex || 'black'}
        <span class="w-4 h-4 rounded-full ml2" style="background-color: {sRGBHex || 'black'}"></span>
    </KButton>
</KEyeDropper>
