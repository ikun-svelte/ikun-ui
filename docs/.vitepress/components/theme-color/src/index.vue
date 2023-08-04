<script setup lang="ts">
import { ikunColors } from '@ikun-ui/preset';
import { jsonClone } from 'baiwusanyu-utils';
import { computed } from 'vue';
const color = jsonClone(ikunColors);
Reflect.deleteProperty(color, 'inherit');
Reflect.deleteProperty(color, 'current');
Reflect.deleteProperty(color, 'transparent');
const textColor = computed(() => {
	return (colorKey: number, key: string) => {
		if (key === 'light') {
			return 'text-black';
		}
		if (key === 'dark') {
			return 'text-white';
		}
		return colorKey > 500 ? 'text-white' : 'text-black';
	};
});
</script>

<template>
	<div class="w-full grid grid-cols-2 gap-4">
		<div v-for="(item, key) in color" :key="key">
			<template v-if="typeof item === 'string'"></template>
			<div v-else class="flex flex-col">
				<p>{{ key }}</p>
				<div
					:title="colorItem"
					class="rounded flex-auto h-8 my-1 text-xs leading-8 px-2 hover:scale-110 ease-in duration-200"
					:class="textColor(colorKey, key)"
					:style="{ 'background-color': colorItem }"
					v-for="(colorItem, colorKey) in item"
					:key="key + colorKey"
				>
					--ikun-{{ key }}-{{ colorKey }} : {{ colorItem }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
