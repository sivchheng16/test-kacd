import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CodeExample } from "../../components/playground/CodeExample";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_LANDMARKS = `<!-- 1. Screen readers use landmarks to jump around the page -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/services">Services</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="intro-heading">
    <h1 id="intro-heading">Our Mission</h1>
    <p>We build accessible tools for everyone.</p>
  </section>

  <article>
    <h2>Latest Update</h2>
    <p>Accessibility is a human right, not a feature.</p>
  </article>

  <!-- 2. Aside is a secondary landmark -->
  <aside aria-label="Quick links">
    <h3>Resources</h3>
    <ul>
      <li><a href="/docs">Documentation</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2025 KOOMPI Academy</p>
</footer>`;

const EXPLORE_IMAGES = `<!-- 1. Informative image -->
<img src="https://placehold.co/400x200" 
     alt="A group of people working together in a bright office space" />

<!-- 2. Decorative image (screen reader skips this) -->
<img src="https://placehold.co/50x50" 
     alt="" />

<!-- 3. Functional image (image as a button) -->
<button aria-label="Search">
  <img src="https://placehold.co/20x20" alt="" />
</button>

<!-- 4. SVG Accessibility -->
<svg width="100" height="100" role="img" aria-labelledby="svg-title svg-desc">
  <title id="svg-title">Green Circle</title>
  <desc id="svg-desc">A perfectly round green circle representing success.</desc>
  <circle cx="50" cy="50" r="40" fill="green" />
</svg>`;

const EXPLORE_FORMS_KEYBOARD = `<!-- 1. Semantic Form Grouping -->
<form>
  <fieldset>
    <legend>Personal Information</legend>
    
    <div class="field">
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" required aria-required="true" />
    </div>

    <div class="field">
      <label for="email">Email Address:</label>
      <input type="email" id="email" name="email" aria-describedby="email-hint" />
      <span id="email-hint" class="hint">We will never share your email.</span>
    </div>
  </fieldset>

  <!-- 2. Keyboard Focusable Elements -->
  <div class="actions">
    <!-- Links and Buttons are focusable by default -->
    <a href="/cancel">Cancel</a>
    <button type="submit">Send Message</button>
    
    <!-- 3. Custom focusable element (use sparingly!) -->
    <div tabindex="0" role="button" aria-label="Custom help button">?</div>
  </div>
</form>`;

const EXPLORE_SEO = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- 1. Primary SEO -->
  <title>Accessibility Guide | KOOMPI Academy</title>
  <meta name="description" content="Master web accessibility and SEO with our comprehensive HTML guide. Build sites for everyone." />
  <link rel="canonical" href="https://academy.koompi.com/html/accessibility" />

  <!-- 2. Social Media (Open Graph) -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Web Accessibility & SEO Guide" />
  <meta property="og:description" content="Learn to build inclusive websites that rank higher." />
  <meta property="og:image" content="https://academy.koompi.com/og-image.jpg" />
  <meta property="og:url" content="https://academy.koompi.com/html/accessibility" />

  <!-- 3. Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@koompi" />
  <meta name="twitter:title" content="Web Accessibility & SEO Guide" />
</head>
<body>
  <h1>Accessibility and SEO</h1>
</body>
</html>`;

const ANNOTATED_ARIA = `<!-- aria-label names an element that has no visible label -->
<button aria-label="Close dialog" style="padding: 5px 10px;">X</button>

<br><br>

<!-- aria-describedby links to helper text -->
<label for="pw">Password:</label><br>
<input id="pw" aria-describedby="pw-hint" type="password" style="margin-bottom: 5px;" /><br>
<span id="pw-hint" style="font-size: 0.8rem; color: #666;">
  Must be at least 8 characters.
</span>

<br><br>

<!-- role overrides implicit role -->
<div role="alert" style="background: #fee2e2; color: #991b1b; padding: 10px; border-radius: 4px;">
  Your session is about to expire.
