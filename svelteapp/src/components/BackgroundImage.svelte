<script>
    export let imageURL = ""

    function load(e){
        e.target.style.opacity = 1
    }
</script>

<main>
    <div class="backgroundgradient"></div>
    {#if imageURL != ""}
        <img class="backgroundimg" src={imageURL} on:load={load} alt="background">
    {/if}
</main>

<style>
    .backgroundgradient, .backgroundimg {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        animation: bg 1s;
        width: 100vh;
        height: 100vh;
        display: block;
        object-fit: cover;
        position: fixed;
        top: 0;
        left: 0;
        display: block;
        min-height: 100vh;
        min-width: 100vw;
    }

    .backgroundgradient {
        /* background: linear-gradient(to bottom, #292d3e 2%, #292d3ea6 100%); */
        background: linear-gradient(to bottom, var(--theme) 2%, #ffffff00 100%);
        z-index: -1;
    }

    .backgroundimg {
        opacity: 0;
        transition: opacity 1s ease;
        z-index: -2;
    }
</style>