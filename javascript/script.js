var modal = document.querySelector(".modal-bg");

function setLocal(localNotes){
    var jsonData = JSON.stringify(localNotes);

    localStorage.setItem("notes", jsonData);
}

function getLocal(){
    var notes = localStorage.getItem("notes");
    if(notes == null){
        return [];
    }else{
        return JSON.parse(notes);
    }
}

function submitNote(text, time, important){
    var origNotes = getLocal();

    var newNote = {
        text:       text,
        dueDate:    time,
        important:  important
    };

    origNotes.push(newNote);

    setLocal(origNotes);
}

function buildList(){
    var noteList = getLocal();
    var ulElm = document.querySelector("ul");

    ulElm.innerHTML = "";

    for(var i = 0; i < noteList.length; i++){
        var liElm = document.createElement("li");
        var pElm = document.createElement("p");
        var delBtnElm = document.createElement("button");
        var edtBtnElm = document.createElement("button");

        var date = new Date(noteList[i].dueDate);

        pElm.innerHTML = noteList[i].text + " - " + ('0' + date.getDate()).slice(-2) + "/" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('000' + date.getFullYear()).slice(-4) + " kl " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);

        delBtnElm.innerHTML = "Delete";
        delBtnElm.setAttribute("data-index", i);

        edtBtnElm.innerHTML = "Edit";
        edtBtnElm.setAttribute("data-index", i);

        delBtnElm.addEventListener("click", submitDelEvent);
        edtBtnElm.addEventListener("click", submitEdtEvent);

        liElm.appendChild(pElm);
        liElm.appendChild(delBtnElm);
        liElm.appendChild(edtBtnElm);

        ulElm.appendChild(liElm);
    }
}

function submitDelEvent(event) {
    var arrIndex = event.target.getAttribute("data-index");
    var notes = getLocal();

    notes.splice(arrIndex, 1);

    setLocal(notes);
    buildList();
}

function submitEdtEvent(event) {
    var arrIndex = event.target.getAttribute("data-index");
    var notes = getLocal();
    var newText = prompt("Hvad skal teksten være?");

    notes[arrIndex].text = newText;

    setLocal(notes);
    buildList();
}

function submitNoteEvent(event) {
    var noteText = document.querySelector("#noteText");
    var noteTime = document.querySelector("#noteTime");
    var noteImportant = document.querySelector("#noteImportant");

    submitNote(noteText.value, noteTime.value, noteImportant.checked);
    buildList();
    modal.style.display = "none";
}

window.onload = function(){
    buildList();
}

var showModalBtn = document.querySelector("#showModal");

showModalBtn.addEventListener("click", function(event){
    modal.style.display = "block";
});

var submitNoteBtn = document.querySelector("#addNote");
submitNoteBtn.addEventListener("click", submitNoteEvent);
