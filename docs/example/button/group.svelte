<script>
    import { KButton } from '@ikun-ui/button';
    import { KButtonGroup } from '@ikun-ui/button-group';
</script>

<div class="flex items-center flex-wrap">
    <KButtonGroup>
        <KButton type="primary">🎤</KButton>
        <KButton type="primary">💃</KButton>
        <KButton type="primary">🤟</KButton>
        <KButton type="primary" round="10">🏀</KButton>
    </KButtonGroup>

    <KButtonGroup cls="ml-20px">
        <KButton icon="i-carbon-settings" type="success" round="18">settings</KButton>
        <KButton icon="i-carbon:edit" type="primary"></KButton>
        <KButton icon="i-carbon:share" type="primary" disabled></KButton>
        <KButton icon="i-carbon:trash-can" type="error"></KButton>
    </KButtonGroup>
</div>
