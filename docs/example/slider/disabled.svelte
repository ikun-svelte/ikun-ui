<script lang="ts">
    import { KSlider } from '@ikun-ui/slider';

    let value: number = 0;
    const handleInput = (event: CustomEvent) => {
        value = event.detail;
    };

</script>

<KSlider disabled on:input={handleInput} value={value}></KSlider>
<p class="px-2">{value}</p>

