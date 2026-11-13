# IELTS Live

A simple place to practise computer-delivered IELTS without getting lost in 200 tabs.

## Features

- **Real test**: a random Academic Writing Task 1 and Task 2 under one 60-minute clock. Tasks you haven't done come first. When time runs out, both answers are submitted.
- **Practice**: a library of 48 Writing tasks in the Cambridge IELTS format. Filter by task, type or keyword, or press *Random task*. Each task has its own timer (20 or 40 minutes) and a draft that saves as you type.
  - **Task 1 (20)**: line graphs, bar charts, pie charts, tables, processes, maps and mixed charts. Charts are drawn from data in `src/data/task1.ts`, with hover values and a data-table view.
  - **Task 2 (28)**: opinion, discussion, advantages/disadvantages, problem/solution and two-part questions.
- **Listening & Reading**: a 40-question answer sheet for the Cambridge books. Tick each answer ✓ or ✗ by hand as you check against the book, or paste the answer key and check automatically. You get your score and an approximate band.
- **History**: read back every task and test you've finished.
- **To-do list** with undo/redo and **Feedback** via Telegram ([@jasurlive_bot](https://t.me/jasurlive_bot)), linked at the bottom of Home.
- **Settings**: 7 themes (light, dark, linen, fjord, matte, charcoal, paper; `Ctrl+J` cycles them) and fullscreen. **Info** lists the shortcuts and tips. The `` ` `` key collapses the sidebar.

Home stays short on purpose: new visitors pick Writing or Listening & Reading, and the rest is one click away.

Everything you write is saved in your own browser (localStorage).

## Run it

```bash
git clone https://github.com/jasurlive/IELTS.git
cd IELTS
npm install
cp .env.example .env  # optional: VITE_ENABLE_EXTRA_THEMES=false keeps only light/dark
npm run dev          # http://localhost:1212
```

Needs Node 20.19+ or 22.12+.

| Command | Does |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | typecheck + production build to `dist/` |
| `npm run lint` | oxlint |

## Structure

Built on the [django-react](https://github.com/jasurlive/django-react) front template (React 19, Vite, React Router, react-icons):

```
src/
├── app/               entry: main.tsx, App.tsx (routes)
├── pages/             one file per route (Home, Practice, PracticeTask, RealTest, AnswerSheet, History, ToDo, Feedback, Settings, Info)
├── components/        Layout, Header, ErrorBoundary, Chart, TaskPrompt, Editor, Timer
├── shared/            Menu (sidebar / mobile bar), ThemeIcons
├── lib/               themes.ts (theme list)
├── data/              task bank: task1.ts, task2.ts, types.ts
├── hooks/LOCAL/       theme, fullscreen, shortcuts, localStorage, countdown, attempts
├── img/
└── css/
```

The folder layout matches the template's `front/`, so template updates can be brought over file by file. From the template: the menu, the 7 themes, Settings, Layout, ErrorBoundary and the theme, fullscreen and shortcut hooks. `Menu.tsx` (IELTS pages) and `Info.tsx` (IELTS shortcuts and tips) are adapted, so merge those instead of overwriting. The template's backend, API client and visit tracking aren't used: the app runs fully in the browser.

## Add a task

- **Task 2**: add a line to `entries` in `src/data/task2.ts`.
- **Task 1**: copy an entry in `src/data/task1.ts` and change the data. Chart kinds are `line`, `bar`, `pie`, `table`, `process`, `map` and `image` (see `types.ts`). For `image`, put the picture in `src/img/` and import it.

## Contributions

Contributions are always welcome!

## License

MIT. Do whatever you want, but don't blame me.

## Final note

I actually used this with the Cambridge IELTS books and got 7.5 overall, so I hope it helps you get the result you want ^^
