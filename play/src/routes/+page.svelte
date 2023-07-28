<script lang="ts">
import { KButton } from '@ikun-ui/button'
import { KIcon } from '@ikun-ui/icon'
import { KCallapse } from '@ikun-ui/callapse'
import { KCheckbox } from '@ikun-ui/checkbox'
import 'virtual:uno.css'

let checked = true
</script>
<KButton icon="i-carbon-settings" type="info" disabled>123</KButton>
<KIcon icon="i-carbon-settings" btn ></KIcon>
<KCallapse>
    <span slot="title">title</span>
    <span slot="content">content</span>
</KCallapse>
<KCheckbox value={checked}
           on:updateValue={(e) => checked = e.detail}
           label={`${checked}`}>
</KCheckbox>
