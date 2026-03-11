const api = "/notes";

function addNote() {

    const data = {

        title: document.getElementById("title").value,

        subject: document.getElementById("subject").value,

        description: document.getElementById("description").value
    };

    fetch(api, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(data)

    })

    .then(res => res.json())

    .then(() => {

        loadNotes();

    });
}

function loadNotes() {

    fetch(api)

    .then(res => res.json())

    .then(data => {

        const container = document.getElementById("notes");

        container.innerHTML = "";

        data.forEach(note => {

            container.innerHTML += `
            
            <div class="note">

            <h3>${note.title}</h3>

            <p><b>Subject:</b> ${note.subject}</p>

            <p>${note.description}</p>

            <button onclick="deleteNote('${note._id}')">Delete</button>

            <button onclick="editNote('${note._id}','${note.title}','${note.description}')">Edit</button>

            </div>
            
            `;
        });
    });
}

function deleteNote(id) {

    fetch(api + "/" + id, {

        method: "DELETE"

    })

    .then(() => loadNotes());
}

function editNote(id, title, description) {

    const newTitle = prompt("Edit Title", title);

    const newDescription = prompt("Edit Description", description);

    fetch(api + "/" + id, {

        method: "PUT",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({

            title: newTitle,

            description: newDescription

        })

    })

    .then(() => loadNotes());
}

loadNotes();
