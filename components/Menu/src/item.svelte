<script lang="ts">
    import { getContext } from "svelte";
    import type { KItemType, KMenuProps} from "./types";
    export let items: KMenuProps['items'] = [];
</script>

{#each items as item (item.uid)}
    <slot>
        {#if item.type === 'divider'}
            <svelte:self items={item.children}>

            </svelte:self>
        {/if}
    </slot>
{/each}
