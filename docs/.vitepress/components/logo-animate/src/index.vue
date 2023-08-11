<script setup>
import { ref } from 'vue';
import grey from './grey.vue';
import black from './black.vue';
import circleComp from './circle.vue';
const play = ref(false);
</script>

<template>
	<section id="home_logo" :class="{ play }" @mouseenter="play = true" @mouseleave="play = false">
		<grey />
		<black />
		<circle-comp />
	</section>
</template>

<style>
#home_logo {
	scale: 1.5;
	position: relative;
	width: 150px;
	margin: 20px auto;
	--t: 3s;
	--play-status: pause;
}
#home_logo.play {
	--play-status: running;
}

@media (max-width: 960px) {
	#home_logo {
		top: 20%;
	}
}
</style>
