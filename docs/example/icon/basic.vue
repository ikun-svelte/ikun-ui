<template>
	<div ref="el"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { KIcon } from '@ikun-ui/icon';

const el = ref();
onMounted(async () => {
	new KIcon({
		target: el.value,
		props: {
			icon: 'i-carbon-settings',
			color: 'text-main'
		}
	});
});
</script>
