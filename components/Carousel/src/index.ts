/// <reference types="./types" />
import Carousel from './index.svelte';
import Arrow from './arrow.svelte';
export { Carousel as KCarousel };
export { Arrow as KCarouselArrow };
export default Carousel;

export type { KCarouselProps, KCarouselArrowProps } from './types';
