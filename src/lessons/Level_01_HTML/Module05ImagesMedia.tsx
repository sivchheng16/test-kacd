import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<h1>Cambodia Through My Lens</h1>

<!-- Basic image with src and alt -->
<img
  src="../../../public/angkor-wat.jpeg"
  alt="Angkor Wat temple at sunrise, reflected in the moat"
  width="120"
  height="80"
>

<!-- figure + figcaption adds a visible caption -->
<figure>
  <img
    src="../../../public/phnom-penh.jpeg"
    alt="Phnom Penh City Hall with palm trees in front"
    width="120"
    height="80"
  >
  <figcaption>Phnom Penh City Hall — Cambodia's capital city.</figcaption>
</figure>

<!-- Linking an image -->
<a href="https://koompi.com" target="_blank">
  <img
    src="https://koompi.com/assets/KoompiBlackLogo-259c65d2.png"
    alt="KOOMPI — visit our website"
    width="80"
    height="80"
  >
</a>`;

const CHALLENGE_STARTER = `<!-- Add an image to this page.
     It needs a src attribute AND a non-empty alt attribute. -->
<h1>My Photo</h1>
`;

function parseDoc(body: string): Document {
  return new DOMParser().parseFromString(
    `<!DOCTYPE html><html><body>${body}</body></html>`,
    "text/html"
  );
}

const challenge = {
  prompt:
    "Add an <img> element that has both a src attribute and a non-empty alt attribute describing what the image shows.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = parseDoc(htmlCode);
    const img = doc.querySelector("img");
    if (!img)
      return {
        passed: false,
        message: "No <img> element found yet. Add one with src and alt attributes.",
      };
    const src = img.getAttribute("src");
    if (!src || src.trim() === "")
      return {
        passed: false,
        message: "Your <img> is missing a src attribute. Add src=\"...\" with an image URL or filename.",
      };
    const alt = img.getAttribute("alt");
    if (alt === null)
      return {
        passed: false,
        message: "Your <img> is missing an alt attribute. Add alt=\"description of the image\".",
      };
    if (alt.trim() === "")
      return {
        passed: false,
        message: "Your alt attribute is empty. Write a short description of what the image shows.",
      };
    return { passed: true, message: "Challenge complete!" };
  },
};

export default function Module05ImagesMedia() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          A page of text alone rarely holds attention — images are what make a webpage feel real.
          But an image that only sighted users can experience is an image that excludes people,
          and that is a bug worth fixing from day one.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#the-img-element" className="text-primary hover:underline">→ The img element</a></li>
          <li><a href="#images-annotated" className="text-primary hover:underline">→ Images, annotated</a></li>
          <li><a href="#audio-and-video" className="text-primary hover:underline">→ Audio and Video</a></li>
          <li><a href="#project-folder-structure" className="text-primary hover:underline">→ Project Folder Structure</a></li>
          <li><a href="#using-local-files" className="text-primary hover:underline">→ Using Local Files</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="the-img-element" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The img element</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Images are added with{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;img&gt;</code> — a{" "}
          <strong className="text-foreground">void element</strong>, meaning it has no closing tag and no
          content between tags. Everything it needs lives in its attributes.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Two attributes are mandatory every time. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code>{" "}
          is the path or URL of the image file. <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code>{" "}
          is a short text description of what the image shows — it is read aloud by screen readers and
          displayed when the image fails to load. Skipping <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code>{" "}
          is one of the most common accessibility mistakes on the web.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Adding <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">width</code> and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">height</code> attributes (in pixels,
          without the "px" unit) lets the browser reserve the right amount of space before the image
          downloads. Without them, the page jumps as images load — a jarring experience for users on
          slow connections. Wrap an image in{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;figure&gt;</code> with a{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;figcaption&gt;</code> when
          you want a visible caption.
        </p>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="images-annotated" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Images, annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Four common patterns you will use on almost every project:
        </p>
        <CodeBlock language="html" title="index.html">
          {`<!-- 1. Basic image — src and alt are always required -->
<img src="images/koompi-e13.jpg" alt="KOOMPI E13 laptop open on a desk">

<!-- 2. With dimensions — reserves space, prevents layout shift -->
<img
  src="images/team-phnom-penh.jpg"
  alt="Four KOOMPI team members in the Phnom Penh office"
  width="800"
  height="533"
>

<!-- 3. External image — full URL for images hosted elsewhere -->
<img
  src="https://koompi.com/images/hero.jpg"
  alt="KOOMPI Academy students working on laptops"
  width="1200"
  height="600"
>

<!-- 4. figure + figcaption — image with a visible caption -->
<figure>
  <img
    src="images/angkor-wat.jpg"
    alt="Angkor Wat reflected in the north pool at sunrise"
    width="960"
    height="640"
  >
  <figcaption>Angkor Wat, Siem Reap — a UNESCO World Heritage Site.</figcaption>
</figure>

