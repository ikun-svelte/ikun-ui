<script>
    import { KDrawer } from '@ikun-ui/drawer'
    import { KButton } from '@ikun-ui/button'
    let show = false
    let placement = 'right'
    const open = () => {
        placement = 'right'
        show = true
    }
    const close = () => show = false

    let showLeft = false
    const openLeft = () => {
        placement = 'left'
        show = true
    }
    const closeLeft = () => show = false
</script>
<div class="flex">
    <KButton on:click={open}>
        open the right drawer
    </KButton>

    <KButton on:click={openLeft} cls="mx-2">
        open the left drawer
    </KButton>
</div>

<KDrawer  value={show}
          placement={placement}
          target={document.body}
          on:close={close}>
    <div class="w-full fc">
        <h2 class="w-300px text-center !my-2">
            A person's loneliness, never had the lonely mood is wrapped by this dark night.
        </h2>
    </div>
</KDrawer>

<KDrawer  value={showLeft}
          placement={placement}
          target={document.body}
          on:close={closeLeft}>
    <div class="w-full fc">
        <h2 class="w-300px text-center !my-2">
            For me, it is enough to be sure that you and I coexist at this moment.
        </h2>
    </div>
</KDrawer>
