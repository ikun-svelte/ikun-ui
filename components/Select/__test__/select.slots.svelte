<script>
    import KSelect from '../src';
</script>

<KSelect value={'Normal'}>
    <div class="prefix" slot="prefix">prefix</div>
    <div class="suffix" slot="suffix">suffix</div>
    {#each ['Tiny', 'Small', 'Normal', 'Large', 'Huge'] as item (item)}
        <option>{item}</option>
    {/each}
</KSelect>
