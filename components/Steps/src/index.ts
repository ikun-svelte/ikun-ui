/// <reference types="./types" />
import Steps from './index.svelte';
import Step from './step.svelte';
export { Steps as KSteps };
export { Step as KStep };
export default Steps;

export type { KStepsProps, KStepsItem, KStepsItems, KStepProps, KStepStatus } from './types.d';
