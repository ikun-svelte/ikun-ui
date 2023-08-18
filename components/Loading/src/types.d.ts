/// <reference types="svelte" />

export declare interface LoadingOptions {
	/**
	 * show loading
	 */
	show: boolean;
	/**
	 * loading text
	 */
	text?: string;
	/**
	 * loading for full screen
	 */
	fullScreen?: boolean;
	/**
	 * loading mask background color
	 */
	background?: string;
	/**
	 * loading spinner
	 */
	spinner?: string;
	/**
	 * loading spinner rotating
	 */
	rotating?: boolean;
	/**
	 * custom class
	 */
	cls?: string;
}
