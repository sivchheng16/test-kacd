import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<!-- Grouping elements with a div -->
<div class="user-card" id="user-1">
  <h3 class="username">Sokha</h3>
  <p class="role">Developer</p>
  <p class="status">Status: <span class="active">Online</span></p>
</div>

<div class="user-card" id="user-2">
  <h3 class="username">Dara</h3>
  <p class="role">Designer</p>
  <p class="status">Status: <span class="offline">Offline</span></p>
</div>`;

const CHALLENGE_STARTER = `<!-- Wrap the heading and paragraph inside a div -->
<!-- Give the div a class of "container" and an id of "main-box" -->

<h2>Welcome</h2>
<p>This is my website.</p>
`;

function parseHtml(raw: string): Document {
  return new DOMParser().parseFromString(raw, "text/html");
}

function buildDoc(body: string): string {
  return `<!DOCTYPE html><html><body>${body}</body></html>`;
}

const challenge = {
  prompt:
    'Wrap the <h2> and <p> elements inside a <div>. Give the <div> a class of "container" and an id of "main-box".',
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseHtml(buildDoc(htmlCode));

    const div = doc.querySelector("div");
    if (!div) return { passed: false, message: "No <div> found. Wrap the content in a <div>." };

    if (!div.classList.contains("container")) {
      return { passed: false, message: 'The <div> must have a class of "container".' };
    }

    if (div.id !== "main-box") {
      return { passed: false, message: 'The <div> must have an id of "main-box".' };
    }

    const h2 = div.querySelector("h2");
    const p = div.querySelector("p");

    if (!h2 || !p) {
      return { passed: false, message: "Make sure both the <h2> and <p> are inside the <div>." };
    }

    return { passed: true, message: "Challenge complete! You have successfully grouped and identified elements." };
  },
};

export default function Module09DivIdClass() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">
      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          HTML tags like headings and paragraphs give meaning to your text. But what happens when you need to group elements together, or add extra information and behavior to an element? That is where <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">div</code>, <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">class</code>, <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code>, and other global attributes come in.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#grouping-with-div-and-span" className="text-primary hover:underline">→ Grouping with div and span</a></li>
          <li><a href="#identifying-with-id-and-class" className="text-primary hover:underline">→ Identifying with id and class</a></li>
          <li><a href="#global-attributes" className="text-primary hover:underline">→ Global Attributes</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept: Div and Span ───────────────────────── */}
      <section id="grouping-with-div-and-span" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Grouping with div and span</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;div&gt;</code> (division) and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;span&gt;</code> tags are generic containers. They don't have any semantic meaning on their own—they just group things together.
        </p>
        <ul className="space-y-3 text-sm text-muted-foreground list-disc list-inside">
          <li>
            <code className="text-primary font-mono shrink-0">&lt;div&gt;</code> is a <strong>block-level</strong> container. It is used to group larger chunks of content, like an entire article card or a form section.
          </li>
          <li>
            <code className="text-primary font-mono shrink-0">&lt;span&gt;</code> is an <strong>inline</strong> container. It is used to wrap small pieces of text inside a paragraph or heading without breaking the line.
          </li>
        </ul>
      </section>

      {/* ── 3. Concept: Id and Class ───────────────────────── */}
      <section id="identifying-with-id-and-class" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Identifying with id and class</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Once you have grouped elements, you often need a way to identify them so you can style them with CSS or add behavior with JavaScript. You do this using the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">class</code> attributes.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2 text-sm font-mono text-foreground leading-relaxed">
          <div><span className="text-[#c2622d]">id="..."</span> — Must be completely <strong>unique</strong> per page. Used for specific, one-of-a-kind elements (like a main navigation bar).</div>
          <div><span className="text-[#c2622d]">class="..."</span> — Can be <strong>reused</strong> on multiple elements. Used for elements that share the same styling (like multiple buttons or cards).</div>
        </div>
        <CodeBlock language="html" title="attributes.html">
          {`<div id="header">
  <h1 class="title">My Website</h1>
  <button class="btn primary">Login</button>
  <button class="btn secondary">Sign Up</button>
  </div>`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Notice how the buttons share the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">btn</code> class, but also have their own specific classes (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">primary</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">secondary</code>). You can put multiple classes in the same attribute by separating them with a space!
        </p>
      </section>

      {/* ── 3.5 Concept: Global Attributes ─────────────────── */}
      <section id="global-attributes" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Global vs Specific Attributes</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          While <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">class</code> are the most common, there are many other attributes in HTML. They generally fall into two categories: <strong>Global Attributes</strong> (can be used on any tag) and <strong>Element-Specific Attributes</strong> (only work on certain tags).
        </p>

        <h3 className="text-xl font-serif text-foreground mt-8 mb-4">Common Element-Specific Attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">src="..."</code>
            <p className="text-sm text-muted-foreground">Used on <code className="text-xs bg-stone-200 px-1 rounded">&lt;img&gt;</code>, <code className="text-xs bg-stone-200 px-1 rounded">&lt;video&gt;</code>, and others to specify the source URL of the media.</p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">href="..."</code>
            <p className="text-sm text-muted-foreground">Used on <code className="text-xs bg-stone-200 px-1 rounded">&lt;a&gt;</code> (anchor tags) to specify the destination URL of a link.</p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">alt="..."</code>
            <p className="text-sm text-muted-foreground">Used on <code className="text-xs bg-stone-200 px-1 rounded">&lt;img&gt;</code> to provide alternative text for screen readers or if the image fails to load.</p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">type="..."</code>
            <p className="text-sm text-muted-foreground">Used on <code className="text-xs bg-stone-200 px-1 rounded">&lt;input&gt;</code> or <code className="text-xs bg-stone-200 px-1 rounded">&lt;button&gt;</code> to define what kind of input it is (e.g., text, password, submit).</p>
          </div>
        </div>

        <h3 className="text-xl font-serif text-foreground mt-8 mb-4">Common Global Attributes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">title="..."</code>
            <p className="text-sm text-muted-foreground">Creates a tooltip that appears when a user hovers over the element with their mouse.</p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">style="..."</code>
            <p className="text-sm text-muted-foreground">Allows you to apply inline CSS styles directly to that specific element.</p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">hidden</code>
            <p className="text-sm text-muted-foreground">A boolean attribute (needs no value). Hides the element entirely from the page.</p>
          </div>
          <div className="rounded-xl bg-stone-50 border border-border p-5 space-y-2">
            <code className="text-[#c2622d] font-mono font-bold">data-*="..."</code>
            <p className="text-sm text-muted-foreground">Custom data attributes. You can replace the <code className="text-xs bg-stone-200 px-1 rounded">*</code> with any name to store custom data for JavaScript.</p>
          </div>
        </div>
        <CodeBlock language="html" title="global-attributes.html">
          {`<p title="Hover tooltip text!">Hover over me!</p>
