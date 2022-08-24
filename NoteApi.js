const notes = [{
        id: 1,
        title: "1st note",
        body: "1st text",
        updated: "Mon Aug 01 2022 15:02:22"
    },
    {
        id: 2,
        title: "2st note",
        body: "2st text",
        updated: "Mon Aug 01 2022 16:02:22"
    },
    {
        id: 3,
        title: "3st note",
        body: "3st text",
        updated: "Mon Aug 01 2022 14:02:22"
    },
];
export default class NoteApi {
    static getAllNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
        return savedNotes.sort((a, b) => {
            return (a.updated) > (b.updated) ? -1 : 1;
        });
    }
    static saveNote(note) {
        const notes = NoteApi.getAllNotes();
        const existedNotes = notes.find((n) => n.id == note.id);

        if (existedNotes) {
            existedNotes.title = note.title;
            existedNotes.body = note.body;
            existedNotes.updated = new Date().toISOString();
        } else {
            note.id = new Date().getTime();
            note.updated = new Date().toISOString();
            notes.push(note);
        }
        localStorage.setItem("notes-app", JSON.stringify(notes));
    }
    static deleteNote(id) {
        const notes = NoteApi.getAllNotes();
        const filteredNote = notes.filter((n) => n.id != id);
        console.log(filteredNote);
        localStorage.setItem("notes-app", JSON.stringify(filteredNote));
    }
}
