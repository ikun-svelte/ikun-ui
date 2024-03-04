/// <reference types="./types" />
import Countdown from './index.svelte';
export { Countdown as KCountdown };

export default Countdown;
export * from './utils';
export type { KCountdownProps } from './types';
