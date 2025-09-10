# Remotion video + Simple Notes Manager

Welcome to your Remotion project enhanced with a Notes Manager UI.

What you get:
- A Remotion project with the usual sample compositions.
- A fully functional Notes Manager UI (CRUD) mounted in Remotion Studio as a Composition: `NotesAppUI`.
- Notes are persisted to `localStorage` (mocked persistence).

## Commands

Install dependencies
```console
npm i
```

Start Remotion Studio (preview + Notes UI)
```console
npm run dev
```
In the Studio sidebar, select `NotesAppUI` to open the Notes interface. You can interact with it like a typical web app.

Render a video (not needed for Notes UI)
```console
npx remotion render
```

Upgrade Remotion
```console
npx remotion upgrade
```

## Notes UI usage

- Create a new note using the "New note" button in the header.
- Select a note in the left sidebar to view or edit.
- Edit title and content; press Save or use Ctrl/Cmd+Enter to save quickly.
- Delete a note using the delete button in the list or in the editor toolbar.
- Search box filters notes client-side by title or content.
- State is automatically saved in your browser via localStorage.

## Project structure

- `src/notes` — domain types, storage (localStorage), and a tiny store with subscriptions.
- `src/components/notes` — UI components for the Notes app (list, editor, shell).
- `src/NotesPage.tsx` — Remotion-friendly wrapper to host the Notes UI in Studio.
- `src/styles.css` — Minimal utility CSS (no Tailwind dependency) used by the UI.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
