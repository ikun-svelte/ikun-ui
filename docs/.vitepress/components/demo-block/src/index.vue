<script setup>
import {defineAsyncComponent, onMounted, ref} from "vue";
const props = defineProps({
  src: {
    type: String
  }
})
let comp = ref({})
onMounted(async () => {
  comp.value = defineAsyncComponent(() => import(/* @vite-ignore */props.src))
})
</script>

<template>
  <ClientOnly>
    <div class="mt-6">
      <div class="k-demo_wrapper vp-raw bg">
        <component :is="comp"></component>
      </div>
    </div>
  </ClientOnly>
</template>
