<script>
    import { KTooltip } from '@ikun-ui/tooltip'
    import {KButton} from "@ikun-ui/button";
</script>
<div class="flex items-center flex-wrap">
    <KTooltip placement="top"
              content="A person's loneliness,
never had the lonely mood is wrapped by this dark night.">
        <KButton slot="triggerEl" cls="mx-2"> top</KButton>
    </KTooltip>

    <KTooltip placement="right"
              content="A person's loneliness,
never had the lonely mood is wrapped by this dark night.">
        <KButton slot="triggerEl" cls="mx-2"> right</KButton>
    </KTooltip>

    <KTooltip placement="bottom"
              content="A person's loneliness,
never had the lonely mood is wrapped by this dark night.">
        <KButton slot="triggerEl" cls="mx-2"> bottom</KButton>
    </KTooltip>

    <KTooltip placement="left"
              content="ha ha ha ha ha">
        <KButton slot="triggerEl" cls="mx-2"> left</KButton>
    </KTooltip>
</div>