</div>`;

const ANNOTATED_HIERARCHY = `<h1>My Portfolio</h1>
<h2>Projects</h2>
<h3>Web Development</h3>
<p>Project details go here.</p>
<h3>Mobile Apps</h3>
<p>More project details.</p>
<h2>Contact Me</h2>
<p>Email: example@mail.com</p>`;

const ANNOTATED_IMAGES = `<!-- 1. Informative image -->
<img src="https://placehold.co/300x150" 
     alt="A group of people working together in a bright office space" 
     style="display: block; margin-bottom: 10px;" />

<!-- 2. Decorative image -->
<img src="https://placehold.co/50x50" 
     alt="" 
     style="display: block; margin-bottom: 10px;" />

<!-- 3. Functional image (Search button) -->
<button aria-label="Search" style="padding: 10px; background: #eee; border: 1px solid #ccc;">
  <img src="https://placehold.co/20x20" alt="" />
</button>`;

const CHALLENGE_STARTER = `<!-- Challenge: build an accessible page header with navigation.
     Requirements:
       1. A <nav> element inside <header>
       2. At least 2 <a> links inside the nav
       3. A <main> element after the header
       4. Any <img> must have an alt attribute
-->
`;

function parseHtml(raw: string): Document {
  return new DOMParser().parseFromString(raw, "text/html");
}

function buildDoc(body: string): string {
  return `<!DOCTYPE html><html><body>${body}</body></html>`;
}

const challenge = {
  prompt:
    "Write a <header> containing a <nav> with at least 2 links, followed by a <main> element. If you include any images, give them alt attributes.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseHtml(buildDoc(htmlCode));

    const nav = doc.querySelector("nav");
    if (!nav) return { passed: false, message: "No <nav> element found. Add one inside a <header>." };

    const links = nav.querySelectorAll("a");
    if (links.length < 2)
      return {
        passed: false,
        message: `Your <nav> has ${links.length} link(s) — add at least 2 <a> elements.`,
      };

    const main = doc.querySelector("main");
    if (!main) return { passed: false, message: "No <main> element found. Add one after the header." };

    const images = doc.querySelectorAll("img");
    for (const img of Array.from(images)) {
      if (!img.hasAttribute("alt")) {
        return {
          passed: false,
          message: `Found an <img> without an alt attribute. Add alt="" for decorative images or a description for content images.`,
        };
      }
    }

    return { passed: true, message: "Challenge complete! Your page structure is accessible and correct." };
  },
};

export default function Module08AccessibilitySEO() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          1 in 6 people worldwide lives with a disability. If your site is inaccessible, you have already
          excluded them before they read a single word — and Google will rank you lower for it too.
          The good news: the fix starts with the HTML you write right now.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#semantic-html-is-the-foundation" className="text-primary hover:underline">→ Semantic HTML & Landmarks</a></li>
          <li><a href="#media-and-images" className="text-primary hover:underline">→ Media and Images</a></li>
          <li><a href="#interactive-elements" className="text-primary hover:underline">→ Interactive Elements & Keyboard</a></li>
          <li><a href="#aria" className="text-primary hover:underline">→ ARIA</a></li>
          <li><a href="#heading-hierarchy" className="text-primary hover:underline">→ Heading hierarchy</a></li>
          <li><a href="#seo-essentials" className="text-primary hover:underline">→ SEO Essentials</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Semantic HTML & Landmarks ──────────────────── */}
      <section id="semantic-html-is-the-foundation" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Semantic HTML & Landmarks</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Screen readers — the software blind users rely on — announce landmarks like "navigation region" or
          "main content". These landmarks help users "see" the structure of your page using only their keyboard or voice.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Instead of using <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;div&gt;</code> for everything, choose tags that carry meaning:
        </p>
        <div className="rounded-xl bg-stone-50 border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-stone-100">
                <th className="text-left px-5 py-2.5 font-mono text-foreground font-semibold">Tag</th>
                <th className="text-left px-5 py-2.5 font-sans text-muted-foreground font-medium">Landmark Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["<header>", "Banner (Top of page/section)"],
                ["<nav>", "Navigation"],
                ["<main>", "Main Content (Only one per page)"],
                ["<article>", "Independent, self-contained content"],
                ["<section>", "Generic section of a document"],
                ["<aside>", "Complementary information (Sidebar)"],
                ["<footer>", "Content info (Bottom of page/section)"],
              ].map(([tag, desc]) => (
                <tr key={tag} className="hover:bg-stone-50/60">
                  <td className="px-5 py-2.5 font-mono text-[#c2622d] text-sm">{tag}</td>
                  <td className="px-5 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-foreground">Why Landmarks Matter?</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            A user with a screen reader can press a single key (like <kbd className="px-2 py-1 bg-stone-100 border border-border rounded text-xs font-mono">L</kbd>) to jump directly to the <strong>Main</strong> region, skipping the navigation and header. If you use a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;div&gt;</code>, they have to listen to the entire page from top to bottom.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-serif text-foreground">Try it — Page Structure</h3>
          <CodePlayground
            mode="html"
            starter={{ html: EXPLORE_LANDMARKS }}
            height="340px"
          />
        </div>
      </section>

      {/* ── 3. Media and Images ────────────────────────────── */}
      <section id="media-and-images" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Media and Images</h2>
        <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
          <p>
            Images are one of the biggest barriers to accessibility. The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code> attribute is how you provide an "alternative" version of the image for those who cannot see it.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Informative Images</h4>
              <p className="text-sm">Describe the <strong>intent</strong> and <strong>content</strong>. Don't start with "Image of..." — the screen reader already says that.</p>
              <CodeExample 
                html={ANNOTATED_IMAGES}
                css=""
                title="Accessible Images"
                height="320px"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-serif text-foreground">Functional Images</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            If an image acts as a button (e.g., a search icon), the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code> text should describe the <strong>action</strong>, not the image.
          </p>
          <CodeExample 
            html={`<button aria-label="Search" style="background: none; border: none; cursor: pointer;">
  <img src="https://placehold.co/20x20" alt="">
