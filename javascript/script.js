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
        var divElm = document.createElement("div");
        var delBtnElm = document.createElement("button");
        var edtBtnElm = document.createElement("button");
        var edtTimeBtnElm = document.createElement("button");

        divElm.setAttribute("class", "buttons");
        delBtnElm.setAttribute("class", "delete");
        edtBtnElm.setAttribute("class", "edit");
        edtTimeBtnElm.setAttribute("class", "edit-time");

        var date = new Date(noteList[i].dueDate);


        if (noteList[i].important == true){
            liElm.setAttribute("class", "important");
        }

        pElm.innerHTML = "<h3>" + noteList[i].text + "</h3><div class='time'>" + ('0' + date.getDate()).slice(-2) + "/" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('000' + date.getFullYear()).slice(-4) + " kl " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + "</div>";

        edtBtnElm.innerHTML = "Edit note";
        edtBtnElm.setAttribute("data-index", i);

        edtTimeBtnElm.innerHTML = "Edit time";
        edtTimeBtnElm.setAttribute("data-index", i);

        delBtnElm.innerHTML = "Delete note";
        delBtnElm.setAttribute("data-index", i);

        edtBtnElm.addEventListener("click", submitEdtEvent);
        edtTimeBtnElm.addEventListener("click", submitEdtDateEvent);
        delBtnElm.addEventListener("click", submitDelEvent);

        liElm.appendChild(pElm);
        liElm.appendChild(divElm);
        divElm.appendChild(edtBtnElm);
        divElm.appendChild(edtTimeBtnElm);
        divElm.appendChild(delBtnElm);

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

function submitEdtDateEvent(event) {
    var arrIndex = event.target.getAttribute("data-index");
    var notes = getLocal();

    var date = new Date(notes[arrIndex].dueDate);
    var newDate = prompt("Nuværende dato " + ('0' + date.getDate()).slice(-2) + "/" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('000' + date.getFullYear()).slice(-4) + " & nuværende tid: " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2));

    var aar = newDate.slice(-10, -6);
    var maaned = newDate.slice(-13,-11);
    var dag = newDate.slice(-16,-14);
    var tid = newDate.slice(-2);
    var minut = newDate.slice(-5,-3);

    date.setDate(dag);
    date.setMonth(maaned);
    date.setFullYear(aar);
    date.setHours(tid);
    date.setMinutes(minut);

    notes[arrIndex].dueDate = newDate;

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
