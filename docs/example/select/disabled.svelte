<script>
    import { KSelect } from '@ikun-ui/select'
    let value = 'foo'
    const onSelect = (e) => {
        value = e.detail
    }

</script>
<KSelect placeholder="Please select value"
         disabled
         on:updateValue={onSelect}
         {value}
         cls="mx-2">
    <option>foo</option>
    <option>bar</option>
    <option>head</option>
</KSelect>
<p class="px-2">{value}</p>

