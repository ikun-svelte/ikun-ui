/// <reference types="./types" />
import Segmented from './index.svelte';
import SegmentedItem from './item.svelte';
export { Segmented as KSegmented };
export { SegmentedItem as KSegmentedItem };
export default Segmented;

export type {
	KSegmentedProps,
	KSegmentedItemProps,
	SizeChangeFns,
	ValueChangeFns,
	KSegmentedContext
} from './types';
