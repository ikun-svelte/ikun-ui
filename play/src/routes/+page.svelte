<script lang="ts">
import { KButton } from '@ikun-ui/button'
import { KIcon } from '@ikun-ui/icon'
import { KCallapse } from '@ikun-ui/callapse'
import 'virtual:uno.css'
</script>
<KButton icon="i-carbon-settings" type="info">123</KButton>
<KIcon icon="i-carbon-settings" btn ></KIcon>
<KCallapse>
    <span slot="title">title</span>
    <span slot="content">content</span>
</KCallapse>
