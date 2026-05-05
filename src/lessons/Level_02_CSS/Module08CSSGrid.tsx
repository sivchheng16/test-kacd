import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CodeExample } from "../../components/playground/CodeExample";

const EXPLORE_STARTER = {
  html: `<div class="page">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Main Content</main>
  <footer class="footer">Footer</footer>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f5f0e8; padding: 24px; }

.page {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  min-height: 300px;
}

.header  { grid-area: header;  background: #c2622d; color: white; }
.sidebar { grid-area: sidebar; background: #d4c8b4; }
.content { grid-area: content; background: white; }
.footer  { grid-area: footer;  background: #c2622d; color: white; }

.header, .sidebar, .content, .footer {
  border-radius: 6px;
  padding: 16px;
  font-weight: 600;
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="grid">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
  <div class="card">4</div>
  <div class="card">5</div>
  <div class="card">6</div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; padding: 24px; background: #f5f0e8; }

.card {
  background: #c2622d;
  color: white;
  padding: 24px;
  border-radius: 6px;
  font-size: 1.5rem;
  text-align: center;
}

/* Make .grid a 3-column grid that collapses to 1 on small screens */
.grid {
  gap: 16px;

}

@media (max-width: 600px) {

}`,
};

const challenge = {
  prompt:
    "Give `.grid` a `display: grid` and a `grid-template-columns` with 3 columns. Add a `@media` query that sets it to a single column on small screens.",
  check(_html: string, css: string, _js: string) {
    const hasGrid = /display\s*:\s*grid/i.test(css);
    const hasCols = /grid-template-columns\s*:/i.test(css);
    const hasMedia = /@media/i.test(css);
    if (!hasGrid)
      return { passed: false, message: "Add `display: grid` to `.grid`." };
    if (!hasCols)
      return {
        passed: false,
        message:
          "Good — now add `grid-template-columns` (e.g. `repeat(3, 1fr)`).",
      };
    if (!hasMedia)
      return {
        passed: false,
        message:
          "Almost — add a `@media` query to collapse the grid to 1 column on small screens.",
      };
    return { passed: true, message: "Challenge complete! Grid layout works." };
  },
};

const GRID_BASIC_HTML = `<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>`;

const GRID_BASIC_CSS = `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */
  gap: 16px;                           /* gutter between cells */
  background: #fdf6ec;
  padding: 16px;
  border-radius: 8px;
}

.item {
  background: #c2622d;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
}`;

const GRID_AREAS_HTML = `<div class="page">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Main Content</main>
  <footer class="footer">Footer</footer>
</div>`;

const GRID_AREAS_CSS = `.page {
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  gap: 10px;
  background: #fdf6ec;
  padding: 10px;
  border-radius: 8px;
}

.header  { grid-area: header;  background: #c2622d; color: white; }
.sidebar { grid-area: sidebar; background: #d4c8b4; }
.content { grid-area: content; background: white; min-height: 100px; }
.footer  { grid-area: footer;  background: #c2622d; color: white; }

.header, .sidebar, .content, .footer {
  padding: 15px;
  text-align: center;
  border-radius: 4px;
  font-family: sans-serif;
  font-weight: bold;
}`;

