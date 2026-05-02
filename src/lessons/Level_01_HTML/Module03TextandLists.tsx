import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

const EXPLORE_HTML = `<h1>Learning HTML</h1>
<h2>Why it matters</h2>
<p>
  HTML gives your content <strong>meaning</strong>, not just looks.<br>
  A browser, a screen reader, and a search engine all read
  the same file &mdash; good markup works for all three.
</p>

<hr>

<h2>Things I already know</h2>
<ul>
  <li>How to open a text editor</li>
  <li>What a tag looks like</li>
  <li>The basic page skeleton</li>
</ul>

<h2>Steps to build a page</h2>
<ol>
  <li>Create the HTML file</li>
  <li>Add the document structure</li>
  <li>Write the content</li>
  <li>Open it in a browser</li>
</ol>

<hr>

<h2>Terminology</h2>
<dl>
  <dt>Tag</dt>
  <dd>The angle brackets and the text inside them, like <code>&lt;p&gt;</code>.</dd>
  <dt>Element</dt>
  <dd>The opening tag, the closing tag, and everything in between.</dd>
</dl>

<blockquote>
  <p>"The best time to learn HTML was <del>yesterday</del> <ins>today</ins>. The second best time is <mark>now</mark>."</p>
</blockquote>`;

const CHALLENGE_STARTER = `<!-- Create an ordered list of exactly 3 things you want to learn.
     Use <ol> for the list and <li> for each item. -->
`;

function parseHtml(raw: string): Document {
  return new DOMParser().parseFromString(
    `<!DOCTYPE html><html><body>${raw}</body></html>`,
    "text/html"
  );
}

const challenge = {
  prompt:
    "Create an <ol> (ordered list) with exactly 3 <li> items. Each item should be something you want to learn.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseHtml(htmlCode);

    const ol = doc.querySelector("ol");
    if (!ol)
      return { passed: false, message: "No <ol> found yet. Ordered lists start with the <ol> tag." };

    const items = ol.querySelectorAll(":scope > li");
    if (items.length === 0)
      return { passed: false, message: "Your <ol> needs <li> items inside it." };

    if (items.length < 3)
      return {
        passed: false,
        message: `You have ${items.length} item${items.length === 1 ? "" : "s"} — add ${3 - items.length} more to reach exactly 3.`,
      };

    if (items.length > 3)
      return {
        passed: false,
        message: `You have ${items.length} items — the challenge asks for exactly 3. Remove ${items.length - 3}.`,
      };

    for (let i = 0; i < items.length; i++) {
      if (!items[i].textContent?.trim()) {
        return { passed: false, message: `Item ${i + 1} is empty — write something you want to learn.` };
      }
    }

    return { passed: true, message: "Challenge complete! Three things to learn, ready to go." };
  },
};

