<script>
    import { KPopover } from '@ikun-ui/popover'
    import {KButton} from "@ikun-ui/button";
</script>
<div class="flex items-center">
    <KPopover trigger="click">
        <KButton slot="triggerEl" cls="mx-2"> click</KButton>
        <div slot="contentEl" class="flex flex-col">
            <p class="!my-2">亲手点燃黑暗森林的火星</p>
            <KButton type="info"> 前进四 </KButton>
        </div>
    </KPopover>

    <KPopover trigger="manual">
        <KButton slot="triggerEl" cls="mx-2"> manual</KButton>
        <div slot="contentEl" class="flex flex-col">
            <p class="!my-2">亲手点燃黑暗森林的火星</p>
            <KButton type="info"> 前进四 </KButton>
        </div>
    </KPopover>

    <KPopover trigger="hover">
        <KButton slot="triggerEl" cls="mx-2"> hover</KButton>
        <div slot="contentEl" class="flex flex-col">
            <p class="!my-2">亲手点燃黑暗森林的火星</p>
            <KButton type="info"> 前进四 </KButton>
        </div>
    </KPopover>
</div>

