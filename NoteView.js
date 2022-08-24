export default class NoteView {
    constructor(root, handlers) {
        this.root = root;
        const {
            onNoteAdd,
            onNoteEdit,
            onNoteSelect,
            onNoteDelete
        } = handlers;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteSelect = onNoteSelect;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
        <section class="side-add-note d-flex flex-column p-3">
            <h2 class="text-center">Notes</h2>
            <hr>
            <div class="note-list"></div>
            <button class="btn add-btn">Add Note</button>
        </section>
        <section class="note-input-box container">
            <form action="" class="d-flex flex-column note-input-form">
                <input class="new-note-input my-4  p-2" type="text" placeholder="Title">
                <textarea class="take-note-text  p-2">Note ...</textarea>
            </form>
        </section>
        `;
        const addNoteBtn = this.root.querySelector(".add-btn");
        const addNoteInput = this.root.querySelector(".new-note-input");
        const addNoteTxt = this.root.querySelector(".take-note-text");

        addNoteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.onNoteAdd();
        });
        [addNoteInput, addNoteTxt].forEach((input) => {
            input.addEventListener("blur", () => {
                const newTitle = addNoteInput.value.trim();
                const newBody = addNoteTxt.value.trim();
                this.onNoteEdit(newTitle, newBody);
            })
        })
    }
    _createListItemHtml(id, title, body, updated) {
        const MAX_LENGTH = 50;
        return `
        <div class="note-box" data-note-id="${id}">
            <div class="d-flex justify-content-between align-items-center">
                <h5>${title}</h5>
                <span class="trash-icon d-flex justify-content-center align-items-center" data-note-id="${id}"><i class="fa-solid fa-trash"></i></span>
            </div>
            <p class="fw-semibold">
                ${body.substring(0 , MAX_LENGTH)}
                ${body.length > MAX_LENGTH ? "..." : ""}
            </p>
            <p>
                ${new Date(updated).toLocaleString('en', {dateStyle: 'full' , timeStyle: 'short'})}
            </p>
        </div>
        `;
    }
    updateNoteList(notes) {
        const noteContainer = this.root.querySelector(".note-list");
        noteContainer.innerHTML = "";
        let notesList = "";
        for (const note of notes) {
            const {
                id,
                title,
                body,
                updated
            } = note;
            const html = this._createListItemHtml(id, title, body, updated);
            notesList += html;
        }
        noteContainer.innerHTML = notesList;
        noteContainer.querySelectorAll(".note-box").forEach((noteItem) => {
            noteItem.addEventListener("click", () => {
                this.onNoteSelect(noteItem.dataset.noteId);
            });
        });
        noteContainer.querySelectorAll(".trash-icon").forEach((noteItem) => {
            noteItem.addEventListener("click", (e) => {
                e.stopPropagation();
                this.onNoteDelete(noteItem.dataset.noteId);
                console.log(noteItem.dataset.noteId);
            });
        });
    }
    updateActiveNote(note) {
        this.root.querySelector(".new-note-input").value = note.title;
        this.root.querySelector(".take-note-text").value = note.body;

        this.root.querySelectorAll(".note-box").forEach((item) => {
            item.classList.remove("selected-item");
        });
        this.root.querySelector(`.note-box[data-note-id="${note.id}"]`).classList.add("selected-item");
    }
    updateNotePreviewVisibility(visible){
        this.root.querySelector(".note-input-box").style.visibility = visible ? "visible" : "hidden";
    }
}