<script>
    import { KInput } from '@ikun-ui/input'
    let value = ''
    const onInput = (e) => {
        value = e.detail
    }

</script>
<KInput placeholder="Please input value"
        iconSuffix="i-carbon-search"
        iconPrefix="i-carbon-logo-svelte"
        on:input={onInput}
        {value}
        cls="mx-2">
</KInput>
<p class="px-2">{value}</p>

