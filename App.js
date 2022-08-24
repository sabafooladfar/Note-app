import NoteApi from "./NoteApi.js";
import NoteView from "./NoteView.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NoteView(root, this._handlers());
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NoteApi.getAllNotes();
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
        this.activeNote = notes[0];
        this.view.updateActiveNote(notes[0]);
    }

    _handlers() {
        return {
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take Note"
                };
                NoteApi.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (newTitle, newBody) => {
                NoteApi.saveNote({
                    id: this.activeNote.id,
                    title: newTitle,
                    body: newBody
                });
                this._refreshNotes();
            },
            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find((n) => n.id == noteId);
                this.activeNote = selectedNote;
                this.view.updateActiveNote(selectedNote);
            },
            onNoteDelete: (noteId) => {
                NoteApi.deleteNote(noteId);
                this._refreshNotes();
            }
        };
    }
}