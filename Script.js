let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null;

const notesContainer = document.getElementById("notesContainer");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");

function saveToLocalStorage(){
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes(filteredNotes = notes){

  notesContainer.innerHTML = "";

  if(filteredNotes.length === 0){
    emptyMessage.style.display = "block";
  }else{
    emptyMessage.style.display = "none";
  }

  filteredNotes.forEach((note, index) => {

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${note.date}</small>

      <div class="actions">
        <button class="edit-btn" onclick="editNote(${index})">
          Edit
        </button>

        <button class="delete-btn" onclick="deleteNote(${index})">
          Delete
        </button>
      </div>
    `;

    notesContainer.appendChild(noteDiv);
  });
}

function addNote(){

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if(title === "" || content === ""){
    alert("Please fill all fields");
    return;
  }

  const newNote = {
    title,
    content,
    date: new Date().toLocaleString()
  };

  if(editIndex === null){
    notes.unshift(newNote);
  }else{
    notes[editIndex] = newNote;
    editIndex = null;
  }

  saveToLocalStorage();
  renderNotes();

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

function deleteNote(index){

  if(confirm("Delete this note?")){
    notes.splice(index, 1);
    saveToLocalStorage();
    renderNotes();
  }
}

function editNote(index){

  const note = notes[index];

  document.getElementById("title").value = note.title;
  document.getElementById("content").value = note.content;

  editIndex = index;

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

searchInput.addEventListener("input", () => {

  const searchText = searchInput.value.toLowerCase();

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(searchText) ||
    note.content.toLowerCase().includes(searchText)
  );

  renderNotes(filtered);
});

renderNotes();
