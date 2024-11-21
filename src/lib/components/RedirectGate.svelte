<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { logged_in } from "$lib/store";

    onMount(async () => {
        if (browser && !$logged_in) {
            goto("/");
        }
    });
</script>

{#if $logged_in} <slot /> {/if}
