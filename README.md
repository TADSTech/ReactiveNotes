# Reaction Notes: Beta

Reaction Notes is a minimalist web application built with React for creating, editing, and managing notes with a clean, responsive interface. It supports Markdown formatting, note searching, and exporting notes as `.txt` or `.md` files. The app is designed for simplicity and ease of use, with a focus on providing a seamless note-taking experience across desktop and mobile devices.

## Features

- **User Registration**: Users are prompted to enter their name and email upon first use, with default values (`user` and `user@user.com`) if left blank. User data is saved in local storage.
- **Note Management**:
  - Create notes with a title and content.
  - Edit notes in a sidebar (desktop) or full-screen (mobile) view.
  - Delete multiple notes using a selection mode.
- **Search Functionality**: Search notes by title or content with a toggleable content search option.
- **Markdown Support**: Enable Markdown to format notes with headings, bold, italics, lists, code, etc., with a live preview.
- **Export Notes**: Download individual notes as `.txt` or `.md` files.
- **Responsive Design**: Optimized for both desktop and mobile devices, with a clean, dark-themed UI.
- **Local Storage**: Notes and user preferences (e.g., Markdown toggle) are persisted in the browser's local storage.
- **Branding**: Powered by TADSTech, with links to the project’s GitHub and TADSTech website in the footer.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TADSTech/ReactiveNotes.git
   cd ReactiveNotes
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```bash
   npm install
   ```
   This installs required packages, including `react`, `react-dom`, and `react-markdown`.

3. **Start the Development Server**:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000` in your browser.

4. **Build for Production** (optional):
   ```bash
   npm run build
   ```
   This generates a production-ready build in the `build` folder.

## Usage

1. **Registration**:
   - On first load, enter your name and email in the registration form. Defaults to `user` and `user@user.com` if left blank.
   - Your details are saved and displayed in the welcome message.

2. **Creating a Note**:
   - Click the `+` icon in the navigation bar to open the note creation form.
   - Enter a title and content, then click "Add Note" to save.

3. **Editing a Note**:
   - Click a note in the list to open it in the edit panel (sidebar on desktop, full-screen on mobile).
   - Modify the title or content, then click "Save" or "Cancel".

4. **Searching Notes**:
   - Use the search bar above the notes list to filter by title.
   - Check "Search in content" to include note content in the search.

5. **Deleting Notes**:
   - Click the select icon in the navigation bar to enter selection mode.
   - Click notes to select them, then click "Delete Selected" to remove them.

6. **Exporting Notes**:
   - In the note edit panel, select "Text (.txt)" or "Markdown (.md)" from the export dropdown to download the note.

7. **Markdown Support**:
   - Toggle "Enable Markdown" in the search container to format notes using Markdown syntax.
   - A live preview appears below the text area when editing a note.

## Project Structure

- `src/App.js`: Main React component containing the app logic and UI.
- `src/App.css`: Styles for the app, including responsive design for mobile devices.
- `src/icons/`: Contains SVG icons for the add and select buttons.
- `src/TADSDESKBG.png`: TADSTech logo used in the footer.

## Dependencies

- `react`: Core React library for building the UI.
- `react-dom`: For rendering React components to the DOM.
- `react-markdown`: For rendering Markdown content with a live preview.

Install them using:
```bash
npm install react react-dom react-markdown
```

## Credits

- **Developed by**: Michael
- **Powered by**: [TADSTech](https://tadstech.web.app)
- **GitHub Repository**: [ReactiveNotes](https://github.com/TADSTech/ReactiveNotes)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.