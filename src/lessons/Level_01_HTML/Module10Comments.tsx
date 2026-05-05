import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CodeExample } from "../../components/playground/CodeExample";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

// ── Try-it starter ────────────────────────────────────────────────────────────
const EXPLORE_HTML = `<!-- This is a comment. The browser ignores it. -->
<h1>HTML Comments Demo</h1>

<!-- Single-line comment: explains what the next element does -->
<p>Welcome to KOOMPI Academy!</p>

<!--
  Multi-line comment:
  Use this when you need more space to explain your code.
  Everything between the opening <!-- and closing --> is hidden.
-->
<ul>
  <li>HTML</li>
  <!-- <li>This item is hidden from the page</li> -->
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Try uncommenting the hidden item above to see it appear! -->`;

const ANNOTATED_COMMENTS = `<!-- This is a comment. It won't show in the browser. -->
<h1>Visible Heading</h1>

<!-- 
  This is a multi-line comment.
  Still invisible to the user.
-->
<p>Visible paragraph.</p>

<ul>
  <li>Item 1</li>
  <!-- <li>Item 2 (Hidden)</li> -->
  <li>Item 3</li>
</ul>`;

const ANNOTATED_MISTAKES = `<!-- Correct Comment -->
<p>Content</p>

<!-- 
  Multi-line 
  is fine 
-->`;

const ANNOTATED_USAGE = `<!-- ── SECTION DIVIDER ──────────────── -->
<header>
  <h1>KOOMPI Academy</h1>
</header>

<!-- ── MAIN CONTENT ──────────────────── -->
<main>
  <p>Learn to code for free.</p>
</main>

<!-- TODO: Add social links here -->`;

const ANNOTATED_COMMENTED_OUT = `<ul>
  <li>HTML</li>
  <!-- <li>CSS (Temporarily Hidden)</li> -->
  <li>JavaScript</li>
</ul>`;

// ── Challenge starter ─────────────────────────────────────────────────────────
const CHALLENGE_STARTER = `

<h1>KOOMPI is fun</h1>
<p>Add a comment anywhere below this line</p>

`;

