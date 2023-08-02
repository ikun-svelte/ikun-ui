<script>
    import { KSwitch } from '@ikun-ui/switch'
    let value = false
    const handleUpdate = (e) => {
        value = e.detail
    }
</script>
<div class="flex items-center">
    <KSwitch value={value}
             checkedColor="bg-sky-500"
             unCheckedColor="bg-green-500"
             on:updateValue = {handleUpdate} />
    <span class="ml-2">{value}</span>
</div>

