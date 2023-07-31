<script lang="ts">
import { KButton } from '@ikun-ui/button'
import { KIcon } from '@ikun-ui/icon'
import { KCallapse } from '@ikun-ui/callapse'
import { KCheckbox } from '@ikun-ui/checkbox'
import { KDrawer } from '@ikun-ui/drawer'
import { KEyeDropper } from '@ikun-ui/eyeDropper'
import { KInput } from '@ikun-ui/input'
import { KPopover } from '@ikun-ui/popover'
import { KTooltip } from '@ikun-ui/tooltip'
import { KModal } from '@ikun-ui/modal'
import 'virtual:uno.css'

let checked = true
let openDrawer = false
let openModal = false
let inputValue = ''
</script>
<KButton icon="i-carbon-settings"
         type="info"
         on:click={() => openDrawer = true}>
    drawer
</KButton>
<KIcon icon="i-carbon-settings" btn ></KIcon>
<KCallapse>
    <span slot="title">title</span>
    <span slot="content">content</span>
</KCallapse>
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
