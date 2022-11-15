var commandline = document.querySelector('#commandline')
var form = document.querySelector('form')
const date = new Date()

// transition on background image load
document.querySelector(".backgroundimg").onload = function() {
    this.style.opacity = 1
}

// date formater
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

commandline.placeholder = "Welcom, Ben. It's " + formatAMPM(date) + ", " + date.toDateString() + "."

// search bar behavior
document.onclick = function(e) {
    if(e.target.localName == "body")
        commandline.select()
};

form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log(commandline.value)
    let q = commandline.value
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
})


// worlds simpliest crud
var textarea = document.querySelector('#notes')
var notes = []
var currentNote = 0

document.getElementById('new').addEventListener('click', function(e) {
    e.preventDefault()
    notes.push('')
    textarea.value = ''
    currentNote = notes.length - 1
})

document.getElementById('delete').addEventListener('click', function(e) {
    e.preventDefault()
    if(notes.length == 0){
        return
    } 
    if(notes.length == 1){
        notes = ['']
        textarea.value = ''
        currentNote = 0
        localStorage.setItem('notes', JSON.stringify(notes))
        updateList()
        return
    }
    notes.splice(currentNote, 1)
    currentNote = notes.length - 1
    textarea.value = notes[currentNote]
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
})

function updateList(){
    document.querySelector('#all').innerHTML = ""
    for(let note of notes){
        let a = document.createElement('a')
        a.href = '#'
        a.textContent = note
        a.addEventListener('click', function(e) {
            e.preventDefault()
            textarea.value = note
            currentNote = notes.indexOf(note)
        })
        document.querySelector('#all').appendChild(a)
    }
}

if(localStorage.getItem('notes') !== null) {
    notes = JSON.parse(localStorage.getItem('notes'))
    textarea.value = notes[0]
    currentNote = notes.length - 1
    updateList()
} else {
    notes.push('')
    localStorage.setItem('notes', JSON.stringify(notes))
}

textarea.addEventListener('input', (e) => {
    notes[currentNote] = e.target.value
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
})

let focusmode = false

if(localStorage.getItem('focusmode') !== null) {
    focusmode = JSON.parse(localStorage.getItem('focusmode'))
    if(focusmode){
        toggleFocusmode()
    }
}

function toggleFocusmode(){
    focusmode = !focusmode
    localStorage.setItem('focusmode', JSON.stringify(focusmode))
    document.querySelector('.below').classList.toggle('hidden')
    document.querySelector('.root').classList.toggle('vcenter')
    document.getElementById('oneline').classList.toggle('hidden')
    document.getElementById('twoline').classList.toggle('hidden')
}

document.getElementById("togglebottom").addEventListener('click', function(e) {
    e.preventDefault()
    toggleFocusmode()
})
