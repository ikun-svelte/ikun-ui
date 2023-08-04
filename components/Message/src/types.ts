/// <reference types="svelte" />
import type { IKunTypeBase, UncertainFunction } from '@ikun-ui/utils'
export type MessageType = IKunTypeBase

export declare type MessageOptions<T> = {
  /**
   * Whether the notification can be closed manually
   */
  close?: boolean;
  /**
   * The emotion category of the notification
   */
  type?: MessageType;
  /**
   * @internal
   * The message is mounted
   * using this as the anchor point
   */
  target?: Element;
  /**
   * The callback method when the message is closed
   */
  onClose?: UncertainFunction;
  /**
   * The content of the message,
   * which can be a html string or a svelte component
   */
  content?: string | T;
  /**
   * Whether the message is automatically closed
   */
  autoClose?: boolean;
  /**
   * Message's auto-close timing
   * (only when `autoClose = true`) takes effect
   */
  duration?: number;
  /**
   * Message is offset on the y-axis
   */
  offset?: number;
  /**
   * Additional class
   */
  cls?: string;
  /**
   * Additional attributes
   */
  attrs?: any;
}
