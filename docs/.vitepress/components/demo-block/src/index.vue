<script setup>
import { computed, onMounted, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { KMessage } from '@ikun-ui/message';
const modules = import.meta.glob('../../../../example/**/*.svelte');
const props = defineProps({
	src: {
		type: String
	},
	github: {
		type: String
	},
	source: {
		type: String,
		default: ''
	}
});

let comp = null;
const el = ref();
onMounted(async () => {
	const path = `../../../../example/${props.src}`;
	comp = await modules[path]();
	new comp.default({
		target: el.value
	});
});
const showCode = ref(false);
const code = computed(() => decodeURIComponent(props.source));
const { copy } = useClipboard({ source: code.value });
const handleCopy = () => {
	copy();
	KMessage.success({
		content: 'Copy successfully! 😊'
	});
};
</script>

<template>
	<ClientOnly>
		<div class="mt-6 border border-solid py-4 px-2 rounded border-slate-200">
			<div>
				<div ref="el"></div>
			</div>
			<div
				v-if="showCode"
				class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4"
			>
				<highlight-code class="k-docs-code" language="html" :code="code" />
			</div>
			<div
				class="border-t-1px border-t-solid border-slate-200 pt-2 flex justify-end items-center mt-4"
			>
				<div
					title="show source code"
					@click="showCode = !showCode"
					class="i-carbon-code mx-2 cursor-pointer"
					style="color: #737373"
				></div>
				<div
					title="copy source code"
					@click="handleCopy()"
					class="i-carbon-copy-file mx-2 cursor-pointer"
					style="color: #737373"
				></div>
				<a
					:href="`https://github.com/ikun-svelte/ikun-ui/tree/main/components/${github}`"
					target="_blank"
					class="mx-2"
				>
					<div title="open in github" class="i-carbon-logo-github" style="color: #737373"></div>
				</a>
			</div>
		</div>
	</ClientOnly>
</template>
<style>
@import '../../../assets/styles/atom-one-light.css';
@import '../../../assets/styles/atom-one-dark.css';
.k-docs-code {
	width: 100%;
	font-size: 14px;
}
.hljs {
	border-radius: 8px;
}
</style>
<style>
.vp-doc .demo-link .k-link--default {
	color: var(--ikun-gray-500);
}
.vp-doc .demo-link .k-link--success {
	color: var(--ikun-green-400);
}
.vp-doc .demo-link .k-link--warning {
	color: var(--ikun-amber-400);
}
.vp-doc .demo-link .k-link--primary {
	color: var(--ikun-teal-400);
}
.vp-doc .demo-link .k-link--info {
	color: var(--ikun-gray-400);
}
.vp-doc .demo-link .k-link--error {
	color: var(--ikun-rose-400);
}
.vp-doc .demo-link .k-link--underline__none {
	text-decoration: none;
}
.vp-doc .demo-empty p {
	margin: 0 !important;
}

.vp-doc .demon-dropdown .k-link--underline__none {
  text-decoration: none;
}

.vp-doc .demon-dropdown .k-link--primary {
  color: var(--ikun-teal-400);
}

.vp-doc ul.k-skeleton-paragraph{
 padding: 0;
}
</style>
