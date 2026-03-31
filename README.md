# React Site Template

A React + Tailwind CSS site template with a GSAP-powered navbar, intro video/logo animation, and GitHub Pages auto-deployment via GitHub Actions.

---

## Before You Start — One-Time Setup

There are two places you need to swap in your own GitHub info before doing anything else.

### 1. `my-react-app/package.json`
Find the `"homepage"` field and replace it with your own GitHub Pages URL:
```json
"homepage": "https://<your-github-username>.github.io/<your-repo-name>"
```
Example:
```json
"homepage": "https://janesmith.github.io/my-club-site"
```

### 2. `.github/workflows/deploy.yml`
Find this line near the bottom and replace the repo URL with your own:
```yaml
npx gh-pages -d build --repo https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/<your-github-username>/<your-repo-name>.git
```
Example:
```yaml
npx gh-pages -d build --repo https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/janesmith/my-club-site.git
```

---

## Installing Dependencies

Navigate into the app folder and install all packages:

```bash
cd my-react-app
npm install
```

This installs everything defined in `package.json`, including:

- `react`, `react-dom`, `react-router-dom`
- `framer-motion` — page/section animations
- `gsap` — navbar animations
- `swiper` — event carousel
- `react-icons` — icon library
- `clsx`, `tailwind-merge` — Tailwind utility helpers
- Tailwind CSS and its PostCSS config

---

## Running the Dev Environment

```bash
cd my-react-app
npm start
```

This starts the app at `http://localhost:3000`. The page will hot-reload as you make changes.

---

## Editing the Home Page

Open `my-react-app/src/pages/Home.jsx`.

The file is split into clear sections — each one has a comment like `{/* HERO SECTION */}` marking where it starts. The main areas to customize are:

**Hero text** — find `{/* HOME PAGE HERO */}` and update the `<h1>` and `<p>` text to match your organization.

**Slideshow** — find the `{/* RIGHT SIDE */}` block. It currently shows a placeholder box. To add real images, import them at the top of the file and replace the placeholder div with individual `<div className="slide ...">` elements as shown in the comments.

**Sponsors** — `sponsorImages` is an empty array at the top of the component. Populate it by importing your images and pushing them into the array. The section hides itself automatically when the array is empty.

**Events carousel** — `eventCarousel` is an empty array at the top of the component. Add event objects in this shape:
```js
const eventCarousel = [
  {
    image: myEventFlyer,   // imported image
    title: "Event Name",
    date: "Apr 15, 2026",
  },
];
```
The section shows a placeholder message when the array is empty.

**Office Hours** — find `{/* Office Hours Section */}`. Import your image at the top of the file, then replace the placeholder `<div>` with:
```jsx
<img src={officeHoursImg} alt="Office Hours" className="mx-auto w-full sm:w-11/12 lg:w-5/6 rounded-xl shadow-xl" />
```

---

## Adding New Pages

### 1. Create the page file
Add a new file in `my-react-app/src/pages/`, for example `About.jsx`:
```jsx
import React from "react";

function About() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-[#001F5B]">About Us</h1>
      <p className="mt-4 text-gray-600">Add your content here.</p>
    </div>
  );
}

export default About;
```

### 2. Add the route in `App.js`
Open `my-react-app/src/App.js` and import your new page, then add a `<Route>`:
```jsx
import About from "./pages/About";

// inside <Routes>:
<Route path="/about-us" element={<About />} />
```

### 3. Activate the navbar link
Open `my-react-app/src/components/navbar/Navbar.jsx`. The `navItems` array already has placeholder links with `// dummy` comments. Find the matching link and remove the comment — no other change needed since the `href` already matches the route path.

---

## Branching & Deployment Workflow

> ⚠️ **Every push to `main` triggers an automatic build and deploy to GitHub Pages.** Always do your work on a separate branch first.

### Recommended workflow

```bash
# Start new work on a dev branch
git checkout -b dev

# Make your changes, then commit
git add .
git commit -m "your message"
git push origin dev

# When ready, open a Pull Request on GitHub and merge dev → main
# The GitHub Action will automatically build and deploy to GitHub Pages
```

### First deploy — GitHub Pages setup (one-time)

The first time you merge into `main`, the Action will create a `gh-pages` branch automatically. After that you need to tell GitHub to serve from it:

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Branch**, select `gh-pages` and keep the folder as `/ (root)`
4. Click **Save**

Your site will be live at the URL you set in `package.json` within a minute or two.
> ⚠️NOTE **After doing this the first time, any time you push to dev and then merge to main (or just push to main directly) It will automatically deploy and go live to the url.**

---

## Project Structure Reference

```
my-react-app/
├── public/
├── src/
│   ├── assets/
│   │   ├── web_design/       # navbar_logo.png, BlankBevo.mp4, etc.
│   ├── components/
│   │   └── navbar/
│   │      ├── Navbar.jsx    # edit navItems here
│   │      ├── CardNav.tsx   # third-party component — do not edit
│   │      └── CardNav.css
│   │   
│   ├── pages/
│   │   └── Home.jsx          # main page — edit content here
│   ├── App.js                # routes live here
│   └── index.js
├── package.json              # update "homepage" field
├── package-lock.json         # this is where all packages when you need to install/add/remove
└── .github/
    └── workflows/
        └── deploy.yml        # update repo URL
```