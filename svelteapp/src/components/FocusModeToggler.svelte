<script>
    export let focusMode = false

    function toggleFocusMode(){
        focusMode = !focusMode
        try {
            chrome.storage.local.set({focusmode: JSON.stringify(focusMode)});
        } catch (error) {
            console.log(error)
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click={toggleFocusMode}>
    {#if focusMode}
        <svg viewBox="0 0 100 80" width="40" height="40" class="hidden" id="twoline">
            <rect width="100" height="20" rx="10" ry="10"/>
            <rect y="35" width="100" height="50" rx="10" ry="10"/>
        </svg>
    {:else}
        <svg viewBox="0 0 100 80" width="40" height="40" id="oneline" style="padding-top: 7px;">
            <rect width="100" height="40" rx="20" ry="20"/>
        </svg>
    {/if}
</main>

<style>
    main {
        position: fixed;
        top: 0;
        right: 0;
        margin: 1rem;
        width: 1rem;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        fill:rgba(0, 0, 0, 0.5) !important;
    }
</style>