<script>
    import { KTooltip } from '@ikun-ui/tooltip'
    import {KButton} from "@ikun-ui/button";
</script>
<div class="flex items-center flex-wrap">
    <KTooltip trigger="click" content="A person's loneliness,
never had the lonely mood is wrapped by this dark night.">
        <KButton slot="triggerEl" cls="mx-2"> click</KButton>
    </KTooltip>

    <KTooltip trigger="manual" content="A person's loneliness,
never had the lonely mood is wrapped by this dark night.">
        <KButton slot="triggerEl" cls="mx-2"> manual</KButton>
    </KTooltip>

    <KTooltip trigger="hover" content="A person's loneliness,
never had the lonely mood is wrapped by this dark night.">
        <KButton slot="triggerEl" cls="mx-2"> hover</KButton>
    </KTooltip>
</div>

