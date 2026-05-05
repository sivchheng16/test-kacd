import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CodeExample } from "../../components/playground/CodeExample";

const EXPLORE_STARTER = {
  html: `<nav class="navbar">
  <span class="logo">KOOMPI</span>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Courses</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>

<div class="card-grid">
  <div class="card">Phnom Penh</div>
  <div class="card">Siem Reap</div>
  <div class="card">Sihanoukville</div>
  <div class="card">Kampot</div>
  <div class="card">Battambang</div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f5f0e8; }

/* ── Navbar: logo left, links right ── */
.navbar {
  display: flex;
  justify-content: space-between;  /* logo and links at opposite ends */
  align-items: center;
  background: #c2622d;
  padding: 12px 24px;
  color: white;
}

.logo {
  font-weight: 700;
  font-size: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

/* ── Card grid: wraps onto new rows ── */
.card-grid {
  display: flex;
  flex-wrap: wrap;            /* cards wrap instead of overflowing */
  gap: 16px;
  padding: 24px;
}

.card {
  flex: 1 1 160px;            /* grow, shrink, min width 160px */
  background: white;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  border: 1px solid #d4c8b4;
}

/* ── Responsive: stack on small screens ── */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
  }
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="container">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; padding: 24px; }

.box {
  background: #c2622d;
  color: white;
  padding: 24px;
  border-radius: 6px;
  font-size: 1.5rem;
  text-align: center;
}

/* Add display: flex and justify-content to .container,
   then add an @media query */
.container {
  gap: 12px;

}

@media (max-width: 768px) {

}`,
};

const challenge = {
  prompt:
    "Use `display: flex` and `justify-content` on a container, and add a `@media` query block.",
  check(_html: string, css: string, _js: string) {
    const hasFlex = /display\s*:\s*flex/i.test(css);
    const hasJustify = /justify-content\s*:/i.test(css);
    const hasMedia = /@media/i.test(css);
    if (!hasFlex)
      return {
        passed: false,
        message: "Add `display: flex` to your container.",
      };
    if (!hasJustify)
      return {
        passed: false,
        message:
          "Good flex container! Now add `justify-content` (try `center` or `space-between`).",
      };
    if (!hasMedia)
      return {
        passed: false,
        message:
          "Almost — add a `@media` query (e.g. `@media (max-width: 768px) { … }`).",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

const ANNOTATED_HTML = `<nav class="navbar">
  <div class="logo">KOOMPI</div>
  <ul class="nav-links">
    <li>Home</li>
    <li>Courses</li>
    <li>About</li>
  </ul>
</nav>
<div class="main-content">
  <p>Resize the window to see the navbar stack!</p>
</div>`;

const ANNOTATED_CSS = `.navbar {
  display: flex;
  justify-content: space-between;  /* logo left, links right */
  align-items: center;             /* vertically centered */
  gap: 16px;
  padding: 12px 24px;
  background: #c2622d;
  color: white;
  border-radius: 8px;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-links {
  display: flex;                   /* links also in a row */
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-content {
  padding: 20px;
  text-align: center;
  color: #666;
}

/* Mobile: stack navbar vertically below 600px */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;        /* row → column on small screens */
    align-items: flex-start;
  }
  
  .nav-links {
    width: 100%;
    justify-content: space-between;
  }
}`;

export default function Module06FlexboxResponsive() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Before flexbox, centering something vertically in CSS was a
          puzzle professionals complained about for years. With one line —
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">display: flex</code>
          — it just works.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#flexbox-and-media-queries" className="text-primary hover:underline">→ Flexbox and media queries</a></li>
          <li><a href="#advanced-flex-properties" className="text-primary hover:underline">→ Advanced Flex Properties</a></li>
          <li><a href="#annotated-example" className="text-primary hover:underline">→ Annotated example</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="flexbox-and-media-queries" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Flexbox and media queries</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Apply{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            display: flex
          </code>{" "}
          to a parent element. Its direct children become{" "}
          <strong className="text-foreground">flex items</strong>. They
          line up in a row by default. Two properties control them:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">flex-direction</span>
            <span className="text-muted-foreground ml-3">
              <code>row</code> (default) or <code>column</code>
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">justify-content</span>
            <span className="text-muted-foreground ml-3">
              horizontal alignment: <code>center</code>, <code>space-between</code>, etc.
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">align-items</span>
            <span className="text-muted-foreground ml-3">
              vertical alignment: <code>stretch</code>, <code>center</code>, etc.
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">gap</span>
            <span className="text-muted-foreground ml-3">
              space between items without using margins.
            </span>
          </div>
        </div>
      </section>

      {/* ── 2.5 Advanced Flex & Mobile First ───────────────── */}
      <section id="advanced-flex-properties" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Advanced Flex Properties</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          While the parent controls the overall layout, individual flex items can decide how they grow and shrink.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">The Flex Shorthand</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use <code>flex: grow shrink basis;</code> to control how an item fills space.
            </p>
            <code className="block p-3 bg-stone-100 rounded text-xs font-mono">
              flex: 1 0 200px; <br />
              /* grows to fill space, doesn't shrink below 200px */
            </code>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Mobile-First Design</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Best practice is to write styles for small screens first, then use <code>min-width</code> media queries for larger screens.
            </p>
            <code className="block p-3 bg-stone-100 rounded text-xs font-mono">
              @media (min-width: 1024px) {"{"} <br />
              &nbsp;&nbsp;/* Desktop styles here */ <br />
              {"}"}
            </code>
          </div>
        </div>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="annotated-example" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A navbar that sits horizontal on desktop and stacks vertically on
          mobile.
        </p>
        <CodeExample 
          html={ANNOTATED_HTML}
          css={ANNOTATED_CSS}
          title="Responsive Flex Navbar"
          height="280px"
        />
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A KOOMPI navbar and a wrapping card grid for Cambodian cities are
            preloaded. Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              justify-content
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              center
            </code>
            , resizing the preview window to trigger the media query, or
            removing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              flex-wrap
            </code>{" "}
            and watching the cards overflow.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="460px"
        />
      </section>

      {/* ── 4.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Flexbox and Media Queries are the tools for modern, responsive layouts:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Flexbox</strong> is a one-dimensional layout system that excels at aligning items in rows or columns.</li>
            <li>Use <strong>justify-content</strong> for horizontal alignment and <strong>align-items</strong> for vertical alignment.</li>
            <li>The <strong>gap</strong> property is the modern way to add space between flex items.</li>
            <li><strong>Media Queries</strong> allow your design to adapt to different screen sizes.</li>
            <li>A <strong>Mobile-First</strong> approach ensures your site works on phones before adding complexity for desktops.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Add{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              display: flex
            </code>{" "}
            and{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              justify-content
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .container
            </code>
            , then write a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              @media
            </code>{" "}
            query block (it can be empty — the checker just needs to see you
            wrote one).
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="380px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 6. Gate ────────────────────────────────────────── */}
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
