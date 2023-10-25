<script>
    import { KSelect } from '@ikun-ui/select'
    let value = ''
    const onSelect = (e) => {
        value = e.detail
    }

</script>
<KSelect
  {value}
  on:updateValue={onSelect}
  dataList={['Tiny', 'Small', 'Normal', 'Large', 'Huge']}
></KSelect>
<p class="px-2">{value}</p>

