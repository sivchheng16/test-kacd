import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CodeExample } from "../../components/playground/CodeExample";

const EXPLORE_STARTER = {
  html: `<div class="card">
  <h2>KOOMPI Academy</h2>
  <p>Hover over the button below.</p>
  <button class="btn">Get Started</button>
</div>`,
  css: `:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --spacing-md: 16px;
  --radius: 8px;
}

body {
  font-family: sans-serif;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.card {
  background: white;
  padding: 32px;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 320px;
}

h2 { color: var(--primary); margin-bottom: var(--spacing-md); }
p  { color: #555; margin-bottom: var(--spacing-md); }

.btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--radius);
  cursor: pointer;
  /* Try changing 200ms to 500ms and see the difference */
  transition: background-color 200ms ease, transform 150ms ease;
}

.btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}`,
};

const CHALLENGE_STARTER = {
  html: `<button class="btn">Hover me</button>`,
  css: `/* Challenge: use a CSS variable for color and add a hover transition.
   Hint: declare --btn-color on :root, use it on .btn,
   then add a transition for background-color. */

body {
  display: flex;
  justify-content: center;
  padding: 60px;
  font-family: sans-serif;
}

.btn {
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
`,
};

const challenge = {
  prompt:
    "Declare a CSS custom property (starting with --) for the button colour and add a transition property to .btn.",
  check(_html: string, css: string, _js: string) {
    const hasVar = /--[\w-]+\s*:/.test(css);
    const hasTransition = /transition\s*:/.test(css);
    if (!hasVar)
      return {
        passed: false,
        message:
          "Declare at least one CSS variable using -- notation, e.g. --btn-color: #6366f1; inside :root { }.",
      };
    if (!hasTransition)
      return {
        passed: false,
        message:
          "Good — now add a transition property to .btn, e.g. transition: background-color 200ms ease;",
      };
    return {
      passed: true,
      message: "Challenge complete! Your button uses a variable and transitions smoothly.",
    };
  },
};

const VARS_HTML = `<div class="box">
  <h2>Variable Colors</h2>
  <button>Styled Button</button>
</div>`;

const VARS_CSS = `:root {
  --primary: #6366f1;       /* indigo brand colour */
  --spacing-md: 16px;       /* reusable spacing unit */
}

.box {
  padding: var(--spacing-md);
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  color: var(--primary);
  margin-top: 0;
}

button {
  background: var(--primary);          /* use it */
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}`;

const TRANSITION_HTML = `<button class="btn">Hover for Smoothness</button>`;

const TRANSITION_CSS = `.btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  /* smooth colour swap */
  transition: background-color 300ms ease;   
}

.btn:hover {
  background: #4f46e5;
}`;

const TRANSFORM_HTML = `<div class="card">Hover me to lift</div>
<div class="logo">KOOMPI</div>`;

const TRANSFORM_CSS = `.card, .logo {
  display: inline-block;
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover {
  transform: translateY(-8px);   /* lift effect */
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.logo:hover {
  transform: scale(1.1) rotate(5deg); /* grow and tilt */
  background: #fdf6ec;
}`;

const KEYFRAMES_HTML = `<div class="pulse-badge">New Feature</div>`;

const KEYFRAMES_CSS = `@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}

.pulse-badge {
  display: inline-block;
  padding: 8px 16px;
  background: #6366f1;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  animation: pulse 2s infinite;
}`;

