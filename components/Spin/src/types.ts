/// <reference types="svelte" />

export declare interface SpinOptions<T> {
	/**
	 * show spin
	 */
	show: boolean;
	/**
	 * spin text
	 */
	text?: string;
	/**
	 * spin for full screen
	 */
	fullScreen?: boolean;
	/**
	 * spin mask background color
	 */
	background?: string;
	/**
	 * spin spinner
	 */
	spinner?: string | T;
	/**
	 * spin spinner rotating
	 */
	rotating?: boolean;
	/**
	 * custom class
	 */
	cls?: string;
	/**
	 * Additional attributes
	 */
	attrs?: any;
}
