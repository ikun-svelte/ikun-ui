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
import 'virtual:uno.css'

let checked = true
let openDrawer = false
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
    <KButton type="primary"
             slot="triggerEl">
        KTooltip - trigger
    </KButton>
</KTooltip>

<KPopover placement="bottom">
    <span slot="contentEl">KPopover - content</span>
    <KButton type="primary"
             slot="triggerEl">
        KPopover - trigger
    </KButton>
</KPopover>
