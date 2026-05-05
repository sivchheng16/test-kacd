import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CodeExample } from "../../components/playground/CodeExample";

const EXPLORE_STARTER = {
  html: `<div class="page">

  <!-- Sticky header that stays at the top while scrolling -->
  <header class="site-header">
    KOOMPI Academy — sticky header
  </header>

  <!-- Normal flow content -->
  <main class="content">
    <p>This paragraph is in the normal document flow.</p>

    <!-- Relative container for the badge -->
    <div class="card">
      <p>Angkor Wat card</p>
      <!-- Absolutely positioned relative to .card -->
      <span class="badge">Popular</span>
    </div>

    <p>Scroll down to see the fixed button stay in place.</p>
    <p style="margin-top:200px">More content here…</p>
  </main>

  <!-- Fixed: stays in the corner no matter how far you scroll -->
  <button class="back-to-top">↑ Top</button>

</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 0; background: #f5f0e8; }

.site-header {
  position: sticky;    /* sticks to top once you scroll past it */
  top: 0;
  background: #c2622d;
  color: white;
  padding: 12px 24px;
  z-index: 10;
}

.content {
  padding: 24px;
}

.card {
  position: relative;  /* makes this the reference for absolute children */
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #d4c8b4;
}

.badge {
  position: absolute;  /* positioned relative to .card */
  top: 12px;
  right: 12px;
  background: #c2622d;
  color: white;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.back-to-top {
  position: fixed;     /* stays in the viewport — ignores scrolling */
  bottom: 24px;
  right: 24px;
  background: #c2622d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  font-size: 1rem;
}`,
};

const CHALLENGE_STARTER = {
  html: `<div class="container">
  <p>Normal paragraph</p>
  <div class="overlay">I am positioned!</div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: sans-serif; padding: 40px; }

.container {
  background: #fdf6ec;
  padding: 40px;
  border: 1px solid #d4c8b4;
  border-radius: 8px;
}

/* Give .overlay an absolute or fixed position
   and set top or bottom */
.overlay {
  background: #c2622d;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;

}`,
};

const challenge = {
  prompt:
    "Write a CSS rule with `position: absolute` or `position: fixed` that also sets `top`, `bottom`, `left`, or `right`.",
  check(_html: string, css: string, _js: string) {
    const hasPosition =
      /position\s*:\s*(absolute|fixed)/i.test(css);
    const hasOffset =
      /\b(top|bottom|left|right)\s*:/i.test(css);
    if (!hasPosition)
      return {
        passed: false,
        message:
          "Set `position: absolute` or `position: fixed` on an element.",
      };
    if (!hasOffset)
      return {
        passed: false,
        message:
          "Good — now add `top`, `bottom`, `left`, or `right` to place it.",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

const ANNOTATED_HTML = `<div class="container">
  <div class="card">
    <h3>Angkor Wat</h3>
    <p>Discover the ancient temples.</p>
    <span class="badge">Popular</span>
  </div>
  <p>Scroll down to see the sticky header...</p>
  <div style="height: 400px;"></div>
  <button class="back-to-top">↑</button>
</div>`;

const ANNOTATED_CSS = `.container {
  padding: 20px;
  background: #fdf6ec;
}

/* Relative — reference for the badge below */
.card {
  position: relative;
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #d4c8b4;
  margin-bottom: 20px;
}

/* Absolute — corner of .card, not the page */
.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #c2622d;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

/* Fixed — same spot in the viewport, always */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #c2622d;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
}`;

export default function Module05LayoutPositioning() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Normal document flow stacks elements top to bottom. Positioning
          lets you break out of that flow — place a badge in a card corner,
          pin a header to the top, or anchor a button in the viewport forever.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#five-position-values" className="text-primary hover:underline">→ Five position values</a></li>
          <li><a href="#z-index-and-stacking" className="text-primary hover:underline">→ Z-Index and Stacking</a></li>
          <li><a href="#annotated-example" className="text-primary hover:underline">→ Annotated example</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="five-position-values" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Five position values</h2>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">static</span>
            <span className="text-muted-foreground ml-3">
              default — element flows normally, ignores{" "}
              <code>top/left/right/bottom</code>
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">relative</span>
            <span className="text-muted-foreground ml-3">
              stays in flow but nudges from its original spot;
              also creates a reference point for{" "}
              <code>absolute</code> children
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">absolute</span>
            <span className="text-muted-foreground ml-3">
              removed from flow, positioned relative to the nearest
              non-static ancestor
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">fixed</span>
            <span className="text-muted-foreground ml-3">
              removed from flow, positioned relative to the
              viewport — scrolling doesn't move it
            </span>
          </div>
          <div className="px-6 py-3">
            <span className="font-mono text-[#c2622d]">sticky</span>
            <span className="text-muted-foreground ml-3">
              behaves like{" "}
              <code>relative</code> until you scroll past a threshold,
              then acts like <code>fixed</code>
            </span>
          </div>
        </div>
      </section>

      {/* ── 2.5 Z-Index & Stacking ─────────────────────────── */}
      <section id="z-index-and-stacking" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Z-Index and Stacking</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          When elements are positioned, they can overlap. The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">z-index</code> property controls which element appears on top. Think of it as the "3D depth" of the page.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">The Score System</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A higher <code>z-index</code> value stacks on top of a lower one. Negative numbers are allowed.
            </p>
            <code className="block p-3 bg-stone-100 rounded text-xs font-mono">
              .header {"{"} z-index: 100; {"}"} <br />
              .modal {"{"} z-index: 1000; {"}"}
            </code>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Perfect Centering</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To center an absolute element perfectly:
            </p>
            <code className="block p-3 bg-stone-100 rounded text-xs font-mono">
              top: 50%; <br />
              left: 50%; <br />
              transform: translate(-50%, -50%);
            </code>
          </div>
        </div>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="annotated-example" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Three position values on one page: sticky header, absolute badge,
          fixed button.
        </p>
        <CodeExample 
          html={ANNOTATED_HTML}
          css={ANNOTATED_CSS}
          title="Positioning Types"
          height="320px"
        />
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A live demo shows all four position types. Scroll the preview to
            see sticky and fixed in action. Try changing{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .badge
            </code>{" "}
            from{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              absolute
            </code>{" "}
            to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              fixed
            </code>{" "}
            and see how its reference point changes.
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
          <p>Positioning allows you to move elements outside the normal flow:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Relative:</strong> Use for nudging elements or setting a reference for absolute children.</li>
            <li><strong>Absolute:</strong> Positioned relative to the nearest <code>relative</code> or <code>absolute</code> ancestor.</li>
            <li><strong>Fixed:</strong> Positioned relative to the browser window. It doesn't move when you scroll.</li>
            <li><strong>Sticky:</strong> Stays in view once you scroll to it, then moves with the page again at the bottom of its container.</li>
            <li><strong>Z-Index:</strong> Controls the stacking order. Elements with a higher <code>z-index</code> appear on top.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Give{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              .overlay
            </code>{" "}
            either{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              position: absolute
            </code>{" "}
            or{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              position: fixed
            </code>
            , and set at least one of{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              top
            </code>
            ,{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              bottom
            </code>
            ,{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              left
            </code>
            , or{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              right
            </code>
            .
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={CHALLENGE_STARTER}
          height="360px"
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
