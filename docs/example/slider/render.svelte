<script>
    import { KSlider } from '@ikun-ui/slider';

    let value = 0;
    const handleInput = (event) => {
        value = event.detail;
    };

</script>

<KSlider on:input={handleInput} value={value}>
    <div class="text-6" slot="buttonRender">🏀</div>
</KSlider>
<p class="px-2">value: {value}</p>

