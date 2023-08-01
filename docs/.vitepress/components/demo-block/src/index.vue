<script lang='ts' setup name="demo-block">
import { computed } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'
import { usePlayground } from './playground'
import { demoProps } from './index'

const props = defineProps(demoProps)

const decodedHighlightedCode = computed(() =>
  decodeURIComponent(props.highlightedCode),
)
const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) })
const [value, toggle] = useToggle()

const editOnPlayground = () => {
  if (props.code) {
    const { link } = usePlayground(props.code)
    if (!isClient)
      return
    window.open(link)
  }
}
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs" class="mt-6">
      <div class="o-demo_wrapper vp-raw bg">
        <slot />
      </div>
      <div class="relative">
        <div class="o-demo_actions">
          <a class="o-demo_action_item" group @click="editOnPlayground">
            <div class="o-demo_action_icon i-carbon:chemistry" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              Edit in Playground
            </div>
          </a>
          <a class="o-demo_action_item" group :href="github" target="_blank">
            <div class="o-demo_action_icon i-carbon-logo-github" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              Edit on GitHub
            </div>
          </a>
          <a class="o-demo_action_item" group @click="copy()">
            <div class="o-demo_action_icon i-carbon:copy" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ copied ? 'Copied' : 'Copy code' }}
            </div>
          </a>
          <a class="o-demo_action_item" group @click="toggle()">
            <div class="o-demo_action_icon i-carbon:fit-to-width" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ value ? 'Hidden code' : 'Show code' }}
            </div>
          </a>
        </div>
        <div v-show="value" :class="`language-${lang} extra-class`" v-html="decodedHighlightedCode" />
      </div>
    </div>
  </ClientOnly>
</template>
