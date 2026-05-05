import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CodeExample } from "../../components/playground/CodeExample";

const EXPLORE_STARTER = {
  html: `<h1>Siem Reap Travel Guide</h1>
<p class="lead">Discover temples, food, and sunsets.</p>
<p>Sunrise at Angkor Wat starts around 5:30 AM.
   Bring insect repellent and a scarf.</p>
<p>The night market opens at 5 PM and runs until midnight.</p>`,
  css: `/* Import a Google Font */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap');

body {
  font-family: 'Lora', Georgia, serif;
  font-size: 1rem;
  line-height: 1.75;
  color: #2d2d2d;
  background-color: hsl(36, 60%, 97%);
  padding: 32px;
}

h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: hsl(20, 65%, 38%);   /* deep terracotta */
  margin-bottom: 8px;
}

.lead {
  font-size: 1.2rem;
  font-weight: 400;
  color: rgb(90, 70, 50);
  font-style: italic;
}`,
};

const CHALLENGE_STARTER = {
  html: `<body>
  <h1>Cambodia</h1>
  <p>A beautiful country in Southeast Asia.</p>
</body>`,
  css: `/* Set font-family, font-size (at least 18px or 1.1rem),
   and line-height on body */
body {

}`,
};

const challenge = {
  prompt:
    "Set `font-family`, `font-size` (at least 18px or 1.1rem), and `line-height` on `body`.",
  check(_html: string, css: string, _js: string) {
    const hasFF = /body\s*\{[^}]*font-family\s*:/i.test(css);
    const hasFS = /body\s*\{[^}]*font-size\s*:/i.test(css);
    const hasLH = /body\s*\{[^}]*line-height\s*:/i.test(css);
    if (!hasFF)
      return {
        passed: false,
        message: "Add `font-family` to your body rule.",
      };
    if (!hasFS)
      return {
        passed: false,
        message: "Good — now add `font-size` (try 18px or 1.125rem).",
      };
    if (!hasLH)
      return {
        passed: false,
        message: "Almost there — add `line-height` (1.6 is a comfortable default).",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

const ANNOTATED_HTML = `<h1>Siem Reap Travel Guide</h1>
<p class="intro">Discover temples, food, and sunsets.</p>
<p>Sunrise at Angkor Wat starts around 5:30 AM.
   Bring insect repellent and a scarf.</p>
<p>The night market opens at 5 PM and runs until midnight.</p>`;

const ANNOTATED_CSS = `@import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');

body {
  font-family: 'Lora', Georgia, serif;  /* font stack with fallbacks */
  font-size: 1.05rem;                   /* slightly larger than browser default */
  line-height: 1.75;                    /* roomy — great for long articles */
  color: #2d2d2d;
  background-color: hsl(36, 60%, 97%); /* warm near-white */
  padding: 32px;
}

h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: hsl(20, 65%, 38%);            /* adjust lightness to darken/lighten */
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0;
}

p.intro {
  font-style: italic;
  color: rgb(90, 70, 50);              /* warm brown for the lead paragraph */
  text-align: center;
}`;

export default function Module03ColorsTypography() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Typography is the invisible hand that guides a reader through your
          page. Get it right and nobody notices. Get it wrong and nobody
          stays long enough to read what you wrote.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#colors-and-type-properties" className="text-primary hover:underline">→ Colors and type properties</a></li>
          <li><a href="#alignment-and-decoration" className="text-primary hover:underline">→ Alignment and Decoration</a></li>
          <li><a href="#annotated-example" className="text-primary hover:underline">→ Annotated example</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="colors-and-type-properties" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Colors and type properties</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          CSS accepts colors in three formats. All three are valid — pick
          whichever is easiest to read in context:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm font-mono">
          <div className="px-6 py-3 flex gap-4 items-center">
            <code className="text-[#c2622d]">#c2622d</code>
            <span className="text-muted-foreground">hex — compact, common in design tools</span>
          </div>
          <div className="px-6 py-3 flex gap-4 items-center">
            <code className="text-[#c2622d]">rgb(194, 98, 45)</code>
            <span className="text-muted-foreground">RGB — red, green, blue from 0–255</span>
          </div>
          <div className="px-6 py-3 flex gap-4 items-center">
            <code className="text-[#c2622d]">hsl(20, 65%, 38%)</code>
            <span className="text-muted-foreground">HSL — hue, saturation, lightness — easiest to adjust</span>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          The key typography properties you will use on every project:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border divide-y divide-border text-sm">
          <div className="px-6 py-3 font-mono">
            <span className="text-[#c2622d]">font-family</span>
            <span className="text-muted-foreground ml-3">
              which typeface to use —{" "}
              <code>Georgia, serif</code> or a Google Font name
            </span>
          </div>
          <div className="px-6 py-3 font-mono">
            <span className="text-[#c2622d]">font-size</span>
            <span className="text-muted-foreground ml-3">
              <code>px</code> is absolute;{" "}
              <code>rem</code> scales with the user's browser preference
            </span>
          </div>
          <div className="px-6 py-3 font-mono">
            <span className="text-[#c2622d]">font-weight</span>
            <span className="text-muted-foreground ml-3">
              <code>400</code> = normal, <code>700</code> = bold
            </span>
          </div>
          <div className="px-6 py-3 font-mono">
            <span className="text-[#c2622d]">line-height</span>
            <span className="text-muted-foreground ml-3">
              unitless like <code>1.6</code> — space between lines, scales with font size
            </span>
          </div>
        </div>
      </section>

      {/* ── 2.5 Alignment & Decoration ─────────────────────── */}
      <section id="alignment-and-decoration" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Alignment and Decoration</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Beyond choosing a font, you need to control how text sits on the page and how it is decorated.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Text Alignment</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li><span className="text-[#c2622d]">text-align: left;</span> (default)</li>
              <li><span className="text-[#c2622d]">text-align: center;</span></li>
              <li><span className="text-[#c2622d]">text-align: right;</span></li>
              <li><span className="text-[#c2622d]">text-align: justify;</span></li>
            </ul>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Decoration & Case</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li><span className="text-[#c2622d]">text-decoration: underline;</span></li>
              <li><span className="text-[#c2622d]">text-decoration: none;</span> (remove link underlines)</li>
              <li><span className="text-[#c2622d]">text-transform: uppercase;</span></li>
              <li><span className="text-[#c2622d]">letter-spacing: 1px;</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="annotated-example" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Annotated example</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A travel article styled with Google Fonts and HSL colors.
        </p>
        <CodeExample 
          html={ANNOTATED_HTML}
          css={ANNOTATED_CSS}
          title="Typography & Color"
          height="320px"
        />
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A Siem Reap travel guide is preloaded with a Google Font and HSL
            colors. Try changing the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              hsl()
            </code>{" "}
            lightness on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              h1
            </code>
            , bumping{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              line-height
            </code>{" "}
            to 2.0, or swapping the font to{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              sans-serif
            </code>
            .
          </p>
        </div>
        <CodePlayground
          mode="web"
          starter={EXPLORE_STARTER}
          height="420px"
        />
      </section>

      {/* ── 4.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>You've learned how to bring life to your pages through color and type:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Color Formats:</strong> Use Hex, RGB, or HSL. HSL is often the most intuitive for making quick adjustments.</li>
            <li><strong>Font Stacks:</strong> Always provide fallbacks (like <code>serif</code> or <code>sans-serif</code>) in case your primary font fails to load.</li>
            <li><strong>Relative Units:</strong> Use <code>rem</code> for font sizes to ensure they scale correctly with browser settings.</li>
            <li><strong>Readability:</strong> A <code>line-height</code> between 1.5 and 1.8 is usually ideal for long-form text.</li>
            <li><strong>Alignment & Decoration:</strong> Use <code>text-align</code> for layout and <code>text-decoration</code> or <code>text-transform</code> for stylistic touches.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Set three properties on{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              body
            </code>
            :{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              font-family
            </code>
            ,{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              font-size
            </code>{" "}
            (at least 18px or 1.1rem), and{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">
              line-height
            </code>
            . Any values that satisfy those properties will pass.
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