export default function Module08CSSGrid() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Flexbox is one-dimensional — it works along a single row or column.
          CSS Grid is two-dimensional: rows <em>and</em> columns at the same
          time. For page layouts, Grid wins.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#the-mental-model" className="text-primary hover:underline">→ The mental model</a></li>
          <li><a href="#key-concepts" className="text-primary hover:underline">→ Key concepts</a></li>
          <li><a href="#grid-sizing-and-alignment" className="text-primary hover:underline">→ Sizing and Alignment</a></li>
          <li><a href="#grid-vs-flexbox" className="text-primary hover:underline">→ Grid vs Flexbox</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Mental model ────────────────────────────────── */}
      <section id="the-mental-model" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The mental model</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Imagine a spreadsheet. You define how many{" "}
          <strong className="text-foreground">columns</strong> and{" "}
          <strong className="text-foreground">rows</strong> the grid has. Child
          elements are placed into the resulting cells — automatically, or
          exactly where you tell them to go.
        </p>
        <CodeExample 
          html={GRID_BASIC_HTML}
          css={GRID_BASIC_CSS}
          title="Basic 3-Column Grid"
          height="240px"
        />
      </section>

      {/* ── 3. Key concepts ────────────────────────────────── */}
      <section id="key-concepts" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Key concepts</h2>

        {/* fr unit */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fr</code> unit
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">fr</code>{" "}
            stands for <em>fractional unit</em>. It divides whatever space is
            left after fixed columns are placed.{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              1fr 2fr
            </code>{" "}
            gives the first column one-third of the space and the second
            two-thirds.
          </p>
        </div>

        {/* repeat() */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">repeat()</code>
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Writing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              repeat(3, 1fr)
            </code>{" "}
            is identical to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              1fr 1fr 1fr
            </code>
            . Use it to keep column definitions readable as column counts grow.
          </p>
        </div>

        {/* Placing items */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Placing items precisely</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Grid lines are numbered from 1. You can pin a child to specific
            lines with{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-column
            </code>{" "}
            and{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-row
            </code>
            :
          </p>
          <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
            <div className="px-6 py-3">
              <span className="font-mono text-[#c2622d]">grid-column: 1 / 3</span>
              <span className="text-muted-foreground ml-3">
                span from column line 1 to line 3 (fills 2 columns)
              </span>
            </div>
            <div className="px-6 py-3">
              <span className="font-mono text-[#c2622d]">grid-row: 1 / 3</span>
              <span className="text-muted-foreground ml-3">
                span 2 rows (useful for a tall sidebar)
              </span>
            </div>
          </div>
        </div>

        {/* grid-template-areas */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Named areas with{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-areas
            </code>
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Instead of juggling line numbers, name regions directly in the CSS.
            The ASCII diagram <em>is</em> the layout:
          </p>
          <CodeExample 
            html={GRID_AREAS_HTML}
            css={GRID_AREAS_CSS}
            title="Grid Template Areas"
            height="280px"
          />
        </div>
      </section>

      {/* ── 3.5 Sizing & Alignment ────────────────────────── */}
      <section id="grid-sizing-and-alignment" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Grid Sizing and Alignment</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Grid provides powerful tools for creating fluid layouts and aligning items within their cells.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Advanced Sizing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use <code>minmax()</code> to ensure a column never gets too small or too large.
            </p>
            <code className="block p-3 bg-stone-100 rounded text-xs font-mono">
              grid-template-columns: <br />
              &nbsp;&nbsp;repeat(auto-fit, minmax(200px, 1fr));
            </code>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Grid Alignment</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li><span className="text-[#c2622d]">justify-items: center;</span> (horizontal in cell)</li>
              <li><span className="text-[#c2622d]">align-items: center;</span> (vertical in cell)</li>
              <li><span className="text-[#c2622d]">place-items: center;</span> (shorthand for both)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Grid vs Flexbox ─────────────────────────────── */}
      <section id="grid-vs-flexbox" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Grid vs Flexbox</h2>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3 flex gap-3">
            <span className="font-mono text-[#c2622d] shrink-0 w-24">Grid</span>
            <span className="text-muted-foreground">
              2D layouts — page structure, photo galleries, dashboard panels
            </span>
          </div>
          <div className="px-6 py-3 flex gap-3">
            <span className="font-mono text-[#c2622d] shrink-0 w-24">Flexbox</span>
            <span className="text-muted-foreground">
              1D layouts — navbars, button rows, card internals, centering a single item
            </span>
          </div>
        </div>
      </section>

      {/* ── 5. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A classic page layout built entirely with{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-areas
            </code>
            . Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-columns
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              1fr 2fr
            </code>
            , or swapping the area names to rearrange the layout.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="420px"
        />
      </section>

      {/* ── 5.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>CSS Grid is the ultimate tool for complex web layouts:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Two-Dimensional:</strong> Grid controls both rows and columns simultaneously.</li>
            <li><strong>Fractional Units (fr):</strong> A flexible way to distribute remaining space in a grid.</li>
            <li><strong>Repeat & Sizing:</strong> Use <code>repeat()</code> and <code>minmax()</code> for clean, responsive definitions.</li>
            <li><strong>Named Areas:</strong> <code>grid-template-areas</code> allows you to visualize your layout directly in your CSS code.</li>
            <li><strong>Alignment:</strong> Grid offers granular control over how items sit within their cells using <code>place-items</code>.</li>
          </ul>
        </div>
      </section>

      {/* ── 6. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Give{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .grid
            </code>{" "}
            a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              display: grid
            </code>{" "}
            and a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              grid-template-columns
            </code>{" "}
            with 3 columns (try{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              repeat(3, 1fr)
            </code>
            ). Then add a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              @media
            </code>{" "}
            query that collapses it to a single column on small screens.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="400px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 7. Gate ────────────────────────────────────────── */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">
                Click <strong>Complete &amp; Next</strong> below to continue.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 rounded-2xl bg-stone-50 border border-border">
            <p className="text-sm font-sans text-muted-foreground">
              Complete the challenge above to unlock the next lesson.
            </p>
          </div>
        )}
      </section>

    </article>
  );
}
