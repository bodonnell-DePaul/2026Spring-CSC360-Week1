# Week 1 In-Class Exercise: AI-Assisted Portfolio Development

**CSC 436 — Web Applications — DePaul University**

> In this exercise you'll set up your development environment, use AI tools to generate a portfolio page, compare AI outputs, and practice debugging a broken HTML file.

---

## Learning Objectives

- Configure a modern web development environment
- Use AI coding assistants (GitHub Copilot, ChatGPT, Claude) to generate HTML/CSS/JS
- Critically evaluate AI-generated code
- Identify and fix common web development bugs

---

## Part 1 — Environment Setup (~10 min)

Make sure you have all of the following installed and working before moving on.

### 1. VS Code

- Download from [https://code.visualstudio.com](https://code.visualstudio.com) if you haven't already.
- Install the following extensions:
  - **GitHub Copilot** (you have access through the GitHub Student Developer Pack)
  - **Live Server** — lets you preview HTML files in the browser with auto-reload

### 2. Git

- Confirm Git is installed by opening a terminal and running:
  ```bash
  git --version
  ```
- If you don't have it: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Configure your identity if you haven't:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your-email@depaul.edu"
  ```

### 3. Node.js

- Confirm Node is installed:
  ```bash
  node --version
  ```
- If you don't have it: [https://nodejs.org](https://nodejs.org) (use the LTS version)
- We won't use Node heavily this week, but we will throughout the quarter.

### 4. Verify Copilot

- Open any `.js` or `.html` file in VS Code.
- Start typing a comment like `// function that reverses a string` and wait for Copilot to suggest code.
- If you see a gray suggestion appear, you're all set.

> **Checkpoint:** Before moving on, make sure `git --version`, `node --version`, and Copilot autocomplete all work.

---

## Part 2 — Generate a Portfolio Page with AI (~15 min)

### Step 1: Write a Prompt

Come up with a prompt that asks an AI tool to generate a single-page personal portfolio site. Your prompt should mention:

- Your name (or a fictional one)
- At least 3 sections (e.g., hero/header, about, projects, contact)
- That it should be a single self-contained HTML file with inline CSS and JS
- Any style preferences (color scheme, layout, vibe)

**Example prompt (feel free to use your own):**

> Create a single-page portfolio website for a computer science student named Alex Chen. Include a hero section with a greeting, an about section, a projects grid showing 3 projects with titles and descriptions, and a contact form. Use a modern dark theme with a blue accent color. All CSS should be in a style tag and any JavaScript in a script tag — everything in one HTML file.

### Step 2: Generate with Your First AI Tool

Use **any AI tool you have access to** — GitHub Copilot Chat, ChatGPT, Claude, or another — and give it your prompt. Save the output as:

```
week01/exercise/my-portfolio-v1.html
```

Open it with Live Server and take a look.

### Step 3: Generate with a Second AI Tool

Use a **different** AI tool with the **exact same prompt**. Save this version as:

```
week01/exercise/my-portfolio-v2.html
```

### Step 4: Compare

Open both files side-by-side and note differences. Consider:

- Which output looks better visually?
- Which has better HTML structure (semantic tags, accessibility)?
- Which CSS approach is more maintainable?
- Did either tool add features you didn't ask for?
- Did either tool miss something from your prompt?

Write 3–5 bullet points summarizing the differences in your prompt log (Part 5).

---

## Part 3 — Find and Fix the Bugs (~15 min)

Open the provided file **`broken-portfolio.html`** in VS Code and preview it with Live Server.

This file is a portfolio page that looks mostly correct on the surface — but it has **exactly 3 bugs** hidden in it. Your job is to find and fix all three.

### What to Look For

The bugs fall into these categories:

1. **A responsive layout issue** — the page looks fine on desktop but breaks on smaller screens. Use your browser's DevTools (F12 → toggle device toolbar) to test at mobile widths.
2. **An accessibility problem** — something that would cause issues for screen readers or violate basic accessibility guidelines. Try inspecting the HTML structure or running a quick accessibility check.
3. **A JavaScript bug** — a feature on the page doesn't work correctly. Open the browser console (F12 → Console tab) and interact with the page to find it.

### Tips

- **DevTools are your friend.** Resize the browser, inspect elements, read console errors.
- **You can use AI to help** — try pasting the code into an AI tool and asking it to find bugs. But verify what it tells you! AI tools sometimes report false positives or miss the real issues.
- **Fix each bug directly** in `broken-portfolio.html` and save the file.

### Deliverable

For each bug, record in your prompt log:

- What the bug was
- How you found it (manual inspection, DevTools, AI tool, etc.)
- What you changed to fix it

---

## Part 4 — Prompt Log (~5 min)

Create a file called **`prompt-log.md`** in your `week01/exercise/` folder. Copy the template below and fill it in as you work.

```markdown
# Week 1 Prompt Log

## AI-Generated Portfolio

| # | Tool Used | Prompt | What Worked Well | What Needed Fixing |
|---|-----------|--------|------------------|--------------------|
| 1 |           |        |                  |                    |
| 2 |           |        |                  |                    |

## Comparison Notes

-
-
-

## Bug Fixes

| Bug # | Category       | Description of Bug | How I Found It | What I Changed |
|-------|----------------|--------------------|----------------|----------------|
| 1     | Responsive     |                    |                |                |
| 2     | Accessibility  |                    |                |                |
| 3     | JavaScript     |                    |                |                |

## Reflection

What surprised you most about using AI to generate code?

>
```

---

## Submission

Push the following files to your GitHub repository under `week01/exercise/`:

```
week01/exercise/
├── README.md                (this file — do not modify)
├── broken-portfolio.html    (with your 3 bug fixes applied)
├── my-portfolio-v1.html     (AI-generated, tool 1)
├── my-portfolio-v2.html     (AI-generated, tool 2)
└── prompt-log.md            (filled-in prompt log)
```

Commit and push:

```bash
git add week01/exercise/
git commit -m "Week 1 exercise: AI-assisted portfolio"
git push
```

---

## Tips for Getting the Most Out of This Exercise

1. **Be specific in your prompts.** Vague prompts produce generic results. Tell the AI exactly what sections, colors, layout, and features you want.
2. **Iterate.** Your first prompt won't be perfect. Try follow-up prompts like _"Make the projects section a responsive grid"_ or _"Add a dark mode toggle."_
3. **Read the generated code.** Don't just copy-paste — look at the HTML structure, the CSS properties, and the JS logic. You'll learn patterns quickly this way.
4. **Use DevTools constantly.** Right-click → Inspect is the fastest way to understand what's happening on a page. Get comfortable with the Elements, Console, and responsive design mode.
5. **AI is a tool, not a replacement for understanding.** If the AI generates something you don't understand, ask it to explain. That's where the real learning happens.
