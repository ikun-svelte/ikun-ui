<script>
    import { KCheckbox } from '@ikun-ui/checkbox'
    let value1 = true
    const handleUpdate1 = (e) => {
        value1 = e.detail
    }
    let value2 = false
    const handleUpdate2 = (e) => {
        value2 = e.detail
    }
</script>
<div class="flex items-center">
    <KCheckbox value={value1}
               label="Wuthering Heights"
               on:updateValue={handleUpdate1}
           cls="mx-2">
    </KCheckbox>
    <KCheckbox
            label="Grapes of Wrath"
            on:updateValue={handleUpdate2}
            value={value2}
           cls="mx-2">
    </KCheckbox>
</div>

