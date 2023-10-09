<script>
  import {afterUpdate, createEventDispatcher, onDestroy, onMount} from "svelte"

  export let horizontal = false
  export let uniqueKey
  export let type = "item"

  let resizeObserver
  let itemDiv
  let previousSize

  const dispatch = createEventDispatcher()
  const shapeKey = horizontal ? "offsetWidth" : "offsetHeight"

  onMount(() => {
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(dispatchSizeChange)
      resizeObserver.observe(itemDiv)
    }
  })
  afterUpdate(dispatchSizeChange)
  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })

  function dispatchSizeChange() {
    const size = itemDiv ? itemDiv[shapeKey] : 0
    if (size === previousSize) return
    previousSize = size
    dispatch("resize", {id: uniqueKey, size, type})
  }
</script>

<div bind:this={itemDiv}>
  <slot/>
</div>
