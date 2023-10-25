<script>
    import { KSelect } from '@ikun-ui/select'
    let value = 'foo'
    const onSelect = (e) => {
        value = e.detail
    }

</script>
<KSelect
  {value}
  iconSuffix="i-carbon-search"
  iconPrefix="i-carbon-logo-svelte"
  on:updateValue={onSelect}
  dataList={['Tiny', 'Small', 'Normal', 'Large', 'Huge']}
></KSelect>
<p class="px-2">{value}</p>