export default function Module03TextandLists() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Text is 90% of the web — and the difference between a heading and a paragraph is not just size,
          it is meaning that search engines, screen readers, and your future self will depend on.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#hierarchy-emphasis-and-order" className="text-primary hover:underline">→ Hierarchy, emphasis, and order</a></li>
          <li><a href="#advanced-formatting-and-breaks" className="text-primary hover:underline">→ Advanced formatting and breaks</a></li>
          <li><a href="#text-and-lists-in-action" className="text-primary hover:underline">→ Text and lists in action</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="hierarchy-emphasis-and-order" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Hierarchy, emphasis, and order</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          HTML gives you six heading levels (
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h1</code> through{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h6</code>), a paragraph tag (
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">p</code>), and two emphasis tags
          that look the same but mean different things:{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;strong&gt;</code> marks
          content as <strong>important</strong>, while{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;em&gt;</code> marks it as{" "}
          <em>stressed</em>. Screen readers change their tone for both.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          For grouped content, you choose between two list types. An{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ul&gt;</code> (unordered
          list) uses bullet points — use it when sequence does not matter, like a list of skills. An{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ol&gt;</code> (ordered list)
          uses numbers — use it when sequence matters, like steps in a process. Every item in both goes
          inside an <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;li&gt;</code> tag.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2 text-sm font-mono text-foreground leading-relaxed">
          <div><span className="text-[#c2622d]">h1–h6</span> — headings, largest to smallest (only one h1 per page)</div>
          <div><span className="text-[#c2622d]">p</span> — paragraph of prose text</div>
          <div><span className="text-[#c2622d]">strong</span> — important text (renders bold)</div>
          <div><span className="text-[#c2622d]">em</span> — stressed text (renders italic)</div>
          <div><span className="text-[#c2622d]">blockquote</span> — a quotation from another source</div>
          <div><span className="text-[#c2622d]">ul / ol / li</span> — bullet list / numbered list / list item</div>
        </div>
      </section>

      {/* ── 2.5 Advanced Formatting ────────────────────────── */}
      <section id="advanced-formatting-and-breaks" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Advanced formatting and breaks</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Sometimes you need to add specific visual or semantic meaning to your text that goes beyond just paragraphs and basic lists.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong>Breaks:</strong> Use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;br&gt;</code> to force a line break within a paragraph without starting a new one (useful for poetry or addresses). Use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;hr&gt;</code> to create a horizontal rule, which visually and semantically separates different topics. Both are "empty tags" and do not have a closing tag.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong>Inline Edits & Highlights:</strong> To show that text has been deleted, use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;del&gt;</code> (strikethrough). For newly added text, use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ins&gt;</code> (underlined). If you want to highlight text for reference, use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;mark&gt;</code>.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong>Description Lists:</strong> When you have terms and definitions, like a glossary, use a description list (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;dl&gt;</code>). Inside it, use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;dt&gt;</code> for the term and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;dd&gt;</code> for its description.
        </p>
        
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2 text-sm font-mono text-foreground leading-relaxed">
          <div><span className="text-[#c2622d]">br</span> — line break (no closing tag)</div>
          <div><span className="text-[#c2622d]">hr</span> — thematic break / horizontal line (no closing tag)</div>
          <div><span className="text-[#c2622d]">del / ins</span> — deleted text / inserted text</div>
          <div><span className="text-[#c2622d]">mark</span> — highlighted text</div>
          <div><span className="text-[#c2622d]">dl / dt / dd</span> — description list / term / description</div>
        </div>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="text-and-lists-in-action" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Text and lists in action</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Here is a short article that uses every element from this lesson. Read the comments — each one
          explains the choice.
        </p>

        <CodeBlock language="html" title="article.html">
          {`<h1>Getting Started with Linux</h1>    <!-- one h1, the page title -->

<p>
  Linux is <strong>free</strong>,       <!-- strong = important fact -->
  <strong>open source</strong>, and<br> <!-- br = manual line break -->
  used on most of the world's servers.
</p>

<hr>                                    <!-- hr = thematic break -->

<h2>Why developers choose it</h2>       <!-- h2 starts a new section -->

<ul>                                    <!-- order doesn't matter here -->
  <li>Full control over the system</li>
  <li>No <del>license</del> <ins>licence</ins> fees</li> <!-- spelling edit -->
  <li>Huge community and documentation</li>
</ul>

<h2>How to install it</h2>

<ol>                                    <!-- order matters: steps -->
  <li>Download an ISO image</li>
  <li>Write it to a USB drive</li>
  <li>Boot from the USB</li>
  <li>Follow the installer</li>
</ol>

<h2>Core Concepts</h2>
<dl>                                    <!-- description list -->
  <dt>Kernel</dt>                       <!-- term -->
  <dd>The core of the OS that talks to hardware.</dd> <!-- description -->
  <dt>Distribution (Distro)</dt>
  <dd>A <mark>specific version</mark> of Linux like Ubuntu or KOOMPI.</dd>
</dl>

<h2>A word from Linus Torvalds</h2>

<blockquote>
  <p>
    "Software is like sex: it's better when it's <em>free</em>."
  </p>                                  <!-- em = verbal stress -->
</blockquote>`}</CodeBlock>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">ul</span>
            items where swapping the order would not change the meaning
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">ol</span>
            steps, rankings, or any sequence where position carries meaning
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">strong vs b</span>
            use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">strong</code> — it has semantic weight; <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">b</code> is purely visual
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono shrink-0">em vs i</span>
            same rule — <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">em</code> means stress; <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">i</code> is just italic styling
          </li>
        </ul>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A page is already built below. Try wrapping a word in{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;strong&gt;</code>, changing the
            heading levels, or converting the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ul&gt;</code> to an{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ol&gt;</code> and back.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="380px"
        />
      </section>

      {/* ── 4.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Here is what you learned about structuring text in HTML:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use headings (<code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>) to create a logical outline.</li>
            <li>Use <code>&lt;p&gt;</code> for standard paragraphs of text.</li>
            <li>Use <code>&lt;strong&gt;</code> for importance and <code>&lt;em&gt;</code> for stress emphasis.</li>
            <li>Use <code>&lt;ul&gt;</code> for unordered (bulleted) lists and <code>&lt;ol&gt;</code> for ordered (numbered) lists, containing <code>&lt;li&gt;</code> items.</li>
            <li>Use advanced tags like <code>&lt;br&gt;</code> for line breaks, <code>&lt;hr&gt;</code> for thematic breaks, and <code>&lt;blockquote&gt;</code> for quotes.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Create an ordered list — <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;ol&gt;</code> —
            with <strong className="text-foreground">exactly 3</strong>{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;li&gt;</code> items about
            things you want to learn. The check counts your items and tells you if something is off.
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
