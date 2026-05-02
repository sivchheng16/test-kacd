import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<h1>KOOMPI</h1>

<nav>
  <a href="https://koompi.com">Home</a>
  <a href="https://koompi.com/products">Products</a>
  <a href="https://koompi.com/about">About Us</a>
</nav>

<p>
  Visit <a href="https://koompi.com" target="_blank">koompi.com</a>
  to see our latest laptops.
</p>

<h2 id="contact">Contact</h2>
<p>
  <a href="mailto:info@koompi.com">Email us</a> or
  <a href="tel:+85523888555">call +855 23 888 555</a>.
</p>

<p><a href="#contact">Jump to Contact section</a></p>`;

const CHALLENGE_STARTER = `<!-- Build a simple site navigation.
     Add a <nav> element with at least 3 links inside it. -->
`;

function parseDoc(body: string): Document {
  return new DOMParser().parseFromString(
    `<!DOCTYPE html><html><body>${body}</body></html>`,
    "text/html"
  );
}

const challenge = {
  prompt:
    "Create a <nav> element that contains at least 3 <a> links — they can go anywhere you like.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseDoc(htmlCode);
    const nav = doc.querySelector("nav");
    if (!nav)
      return {
        passed: false,
        message: "No <nav> element found. Wrap your links inside a <nav>.",
      };
    const links = nav.querySelectorAll("a");
    if (links.length < 3)
      return {
        passed: false,
        message: `Found ${links.length} link${links.length === 1 ? "" : "s"} inside <nav>. Add at least 3 <a> tags.`,
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module04LinksNavigation() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          The web is called a web because pages link to each other.
          Without <code className="text-lg bg-stone-100 px-1.5 py-0.5 rounded font-mono">&lt;a&gt;</code>, every
          page would be an island — and users would have no way to move around your site.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#the-anchor-element" className="text-primary hover:underline">→ The anchor element</a></li>
          <li><a href="#special-links" className="text-primary hover:underline">→ Special Links (Email & Phone)</a></li>
          <li><a href="#links-in-practice" className="text-primary hover:underline">→ Links in practice</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="the-anchor-element" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The anchor element</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A link is made with the <strong className="text-foreground">anchor</strong> element:{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;a&gt;</code>. Its one required
          attribute is <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">href</code> (hypertext
          reference) — the address the browser should go to when the link is clicked.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          URLs come in two flavours. An <strong className="text-foreground">absolute URL</strong> includes the
          full address (use this for other websites). A{" "}
          <strong className="text-foreground">relative URL</strong> is a path from your current file (use this
          for pages on your own site). Anchor links starting with{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">#</code> jump to a section on the same
          page.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          When linking to an outside site, add{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">target="_blank"</code> so it opens in a
          new tab — keep your own site open in the background. Group related links into a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;nav&gt;</code> element so browsers
          and screen readers know it is a navigation region.
        </p>
      </section>

      {/* ── 2.5 Special Links ──────────────────────────────── */}
      <section id="special-links" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Special Links (Email & Phone)</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Links aren't just for web pages. You can use special prefixes in the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">href</code> attribute to trigger different actions on the user's device.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2 text-sm font-mono text-foreground leading-relaxed">
          <div><span className="text-[#c2622d]">mailto:email@address.com</span> — Opens the user's default email client, ready to send an email to that address.</div>
          <div><span className="text-[#c2622d]">tel:+1234567890</span> — On mobile devices, this opens the phone dialer with the number pre-filled.</div>
        </div>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="links-in-practice" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Links in practice</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Here is a small page that uses every link type you will need day-to-day:
        </p>
        <CodeBlock language="html" title="index.html">
          {`<!-- Absolute URL — full address, opens in same tab -->
<a href="https://koompi.com">Visit KOOMPI</a>

<!-- target="_blank" — opens in a new tab -->
<a href="https://koompi.com" target="_blank">Open KOOMPI in new tab</a>

<!-- Relative URL — another page in your own project -->
<a href="about.html">About Us</a>

<!-- Anchor link — jumps to an element with id="team" on this page -->
<a href="#team">Meet the team ↓</a>

<!-- The target section (anywhere on the page) -->
<h2 id="team">Our Team</h2>

<!-- A nav groups navigation links together semantically -->
<nav>
  <a href="index.html">Home</a>
  <a href="products.html">Products</a>
  <a href="contact.html">Contact</a>
</nav>`}
        </CodeBlock>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">href="https://..."</code>
            absolute URL — links to a different website
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">href="page.html"</code>
            relative URL — another page in the same folder
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">href="#id"</code>
            anchor link — jumps to any element with that id
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">target="_blank"</code>
            opens the link in a new browser tab
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">&lt;nav&gt;</code>
            semantic wrapper — marks a region as site navigation
          </li>
        </ul>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A simple KOOMPI site page is already loaded. Click the links in the preview, change the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">href</code> values, add another link,
            or try the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">#contact</code> anchor at the bottom.
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
          <p>Here is what we covered about links and navigation:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The <code>&lt;a&gt;</code> (anchor) tag creates links using the <code>href</code> attribute.</li>
            <li>Links can point to absolute URLs (other websites) or relative URLs (pages on your site).</li>
            <li>Use <code>#id</code> to jump to a specific section on the same page.</li>
            <li>Use <code>target="_blank"</code> to open links in a new tab.</li>
            <li>You can trigger email clients with <code>mailto:</code> and phone dialers with <code>tel:</code>.</li>
            <li>Group navigation menus inside a semantic <code>&lt;nav&gt;</code> element.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Build a navigation bar. The check looks for a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;nav&gt;</code> element containing
            at least <strong className="text-foreground">3 links</strong>. The links can go anywhere —
            real URLs, relative paths, or even <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">#</code> anchors.
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
