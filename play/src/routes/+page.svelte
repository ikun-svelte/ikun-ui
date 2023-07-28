<script lang="ts">
import { KButton } from '@ikun-ui/button'
import { KIcon } from '@ikun-ui/icon'
import { KCallapse } from '@ikun-ui/callapse'
import { KCheckbox } from '@ikun-ui/checkbox'
import { KDrawer } from '@ikun-ui/drawer'
import { browser } from '$app/environment'
import 'virtual:uno.css'

let checked = true
let openDrawer = false
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
{#if browser}
    <KDrawer value={openDrawer}
             on:close={() => openDrawer = false}>
        KDrawer
    </KDrawer>
{/if}

