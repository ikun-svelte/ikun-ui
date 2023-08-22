<script>
    import { KSlider } from '@ikun-ui/slider';

    let value = 0;
    const handleInput = (event) => {
        value = event.detail;
    };

</script>

<KSlider disabled on:input={handleInput} value={value}></KSlider>
<p class="px-2">value: {value}</p>

