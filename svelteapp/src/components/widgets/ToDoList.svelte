<script>
    class Item{
        constructor(content, id){
            this.content = content
            this.checked = false
            this.starred = false
            this.id = id
        }
    }

    let notes = [];

    let newNote = new Item("", 0)
    function addNote() {
        if(newNote.content == "") return
        notes.unshift(newNote);
        notes = notes
        newNote = new Item("", notes.length)
    }

    function deleteNote(note) {
        notes = notes.filter(n => n.id != note.id)
    }

    function collectGarbage() {
        notes = notes.filter(n => !n.checked)
    }

    $: {
        for(let note of notes){
            if(note.checked) note.starred = false
            if(note.starred) note.checked = false
        }

        notes = notes.sort((a, b) => {
            if (!a.starred && b.starred) return 1
            if (a.starred && !b.starred) return -1
            if (a.checked && !b.checked) return 1
            if (!a.checked && b.checked) return -1
            return 0
        })

        try {
            browser.storage.sync.set({notes: notes})
        } catch (error) {}
    }

    try {
        browser.storage.sync.get(['notes'], function(result) {
            console.log(result)
            if(result.notes != undefined){
                notes = result.notes
            }
        })
    } catch (error) {
        console.log(error)
    }
</script>

<main>
    <form action="#" class="grid" on:submit|preventDefault={addNote}>
        <input type="text" placeholder="New Todo..." class="box" bind:value={newNote.content} />
    </form>
    
    {#if notes.length > 0}
        <ul class="box">
            {#each notes as note}
                <li>
                    <input type="checkbox" bind:checked={note.checked} />
                    <span class="todo-item-text {(note.checked) ? 'strikethrough' : ''}">{note.content}</span>
                    <div class="actions">
                        <button on:click={()=>{note.starred = !note.starred}}>
                            <svg class="{(note.starred) ? 'highlight' : ''}" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 117.19"><title>black-star</title><path d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"/></svg>
                        </button>
                        <button on:click={()=>{deleteNote(note)}}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.16 122.88"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>delete</title><path class="cls-1" d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"/></svg>
                        </button>
                    </div>
                </li>

                {#if note != notes[notes.length - 1]}
                    <hr />
                {/if}

            {/each}
            <button class="smallbutton" on:click={collectGarbage}>clear</button>
        </ul>
    {:else}
        <div class="box">Nothing todo.</div>
    {/if}

</main>

<style>
    /* bruh i hate css 😭 */

    .smallbutton {
        background: transparent;
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        color: #999;
        float: right;
    }

    .smallbutton:hover {
        color: rgb(202, 202, 202);
    }

    .highlight {
        fill: #f2c94c !important;
    }

    .strikethrough {
        text-decoration: line-through;
        color:rgba(255, 255, 255, 0.5)
    }

    .actions{
        float:right;
        font-size:small;
    }

    .actions button {
        background: transparent;
        border: none;
        cursor: pointer;
    }

    .actions button svg{
        width: 20px;
        height: 20px;
        fill: rgb(148, 145, 184);
    }

    .actions button svg:hover{
        fill: rgb(56, 56, 56);
    }

    input {
        border: none;
        height: 15px;
        font-size: large;
        font-family: 'Fira Sans', sans-serif;
    }
    
    input:focus {
        outline: none;
    }
    
    input[type="checkbox"] {
        width: 15px;
        height: 15px;
        background-color: var(--palenight);
        border-radius: 50%;
        /* vertical-align: middle; */
        border: 1px solid #ddd;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        cursor: pointer;
    }

    input[type="checkbox"]:hover:not(:checked) {
        background-color: #272727;
        border: 1px solid #007bff;
    }

    input[type="checkbox"]:checked {
        background-color: #007bff;
        border: 1px solid #007bff;
    }
    
    main {
        height: 100%;
    }
    
    ul {
        max-height: 200px;
        overflow: scroll;
    }

    ul::-webkit-scrollbar {
        display: none;
    }

    .todo-item-text{
        display: inline-block;
        max-width: 185px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    hr {
        margin: 0;
        margin-bottom: 5px;
        border: 0;
        height: 0;
        border-top: 1px solid rgba(100, 100, 100, 0.5);
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }
</style>