</button>`}
            css=""
            title="Functional Image"
            height="100px"
          />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-serif text-foreground">Try it — Accessible Media</h3>
          <CodePlayground
            mode="html"
            starter={{ html: EXPLORE_IMAGES }}
            height="340px"
          />
        </div>
      </section>

      {/* ── 4. Interactive Elements ────────────────────────── */}
      <section id="interactive-elements" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Interactive Elements & Keyboard</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Many users navigate using only the <kbd className="px-2 py-1 bg-stone-100 border border-border rounded text-xs font-mono">Tab</kbd> key. They jump from one focusable element to the next.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg font-serif text-foreground font-semibold">1. Forms: Labels are Mandatory</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Never use a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;div&gt;</code> or <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;span&gt;</code> to label an input. Use the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> element and link it using the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">for</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code> attributes.
          </p>
          <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-5 text-sm text-blue-900 leading-relaxed">
            <strong>Why?</strong> Clicking the label will automatically focus the input. This is great for users with motor impairments who might struggle to click a small checkbox or radio button.
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-serif text-foreground font-semibold">2. Tabindex</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">tabindex</code> attribute controls the tab order:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><code className="text-foreground font-mono">tabindex="0"</code>: Makes a generic element (like a div) focusable in the natural tab order.</li>
            <li><code className="text-foreground font-mono">tabindex="-1"</code>: Makes an element focusable via JavaScript but removes it from the tab order.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-serif text-foreground">Try it — Forms & Keyboard</h3>
          <CodePlayground
            mode="html"
            starter={{ html: EXPLORE_FORMS_KEYBOARD }}
            height="340px"
          />
        </div>
      </section>

      {/* ── 4. ARIA ────────────────────────────────────────── */}
      <section id="aria" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">ARIA — when HTML semantics aren't enough</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          ARIA attributes bolt extra meaning onto elements that HTML alone cannot express. The golden rule:
          reach for semantic HTML first. Use ARIA only when no native element fits.
        </p>
        <CodeExample 
          html={ANNOTATED_ARIA}
          css=""
          title="ARIA and Labels"
          height="320px"
        />
      </section>

      {/* ── 5. Heading hierarchy ───────────────────────────── */}
      <section id="heading-hierarchy" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Heading hierarchy</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          One <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;h1&gt;</code> per page. Never
          skip levels — going from <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h1</code> straight
          to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">h3</code> confuses screen reader users
          who navigate by heading. Think of headings as a document outline, not a font-size selector.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-xs font-semibold text-red-600 mb-2 uppercase tracking-wide">Wrong</p>
            <CodeBlock language="javascript">
          {`<h1>Page title</h1>
