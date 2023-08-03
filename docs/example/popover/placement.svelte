<script>
    import { KPopover } from '@ikun-ui/popover'
    import {KButton} from "@ikun-ui/button";
</script>
<div class="flex items-center flex-wrap">
    <KPopover placement="top">
        <KButton slot="triggerEl" cls="mx-2"> top</KButton>
        <div slot="contentEl" class="flex flex-col">
            <p class="!my-2">亲手点燃黑暗森林的火星</p>
            <KButton type="info"> 前进四 </KButton>
        </div>
    </KPopover>

    <KPopover placement="right">
        <KButton slot="triggerEl" cls="mx-2"> right</KButton>
        <div slot="contentEl" class="flex flex-col">
            <p class="!my-2">亲手点燃黑暗森林的火星</p>
            <KButton type="info"> 前进四 </KButton>
        </div>
    </KPopover>

    <KPopover placement="bottom">
        <KButton slot="triggerEl" cls="mx-2"> bottom</KButton>
        <div slot="contentEl" class="flex flex-col">
            <p class="!my-2">亲手点燃黑暗森林的火星</p>
            <KButton type="info"> 前进四 </KButton>
        </div>
    </KPopover>

    <KPopover placement="left">
        <KButton slot="triggerEl" cls="mx-2"> left</KButton>
        <div slot="contentEl" class="flex flex-col">
            <p class="!my-2">亲手点燃黑暗森林的火星</p>
            <KButton type="info"> 前进四 </KButton>
        </div>
    </KPopover>
</div>

