import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<h1>Welcome to KOOMPI Academy</h1>
<p>HTML is the skeleton of every webpage.</p>
<p>Try changing this text or adding new tags below.</p>`;

const CHALLENGE_STARTER = `<!-- Write your HTML here -->
<h1>My Page</h1>
`;

function parseHtml(raw: string): Document {
  return new DOMParser().parseFromString(raw, "text/html");
}

function buildDoc(body: string): string {
  return `<!DOCTYPE html><html><body>${body}</body></html>`;
}

const challenge = {
  prompt:
    'Add an <h2> element with the text "About Me" and a <p> element below it with at least one sentence about yourself.',
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseHtml(buildDoc(htmlCode));
    const h2 = doc.querySelector("h2");
    const p = doc.querySelector("p");
    if (!h2) return { passed: false, message: "No <h2> found yet. Add one with the text \"About Me\"." };
    if (!h2.textContent?.toLowerCase().includes("about me"))
      return { passed: false, message: `Your <h2> says "${h2.textContent}" — it should say "About Me".` };
    if (!p || !p.textContent?.trim())
      return { passed: false, message: "Add a <p> element with some text after your <h2>." };
    return { passed: true, message: "Challenge complete! Your HTML is structurally correct." };
  },
};

export default function Module01GettingStarted() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Every website you have ever visited — from Google to your favourite news site — started as plain text with angle brackets around it.
          That text is HTML, and in the next few minutes you will write your first working webpage.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#what-html-actually-is" className="text-primary hover:underline">→ What HTML actually is</a></li>
          <li><a href="#a-complete-page-annotated" className="text-primary hover:underline">→ A complete page, annotated</a></li>
          <li><a href="#the-html-tag-cheat-sheet" className="text-primary hover:underline">→ The HTML Tag Cheat Sheet</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="what-html-actually-is" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What HTML actually is</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          HTML stands for <strong className="text-foreground">HyperText Markup Language</strong>. It describes the
          <em> structure</em> of a webpage — what is a heading, what is a paragraph, what is an image. Browsers read it
          and decide how to display each piece.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The unit of HTML is a <strong className="text-foreground">tag</strong>: a keyword inside angle brackets <code>&lt;tag&gt;</code>.
          Most tags come in pairs — an opening tag and a closing tag with a forward slash <code>&lt;/tag&gt;</code>.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 font-mono text-sm text-foreground leading-loose">
          <span className="text-[#c2622d]">&lt;p&gt;</span>
          This is a paragraph.
          <span className="text-[#c2622d]">&lt;/p&gt;</span>
          <br />
          <span className="text-[#c2622d]">&lt;h1&gt;</span>
          This is the biggest heading.
          <span className="text-[#c2622d]">&lt;/h1&gt;</span>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          HTML is not a programming language — there is no logic, no calculations, no decisions. It is pure description.
          That is why it is the right place to start.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="a-complete-page-annotated" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">A complete page, annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every HTML page shares the same skeleton. Here is the minimum:
        </p>
        <CodeBlock language="html" title="index.html">
          {`<!DOCTYPE html>          <!-- tells the browser: "this is HTML5" -->
<html lang="en">         <!-- root element, lang sets the language -->
  <head>                 <!-- invisible metadata -->
    <meta charset="UTF-8">
    <title>My Page</title>  <!-- appears in the browser tab -->
  </head>
  <body>                 <!-- everything visible goes here -->
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>`}
        </CodeBlock>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">h1–h6</span> headings, h1 is the largest</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">p</span> paragraph of text</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">head</span> invisible to the user, metadata only</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">body</span> everything the user sees lives here</li>
        </ul>
      </section>

      {/* ── 3.5 Tag Glossary ───────────────────────────────── */}
      <section id="the-html-tag-cheat-sheet" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The HTML Tag Cheat Sheet</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Here is a quick look at the most common tags you will learn in this course. You do not need to memorize them all now! Bookmark this page and use it as your personal dictionary.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Document Structure */}
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Document Structure</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;html&gt;</code><span>The root element that wraps everything.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;head&gt;</code><span>Invisible metadata (title, scripts, styles).</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;body&gt;</code><span>The visible content of the page.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;header&gt;</code><span>Top section, usually containing site navigation.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;main&gt;</code><span>The primary content of the page.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;footer&gt;</code><span>Bottom section, copyright and links.</span></li>
            </ul>
          </div>

          {/* Text & Lists */}
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Text & Lists</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;h1&gt;</code><span>Headings. h1 is largest, h6 is smallest.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;p&gt;</code><span>A paragraph of standard text.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;strong&gt;</code><span>Important text (usually bold).</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;em&gt;</code><span>Emphasized text (usually italicized).</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;ul&gt; / &lt;ol&gt;</code><span>Unordered (bulleted) / Ordered (numbered) lists.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;li&gt;</code><span>A list item inside a ul or ol.</span></li>
            </ul>
          </div>

          {/* Links & Media */}
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Links & Media</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;a&gt;</code><span>Anchor link to other pages or URLs.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;img&gt;</code><span>Embeds an image (requires src attribute).</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;video&gt;</code><span>Embeds a video player.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;audio&gt;</code><span>Embeds an audio player.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;figure&gt;</code><span>A container for media and its caption.</span></li>
            </ul>
          </div>

          {/* Forms & Tables */}
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Forms & Tables</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;form&gt;</code><span>A container for user input fields.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;input&gt;</code><span>A field for the user to type or select data.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;button&gt;</code><span>A clickable button.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;table&gt;</code><span>A container for rows and columns of data.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;tr&gt;</code><span>A table row.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;td&gt;</code><span>A table data cell inside a row.</span></li>
            </ul>
          </div>

          {/* Grouping & Attributes */}
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-3">
            <h3 className="text-lg font-serif text-foreground">Grouping & Attributes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;div&gt;</code><span>A generic container for block-level content.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">&lt;span&gt;</code><span>A generic container for inline text.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">class="..."</code><span>Attribute to group elements for styling.</span></li>
              <li className="flex gap-2 items-start"><code className="text-[#c2622d] font-mono bg-stone-100 px-1.5 py-0.5 rounded shrink-0">id="..."</code><span>Attribute to uniquely identify an element.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            The editor below is live — edit the HTML and the preview updates instantly. Change the text, add another{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;p&gt;</code>, try{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;h2&gt;</code> or{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;strong&gt;</code>.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="280px"
        />
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            The playground below starts empty. Write the HTML to pass the check — the preview and the result bar
            update as you type.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: CHALLENGE_STARTER }}
          height="300px"
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
                Click <strong>Complete &amp; Next</strong> below to move on to the next lesson.
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