// ── Challenge logic ───────────────────────────────────────────────────────────
const challenge = {
  prompt:
    "Add at least one HTML comment anywhere in the code. A comment starts with <!-- and ends with -->.",
  check(htmlCode: string) {
    const hasComment = /<!--[\s\S]*?-->/.test(htmlCode);
    if (!hasComment) {
      return {
        passed: false,
        message:
          'No comment found yet. Add one like this: <!-- your note here -->',
      };
    }
    return { passed: true, message: "Challenge complete! Great job." };
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Module10Comments() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Code is written for humans as much as for machines. HTML comments let
          you leave notes inside your source file — the browser ignores them
          completely, but your future self and your teammates will thank you.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#what-is-a-comment" className="text-primary hover:underline">→ What is a comment?</a></li>
          <li><a href="#comment-syntax" className="text-primary hover:underline">→ Comment syntax</a></li>
          <li><a href="#single-vs-multi" className="text-primary hover:underline">→ Single-line vs Multi-line</a></li>
          <li><a href="#when-to-use" className="text-primary hover:underline">→ When to use comments</a></li>
          <li><a href="#commenting-out" className="text-primary hover:underline">→ Commenting out code</a></li>
          <li><a href="#common-mistakes" className="text-primary hover:underline">→ Common mistakes</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. What is a comment? ────────────────────────────── */}
      <section id="what-is-a-comment" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">What is a comment?</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          An <strong className="text-foreground">HTML comment</strong> is a piece of text inside your HTML file that the
          browser <em>completely ignores</em>. It never appears on the page and has zero
          effect on how the page looks or works.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Comments are purely for <strong className="text-foreground">human readers</strong> — you, your teammates, or
          anyone who looks at the source code later. They are one of the simplest but
          most powerful habits in professional coding.
        </p>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-900 space-y-1">
          <p className="font-semibold">💡 Think of it like a sticky note</p>
          <p>
            Imagine you stuck a yellow sticky note on your code saying "this button opens the menu."
            Comments work exactly like that — visible to you in the editor, invisible to the user in the browser.
          </p>
        </div>
      </section>

      {/* ── 3. Syntax ───────────────────────────────────────── */}
      <section id="comment-syntax" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Comment syntax</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every HTML comment uses the same pattern: it opens with{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"<!--"}</code>{" "}
          and closes with{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"-->"}</code>.
          Everything between those two markers is the comment text.
        </p>
        <CodeExample 
          html={ANNOTATED_COMMENTS}
          css=""
          title="Comment Syntax"
          height="280px"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg border border-border bg-stone-50 px-4 py-3 space-y-1">
            <p className="font-semibold text-foreground font-mono">{"<!--"}</p>
            <p className="text-muted-foreground">Opening marker — starts the comment</p>
          </div>
          <div className="rounded-lg border border-border bg-stone-50 px-4 py-3 space-y-1">
            <p className="font-semibold text-foreground">Your text here</p>
            <p className="text-muted-foreground">The note you want to leave</p>
          </div>
          <div className="rounded-lg border border-border bg-stone-50 px-4 py-3 space-y-1">
            <p className="font-semibold text-foreground font-mono">{"-->"}</p>
            <p className="text-muted-foreground">Closing marker — ends the comment</p>
          </div>
        </div>
      </section>

      {/* ── 4. Single-line vs Multi-line ────────────────────── */}
      <section id="single-vs-multi" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Single-line vs Multi-line</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Comments can span a single line or multiple lines — the syntax is exactly
          the same. Use whichever fits the length of your note.
        </p>
        <CodeExample 
          html={`<!-- Single-line note -->
<h2>Page Title</h2>

<!--
  Multi-line note
  used for longer
  explanations.
-->
<p>Some content here.</p>`}
          css=""
          title="Single vs Multi-line"
          height="240px"
        />
        <p className="text-base text-muted-foreground leading-relaxed">
          The browser treats both exactly the same — it just skips everything between{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"<!--"}</code> and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"-->"}</code>,
          regardless of how many lines are in between.
        </p>
      </section>

      {/* ── 5. When to use comments ─────────────────────────── */}
      <section id="when-to-use" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">When to use comments</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Good comments explain the <em>why</em>, not just the <em>what</em>. Here are the most
          common and useful situations:
        </p>
        <CodeExample 
          html={ANNOTATED_USAGE}
          css=""
          title="Useful Comment Patterns"
          height="320px"
        />
      </section>

      {/* ── 6. Commenting out code ──────────────────────────── */}
      <section id="commenting-out" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Commenting out code</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          One of the most practical uses of comments is <strong className="text-foreground">temporarily hiding HTML</strong> without
          deleting it. This is called "commenting out" code — you wrap existing
          elements in a comment so they disappear from the page, but you can
          easily bring them back later by removing the comment markers.
        </p>
        <CodeExample 
          html={ANNOTATED_COMMENTED_OUT}
          css=""
          title="Commenting Out Code"
          height="180px"
        />
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 px-6 py-4 text-sm text-blue-900 space-y-1">
          <p className="font-semibold">📝 Pro tip</p>
          <p>
            Most code editors let you toggle comments with a keyboard shortcut:{" "}
            <code className="bg-blue-100 px-1.5 py-0.5 rounded">Ctrl + /</code> on Windows/Linux
            or{" "}
            <code className="bg-blue-100 px-1.5 py-0.5 rounded">Cmd + /</code> on Mac.
            Select the lines you want to comment out and press the shortcut — it wraps
            them automatically!
          </p>
        </div>
      </section>

      {/* ── 7. Common mistakes ──────────────────────────────── */}
      <section id="common-mistakes" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Common mistakes to avoid</h2>
        <div className="space-y-4">

          {/* Mistake 1 */}
          <div className="rounded-xl border border-red-200 bg-red-50/40 px-6 py-4 space-y-3">
            <p className="text-sm font-semibold text-red-800">❌ Nesting comments inside each other</p>
            <CodeBlock language="html" title="wrong.html">
              {`<!-- Outer comment <!-- inner comment --> this breaks -->`}
            </CodeBlock>
            <p className="text-sm text-red-700">
              HTML comments cannot be nested. The browser sees the first{" "}
              <code className="bg-red-100 px-1 rounded">{"-->"}</code> and thinks the comment ended
              there, which breaks the rest.
            </p>
          </div>

          {/* Mistake 2 */}
          <div className="rounded-xl border border-red-200 bg-red-50/40 px-6 py-4 space-y-3">
            <p className="text-sm font-semibold text-red-800">❌ Using -- inside a comment</p>
            <CodeBlock language="html" title="wrong.html">
              {`<!-- Step 1 -- Step 2 -- Step 3 -->`}
            </CodeBlock>
            <p className="text-sm text-red-700">
              Double dashes <code className="bg-red-100 px-1 rounded">--</code> inside a comment
              can confuse older browsers. Use a single dash or a different separator instead.
            </p>
          </div>

          {/* Mistake 3 */}
          <div className="rounded-xl border border-red-200 bg-red-50/40 px-6 py-4 space-y-3">
            <p className="text-sm font-semibold text-red-800">❌ Forgetting the closing marker</p>
            <CodeBlock language="html" title="wrong.html">
              {`<!-- This comment is never closed
<p>This whole paragraph disappears too!</p>
<h2>So does this heading</h2>`}
            </CodeBlock>
            <p className="text-sm text-red-700">
              If you forget <code className="bg-red-100 px-1 rounded">{"-->"}</code>, everything
              after the opening <code className="bg-red-100 px-1 rounded">{"<!--"}</code> is treated
              as part of the comment — your content vanishes from the page.
            </p>
          </div>

          {/* Correct version */}
          <div className="rounded-xl border border-green-200 bg-green-50/40 px-6 py-4 space-y-3">
            <p className="text-sm font-semibold text-green-800">✅ Correct</p>
            <CodeExample 
              html={ANNOTATED_MISTAKES}
              css=""
              title="Correct Comment Syntax"
              height="200px"
            />
          </div>
        </div>
      </section>

      {/* ── 8. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            The editor already has several comments. Try <strong>removing</strong> one of the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"<!-- ... -->"}</code>{" "}
            markers to see what happens, or <strong>comment out</strong> one of the visible
            list items to make it disappear from the preview.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="380px"
        />
      </section>

      {/* ── 9. Summary ─────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Here is what we covered about HTML comments:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Comments start with <code>{"<!--"}</code> and end with <code>{"-->"}</code>.
            </li>
            <li>
              The browser <strong>completely ignores</strong> comments — they never appear on the page.
            </li>
            <li>
              They can be <strong>single-line</strong> or span <strong>multiple lines</strong>.
            </li>
            <li>
              Use comments to <strong>explain your code</strong>, add section dividers, leave TODOs, or
              temporarily hide elements.
            </li>
            <li>
              Never nest comments or use <code>--</code> inside a comment.
            </li>
            <li>
              Always close your comment with <code>{"-->"}</code> or the rest of your page disappears.
            </li>
            <li>
              Keyboard shortcut: <code>Ctrl + /</code> (Windows/Linux) or <code>Cmd + /</code> (Mac)
              toggles comments instantly in VS Code.
            </li>
          </ul>
        </div>
      </section>

      {/* ── 10. Challenge ──────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Add at least one HTML comment anywhere in the editor below. The checker will look
            for a valid <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">{"<!-- ... -->"}</code> in your code.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: CHALLENGE_STARTER }}
          height="280px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 11. Gate ───────────────────────────────────────── */}
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
