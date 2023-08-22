<script>
    import { KSlider } from '@ikun-ui/slider';

    let step = 10;
    let value = 0;
    const handleInput = (event) => {
        value = event.detail;
    };

</script>

<KSlider on:input={handleInput} value={value}></KSlider>
<p class="px-2">value: {value}</p>

<KSlider step={step} on:input={handleInput} value={value}></KSlider>
<p class="px-2">value: {value}</p>

