import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import select_Btn from './icons/select_btn.svg';
import add_Btn from './icons/add_btn.svg';
import TADSLOGO from './TADSDESKBG.png';
import "./App.css";

function AppNavBar({ onSelectClick, selectionMode, onCancelSelection, showForm, toggleShowForm }) {
  return (
    <nav className="App-Nav-Bar">
      <div className="nav-brand">
        <h1>Reaction Notes: Beta</h1>
      </div>
      <div className="nav-links">
        {selectionMode ? (
          <button className="nav-button-text" onClick={onCancelSelection}>
            Cancel
          </button>
        ) : (
          <>
            <img 
              className="nav-button" 
              src={add_Btn} 
              alt="Add note" 
              onClick={toggleShowForm} 
            />
            <img className="nav-button" src={select_Btn} alt="Select note" onClick={onSelectClick} />
          </>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="App-footer">
      <img src={TADSLOGO} alt="TADS"/>
      <p>Powered by TADSTech &copy; 2025</p>
      <ul>
        <li><a href="https://github.com/TADSTech/ReactiveNotes">GitHub</a></li>
        <li><a href="https://tadstech.web.app">TADSTech Website</a></li>
      </ul>
    </footer>
  );
}

function NoteContentArea({ note, onSave, onCancel, onChangeTitle, onChangeContent, markdownEnabled, onExport }) {
  return (
    <div className="note-display-area">
      <form className="note-edit-form">
        <input
          type="text"
          value={note.name}
          onChange={onChangeTitle}
          className="note-input"
          placeholder="Enter note title..."
        />
        <textarea
          value={note.content}
          onChange={onChangeContent}
          className="note-textarea"
          placeholder="Enter note content..."
        />
        {markdownEnabled && (
          <div className="markdown-preview">
            <h4>Preview</h4>
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        )}
        <div className="form-buttons">
          <button type="button" className="add-button" onClick={onSave}>
            Save
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <select onChange={(e) => onExport(e.target.value)} className="export-button">
            <option value="">Export as...</option>
            <option value="txt">Text (.txt)</option>
            <option value="md">Markdown (.md)</option>
          </select>
        </div>
      </form>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: 1,
          name: "Welcome to Reaction Notes",
          content: "This app lets you create, edit, and manage notes. Start by exploring the features below."
        },
        {
          id: 2,
          name: "Adding a Note",
          content: "Click the '+' icon in the navigation bar to open the add form. Enter a title and content, then click 'Add Note' to save it."
        },
        {
          id: 3,
          name: "Viewing and Editing Notes",
          content: "Click on a note in the list to open it on the side (or full screen on mobile). You can edit the title and content directly and save your changes."
        },
        {
          id: 4,
          name: "Selecting and Deleting Notes",
          content: "Click the select icon in the nav bar to enter selection mode. Choose notes by clicking them, then use 'Delete Selected' to remove them."
        },
        {
          id: 5,
          name: "Searching Notes",
          content: "Use the search bar above the notes list to find notes by title. Check 'Search in content' to include note descriptions in your search."
        },
        {
          id: 6,
          name: "Markdown Support",
          content: "Toggle 'Enable Markdown' to format your notes with headings (# Heading), bold (**bold**), italics (*italics*), lists (- item), code (`code`), etc. Preview shows below the editor."
        }
      ],
      newNoteTitle: "",
      newNoteContent: "",
      selectionMode: false,
      selectedNotes: new Set(),
      showForm: false,
      selectedNote: null,
      editNote: null,
      user: null,
      showRegistration: false,
      regName: "user",
      regEmail: "user@user.com",
      searchQuery: "",
      searchInContent: false,
      markdownEnabled: false,
    };
  }

  componentDidMount() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.setState({ user: JSON.parse(savedUser) });
    } else {
      this.setState({ showRegistration: true });
    }

    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      this.setState({ notes: JSON.parse(savedNotes) });
    }

    const savedMarkdown = localStorage.getItem("markdownEnabled");
    if (savedMarkdown) {
      this.setState({ markdownEnabled: savedMarkdown === "true" });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }
    if (prevState.user !== this.state.user) {
      localStorage.setItem("user", JSON.stringify(this.state.user));
    }
    if (prevState.markdownEnabled !== this.state.markdownEnabled) {
      localStorage.setItem("markdownEnabled", this.state.markdownEnabled);
    }
  }

  addNote = () => {
    const { newNoteTitle, newNoteContent } = this.state;
    const title = newNoteTitle.trim();
    const content = newNoteContent.trim();

    if (!title || !content) return;

    const newNote = {
      id: Date.now(),
      name: title,
      content: content,
    };

    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
      newNoteTitle: "",
      newNoteContent: "",
      showForm: false,
    }));
  };

  toggleSelectionMode = () => {
    this.setState((prevState) => ({
      selectionMode: !prevState.selectionMode,
      selectedNotes: new Set(),
      selectedNote: null,
      editNote: null,
    }));
  };

  cancelSelection = () => {
    this.setState({
      selectionMode: false,
      selectedNotes: new Set(),
      selectedNote: null,
      editNote: null,
    });
  };

  handleNoteClick = (id) => {
    const { selectionMode } = this.state;
    if (selectionMode) {
      this.setState((prevState) => {
        const newSet = new Set(prevState.selectedNotes);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return { selectedNotes: newSet };
      });
    } else {
      const note = this.state.notes.find((n) => n.id === id);
      this.setState({
        selectedNote: note,
        editNote: { ...note },
      });
    }
  };

  deleteSelectedNotes = () => {
    const { selectedNotes } = this.state;
    if (selectedNotes.size === 0) return;

    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => !selectedNotes.has(note.id)),
      selectedNotes: new Set(),
      selectionMode: false,
      selectedNote: null,
      editNote: null,
    }));
  };

  toggleShowForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
      selectedNote: null,
      editNote: null,
    }));
  };

  setNewNoteTitle = (e) => {
    this.setState({ newNoteTitle: e.target.value });
  };

  setNewNoteContent = (e) => {
    this.setState({ newNoteContent: e.target.value });
  };

  handleEditTitle = (e) => {
    this.setState((prevState) => ({
      editNote: { ...prevState.editNote, name: e.target.value },
    }));
  };

  handleEditContent = (e) => {
    this.setState((prevState) => ({
      editNote: { ...prevState.editNote, content: e.target.value },
    }));
  };

  saveNote = () => {
    const { editNote } = this.state;
    if (!editNote.name.trim() || !editNote.content.trim()) return;

    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === editNote.id ? { ...editNote } : note
      ),
      selectedNote: null,
      editNote: null,
    }));
  };

  cancelEdit = () => {
    this.setState({
      selectedNote: null,
      editNote: null,
    });
  };

  setRegName = (e) => {
    this.setState({ regName: e.target.value });
  };

  setRegEmail = (e) => {
    this.setState({ regEmail: e.target.value });
  };

  handleRegistration = (e) => {
    e.preventDefault();
    const { regName, regEmail } = this.state;
    const name = regName.trim() || "user";
    const email = regEmail.trim() || "user@user.com";
    this.setState({
      user: { name, email },
      showRegistration: false,
      regName: "",
      regEmail: "",
    });
  };

  handleExport = (format) => {
    const { editNote } = this.state;
    if (!editNote || !format) return;

    const content = format === "txt" 
      ? `${editNote.name}\n\n${editNote.content}`
      : `# ${editNote.name}\n\n${editNote.content}`;
    
    const blob = new Blob([content], { type: format === "txt" ? "text/plain" : "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${editNote.name.replace(/\s+/g, '_')}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  toggleMarkdown = (e) => {
    this.setState({ markdownEnabled: e.target.checked });
  };

  render() {
    const {
      notes,
      newNoteTitle,
      newNoteContent,
      selectionMode,
      selectedNotes,
      showForm,
      selectedNote,
      editNote,
      user,
      showRegistration,
      regName,
      regEmail,
      searchQuery,
      searchInContent,
      markdownEnabled,
    } = this.state;

    if (showRegistration || !user) {
      return (
        <div className="App">
          <header className="App-header">
            <div className="title-head">
              <h1>Get Started</h1>
              <h3>Enter your details</h3>
            </div>
          </header>
          <main>
            <div className="registration-container">
              <form onSubmit={this.handleRegistration} className="registration-form">
                <input
                  type="text"
                  placeholder="Enter your name (default: user)"
                  value={regName}
                  onChange={this.setRegName}
                  className="note-input"
                />
                <input
                  type="email"
                  placeholder="Enter your email (default: user@user.com)"
                  value={regEmail}
                  onChange={this.setRegEmail}
                  className="note-input"
                />
                <button type="submit" className="add-button">
                  Register
                </button>
              </form>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    const filteredNotes = notes.filter((note) => {
      if (!searchQuery) return true;
      const lowerTitle = note.name.toLowerCase();
      const titleMatch = lowerTitle.includes(searchQuery);
      if (!searchInContent) return titleMatch;
      const lowerContent = note.content.toLowerCase();
      return titleMatch || lowerContent.includes(searchQuery);
    });

    return (
      <div className="App">
        <div className="NavDiv">
          <AppNavBar
            onSelectClick={this.toggleSelectionMode}
            selectionMode={selectionMode}
            onCancelSelection={this.cancelSelection}
            showForm={showForm}
            toggleShowForm={this.toggleShowForm}
          />
        </div>

        <header className="App-header">
          <div className="title-head">
            <h1>Welcome {user.name}!</h1>
            <h3>Ready to make a reaction</h3>
          </div>
        </header>

        <main className="main-content">
          <div className="notes-container">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value.toLowerCase() })}
                className="search-input"
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={searchInContent}
                  onChange={(e) => this.setState({ searchInContent: e.target.checked })}
                />
                Search in content
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={markdownEnabled}
                  onChange={this.toggleMarkdown}
                />
                Enable Markdown
              </label>
            </div>

            <h2>Notes</h2>

            {showForm && (
              <div className="note-form-container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.addNote();
                  }}
                  className="note-form"
                >
                  <input
                    type="text"
                    placeholder="Enter note title...."
                    value={newNoteTitle}
                    onChange={this.setNewNoteTitle}
                    className="note-input"
                  />
                  <textarea
                    placeholder="Type a new note..."
                    value={newNoteContent}
                    onChange={this.setNewNoteContent}
                    className="note-textarea"
                  />
                  <div className="form-buttons">
                    <button type="submit" className="add-button">Add Note</button>
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={this.toggleShowForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {selectionMode && (
              <div className="selection-controls">
                <p>{selectedNotes.size} note(s) selected</p>
                <button 
                  onClick={this.deleteSelectedNotes}
                  disabled={selectedNotes.size === 0}
                  className="delete-selected-button"
                >
                  Delete Selected
                </button>
              </div>
            )}

            <ul className="notes-list">
              {filteredNotes.map((note) => (
                <li 
                  key={note.id} 
                  className={`Notes-List ${selectionMode ? 'selectable' : ''} ${selectedNotes.has(note.id) ? 'selected' : ''} ${selectedNote && selectedNote.id === note.id ? 'active' : ''}`}
                  onClick={() => this.handleNoteClick(note.id)}
                >
                  <div className="note-content">
                    <h3>{note.name}</h3>
                    <p className="truncated-content">
                      {`${note.content.substring(0, 100)}${note.content.length > 100 ? '...' : ''}`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {selectedNote && editNote && (
            <NoteContentArea
              note={editNote}
              onSave={this.saveNote}
              onCancel={this.cancelEdit}
              onChangeTitle={this.handleEditTitle}
              onChangeContent={this.handleEditContent}
              markdownEnabled={markdownEnabled}
              onExport={this.handleExport}
            />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;