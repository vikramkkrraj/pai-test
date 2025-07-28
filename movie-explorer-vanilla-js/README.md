# Movie Explorer (Vanilla JS)

A lightweight movie explorer built with **Vanilla JavaScript**, using the **OMDb API** with a **local JSON fallback**. It features a custom modal, debounced search, loader, CSS animations, and a **Favorites** system persisted with `localStorage`.

## ✨ Features

- 🔍 Search movies (debounced 500ms)
- 🌐 OMDb API calls with automatic local fallback (`data/dummy.json`)
- 🌀 Loader spinner during fetch
- 🧊 Smooth animations (cards fade-in, modal scale-in)
- 🧰 Custom modal with Add/Remove Favorites button
- ❤️ Favorites persisted via `localStorage`
- 🔁 Toggle between Search Results and Favorites view
- 🙅 Prevent duplicate favorites
- 🧼 Clean UI state handling + empty states

## 📦 Getting Started

1. **Download / unzip** the project.
2. Open `js/data.js` and replace:
   ```js
   const OMDB_API_KEY = 'PUT_YOUR_OMDB_API_KEY_HERE';
   ```
   with your own key from https://www.omdbapi.com/apikey.aspx
3. Just **open `index.html` in your browser**. (No build tools needed.)

> If OMDb is down or you leave the key empty, it will automatically use `data/dummy.json`.

## 🗂️ Project Structure

```
movie-explorer-vanilla-js/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── ui.js
│   └── favorites.js
└── data/
    └── dummy.json
```

## 🧪 Quick Test

- Type: `matrix`, `inception`, `interstellar`, or `avengers` to see fallback results if OMDb fails.
- Click **View Details** to open a modal.
- Click **Add to Favorites**, then tap **Show Favorites** to view them later (persisted on refresh).

## 📝 License

MIT
