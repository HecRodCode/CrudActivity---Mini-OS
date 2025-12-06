class NotesApp {
  constructor() {
    this.notes = this.loadNotes();
    this.currentNoteId = null;
    this.debounceTimer = null;
    this.init();
  }

  init() {
    this.renderNotesList();
    this.setupEventListeners();
    this.setupFormatting();
    this.loadFirstNote();
  }

  loadNotes() {
    try {
      const saved = localStorage.getItem("macos-notes");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading notes:", e);
    }
    return [];
  }

  saveNotes() {
    try {
      localStorage.setItem("macos-notes", JSON.stringify(this.notes));
    } catch (e) {
      console.error("Error saving notes:", e);
    }
  }

  renderNotesList() {
    const notesList = document.getElementById("notes-list");
    const emptyState = document.getElementById("empty-notes-state");

    // Ordenar por fecha de modificación
    this.notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    if (this.notes.length === 0) {
      emptyState.style.display = "flex";
      notesList.innerHTML = "";
      return;
    }

    emptyState.style.display = "none";

    notesList.innerHTML = this.notes
      .map((note) => {
        const preview = this.getNotePreview(note.content);
        const date = this.formatDate(note.updatedAt);

        return `
                        <div class="note-item ${
                          this.currentNoteId === note.id ? "active" : ""
                        }" 
                             data-id="${note.id}">
                            <div class="note-title">${
                              note.title || "Nueva nota"
                            }</div>
                            <div class="note-preview">${preview}</div>
                            <div class="note-meta">
                                <span class="note-date">${date}</span>
                                <div class="note-actions">
                                    <button class="action-btn delete-btn" 
                                        onclick="event.stopPropagation(); window.notesApp.showDeleteModal('${
                                          note.id
                                        }')" 
                                        title="Eliminar">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
      })
      .join("");
  }

  getNotePreview(content) {
    if (!content) return "Contenido vacío";

    const div = document.createElement("div");
    div.innerHTML = content;
    const text = div.textContent || div.innerText || "";
    return text.substring(0, 200).trim() + (text.length > 200 ? "..." : "");
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    if (diffMinutes < 1) return "Ahora mismo";
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;

    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: now.getFullYear() !== date.getFullYear() ? "numeric" : undefined,
    });
  }

  setupEventListeners() {
    // Nueva nota
    document.getElementById("new-note-btn").addEventListener("click", () => {
      this.createNewNote();
    });

    // Delegación de eventos para la lista
    document.getElementById("notes-list").addEventListener("click", (e) => {
      const noteItem = e.target.closest(".note-item");
      if (noteItem) {
        const id = noteItem.dataset.id;
        this.selectNote(id);
        return;
      }

      const deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        e.stopPropagation();
        const id = deleteBtn.dataset.id;
        this.showDeleteModal(id);
      }
    });

    // Título de la nota
    const titleInput = document.getElementById("note-title-input");
    titleInput.addEventListener("input", (e) => {
      this.debouncedUpdate(() => {
        this.updateNoteTitle(e.target.value);
      });
    });

    // Cuerpo de la nota
    const noteBody = document.getElementById("note-body");
    noteBody.addEventListener("input", (e) => {
      this.debouncedUpdate(() => {
        this.updateNoteContent(e.target.innerHTML);
      });
    });

    // Búsqueda
    document.getElementById("search-box").addEventListener("input", (e) => {
      this.searchNotes(e.target.value);
    });

    // Modal de eliminación
    document.getElementById("cancel-delete").addEventListener("click", () => {
      this.hideDeleteModal();
    });

    document.getElementById("confirm-delete").addEventListener("click", () => {
      this.deleteCurrentNote();
    });

    // Guardar antes de cerrar
    window.addEventListener("beforeunload", () => {
      this.saveCurrentNote();
    });
  }

  setupFormatting() {
    const formatButtons = document.querySelectorAll(".format-btn");
    formatButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.id;
        this.handleFormatting(id);
      });
    });
  }

  debouncedUpdate(callback) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      callback();
    }, 300);
  }

  createNewNote() {
    const newNote = {
      id: Date.now().toString(),
      title: "",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.notes.unshift(newNote);
    this.saveNotes();
    this.renderNotesList();
    this.selectNote(newNote.id);

    setTimeout(() => {
      document.getElementById("note-title-input").focus();
    }, 100);
  }

  selectNote(id) {
    // Guardar la nota actual antes de cambiar
    this.saveCurrentNote();

    this.currentNoteId = id;
    const note = this.notes.find((n) => n.id === id);

    if (!note) {
      document.getElementById("empty-editor-state").style.display = "flex";
      document.getElementById("note-editor").style.display = "none";
      return;
    }

    document.getElementById("empty-editor-state").style.display = "none";
    document.getElementById("note-editor").style.display = "block";

    const titleInput = document.getElementById("note-title-input");
    const noteBody = document.getElementById("note-body");

    titleInput.value = note.title || "";
    noteBody.innerHTML = note.content || "";

    this.renderNotesList();
  }

  updateNoteTitle(title) {
    const note = this.notes.find((n) => n.id === this.currentNoteId);
    if (note) {
      note.title = title;
      note.updatedAt = new Date().toISOString();
      this.saveNotes();
      this.renderNotesList();
    }
  }

  updateNoteContent(content) {
    const note = this.notes.find((n) => n.id === this.currentNoteId);
    if (note) {
      note.content = content;
      note.updatedAt = new Date().toISOString();
      this.saveNotes();
      this.renderNotesList();
    }
  }

  saveCurrentNote() {
    if (!this.currentNoteId) return;

    const note = this.notes.find((n) => n.id === this.currentNoteId);
    if (!note) return;

    const titleInput = document.getElementById("note-title-input");
    const noteBody = document.getElementById("note-body");

    if (titleInput) {
      note.title = titleInput.value;
    }

    if (noteBody) {
      note.content = noteBody.innerHTML;
    }

    note.updatedAt = new Date().toISOString();
    this.saveNotes();
  }

  handleFormatting(btnId) {
    const noteBody = document.getElementById("note-body");
    if (!noteBody) return;

    noteBody.focus();

    switch (btnId) {
      case "bold-btn":
        this.execFormatCommand("bold");
        break;
      case "italic-btn":
        this.execFormatCommand("italic");
        break;
      case "underline-btn":
        this.execFormatCommand("underline");
        break;
      case "list-btn":
        this.execFormatCommand("insertUnorderedList");
        break;
      case "checklist-btn":
        this.insertChecklist();
        break;
    }

    // Actualizar contenido después de formatear
    this.updateNoteContent(noteBody.innerHTML);
  }

  execFormatCommand(command) {
    document.execCommand(command);
  }

  insertChecklist() {
    const noteBody = document.getElementById("note-body");
    if (noteBody) {
      const html = `
                        <div class="checklist-item">
                            <input type="checkbox">
                            <div class="checklist-text" contenteditable="true">Tarea por hacer</div>
                        </div>
                    `;
      document.execCommand("insertHTML", false, html);
    }
  }

  searchNotes(query) {
    const noteItems = document.querySelectorAll(".note-item");
    const emptyState = document.getElementById("empty-notes-state");
    let visibleCount = 0;

    noteItems.forEach((item) => {
      const title = item.querySelector(".note-title").textContent.toLowerCase();
      const preview = item
        .querySelector(".note-preview")
        .textContent.toLowerCase();
      const searchLower = query.toLowerCase();

      if (title.includes(searchLower) || preview.includes(searchLower)) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (visibleCount === 0 && query) {
      emptyState.style.display = "flex";
      emptyState.innerHTML = `
                        <i class="fas fa-search"></i>
                        <h3>No se encontraron notas</h3>
                        <p>Intenta con otros términos de búsqueda</p>
                    `;
    } else {
      emptyState.style.display = "none";
    }
  }

  showDeleteModal(id) {
    this.noteToDelete = id;
    document.getElementById("delete-modal").classList.add("active");
  }

  hideDeleteModal() {
    document.getElementById("delete-modal").classList.remove("active");
    this.noteToDelete = null;
  }

  deleteCurrentNote() {
    if (!this.noteToDelete) return;

    this.notes = this.notes.filter((note) => note.id !== this.noteToDelete);
    this.saveNotes();

    if (this.currentNoteId === this.noteToDelete) {
      this.currentNoteId = null;
      document.getElementById("empty-editor-state").style.display = "flex";
      document.getElementById("note-editor").style.display = "none";
    }

    this.renderNotesList();
    this.hideDeleteModal();
  }

  loadFirstNote() {
    if (this.notes.length > 0) {
      this.selectNote(this.notes[0].id);
    }
  }
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  window.notesApp = new NotesApp();

  // Notificar al padre que la app está lista
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(
      {
        type: "app-ready",
        app: "notes",
      },
      "*"
    );
  }
});
