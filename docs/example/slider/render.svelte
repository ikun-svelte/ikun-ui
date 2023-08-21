<script lang="ts">
    import { KSlider } from '@ikun-ui/slider';

    let value: number = 0;
    const handleInput = (event: CustomEvent) => {
        value = event.detail;
    };

</script>

<KSlider on:input={handleInput} value={value}>
    <div class="text-6" slot="buttonRender">🏀</div>
</KSlider>
<p class="px-2">{value}</p>