export default function Module09CSSVariablesAnimations() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Changing one colour everywhere shouldn't mean hunting through 47 places in your CSS.
          Variables and animations fix that — and make your interfaces feel alive.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#part-1" className="text-primary hover:underline">→ Part 1: CSS Variables</a></li>
          <li><a href="#part-2" className="text-primary hover:underline">→ Part 2: Transitions</a></li>
          <li><a href="#part-3" className="text-primary hover:underline">→ Part 3: Transforms</a></li>
          <li><a href="#part-4" className="text-primary hover:underline">→ Part 4: Keyframe Animations</a></li>
          <li><a href="#performance-accessibility" className="text-primary hover:underline">→ Performance & Accessibility</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. CSS Variables ───────────────────────────────── */}
      <section id="part-1" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 1 — CSS Custom Properties</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          CSS custom properties (also called <strong className="text-foreground">variables</strong>) let you
          name a value once and reuse it everywhere. Declare them on{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">:root</code> so they're available
          across the whole page:
        </p>
        <CodeExample 
          html={VARS_HTML}
          css={VARS_CSS}
          title="Using Variables"
          height="200px"
        />
      </section>

      {/* ── 3. Transitions ─────────────────────────────────── */}
      <section id="part-2" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 2 — Transitions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A transition tells the browser to animate between two states smoothly instead of snapping.
          The shorthand is:{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
            transition: property duration timing-function
          </code>
        </p>
        <CodeExample 
          html={TRANSITION_HTML}
          css={TRANSITION_CSS}
          title="CSS Transitions"
          height="160px"
        />
      </section>

      {/* ── 4. Transforms ──────────────────────────────────── */}
      <section id="part-3" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 3 — Transforms</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Transforms move, scale, or rotate elements without touching the layout — the browser hands
          them to the GPU, so they're smooth even on complex pages.
        </p>
        <CodeExample 
          html={TRANSFORM_HTML}
          css={TRANSFORM_CSS}
          title="2D Transforms"
          height="200px"
        />
      </section>

      {/* ── 5. Keyframe Animations ─────────────────────────── */}
      <section id="part-4" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Part 4 — Keyframe Animations</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Transitions only work between two states triggered by interaction. For animations that play
          automatically — a fade-in on load, a pulsing badge — use{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">@keyframes</code>.
        </p>
        <CodeExample 
          html={KEYFRAMES_HTML}
          css={KEYFRAMES_CSS}
          title="Keyframe Animations"
          height="180px"
        />
      </section>

      {/* ── 5.5 Performance & Accessibility ────────────────── */}
      <section id="performance-accessibility" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Performance and Accessibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">GPU Acceleration</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Always animate <code>opacity</code> and <code>transform</code>. These are "cheap" for the browser to animate because they don't trigger layout recalculations.
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Respecting Users</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Some users find animations disorienting. Respect their system settings with:
            </p>
            <code className="block p-3 bg-stone-100 rounded text-xs font-mono">
              @media (prefers-reduced-motion: reduce) {"{"} <br />
              &nbsp;&nbsp;* {"{"} animation: none !important; {"}"} <br />
              {"}"}
            </code>
          </div>
        </div>
      </section>

      {/* ── 6. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A card with a variable-driven button is preloaded. Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">--primary</code> in{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">:root</code> — both the heading
            and button update at once. Then adjust the transition duration on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.btn</code> and hover to feel
            the difference.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="420px"
        />
      </section>

      {/* ── 6.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Variables and Animations make CSS more maintainable and interactive:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>CSS Variables:</strong> Store reusable values (like colors or spacing) on <code>:root</code> to keep your code DRY.</li>
            <li><strong>Transitions:</strong> Create smooth state changes (e.g., hover effects) with minimal code.</li>
            <li><strong>Transforms:</strong> Modify an element's position, size, and rotation efficiently using the GPU.</li>
            <li><strong>Keyframe Animations:</strong> Define complex, automatic animations that play independently of user interaction.</li>
            <li><strong>Accessibility:</strong> Always consider <code>prefers-reduced-motion</code> for users who may be sensitive to movement.</li>
          </ul>
        </div>
      </section>

      {/* ── 7. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            The starter gives you a plain button. Declare a CSS variable for its background colour
            and add a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">transition</code> so the
            colour change on hover animates smoothly. Both must be present to pass.
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="340px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 8. Gate ────────────────────────────────────────── */}
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
