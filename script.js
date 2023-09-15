//  notes = [
//   { id: "1", date: "13/09/2023", entry: "Hi first entry" },
//   { id: "02", date: "14/09/2023", entry: "2nd entry" },
// ];
let notes = [];
// updateUI
function updateUI() {
  clearapp();
  for (let i = 0; i < notes.length; i++) {
    let n = makeNotesdiv(notes[i]);
    appendtoapp(n);
  }
}
function clearapp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}
function makeNotesdiv(note) {
  const div = document.createElement("div");
  div.setAttribute("class", "note-card");
  div.setAttribute("id", `note-${note.id}`);

  const h2 = document.createElement("h2");
  h2.innerText = datechange(note["date"]);

  const h3 = document.createElement("h3");
  h3.innerText = note.entry;

  const btnremove = document.createElement("button");

  btnremove.setAttribute("class", "btn-remove");
  btnremove.setAttribute("id", `btn-${note.id}`);

  btnremove.innerText = "Delete";
  btnremove.addEventListener("click", function () {
    removeNote(note["id"]);
  });

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(btnremove);

  return div;
}
function removeNote(noteId) {
  const toDeleteIndex = notes.findIndex((note) => note.id == noteId);
  notes.splice(toDeleteIndex, 1);
  updateUI();
  savetoLocal();
}
function appendtoapp(note) {
  const app = document.querySelector("#app");
  app.appendChild(note);
}
//hookform
function hookform() {
  const form = document.querySelector("#Add-Entry-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let Adddate = document.querySelector("#date-input").value;
    let Addtext = document.querySelector("#text-entry").value;
    //dateformat
    //const newDate = datechange(Adddate);
    const note = {
      id: new Date().getTime(),
      date: Adddate,
      entry: Addtext,
    };
    addNote(note);
    refresh();
  });
}
//addNote
function addNote(note) {
  notes.push(note);
  sortnotes();
  updateUI();
  savetoLocal();
}
//refresh
function refresh() {
  let Adddate = document.querySelector("#date-input");
  let Addtext = document.querySelector("#text-entry");
  Adddate.value = "";
  Addtext.value = "";
}

function savetoLocal() {
  const str = JSON.stringify(notes);
  localStorage.setItem("my-notes-list", str);
}
function getfromLocal() {
  const str = localStorage.getItem("my-notes-list");
  if (!str) {
    notes = [];
  } else {
    notes = JSON.parse(str);
  }
}
function sortnotes() {
  notes.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}

function datechange(dategn) {
  const date = new Date(dategn);
  const dateyr = date.getFullYear();
  const datemon = date.getMonth() + 1;
  const dateno = date.getDate();
  const changedate = `${dateno}/${datemon}/${dateyr}`;
  return changedate;
}

getfromLocal();
updateUI();
hookform();