<h3>Skipped h2!</h3>
<h5>Deep, no context</h5>`}
        </CodeBlock>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4">
            <p className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wide">Correct</p>
            <CodeExample 
              html={ANNOTATED_HIERARCHY}
              css=""
              title="Proper Heading Structure"
              height="280px"
            />
          </div>
        </div>
      </section>

      {/* ── 7. SEO Essentials ──────────────────────────────── */}
      <section id="seo-essentials" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">SEO Essentials</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Search engines read the same HTML as screen readers. Accessible markup and good SEO are two sides of the same coin.
        </p>
        
        <div className="space-y-5">
          <h3 className="text-lg font-serif text-foreground font-semibold">The Metadata Blueprint</h3>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex flex-col gap-1 leading-relaxed">
              <span className="flex gap-2 items-center text-primary font-mono font-semibold">
                &lt;title&gt;
              </span>
              <span>The single most important SEO element. Unique per page, 50–60 characters. Appears in the browser tab and search results.</span>
            </li>
            <li className="flex flex-col gap-1 leading-relaxed">
              <span className="flex gap-2 items-center text-primary font-mono font-semibold">
                &lt;meta name="description"&gt;
              </span>
              <span>150–160 chars. Google shows this under the title. Write it as a "mini-advert" to earn the click.</span>
            </li>
            <li className="flex flex-col gap-1 leading-relaxed">
              <span className="flex gap-2 items-center text-primary font-mono font-semibold">
                &lt;link rel="canonical"&gt;
              </span>
              <span>Tells search engines which version of a URL is the "master" copy. Prevents duplicate content issues.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-5 pt-4">
          <h3 className="text-lg font-serif text-foreground font-semibold">Social Optimization (Open Graph)</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            Open Graph tags (<code className="text-sm bg-stone-100 px-1.5 rounded">og:</code>) control how your page looks when shared on Telegram, Facebook, or Discord. Without them, the platform might pick a random image or text.
          </p>
          <CodeExample 
            html={`<!-- These tags go in the <head>, but we show them here as examples -->
<div style="background: #eef2ff; border: 1px solid #c7d2fe; padding: 20px; border-radius: 8px;">
  <p style="margin: 0; font-weight: bold; color: #3730a3;">Open Graph Preview Example</p>
  <p style="font-size: 0.9rem; color: #4338ca;">Check the source code for the meta tags!</p>
</div>
<!-- 
<meta property="og:title" content="Web Accessibility Guide" />
<meta property="og:image" content="https://example.com/cover.jpg" />
-->`}
            css=""
            title="Social Meta Tags"
            height="180px"
          />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-serif text-foreground">Try it — Full Page Metadata</h3>
          <CodePlayground
            mode="html"
            starter={{ html: EXPLORE_SEO }}
            height="340px"
          />
        </div>
      </section>



      {/* ── 7.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Here is what you need to remember about Accessibility and SEO:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Semantic HTML</strong> (<code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>) is the best foundation for accessibility. Avoid overusing <code>&lt;div&gt;</code>.</li>
            <li>Maintain a strict <strong>Heading Hierarchy</strong> (<code>h1</code> → <code>h2</code> → <code>h3</code>).</li>
            <li>Always provide <code>alt</code> text for images, leaving it empty (<code>alt=""</code>) only for purely decorative elements.</li>
            <li>Always link <code>&lt;label&gt;</code> to <code>&lt;input&gt;</code> in forms.</li>
            <li>Use <strong>ARIA</strong> attributes only when HTML alone cannot express the meaning (e.g., <code>aria-label</code>).</li>
            <li>Write good metadata (<code>&lt;title&gt;</code>, <code>meta description</code>) in your <code>&lt;head&gt;</code> to rank well on search engines.</li>
          </ul>
        </div>
      </section>

      {/* ── 8. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Build an accessible page header from scratch. The checker verifies structure — not visual style —
            so focus on the right elements.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: CHALLENGE_STARTER }}
          height="320px"
          challenge={challenge}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* ── 9. Gate ────────────────────────────────────────── */}
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
