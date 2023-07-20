// @ts-ignore
import Notification from "./Notification.svelte";
import type { SvelteComponent } from 'svelte'


type NotifyPlacement = 'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'center'
type NotifyType = 'info'| 'warning'| 'error' | 'success'
export interface NotifyOptions {
    customClass?: string
    close?: boolean
    title?: string
    type?: NotifyType
    placement?: NotifyPlacement
    target?: HTMLElement
    onClose?: () => void
    slotTitle?: string | SvelteComponent, // svelte sfc or html sting
    slot?: string | SvelteComponent, // svelte sfc or html sting
    autoClose?: boolean,
    duration?: number // just only autoClose = true
    offset?: number
}

const defaultNotifyOptions: NotifyOptions = {
    placement: 'right-top',
    close: true,
    target: document.body,
    duration: 3000,
    autoClose: true,
    offset: 0
}

const notifyMap = {
    'right-top': [],
    'center': [],
    'left-bottom': [],
    'right-bottom': [],
    'left-top': [],
}

const resolveNotifyOptions = (options: NotifyOptions) => {
    const evt = {
        onClose: options.onClose
    }

    const context = new Map()
    context.set('slotTitle', options.slotTitle)
    context.set('slot', options.slot)

    const finalOptions = {
        ...defaultNotifyOptions,
        ...options,
    }

    Reflect.deleteProperty(finalOptions, 'onClose')
    Reflect.deleteProperty(finalOptions, 'slot')
    Reflect.deleteProperty(finalOptions, 'slotTitle')

    return {
        finalOptions,
        evt,
        context,
    }
}

 function mountNotify(
   options: NotifyOptions,
   evt: Record<string, Function>,
   context: Map<string, string | SvelteComponent>,
 )
 {
    const notifyArray =  notifyMap[options.placement]
    let index = 0
    if(!notifyArray) {
        console.error('Notify Component Options Error: ' +
          'placement =  \'right-top\' | \'left-top\' | \'right-bottom\' | \'left-bottom\' | \'center\'')
        return
    }

    index = notifyArray.length
    const NotificationInst = new Notification({
        target: options.target,
        props: {
            ...options,
            show: false,
            index,
            'onClose': async () => {
                await unmountNotify(
                  options.placement,
                  NotificationInst,
                  0)
                evt.onClose && evt.onClose()
            }
        },
        context
    })
    NotificationInst.__notify_index =  index
     NotificationInst.__notify_placment =  options.placement

    NotificationInst.$set({ show: true})
    // auto close
    autoUnmountNotify(options, NotificationInst)
    // cache  NotificationInst
    notifyArray.push(NotificationInst)

    return NotificationInst
}

async function autoUnmountNotify(options: NotifyOptions, inst){
    if(options.autoClose){
        await durationUnmountNotify(
          options.placement,
          inst,
          options.duration
        )
    }
}

async function durationUnmountNotify(
  placement: NotifyPlacement,
  inst,
  duration:number
){
    setTimeout(() => {
        unmountNotify(placement, inst, 300)
    }, duration)
}

async function unmountNotify(
  placement: NotifyPlacement,
  inst,
  duration:number
){
    inst.$set({ show: false})
    setTimeout(() => {
        notifyMap[placement].splice(inst.__notify_index, 1)
        updatedNotifyByIndex(placement)
        inst.$destroy();
    },duration)
}

function updatedNotifyByIndex(placement: NotifyPlacement){
    notifyMap[placement].forEach((inst, index) => {
        inst.$set({index})
        inst.__notify_index =  index
    })
}

function NotifyFn(options: NotifyOptions) {
    const { finalOptions, evt, context } = resolveNotifyOptions(options)
    return mountNotify(finalOptions, evt, context)
}

NotifyFn.info = (options: NotifyOptions = {}) => {
    options.type = 'info'
    const { finalOptions, evt, context } = resolveNotifyOptions(options)
    return mountNotify(finalOptions, evt, context)
}

NotifyFn.warning = (options: NotifyOptions = {}) => {
    options.type = 'warning'
    const { finalOptions, evt, context } = resolveNotifyOptions(options)
    return mountNotify(finalOptions, evt, context)
}

NotifyFn.error = (options: NotifyOptions = {}) => {
    options.type = 'error'
    const { finalOptions, evt, context } = resolveNotifyOptions(options)
    return mountNotify(finalOptions, evt, context)
}

NotifyFn.success = (options: NotifyOptions = {}) => {
    options.type = 'success'
    const { finalOptions, evt, context } = resolveNotifyOptions(options)
    return mountNotify(finalOptions, evt, context)
}

NotifyFn.clear = async (inst) => {
    await unmountNotify(inst.__notify_placment, inst, 300)
}

NotifyFn.clearAll = () => {
    Object.keys(notifyMap).forEach(instArr => {
        notifyMap[instArr].forEach(inst => {
            unmountNotify(inst.__notify_placment, inst, 0)
        })
    })
}

NotifyFn.update = async (inst, options: NotifyOptions = {}) => {
    inst.$set({...options})
}

export const Notify = NotifyFn
