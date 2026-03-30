# Prompt Engineering for Web Development

**CSC 436 — Web Applications — Week 1**

How you talk to an AI coding assistant determines the quality of the code you get back. Below are 10 example prompts ranging from terrible to excellent, with explanations of what works, what doesn't, and how to improve.

---

## 1. ⭐ Terrible — Too Vague

> make me a website

### What's Wrong
- No indication of purpose, audience, or content
- No technology or design preferences
- The AI will guess at everything and produce generic, unusable output
- You'll spend more time fixing it than you saved

### Improved Version
> Create a single-page personal portfolio website with a hero section, about section, three project cards, and a contact form. Use semantic HTML5 and modern CSS with flexbox.

### What You'd Get Back
A random website — maybe a blog, maybe a store, maybe a blank template. The AI has no way to make a good decision, so you'll get the most generic possible output.

---

## 2. ⭐ Bad — Slightly Better, Still Vague

> create a portfolio page

### What's Wrong
- "Portfolio" gives the AI a direction, but there are dozens of types (photography, design, developer, writing)
- No details about sections, layout, features, or style
- No mention of responsive design, accessibility, or tech constraints

### Improved Version
> Create a web developer portfolio page with the following sections: a navigation bar, a hero area with my name and title, a grid of 4 project cards with images, and a footer with social links. Use HTML and CSS only — no frameworks.

### What You'd Get Back
A basic portfolio page, but it will likely use outdated patterns, lack responsive design, and miss accessibility best practices. You'll need multiple follow-up prompts to get what you actually wanted.

---

## 3. ⭐⭐ Poor — Conflicting Requirements

> Build me a portfolio website. It should be a single HTML file with no external dependencies, but use React components and Tailwind CSS. Make it load instantly and include animated 3D graphics. It should work on IE6 and use modern CSS Grid.

### What's Wrong
- **Contradictions everywhere**: React requires a build step or CDN (not "no dependencies"), Tailwind is an external dependency, IE6 doesn't support CSS Grid or modern JavaScript
- 3D graphics and "load instantly" conflict — heavy assets slow things down
- The AI will either ignore half the requirements or produce something broken
- Shows the prompter hasn't thought through what they actually need

### Improved Version
> Build a single-page portfolio as one HTML file with embedded CSS and JavaScript (no external dependencies or build tools). Use CSS Grid for layout, smooth CSS animations for visual polish, and ensure it works in modern browsers (Chrome, Firefox, Safari, Edge).

### What You'd Get Back
The AI will try its best to satisfy contradictory requirements — the result will be a mess of compromises. Some requirements will be silently dropped, and the code will have fundamental architectural problems.

---

## 4. ⭐⭐⭐ OK — Some Requirements, Missing Context

> Create a responsive portfolio website with a hero section, about me section, projects grid, and contact form. Use HTML, CSS, and JavaScript.

### What's Wrong
- This is a reasonable request, but it's missing:
  - **Visual style** — Modern? Minimal? Colorful? Dark mode?
  - **Content details** — How many projects? What fields in the contact form?
  - **Accessibility requirements** — Should it meet WCAG standards?
  - **JavaScript behavior** — What should be interactive?
- The AI will make assumptions for all of these, and they may not match your expectations

### Improved Version
> Create a responsive portfolio website with: (1) a sticky navigation bar, (2) a hero section with name, title, and CTA button, (3) an about section with a short bio, (4) a 4-card project grid with image, title, description, and tech tags, (5) a contact form with name, email, and message fields with client-side validation. Use semantic HTML5, CSS with custom properties, and vanilla JavaScript. Style: clean, modern, professional with a blue accent color.

### What You'd Get Back
Decent code that covers the basics, but the AI will make its own choices about colors, font sizes, spacing, interactions, and accessibility. You'll need follow-up prompts to dial it in.

---

## 5. ⭐⭐⭐ OK — Good Requirements, No Tech Stack

> I need a portfolio website with these sections:
> - Navigation with smooth scrolling
> - Hero with photo, name, and tagline
> - About with bio and stats
> - 4 project cards in a grid
> - Skills organized by category
> - Contact form with validation
>
> It should be responsive, modern-looking, and professional.

### What's Wrong
- The requirements are solid and well-organized — good job!
- But **no tech stack is specified** — the AI might give you React, Vue, plain HTML, or even WordPress PHP
- No mention of CSS approach (custom properties? Tailwind? SCSS?)
- No accessibility or performance requirements

### Improved Version
> *(Add to the above prompt:)*
> Use a single HTML file with embedded CSS and vanilla JavaScript (no frameworks or build tools). Use CSS custom properties for theming, CSS Grid and Flexbox for layout, and follow WCAG 2.1 AA accessibility guidelines. Target modern evergreen browsers.

### What You'd Get Back
Good structure, but unpredictable technology choices. One run might give you a React app; another might give you a WordPress theme. Being explicit about the stack saves a round of "no, not that."