<div style="background: black; color: white;">Styled div</div>
<p hidden>You cannot see me!</p>
<button data-user-id="42" data-role="admin">Click me</button>`}
        </CodeBlock>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            See how the classes and IDs are applied in the code below. Try changing the class names or wrapping the entire code in a single <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;div id="container"&gt;</code>.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="320px"
        />
      </section>

      {/* ── 4.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Here is what you need to remember about grouping and identifiers:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use <code>&lt;div&gt;</code> to group block-level content.</li>
            <li>Use <code>&lt;span&gt;</code> to wrap inline text without breaking the line.</li>
            <li>The <code>id</code> attribute must be <strong>unique</strong> across the entire page.</li>
            <li>The <code>class</code> attribute is <strong>reusable</strong> across many elements.</li>
            <li>You can assign multiple classes to an element by separating them with spaces.</li>
            <li><strong>Specific attributes</strong> like <code>src</code>, <code>href</code>, and <code>alt</code> only work on certain tags (like images and links).</li>
            <li><strong>Global attributes</strong> like <code>title</code>, <code>style</code>, and <code>hidden</code> can be added to any tag for extra behavior.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Wrap the heading and paragraph in a <code>&lt;div&gt;</code>, and give it both a <code>class</code> and an <code>id</code> as instructed.
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
