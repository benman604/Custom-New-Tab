<script>
    import { onMount } from "svelte";
    
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    let date = new Date();
    let placeholder = "Welcom, Ben. It's " + formatAMPM(date) + ", " + date.toDateString() + "."
    
    onMount(() => {
        const interval = setInterval(() => {
            date = new Date();
            placeholder = "Welcom, Ben. It's " + formatAMPM(date) + ", " + date.toDateString() + "."
        }, 60000)
        
        return () => {
            clearInterval(interval)
        }
    })
    
    let q
    function enter(){
        let command = q.substring(0, q.indexOf(' ') + 1)
        if(command === "w "){
            window.location.href = "http://en.wikipedia.org/wiki/" + q.slice(2)
        }
        else if(command === "y "){
            window.location.href = "http://youtube.com/results?search_query=" + q.slice(2)
        }
        else if(command === "r "){
            window.location.href = "http://reddit.com/r/" + q.slice(2)
        }
        else if(command === "d "){
            window.location.href = "https://drive.google.com/drive/u/0/search?q=" + q.slice(2)
        } 
        else if(command === "g "){
            window.location.href = "https://github.com/search?q=user%3Abenman604+" + q.slice(2)
        } else{
            window.location.href = "http://google.com/search?q=" + q
        }
    }
    
    document.onclick = function(e) {
        if(e.target.localName == "body" || e.target.localName == "main")
        document.getElementById("commandline").focus()
    }

    let selected = true
</script>

<form action="/" id="form" class="grid {(selected) ? 'gradient-bar-under' : ''}" on:submit|preventDefault={enter}>
    <input 
        type="text" 
        name="q" 
        class="box" 
        placeholder={placeholder} 
        autocomplete="off" 
        bind:value={q} 
        id="commandline"
    >
</form>

<style>
    input {
        border: none;
        height: 32px;
        font-size: large;
        font-family: 'Fira Sans', sans-serif;
        width:95.7%;
    }
    
    input:focus {
        outline: none;
        /* background-color: #141621; */
    }
    
    @keyframes gradient { 
        0%{background-position:0 0}
        100%{background-position:100% 0}
    }
    
    .gradient-bar-under {
        width:auto;
        position: relative;
        display: block;
        width: 100%;
        border-radius: 2px;
    }
    
    .gradient-bar-under:after {
        content: "";
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 999;
        height: 4px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        background-position: 0% 0%;
        background: linear-gradient(to right, #b294ffd5, #57E6E6d5, #FEFFB8d5, #57E6E6d5, #B294FFd5, #57E6E6d5);
        background-size: 500% auto;
        animation: gradient 3s linear infinite;
    }
</style>