<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KImageProps } from './types';
  import { BROWSER } from "esm-env";
  import { createEventDispatcher, onMount } from "svelte";
  export let previewSrcList: KImageProps['previewSrcList']  = []
  export let fit: KImageProps['fit'] = undefined;
  export let loading: KImageProps['loading'] = undefined;
  export let lazy: KImageProps['lazy'] = false;
  export let src: KImageProps['src'] = '';
  export let alt: KImageProps['alt'] = '';
	export let cls: KImageProps['cls'] = undefined;
	export let attrs: KImageProps['attrs'] = {};

  let imageSrc: string | undefined = undefined
  let hasLoadError = false
  let isLoading = true

  const dispatch = createEventDispatcher();
  const loadImage = () => {
    if (!BROWSER) return
    // reset status
    isLoading = true
    hasLoadError = false
    imageSrc = src
  }

  function handleLoad(event: Event) {
    isLoading = false
    hasLoadError = false
    dispatch('load', event)
  }

  function handleError(event: Event) {
    isLoading = false
    hasLoadError = true
    dispatch('error', event)
  }

  const supportLoading = BROWSER && 'loading' in HTMLImageElement.prototype

  $: isManual = function(loadingValue, lazy){
    if (loadingValue === 'eager') return false
    return (!supportLoading && loadingValue === 'lazy') || lazy
  }(loading, lazy)

  let oldSrc = src
  $: {
    if(oldSrc !== src){
      if (isManual) {
        // reset status
        // isLoading = true
        // hasLoadError = false
        // removeLazyLoadListener()
        // addLazyLoadListener()
      } else {
        loadImage()
      }
      oldSrc = src
    }

  }

  onMount(() => {
    if (isManual) {
      // addLazyLoadListener()
    } else {
      loadImage()
    }
  })


  function clickHandler() {
    // don't show viewer when preview is false
    //if (!preview.value) return
    //
    //stopWheelListener = useEventListener('wheel', wheelHandler, {
    //  passive: false,
    //})
    //
    //// prevent body scroll
    //prevOverflow = document.body.style.overflow
    //document.body.style.overflow = 'hidden'
    //showViewer.value = true
    //emit('show')
  }

  $: isPreview = Array.isArray(previewSrcList) && previewSrcList.length > 0

	const prefixCls = getPrefixCls('image');
	$: cnames = clsx(
		prefixCls,
		cls
	);
  $: errorCls = clsx(`${prefixCls}__error`)
  $: wrapperCls = clsx(`${prefixCls}__wrapper`)
  $: placeholderCls = clsx(`${prefixCls}__placeholder`)
  $: imageKls = clsx(
    `${prefixCls}__inner`,
    {
      [`${prefixCls}__inner`]: isPreview,
      [`${prefixCls}__loading`]: isLoading
    }
  )
</script>

<div class={cnames}>
  {#if hasLoadError}
    <slot name="error">
      <!--TODO: i18n -->
      <div class={errorCls}>FAILED</div>
    </slot>
  {:else }
    {#if imageSrc !== undefined}
      <img
        alt={alt}
        aria-hidden="true"
        {...$$restProps}
        {...attrs}
        src={imageSrc}
        loading="{loading}"
        style:object-fit="{fit}"
        class="{imageKls}"
        on:click="{clickHandler}"
        on:load="{handleLoad}"
        on:error="{handleError}"
      />
    {/if}
    {#if isLoading}
      <div class={wrapperCls}>
        <slot name="placeholder">
          <div class={placeholderCls} />
        </slot>
      </div>
    {/if}
  {/if}
</div>
