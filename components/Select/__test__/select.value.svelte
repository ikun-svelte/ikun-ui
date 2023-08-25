<script>
    import KSelect from '../src';
</script>

<KSelect value={'Normal'}>
    {#each ['Tiny', 'Small', 'Normal', 'Large', 'Huge'] as item (item)}
        <option>{item}</option>
    {/each}
</KSelect>
