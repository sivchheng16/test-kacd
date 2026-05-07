import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2, Monitor, Terminal, FileCode, Lightbulb } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module01Introduction() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase">
          Module 01 — JavaScript Basics
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Introduction to JavaScript
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed italic">
          "HTML gives a page its bones, CSS gives it a face, and JavaScript gives
          it a brain."
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every interactive feature you've ever used on the web —
          a live search box, a chat bubble, a button that does something —
          is powered by JavaScript. In this lesson you'll write your very first
          JavaScript and see results right in the browser.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[
            { label: "HTML", desc: "Structure — The Bones", color: "bg-orange-50 border-orange-100 text-orange-900" },
            { label: "CSS", desc: "Style — The Skin", color: "bg-blue-50 border-blue-100 text-blue-900" },
            { label: "JavaScript", desc: "Behaviour — The Brain", color: "bg-amber-50 border-amber-100 text-amber-900" },
          ].map(({ label, desc, color }) => (
            <div
              key={label}
              className={`rounded-2xl border px-5 py-4 text-center transition-all hover:shadow-md ${color}`}
            >
              <p className="font-mono font-bold text-lg">{label}</p>
              <p className="text-xs opacity-80 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <ul className="space-y-2 text-sm">
            <li><a href="#adding-js" className="text-primary hover:underline">→ Adding JS to a page</a></li>
            <li><a href="#connecting-files" className="text-primary hover:underline">→ Connecting Files</a></li>
            <li><a href="#viewing-console" className="text-primary hover:underline">→ Viewing the Console</a></li>
            <li><a href="#alert-dialog" className="text-primary hover:underline">→ The Alert Dialog</a></li>
            <li><a href="#inner-html" className="text-primary hover:underline">→ Updating the Page</a></li>
          </ul>
          <ul className="space-y-2 text-sm">
            <li><a href="#output-methods" className="text-primary hover:underline">→ Output Methods</a></li>
            <li><a href="#live-example" className="text-primary hover:underline flex items-center gap-2">→ Live Example</a></li>
            <li><a href="#challenge" className="text-primary hover:underline flex items-center gap-2">→ Final Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* Adding JS */}
      <section id="adding-js" className="space-y-6">
        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-bold text-foreground">Adding JS to a page</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The most common way to start is putting a <code className="font-mono bg-stone-100 px-1 rounded">&lt;script&gt;</code> tag
          at the bottom of your <code className="font-mono bg-stone-100 px-1 rounded">&lt;body&gt;</code>. This ensures that the browser has finished reading your HTML before the JavaScript starts running.
        </p>

        <CodeBlock language="html" title="Internal Script Example">
          {`<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, Cambodia!</h1>

    <script>
      // JavaScript code goes inside these tags
      console.log("JavaScript is alive!");
      document.body.style.backgroundColor = "#f0f9ff";
    </script>
  </body>
</html>`}
        </CodeBlock>

        <div className="p-5 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-4">
          <Lightbulb className="text-blue-500 shrink-0 mt-1" size={18} />
          <div className="text-sm text-blue-900 leading-relaxed">
            <p className="font-semibold">Why at the bottom?</p>
            <p className="mt-1 opacity-80">If you put the script at the top, it might try to change something (like a heading) before that heading has even been created by the browser!</p>
          </div>
        </div>
      </section>

      {/* Connecting Files */}
      <section id="connecting-files" className="space-y-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-bold text-foreground">Connecting External Files</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          As your project grows, putting all your code in one HTML file becomes messy. Instead, we create a separate <code className="font-mono bg-stone-100 px-1 rounded">.js</code> file and link it.
        </p>

        <div className="p-4 rounded-xl bg-stone-50 border border-border space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileCode size={16} className="text-primary" />
            Project Folder Structure
          </p>
          <div className="font-mono text-xs text-muted-foreground pl-6 border-l-2 border-stone-200 ml-2">
            <p>📁 my-project/</p>
            <p className="pl-4">├── index.html</p>
            <p className="pl-4">├── styles.css</p>
            <p className="pl-4">└── script.js <span className="text-amber-600 ml-2">(Keep them in the same folder!)</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">1. Your JavaScript File</p>
            <CodeBlock language="javascript" title="script.js">
              {`// script.js
console.log("Connected successfully!");`}
            </CodeBlock>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">2. Your Full HTML Structure</p>
            <CodeBlock language="html" title="index.html">
              {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JS Basics</title>
</head>
<body>
    <h1>Hello, Cambodia!</h1>

    <!-- Link the file at the bottom of body -->
    <script src="script.js"></script>
</body>
</html>`}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Viewing the Console */}
      <section id="viewing-console" className="space-y-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-bold text-foreground">Viewing the Console</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The <strong>Console</strong> is a hidden panel in your browser used by developers to see "behind the scenes" messages. It's the most important tool for debugging.
        </p>

        <div className="bg-stone-900 rounded-2xl p-6 text-stone-300 font-mono text-sm space-y-4 border border-stone-800 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-stone-800 pb-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
            <span className="ml-2 text-stone-500 text-xs">Developer Tools — Console</span>
          </div>
          <p className="text-blue-400">&gt; console.log("Hello Developer!")</p>
          <p className="text-white">"Hello Developer!"</p>
          <p className="text-amber-400">&gt; console.warn("Watch out!")</p>
          <p className="text-amber-200">⚠️ Watch out!</p>
          <p className="text-red-400">&gt; console.error("Something broke!")</p>
          <p className="text-red-300">❌ Something broke!</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">How to open it:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-stone-50">
              <p className="font-bold text-sm">Windows / Linux</p>
              <p className="text-sm text-muted-foreground mt-1">Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-white text-xs shadow-sm font-sans font-bold">F12</kbd> or <kbd className="px-1.5 py-0.5 rounded border border-border bg-white text-xs shadow-sm font-sans font-bold">Ctrl + Shift + J</kbd></p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-stone-50">
              <p className="font-bold text-sm">macOS</p>
              <p className="text-sm text-muted-foreground mt-1">Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-white text-xs shadow-sm font-sans font-bold">Cmd + Option + J</kbd></p>
            </div>
          </div>
        </div>
      </section>

      {/* The Alert Dialog */}
      <section id="alert-dialog" className="space-y-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-bold text-foreground">The Alert Dialog</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The <code>alert()</code> function is used to show a message to the user in a small popup window. It stops everything else on the page until the user clicks "OK".
        </p>

        {/* Mock Alert Window */}
        <div className="relative h-64 w-full rounded-2xl border border-border bg-stone-200/50 flex items-center justify-center overflow-hidden group/alert">
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
          <div className="relative w-80 bg-white rounded-xl shadow-2xl border border-stone-200 p-6 space-y-6 transform transition-transform group-hover/alert:scale-[1.02]">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-sans">localhost says</p>
              <p className="text-sm text-foreground font-sans leading-relaxed">
                Hello! This is an alert message. Click OK to continue.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="px-6 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-4">
          <Lightbulb className="text-amber-500 shrink-0 mt-1" size={18} />
          <div className="text-sm text-amber-900 leading-relaxed">
            <p className="font-semibold">When to use alert?</p>
            <p className="mt-1 opacity-80">Use alerts sparingly! They are quite annoying for users because they force them to stop what they are doing. For modern apps, we usually update the text on the page instead.</p>
          </div>
        </div>
      </section>

      {/* Updating the Page */}
      <section id="inner-html" className="space-y-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-bold text-foreground">Updating the Page (innerHTML)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The most powerful way to use JavaScript is changing the HTML content of your page while the user is looking at it. We use the <code>.innerHTML</code> property to do this.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-stone-50 p-6 space-y-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">1. The HTML Target</p>
            <div className="p-4 bg-white border border-border rounded-lg">
              <p id="mock-text" className="text-stone-400 font-serif italic">This is old text...</p>
            </div>
            <CodeBlock language="html">
              {`<p id="my-text">This is old text...</p>`}
            </CodeBlock>
          </div>
          <div className="rounded-2xl border border-border bg-blue-50 p-6 space-y-4 shadow-sm border-blue-100">
            <p className="text-xs font-bold text-blue-800 uppercase tracking-widest">2. The JS Magic</p>
            <div className="p-4 bg-white border border-blue-200 rounded-lg">
              <p className="text-blue-600 font-serif font-bold">JavaScript changed this!</p>
            </div>
            <CodeBlock language="javascript">
              {`document.getElementById("my-text").innerHTML 
= "JavaScript changed this!";`}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Output Methods */}
      <section id="output-methods" className="space-y-6 pt-6 border-t border-border/50">
        <h2 className="text-2xl font-bold text-foreground">Different Ways to Output</h2>
        <p className="text-muted-foreground leading-relaxed">
          JavaScript offers several ways to show information. Each has a specific purpose:
        </p>

        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          <table className="w-full text-sm border-collapse text-left">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-foreground">Method</th>
                <th className="px-6 py-4 font-semibold text-foreground">Where it shows</th>
                <th className="px-6 py-4 font-semibold text-foreground">Best for...</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-6 py-4 font-mono font-bold text-blue-600">console.log()</td>
                <td className="px-6 py-4 text-muted-foreground">Dev Tools Console</td>
                <td className="px-6 py-4 text-muted-foreground italic">Debugging & checking values</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono font-bold text-amber-600">alert()</td>
                <td className="px-6 py-4 text-muted-foreground">Popup Dialog</td>
                <td className="px-6 py-4 text-muted-foreground italic">Urgent alerts for users</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono font-bold text-green-600">.innerHTML</td>
                <td className="px-6 py-4 text-muted-foreground">Inside a specific tag</td>
                <td className="px-6 py-4 text-muted-foreground italic">Real-world web app content</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono font-bold text-rose-600">document.write()</td>
                <td className="px-6 py-4 text-muted-foreground">The whole page</td>
                <td className="px-6 py-4 text-muted-foreground italic">Quick tests (avoid in production)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Example */}
      <section id="live-example" className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-2xl font-bold text-foreground">Live Example — Try all methods</h2>
        <p className="text-muted-foreground leading-relaxed">
          Look at the code below. We are using different ways to output text. In this playground, <code>console.log</code> will show up in your real browser console (press F12)!
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<!-- 1. This is a placeholder for our JS -->
<div id="output-box" style="padding: 20px; border: 2px dashed #ccc; margin: 10px 0;">
  JS will put content here...
</div>

<!-- 2. A button to trigger an alert -->
<button id="alert-btn" style="padding: 10px 20px; cursor: pointer; background: #eee; border: 1px solid #999; border-radius: 4px;">
  Click for Alert
</button>`,
            css: `body { font-family: sans-serif; padding: 20px; background: #fff; }`,
            js: `// 1. Output to the console (hidden from user)
console.log("Hello from the hidden console!");

// 2. Output to the page content
document.getElementById("output-box").innerHTML = "<h3>Output via innerHTML</h3><p>This is the standard way!</p>";

// 3. Connecting the button to an action
const btn = document.getElementById("alert-btn");

btn.addEventListener("click", function() {
  alert("Hello! This is a popup alert.");
});

// 4. document.write (uncomment to see it replace everything)
// document.write("Oops, I replaced everything!");`,
          }}
        />
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-4 text-base leading-relaxed shadow-inner">
          <p className="font-semibold">In this introduction, you've learned:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>JavaScript</strong> adds interactivity and logic (the "brain").</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>Use the <strong>&lt;script&gt;</strong> tag at the end of the body to include JS.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>console.log()</strong> is your best friend for debugging.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>.innerHTML</strong> is how we usually update the web page content.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-bold text-foreground">Final Challenge</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Write code that uses <strong>two different output methods</strong>. First, log a message to the console, then change the text of the body using <code>innerHTML</code>.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<h1 id="main-title">Wait for it...</h1>`,
            css: `body { font-family: system-ui, sans-serif; padding: 40px; text-align: center; }`,
            js: `// 1. Log "Challenge started" to the console
// 2. Change the title's innerHTML to your name
`,
          }}
          challenge={{
            prompt:
              "Use console.log() and document.getElementById('main-title').innerHTML to complete the task.",
            check(_html, _css, js) {
              if (!js.includes("console.log"))
                return {
                  passed: false,
                  message: "Don't forget to use console.log()!",
                };
              if (!js.includes("innerHTML"))
                return {
                  passed: false,
                  message: "Use innerHTML to change the text on the page.",
                };
              return { passed: true, message: "Excellent! You've mastered the basics of JS output." };
            },
          }}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* Gate */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-8 py-6 rounded-2xl bg-green-50 border border-green-200 shadow-sm">
            <CheckCircle2 size={24} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-lg font-bold text-green-900">Challenge Passed!</p>
              <p className="text-green-700 mt-1">
                You're ready to dive deeper into variables and data types.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-8 py-6 rounded-2xl bg-stone-50 border border-border shadow-inner">
            <p className="text-muted-foreground text-center italic">
              Complete the challenge above to unlock the next lesson.
            </p>
          </div>
        )}
      </section>
    </article>
  );
}
