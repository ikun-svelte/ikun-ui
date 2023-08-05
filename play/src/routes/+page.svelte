<script lang="ts">
import { KButton } from '@ikun-ui/button'
// import { KIcon } from '@ikun-ui/icon'
// import { KCollapse } from '@ikun-ui/collapse'
// import { KCheckbox } from '@ikun-ui/checkbox'
// import { KDrawer } from '@ikun-ui/drawer'
// import { KEyeDropper } from '@ikun-ui/eye-dropper'
// import { KInput } from '@ikun-ui/input'
// import { KPopover } from '@ikun-ui/popover'
// import { KTooltip } from '@ikun-ui/tooltip'
// import { KModal } from '@ikun-ui/modal'
// import { KTag } from '@ikun-ui/tag'
// import { Notify } from '@ikun-ui/notify'
// import { KSwitch } from '@ikun-ui/switch'
// import { KSelect } from '@ikun-ui/select'
import 'virtual:uno.css'

let checked = true
let openDrawer = false
let openModal = false
let inputValue = ''

const handleNotify = () => {
  /*Notify.success({
    title: 'Notify Success',
    duration: 99999,
    autoClose: true,
    slot: 'Notify Success'
  })*/
}

let switchVal = false
let selectVal = ''
</script>
<KButton icon="i-carbon-settings"
         type="primary"
         on:click={() => openDrawer = true}>
    drawer
</KButton>
<!--<KIcon icon="i-carbon-settings" btn ></KIcon>
<KCollapse>
    <span slot="title">title</span>
    <span slot="content">content</span>
</KCollapse>
<KCheckbox value={checked}
           on:updateValue={(e) => checked = e.detail}
           label={`${checked}`}>
</KCheckbox>
<KDrawer value={openDrawer}
         on:close={() => openDrawer = false}>
    KDrawer
</KDrawer>
<KEyeDropper let:open>
    <KButton type="primary"
             on:click={() => open()}>
        KEyeDropper
    </KButton>
</KEyeDropper>

<KInput value={inputValue}
        placeholder="inputValue"
        icon="i-carbon-settings">
</KInput>

<KTooltip content="KTooltip - content" placement="bottom">
    <KButton type="warning"
             slot="triggerEl">
        KTooltip - trigger
    </KButton>
</KTooltip>

<KPopover placement="bottom">
    <span slot="contentEl">KPopover - content</span>
    <KButton type="error"
             slot="triggerEl">
        KPopover - trigger
    </KButton>
</KPopover>

<KButton icon="i-carbon-settings"
         type="success"
         on:click={() => openModal = true}>
    KModal
</KButton>

<KModal show={openModal} title="KModal" on:close={(v) => openModal = v.detail}>
   <span>KModal</span>
</KModal>

<KTag type="success">
    success KTag
</KTag>
<KTag type="info">
    info KTag
</KTag>
<KTag type="primary">
    primary KTag
</KTag>
<KTag type="error">
    error KTag
</KTag>
<KTag type="warning">
    warning KTag
</KTag>

<KButton on:click={handleNotify}>handleNotify</KButton>

<KSwitch value={switchVal}
        on:updateValue={(v) =>switchVal= v.detail}>
</KSwitch>

<KSelect value="{selectVal}"
         icon="i-carbon-settings"
         placeholder="selectValue">
    {#each ['Tiny', 'Small', 'Normal', 'Large', 'Huge'] as item (item)}
        <option>{item}</option>
    {/each}
</KSelect>-->
