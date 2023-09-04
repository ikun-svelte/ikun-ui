<script>
  import { KSpin } from '../src/index';
  const spinOptions = {
    show: false,
    text: '多看一眼就会爆炸！'
  };

  const handleSpin = () => {
    spinOptions.show = true;
  };
</script>

<div use:KSpin={spinOptions} class="w-full h-200px flex justify-center items-center">
  <button on:click={handleSpin} id="spin_text">Spin</button>
</div>