---

## 6. ⭐⭐⭐⭐ Good — Specifies Layout, Tech, and Style

> Create a single-page developer portfolio in one HTML file with embedded CSS and JavaScript.
>
> **Layout:**
> - Sticky header with logo and nav links (About, Projects, Skills, Contact)
> - Hero section: name, title, short description, 2 CTA buttons, circular profile photo
> - About: 2-column layout with bio text on the left and 3 stat cards on the right
> - Projects: 4 cards in a responsive CSS Grid (image, title, description, tech tags, links)
> - Skills: 4 categories displayed in a grid with checkmark lists
> - Contact: 2-column layout with info on the left and a validated form on the right
> - Footer with copyright and social links
>
> **Tech:** Semantic HTML5, CSS custom properties for colors, CSS Grid + Flexbox, vanilla JS
> **Style:** Clean, modern, blue (#2563eb) accent, light background, professional feel

### What's Right
- Clear layout specifications for each section
- Technology choices are explicit
- Visual direction is provided (colors, style)
- Single-file constraint is stated up front

### What Could Be Better
- No mention of accessibility (alt text, ARIA, color contrast, keyboard navigation)
- No responsive breakpoints specified
- No error handling requirements for JavaScript

### What You'd Get Back
Good, usable code that matches your vision. The AI has enough direction to produce something close to what you imagined on the first try. You might need one follow-up for accessibility and responsive refinements.

---

## 7. ⭐⭐⭐⭐ Good — Includes Accessibility Requirements

> Create a single-page developer portfolio (one HTML file, embedded CSS/JS).
>
> **Accessibility requirements (WCAG 2.1 AA):**
> - All images must have descriptive alt text
> - Form inputs must have visible `<label>` elements (not just placeholders)
> - Color contrast must meet 4.5:1 ratio for normal text
> - Interactive elements must be keyboard-accessible
> - Use ARIA attributes where semantic HTML isn't sufficient (e.g., mobile menu toggle)
> - Use `prefers-reduced-motion` to respect user motion preferences
>
> **Sections:** Hero, About, Projects (4 cards), Skills, Contact form
> **Style:** Modern, professional, with a blue accent color

### What's Right
- Accessibility is explicitly called out — this is often the first thing AI-generated code gets wrong
- Specific WCAG criteria are mentioned, not just "make it accessible"
- Actionable requirements (alt text, labels, contrast ratios, keyboard nav)

### What Could Be Better
- Layout details are lighter — the AI has to guess at column arrangements
- No JavaScript behavior specified beyond the form

### What You'd Get Back
Code that's actually accessible — or at least much closer than if you hadn't asked. The AI knows you're paying attention to this and will include alt text, labels, ARIA attributes, and proper focus management.

---

## 8. ⭐⭐⭐⭐⭐ Excellent — Detailed with Persona, Requirements, and Constraints

> **Role:** You are a senior frontend developer who writes clean, maintainable, accessible code.
>
> **Task:** Create a single-page developer portfolio website as one HTML file with embedded CSS (in a `<style>` tag) and JavaScript (in a `<script>` tag). No external dependencies, no CDN links, no build tools.
>
> **Content & Layout:**
> 1. **Header** — Sticky, with a text logo and navigation links (About, Projects, Skills, Contact). Mobile: hamburger menu that toggles a slide-out nav.
> 2. **Hero** — Full-width section with greeting text, name (h1), a one-sentence description, two CTA buttons (primary filled, secondary outlined), and a circular profile photo on the right. Stack vertically on mobile.
> 3. **About** — 2-column grid: bio paragraphs on the left, 3 stat cards (years, projects, clients) on the right. Single column on mobile.
> 4. **Projects** — 4 cards in a responsive grid (`auto-fill, minmax(280px, 1fr)`). Each card: image, title (h3), description, tech tags (pill-shaped), and Demo/GitHub links.
> 5. **Skills** — 4 category cards in a grid, each with a heading and a bulleted list of 4–5 skills.
> 6. **Contact** — 2 columns: contact info (email, location, LinkedIn) on the left; a form (name, email, message, submit button) on the right with client-side validation and error messages.
> 7. **Footer** — Dark background, copyright text, and 3 social links.
>
> **Technical Requirements:**
> - Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`)
> - CSS custom properties for all colors (defined in `:root`)
> - `clamp()` for responsive typography
> - `scroll-behavior: smooth` on `html`
> - WCAG 2.1 AA: alt text, form labels, 4.5:1 contrast, focus-visible styles, ARIA on menu toggle
> - Mobile breakpoint at 768px
> - JavaScript in an IIFE with `'use strict'`
>
> **Design Tokens:**
> - Primary: `#2563eb`, Dark: `#1d4ed8`, Background: `#ffffff`, Alt BG: `#f8fafc`
> - Font: system-ui stack, Border radius: 8px
>
> **Constraints:**
> - No comments unless clarifying non-obvious logic
> - No Lorem Ipsum — use realistic placeholder content
> - The file must be under 500 lines
> - Code must be copy-paste ready and render correctly in Chrome, Firefox, Safari, Edge

### What's Right
- **Persona** tells the AI what quality level to target
- **Every section** is described with specific elements and layout behavior
- **Technical requirements** leave nothing to guesswork
- **Design tokens** ensure visual consistency
- **Constraints** set clear boundaries
- The result will be very close to production-ready on the first try

### What You'd Get Back
High-quality, well-structured code that closely matches a hand-coded professional result. The AI has enough context to make good decisions at every level — architecture, styling, accessibility, and interaction design.

---

## 9. ⭐⭐⭐⭐⭐ Excellent — Iterative Prompt (Builds on Previous Output)

> *Assume you already generated a portfolio page in a previous message.*
>
> Great, the portfolio looks good. Now make these changes:
>
> 1. **Add dark mode:** Create a toggle button in the header (sun/moon icon). Use a `data-theme="dark"` attribute on `<html>` and define dark-mode values for all CSS custom properties. Save the user's preference in `localStorage`.
>
> 2. **Animate the project cards:** Add a subtle fade-in-up animation when they scroll into view. Use `IntersectionObserver` — no external animation libraries. Respect `prefers-reduced-motion`.
>
> 3. **Improve the contact form:** Add a character counter below the message textarea (e.g., "42 / 500 characters"). Show a success state after submission — replace the form with a thank-you message with a "Send another" button that resets the form.
>
> Keep all other code the same. Only modify what's needed for these three changes.

### What's Right
- **Builds incrementally** — doesn't ask the AI to redo everything from scratch
- **Specific, scoped changes** — three clear tasks with explicit behavior
- **References best practices** — IntersectionObserver, localStorage, prefers-reduced-motion
- **"Keep all other code the same"** — prevents the AI from rewriting unrelated sections (a common problem)

### What You'd Get Back
Targeted, surgical updates to the existing code. This is how you work with AI effectively — get a solid foundation first, then iterate with focused prompts. Each iteration refines the result without starting over.

---

## 10. ⭐⭐⭐⭐⭐ Excellent — Debugging / Fix-It Prompt

> My contact form validation isn't working correctly. Here's the issue:
>
> **Expected behavior:** When the user submits the form with an invalid email, the email field should show a red border and display the error message "Please enter a valid email address" below the field.
>
> **Actual behavior:** The form submits successfully even when the email field contains "not-an-email". No error styling appears. The `alert("Thanks!")` fires regardless.
>
> **Relevant code:**
> ```js
> form.addEventListener('submit', (event) => {
>   event.preventDefault();
>   const email = document.getElementById('email').value;
>   if (email.includes('@')) {
>     alert('Thanks!');
>   }
> });
> ```
>
> **What I've tried:**
> - Checked that the `id="email"` matches the input element (it does)
> - Confirmed the event listener fires (added a `console.log`)
> - The issue seems to be in the validation logic itself
>
> **Environment:** Chrome 120, vanilla JavaScript, no frameworks
>
> Please fix the validation logic and add proper error display. The validation should:
> 1. Check for a valid email format (not just the presence of `@`)
> 2. Toggle an `.invalid` class on the form group
> 3. Show/hide the error `<span>` element
> 4. Prevent submission if any field is invalid

### What's Right
- **Clear problem statement** — expected vs. actual behavior
- **Includes the buggy code** so the AI can see exactly what's wrong
- **Shows debugging steps already taken** — the AI won't suggest things you've tried
- **Specifies the environment** — avoids solutions that rely on unavailable features
- **Defines the fix requirements** — doesn't just say "fix it," says what "fixed" looks like

### What You'd Get Back
A precise fix with an explanation of why the original code was broken (`includes('@')` matches strings like `@` or `@@` — it doesn't validate email format). The AI will provide a proper regex, error display logic, and explain the changes. This is the kind of prompt that gets you a useful, educational answer.

---

## Key Takeaways

| Principle | Why It Matters |
|---|---|
| **Be specific** | Vague prompts produce vague code |
| **State your tech stack** | Prevents the AI from picking a random framework |
| **Include accessibility requirements** | AI skips accessibility unless you ask |
| **Set constraints** | "No dependencies," "under 500 lines," "single file" |
| **Give a persona** | "Act as a senior developer" raises the quality bar |
| **Iterate, don't restart** | Build on what you have with focused follow-up prompts |
| **For bugs: show context** | Expected vs. actual behavior, code snippet, what you tried |
| **Describe the output you want** | If you can picture it, describe it — colors, layout, behavior |

Remember: **The quality of AI output is directly proportional to the quality of your input.** Learning to write great prompts is one of the most valuable skills you can develop as a modern web developer.
