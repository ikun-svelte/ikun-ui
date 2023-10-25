<script>
    import { KSelect } from '@ikun-ui/select'
    let value = {
      label: 'this is item 2000',
      value: 2000,
      id: 2000
    }
    let dataList = []
    for (let i = 0; i < 10000; i++){
      dataList.push({
        label: `this is item ${i}`,
        value: i,
        id: i
      })
    }
    const onSelect = (e) => {
        value = e.detail
    }

</script>
<KSelect
  {value}
  {dataList}
  labelKey="label"
  valueKey="value"
  key="id"
  on:updateValue={onSelect}
></KSelect>
<p class="px-2">{JSON.stringify(value)}</p>

