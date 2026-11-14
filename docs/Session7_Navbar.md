# Session 7: Adding a navbar with React Router

**Goal:** add a navbar to the library app. Each link opens its own page with its own URL, and the page never reloads.

In this example we build **one page together (Membres)**. You then build the other pages yourself, using the same pattern.

```
localhost:5173/members
┌──────────────────────────────────────┐
│ Bibliothèque                         │
│ Livres   Membres   Emprunts          │  ← Layout (always visible)
│──────────────────────────────────────│
│                                      │
│   <Outlet />                         │  ← the current page appears here
│                                      │
└──────────────────────────────────────┘
```

---

## Step 0: Check that React Router is installed

In the `client/` folder:

```bash
npm install react-router
```

> Older tutorials use `react-router-dom`. That package was removed in v8. Everything now comes from `react-router`.

---

## Step 1: Give the app access to the URL

**File:** `client/src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'   // ← add
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>        {/* ← add */}
      <App />
    </BrowserRouter>       {/* ← add */}
  </StrictMode>,
)
```

**Why?** `BrowserRouter` watches the address bar and shares the URL with every component inside it. `App` will use routing features (`Routes`, `NavLink`…), and those only work **inside** a router. That's why the router wraps `App`.

---

## Step 2: Create a page

Create the folder `client/src/pages/` (lowercase), then the file below.

**File:** `client/src/pages/MembersPage.jsx` (new)

```jsx
import ListeMembres from "../components/ListeMembres.jsx";

export default function MembersPage({ membres }) {
  return (
    <section>
      <h2>Membres</h2>
      {membres === null ? (
        <p>Chargement des membres…</p>
      ) : (
        <ListeMembres membres={membres} />
      )}
    </section>
  );
}
```

**Why?** This is the "Membres" section from `App.jsx`, moved into its own file. A **page** is an ordinary component that is shown for one URL. The data (`membres`) still comes from `App` as a prop.

> **Two folders, two roles**
> - `pages/`: one component per route (per URL)
> - `components/`: reusable pieces that the pages use

---

## Step 3: Create the navbar (the Layout)

**File:** `client/src/components/Layout.jsx` (new)

```jsx
import { NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <main>
      <header>
        <h1>Bibliothèque</h1>
        <nav>
          <NavLink to="/books">Livres</NavLink>
          <NavLink to="/members">Membres</NavLink>
          <NavLink to="/loans">Emprunts</NavLink>
        </nav>
      </header>

      <Outlet />  {/* the current page appears here */}
    </main>
  );
}
```

**Why?**

| Piece | Role |
|---|---|
| `NavLink` | Works like `<a href>`, but **without reloading the page**: React only swaps the component, so the app keeps its memory. It also adds the class `active` to the current page's link. |
| `Outlet` | A placeholder: "the page goes here". React Router fills it with whichever page matches the URL. |
| `header` / `nav` | They sit **outside** the `Outlet`, so they stay on screen while the pages change underneath. |

> **`<a>` or `<NavLink>`?**
> `<a href="/members">` asks the server for the whole page again: the app restarts and loses everything in memory.
> Inside the app, **always use `Link` or `NavLink`**. Keep `<a>` for links to external websites.

---

## Step 4: Declare the routes

**File:** `client/src/App.jsx`

**4a.** Add these imports at the top:

```jsx
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import MembersPage from "./pages/MembersPage.jsx";
```

**4b.** Replace the whole `return ( <main> … </main> );` with:

```jsx
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/members" replace />} />
        <Route path="members" element={<MembersPage membres={membres} />} />
        {/* your turn: books, loans, and a 404 page */}
      </Route>
    </Routes>
  );
```

Keep the `useState` and `useEffect` lines above the `return` as they are.

**Why?**

| Code | Meaning |
|---|---|
| `<Routes>` | Looks at the URL and shows the matching `Route`. |
| `<Route path="/" element={<Layout />}>` | A **parent** route. Every route nested inside it is shown **inside the Layout**, where its `<Outlet />` is. |
| `path="members"` | No leading slash: it's **relative** to the parent. `/` + `members` = `/members`. |
| `index` | The route for the parent's own address (`/`). |
| `<Navigate to="/members" replace />` | Redirects `/` to `/members`. `replace` stops the Back button from returning the user to `/` and bouncing them back again. |

---

## Step 5: Style the navbar (optional)

**File:** `client/src/index.css` (add at the end)

```css
nav { display: flex; gap: 16px; padding-bottom: 12px; border-bottom: 1px solid #d9e2ec; }
nav a { color: #1d4f91; text-decoration: none; font-weight: 600; }
nav a.active { text-decoration: underline; }
```

`nav a.active` targets only the link that `NavLink` marked as the current page.

---

## Step 6: Try it

```bash
npm run dev
```

| Do this | You should see |
|---|---|
| Open `http://localhost:5173/` | The address changes to `/members` by itself |
| Look at the navbar | "Membres" is underlined (it's `active`) |
| Click "Livres" or "Emprunts" | The URL changes, the navbar stays, and the area below is **empty** |
| Press F5 on `/members` | You stay on the Membres page |

**Why is "Livres" empty?** The link works, but **no route exists yet** for `/books`. That's your exercise.

### Something's wrong?

| Symptom | Cause | Fix |
|---|---|---|
| Error `useHref() may be used only in the context of a <Router>` | `BrowserRouter` is missing | Check Step 1 |
| Navbar shows, but no page under it | `<Outlet />` is missing in Layout | Check Step 3 |
| Clicking a link reloads the whole page | You used `<a>` instead of `NavLink` | Use `NavLink` |
| Blank page | A JavaScript error | Open the console (F12) |

---

## Your turn

1. **`pages/LoansPage.jsx`**: same pattern as `MembersPage`, using `emprunts` and `ListeEmprunts`.
2. **`pages/BooksPage.jsx`**: move the filters and the catalog from `App.jsx` into this page. Only this page uses them.
3. In `App.jsx`, add a route for each new page **inside** the Layout route:
   ```jsx
   <Route path="loans" element={ /* your page */ } />
   <Route path="books" element={ /* your page */ } />
   ```
4. **Bonus:** create `pages/NotFoundPage.jsx` with a link back to `/books`, then add:
   ```jsx
   <Route path="*" element={<NotFoundPage />} />
   ```
   `*` matches any URL that no other route matched, which gives you a 404 page.

> **Note:** while the catalog code is still in `App.jsx` but no longer displayed, `npm run lint` will warn about unused variables. That's normal: the warnings go away once you move the catalog into `BooksPage`.

**When it works:** commit.

```bash
git add .
git commit -m "Session 7: navbar and first pages"
```
