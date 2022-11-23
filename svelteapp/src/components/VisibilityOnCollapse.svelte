<script>
    import { slide } from 'svelte/transition';
    export let visibilityOnCollapse = false
    export let focusMode = false

    let shouldTransition = false
    setInterval(() => {
        shouldTransition = true
    }, 500)
    $: useTransition = shouldTransition ? slide : () => {}
</script>

<main>
    {#if focusMode == visibilityOnCollapse}
        <div transition:useTransition>
            <slot />
        </div>
    {/if}
</main>