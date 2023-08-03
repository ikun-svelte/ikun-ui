<script>
    import { KSwitch } from '@ikun-ui/switch'
    let value = 'checked'
    const handleUpdate = (e) => {
        value = e.detail
    }
</script>
<div class="flex items-center flex-wrap">
    <KSwitch value={value}
             checkedValue="checked"
             unCheckedValue="unChecked"
             on:updateValue = {handleUpdate} />
    <span class="ml-2">{value}</span>
</div>

