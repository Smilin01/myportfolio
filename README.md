# John Smilin DS — Portfolio

An AI-engineer portfolio with a scroll-driven landing page and a Medium-style blog.

- **Landing:** animated hero, a sticky scroll-through of the six-agent coding pipeline (LLM flow diagram), projects, skills, writing, contact.
- **Blog:** `/blog` list and `/blog/:slug` posts, styled after Medium.

## Stack

React 19, Vite, Tailwind CSS, Framer Motion, React Router, EmailJS (contact form).

## Edit content

- Profile, projects, skills: `src/data/content.js`
- Blog posts: `src/data/posts.js` (add an object; block types `p`, `h2`, `quote`, `ul`, `code`)

## Run

```bash
npm install
npm run dev
npm run build
```

`public/_redirects` makes client-side routes work on Netlify.
