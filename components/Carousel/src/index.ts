/// <reference types="./types" />
import Carousel from './index.svelte';
import Arrow from './arrow.svelte';
import Indicators from './indicators.svelte';
export { Carousel as KCarousel };
export { Arrow as KCarouselArrow };
export { Indicators as KIndicators };
export default Carousel;

export type { KCarouselProps, KCarouselArrowProps, KIndicatorsProps } from './types';
