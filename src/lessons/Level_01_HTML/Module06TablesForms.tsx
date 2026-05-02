import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";

const EXPLORE_HTML = `<form>
  <label for="name">Your name:</label>
  <input type="text" id="name" placeholder="e.g. Sokha">

  <label for="email">Email:</label>
  <input type="email" id="email" placeholder="you@example.com">

  <label for="topic">Topic:</label>
  <select id="topic">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </select>

  <label for="message">Message:</label>
  <textarea id="message" rows="4"></textarea>

  <button type="submit">Send</button>
</form>`;

const CHALLENGE_STARTER = `<!-- Build a contact form here -->
<!-- It needs: a text input with a label, an email input with a label,
     and a submit button. -->
`;

const challenge = {
  prompt:
    "Build a contact form with: a <label> + <input type=\"text\">, a <label> + <input type=\"email\">, and a <button type=\"submit\">.",
  check(htmlCode: string, _css: string, _js: string) {
    const doc = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><body>${htmlCode}</body></html>`,
      "text/html"
    );

    const textInput = doc.querySelector('input[type="text"]');
    if (!textInput)
      return { passed: false, message: 'Add an <input type="text"> for the visitor\'s name.' };

    const emailInput = doc.querySelector('input[type="email"]');
    if (!emailInput)
      return { passed: false, message: 'Add an <input type="email"> for the visitor\'s email.' };

    const labels = doc.querySelectorAll("label");
    if (labels.length < 2)
      return {
        passed: false,
        message: `Found ${labels.length} <label> element(s) — you need at least 2, one for each input.`,
      };

    const submitBtn = doc.querySelector('button[type="submit"]');
    if (!submitBtn)
      return { passed: false, message: 'Add a <button type="submit"> so the form can be submitted.' };

    return { passed: true, message: "Challenge complete! Your contact form has all the required fields." };
  },
};

export default function Module06TablesForms() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Tables and forms are how the web organises data and talks back to people.
          Every signup page, checkout screen, and spreadsheet you have ever used online is built from exactly what you are about to learn.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#two-tools-two-jobs" className="text-primary hover:underline">→ Two tools, two jobs</a></li>
          <li><a href="#a-table-and-a-form-annotated" className="text-primary hover:underline">→ A table and a form, annotated</a></li>
          <li><a href="#advanced-input-types" className="text-primary hover:underline">→ Advanced input types</a></li>
          <li><a href="#try-it" className="text-primary hover:underline">→ Try it</a></li>
          <li><a href="#summary" className="text-primary hover:underline">→ Summary</a></li>
          <li><a href="#challenge" className="text-primary hover:underline">→ Challenge</a></li>
        </ul>
      </section>

      {/* ── 2. Concept ─────────────────────────────────────── */}
      <section id="two-tools-two-jobs" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Two tools, two jobs</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-foreground">1. Tables for Data</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Tables</strong> display data that naturally lives in rows and columns — think schedules,
            price lists, or comparison grids. A table is built from nested elements:{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;table&gt;</code> wraps everything,{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;tr&gt;</code> is a row, and each cell inside
            a row is either a header (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;th&gt;</code>) or
            data (<code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;td&gt;</code>).
          </p>
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-amber-900 space-y-2 text-sm">
            <p className="font-semibold">⚠️ A Word of Warning:</p>
            <p>In the early days of the web, developers used tables to structure the layout of entire pages. <strong>Never do this today.</strong> Tables are strictly for tabular data. Using them for layout breaks accessibility for screen readers and makes responsive design on mobile devices nearly impossible.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium text-foreground">2. Forms for Input</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Forms</strong> collect input from a visitor and send it somewhere.
            The key elements are{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;form&gt;</code> (the container),{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> (the description),{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input&gt;</code> (where the user types),
            and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;button type="submit"&gt;</code> (to send it).
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Always pair every input with a label. You connect a label to an input by giving the input an <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code>, and giving the label a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">for</code> attribute with the exact same value. This helps screen readers explain the input, and allows users to click the text of the label to focus the input field.
          </p>
        </div>
      </section>

      {/* ── 3. Example ─────────────────────────────────────── */}
      <section id="a-table-and-a-form-annotated" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">A table and a form, annotated</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Below is a minimal table followed by a simple form. Read the inline comments — they explain every tag.
        </p>

        <CodeBlock language="html" title="table-example.html">
          {`<table>                       <!-- the outer wrapper -->
  <thead>                     <!-- groups the header content -->
    <tr>                      <!-- first row (header row) -->
      <th>Name</th>           <!-- <th> = header cell, bold + centred -->
      <th>Score</th>
    </tr>
  </thead>
  <tbody>                     <!-- groups the body data -->
    <tr>                      <!-- second row (data row) -->
      <td>Sokha</td>          <!-- <td> = regular data cell -->
      <td>95</td>
    </tr>
    <tr>
      <td>Dara</td>
      <td>88</td>
    </tr>
  </tbody>
  <tfoot>                     <!-- groups the footer/summary content -->
    <tr>
      <td>Average</td>
      <td>91.5</td>
    </tr>
  </tfoot>
</table>`}
        </CodeBlock>

        <CodeBlock language="html" title="form-example.html">
          {`<form action="/submit" method="POST">

  <label for="name">Full name:</label>       <!-- label describes the input -->
  <input type="text" id="name" name="name">  <!-- id links label → input -->

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">  <!-- type="email" validates format -->

  <label for="msg">Message:</label>
  <textarea id="msg" name="msg" rows="4"></textarea>  <!-- multi-line text -->

  <label for="track">Track:</label>
  <select id="track" name="track">          <!-- dropdown -->
    <option value="html">HTML</option>
    <option value="css">CSS</option>
  </select>

  <button type="submit">Send</button>        <!-- submits the form -->

</form>`}
        </CodeBlock>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">type="text"</span> plain text input</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">type="email"</span> input that validates an email address</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">type="password"</span> input that hides characters</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">textarea</span> multi-line text field (has a closing tag)</li>
          <li className="flex gap-2"><span className="text-primary font-mono shrink-0">select + option</span> dropdown menu</li>
        </ul>
      </section>

      {/* ── 3.5 Advanced Input Types ───────────────────────── */}
      <section id="advanced-input-types" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Advanced input types</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input&gt;</code> tag is incredibly versatile. By just changing the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">type</code> attribute, you get completely different UI components provided natively by the browser.
        </p>
        <div className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-2 text-sm font-mono text-foreground leading-relaxed">
          <div><span className="text-[#c2622d]">type="checkbox"</span> — For turning a single option on or off, or selecting multiple options.</div>
          <div><span className="text-[#c2622d]">type="radio"</span> — For selecting exactly one option from a group (give them all the same <code className="text-[#c2622d]">name</code>).</div>
          <div><span className="text-[#c2622d]">type="date"</span> — Opens a native calendar date picker.</div>
          <div><span className="text-[#c2622d]">type="color"</span> — Opens a native color wheel picker.</div>
          <div><span className="text-[#c2622d]">type="range"</span> — Creates a draggable slider (use with <code className="text-[#c2622d]">min</code> and <code className="text-[#c2622d]">max</code> attributes).</div>
          <div><span className="text-[#c2622d]">type="file"</span> — Allows the user to upload a file from their computer.</div>
        </div>
        
        <CodeBlock language="html" title="advanced-inputs.html">
          {`<!-- A checkbox for a simple yes/no or on/off -->
<label>
  <input type="checkbox" name="subscribe" checked>
  Subscribe to newsletter
</label>

<!-- Radio buttons for mutually exclusive choices -->
<p>Choose your level:</p>
<label><input type="radio" name="level" value="beginner"> Beginner</label>
<label><input type="radio" name="level" value="advanced"> Advanced</label>

<!-- A date picker -->
<label for="birthday">Birthday:</label>
<input type="date" id="birthday" name="birthday">

<!-- A range slider (from 0 to 100) -->
<label for="volume">Volume:</label>
<input type="range" id="volume" name="volume" min="0" max="100">

<!-- A file uploader -->
<label for="avatar">Upload Avatar:</label>
<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          When using <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">checkbox</code> or <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">radio</code> inputs, you can wrap the input inside the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> element directly. This means you do not strictly need the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">for</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">id</code> attributes to connect them!
        </p>
      </section>

      {/* ── 4. Try it ──────────────────────────────────────── */}
      <section id="try-it" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Try it</h2>
          <p className="text-base text-muted-foreground mt-1">
            A complete form is loaded below. Edit it freely — try adding a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input type="checkbox"&gt;</code>,
            change the <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">select</code> options,
            or wrap the inputs in a{" "}
            <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;table&gt;</code> to see how layout changes.
          </p>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: EXPLORE_HTML }}
          height="340px"
        />
      </section>

      {/* ── 4.5 Summary ────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Here is what we covered about tables and forms:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Tables</strong> (<code>&lt;table&gt;</code>) organize data into rows (<code>&lt;tr&gt;</code>) and cells (<code>&lt;th&gt;</code> for headers, <code>&lt;td&gt;</code> for data).</li>
            <li><strong>Forms</strong> (<code>&lt;form&gt;</code>) collect data to send to a server.</li>
            <li>Every form input should have a corresponding <code>&lt;label&gt;</code> connected via the <code>for</code> and <code>id</code> attributes.</li>
            <li>The <code>&lt;input&gt;</code> tag has many <code>type</code> attributes (text, email, password, radio, checkbox, date, color).</li>
            <li>Use <code>&lt;textarea&gt;</code> for multi-line text and <code>&lt;select&gt;</code> with <code>&lt;option&gt;</code> for dropdown menus.</li>
            <li>Always include a <code>&lt;button type="submit"&gt;</code> to let users submit the form.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. Challenge ───────────────────────────────────── */}
      <section id="challenge" className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-foreground">Challenge</h2>
          <p className="text-base text-muted-foreground mt-1">
            Build a contact form from scratch. It must contain:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input type="text"&gt;</code> (for a name)</li>
            <li>A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;label&gt;</code> and <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;input type="email"&gt;</code></li>
            <li>A <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">&lt;button type="submit"&gt;</code></li>
          </ul>
        </div>
        <CodePlayground
          mode="html"
          starter={{ html: CHALLENGE_STARTER }}
          height="320px"
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