<!-- 5. Decorative image — alt="" tells screen readers to skip it -->
<img src="images/divider.png" alt="">`}
        </CodeBlock>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">src</code>
            path to the image file — relative or absolute URL
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">alt</code>
            describes the image for screen readers and broken-image fallback
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">width / height</code>
            pixel dimensions — prevents page jumping while images load
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">&lt;figure&gt;</code>
            semantic container pairing an image with its caption
          </li>
          <li className="flex gap-2">
            <code className="text-primary font-mono shrink-0">alt=""</code>
            empty alt for purely decorative images — screen readers skip them
          </li>
        </ul>
      </section>

      {/* ── 3.5 Audio and Video ────────────────────────────── */}
      <section id="audio-and-video" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Audio and Video</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          HTML5 brought native support for embedding rich media using the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;audio&gt;</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;video&gt;</code> tags. Like images, they use a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code> attribute. Unlike images, they have both an opening and closing tag, allowing you to provide fallback text inside them if the browser doesn't support the media.
        </p>
        <CodeBlock language="html" title="media.html">
          {`<!-- Video with controls, playing automatically, muted -->
<video src="videos/koompi-intro.mp4" width="640" controls autoplay muted>
  Your browser does not support the video tag.
</video>

<!-- Audio player with controls -->
<audio src="audio/podcast-ep1.mp3" controls>
  Your browser does not support the audio element.
</audio>`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Adding the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">controls</code> attribute is crucial—it provides the browser's default play, pause, and volume buttons. Without it, the user can't interact with the media.
        </p>
      </section>

      {/* ── 3.6 Project Folder Structure ───────────────────── */}
      <section id="project-folder-structure" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Project Folder Structure</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Before linking to local media, it is important to understand how to organize your files. As your website grows, keeping all files in one folder gets messy. Best practice is to create dedicated subfolders for your assets, like an <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">images</code> or <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">videos</code> folder.
        </p>
        <div className="p-4 rounded-xl bg-stone-100 border border-border font-mono text-sm whitespace-pre">
          {`my-website/
├── index.html
├── about.html
├── images/
│   ├── logo.png
│   └── hero-banner.jpg
└── videos/
    └── intro.mp4`}
        </div>
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-amber-900 space-y-2 text-sm">
          <p className="font-semibold">⚠️ Important Reminders:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Exact Name:</strong> File names are case-sensitive. <code className="text-sm bg-amber-100 px-1 py-0.5 rounded">Logo.PNG</code> is different from <code className="text-sm bg-amber-100 px-1 py-0.5 rounded">logo.png</code>.</li>
            <li><strong>File Extension:</strong> Always include the correct extension (.jpg, .png, .mp4).</li>
            <li><strong>No Spaces:</strong> Avoid spaces in file names. Use hyphens (<code className="text-sm bg-amber-100 px-1 py-0.5 rounded">hero-banner.jpg</code>) or underscores (<code className="text-sm bg-amber-100 px-1 py-0.5 rounded">hero_banner.jpg</code>) instead.</li>
          </ul>
        </div>
      </section>

      {/* ── 3.7 Using Local Files (Relative Paths) ─────────── */}
      <section id="using-local-files" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Using Local Files</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          While you can link to images and videos hosted on other websites using full URLs (like <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">https://example.com/image.jpg</code>), you will mostly use files stored within your project folder.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          To do this, you use a <strong>relative path</strong> in the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code> attribute. A relative path tells the browser where to find the file <em>relative</em> to the current HTML document.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If the image is in the exact same folder as the HTML file, you just write the file name. However, since we organize assets into folders, you must include the folder name followed by a forward slash <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">/</code> before the file name. If your HTML file is inside a folder and you need to go <em>up</em> a directory to reach the images folder, you use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">../</code>.
        </p>
        <CodeBlock language="html" title="index.html">
          {`<!-- 1. File is in the SAME folder (less common for images) -->
<img src="my-photo.jpg" alt="A photo I took">

<!-- 2. File is in an 'images' subfolder (best practice) -->
<img src="images/logo.png" alt="Company Logo">
<video src="videos/intro.mp4" controls></video>

<!-- 3. HTML is in a subfolder, and we must go UP one level to reach 'images' -->
<!-- Use ../ to mean "go up one folder" -->
<img src="../images/hero-banner.jpg" alt="Hero Banner">`}
        </CodeBlock>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            The editor has real images already loaded. Try changing the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code> text, adjusting the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">width</code>, or swapping the{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code> for any public image URL.
            Notice how the preview updates instantly.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="360px"
        />
      </section>

      {/* ── 4.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Here is what we covered about images and media:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The <code>&lt;img&gt;</code> tag embeds images. It is a void element (no closing tag).</li>
            <li>The <code>src</code> attribute points to the image file, and <code>alt</code> provides alternative text for accessibility and broken links.</li>
            <li>Always specify <code>width</code> and <code>height</code> to prevent page layout jumps.</li>
            <li>Use <code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code> to group an image with a caption.</li>
            <li>Embed video and audio using <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code>, remembering to add the <code>controls</code> attribute for user interaction.</li>
            <li>You can use local files by placing them in your project folder and using relative paths in the <code>src</code> attribute (e.g., <code>src="images/photo.jpg"</code>).</li>
          </ul>
        </div>
      </section>


      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            The check looks for an <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;img&gt;</code>{" "}
            tag that has both a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src</code> and a
            non-empty <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">alt</code>. Use any image URL
            — or the path to a local file if you have one.
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
