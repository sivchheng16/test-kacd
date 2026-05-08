import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module02VariablesDataTypes() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          Variables &amp; Data Types
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Every app stores information — a user's name, a price in riel, a score in
          a game. Variables are how JavaScript remembers things. Get this right and
          you'll have the foundation for everything else.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#declaring-variables" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Declaring variables</a></li>
            <li><a href="#naming-conventions" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Naming Conventions</a></li>
            <li><a href="#data-types" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Basic Data Types</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#template-literals" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Template Literals</a></li>
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
            <li><a href="#challenge" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* Concept */}
      <section id="declaring-variables" className="space-y-6">
        <h2 className="text-3xl font-serif font-medium text-foreground">Declaring variables</h2>
        <p className="text-muted-foreground leading-relaxed">
          There are three keywords. In modern JavaScript you only need two of them:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground font-mono">Keyword</th>
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Can change?</th>
                <th className="text-left py-2 font-semibold text-foreground">When to use</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono">const</td>
                <td className="py-2 pr-4">No — value is fixed</td>
                <td className="py-2">Default choice for most things</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono">let</td>
                <td className="py-2 pr-4">Yes — can be reassigned</td>
                <td className="py-2">Counters, values that update</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">var</td>
                <td className="py-2 pr-4">Yes — old style</td>
                <td className="py-2">Avoid — use const/let instead</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock language="javascript">
          {`const city = "Phnom Penh";   // won't change
let score = 0;               // will change as user plays
// city = "Siem Reap";      // ❌ error — const can't change
score = score + 10;          // ✅ fine — let can change`}
        </CodeBlock>

        <h2 id="naming-conventions" className="text-3xl font-serif font-medium text-foreground pt-4">Variable Naming Conventions</h2>
        <p className="text-muted-foreground leading-relaxed">
          How you name your variables matters. Good names make code readable and help you avoid errors.
        </p>
        <ul className="space-y-3 text-sm text-muted-foreground list-none pl-0">
          <li className="flex gap-3 p-3 bg-stone-50 rounded-lg border">
            <span className="text-green-600 font-bold shrink-0">✓</span>
            <span><strong>camelCase</strong>: This is the JS standard. Start with lowercase, then capitalize each new word (e.g., <code>userName</code>, <code>totalPrice</code>).</span>
          </li>
          <li className="flex gap-3 p-3 bg-stone-50 rounded-lg border">
            <span className="text-green-600 font-bold shrink-0">✓</span>
            <span><strong>Descriptive Names</strong>: Choose names that explain the data. Use <code>priceInRiel</code> instead of just <code>p</code>.</span>
          </li>
          <li className="flex gap-3 p-3 bg-stone-50 rounded-lg border">
            <span className="text-red-500 font-bold shrink-0">✗</span>
            <span><strong>Reserved Keywords</strong>: You cannot use words that JS already uses for logic, like <code>let</code>, <code>const</code>, or <code>function</code>.</span>
          </li>
        </ul>

        <h2 id="data-types" className="text-3xl font-serif font-medium text-foreground pt-4">The four basic data types</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { type: "String", example: `"Hello"  'Sokha'`, desc: "Text — always in quotes" },
            { type: "Number", example: "42   3.14   -7", desc: "Any numeric value" },
            { type: "Boolean", example: "true   false", desc: "Yes / No — exactly two values" },
            { type: "undefined", example: "let x;", desc: "Declared but not assigned" },
          ].map(({ type, example, desc }) => (
            <div key={type} className="rounded-xl border border-border bg-stone-50 px-4 py-3">
              <p className="font-mono font-bold text-foreground text-sm">{type}</p>
              <p className="font-mono text-xs text-amber-700 mt-1">{example}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>

        <h2 id="template-literals" className="text-3xl font-serif font-medium text-foreground pt-4">Template literals</h2>
        <p className="text-muted-foreground leading-relaxed">
          Use backticks (<code className="font-mono bg-stone-100 px-1 rounded">` `</code>) instead of quotes and embed
          variables with <code className="font-mono bg-stone-100 px-1 rounded">{`\${}`}</code>. Much cleaner than string
          concatenation with <code className="font-mono bg-stone-100 px-1 rounded">+</code>.
        </p>
        <CodeBlock language="javascript">
          {`const name = "Dara";
const price = 4000; // KHR

// Old way (messy)
console.log("Hello " + name + ", price is " + price + " ៛");

// Template literal (clean)
console.log(\`Hello \${name}, price is \${price} ៛\`);
// → Hello Dara, price is 4000 ៛`}
        </CodeBlock>

        <h2 className="text-3xl font-serif font-medium text-foreground pt-4">Checking types with typeof</h2>
        <CodeBlock language="javascript">
          {`console.log(typeof "hello");   // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"`}
        </CodeBlock>
      </section>

      {/* Example */}
      <section id="live-example" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Live example — a Cambodian market price tag</h2>
        <p className="text-sm text-muted-foreground">
          Read the code, then tweak the values and watch the preview update.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const item = "Nom banh chok";
const priceKHR = 2000;
const available = true;

// Template literal builds the message
const tag = \`Item: \${item}
Price: \${priceKHR} ៛
In stock: \${available}\`;

// In JS mode, use document.write to show output
document.write("<pre>" + tag + "</pre>");`,
          }}
        />
      </section>

      {/* Try it */}
      <section id="try-it-yourself" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Try it yourself</h2>
        <p className="text-sm text-muted-foreground">
          Declare some variables about yourself — your name, your age, your hometown — and
          use a template literal to display them on the page.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `// Declare variables about yourself
const name = "Your name";
let age = 20;

// Use a template literal
document.write(\`Hello, I am \${name} and I am \${age} years old.\`);`,
          }}
        />
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Key takeaways from this module:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>const</strong> is for values that won't change (default choice).</li>
            <li><strong>let</strong> is for values that will be reassigned (counters, toggles).</li>
            <li>Basic data types include <strong>Strings</strong>, <strong>Numbers</strong>, and <strong>Booleans</strong>.</li>
            <li><strong>Template literals</strong> (backticks) make it easy to embed variables in text.</li>
            <li>Use <strong>typeof</strong> to check the data type of any value.</li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Challenge</h2>
        <p className="text-sm text-muted-foreground">
          Declare a <code className="font-mono bg-stone-100 px-1 rounded">const</code> for a name (string) and a{" "}
          <code className="font-mono bg-stone-100 px-1 rounded">let</code> for an age (number), then write a template
          literal that uses both variables in a sentence.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `// 1. Declare a const for a name
// 2. Declare a let for an age
// 3. Use a template literal with both

`,
          }}
          challenge={{
            prompt:
              "Declare a const (name) and a let (age), then build a sentence with a template literal using backticks.",
            check(_html, _css, js) {
              if (!js.includes("const"))
                return { passed: false, message: "Declare your name with const." };
              if (!js.includes("let"))
                return { passed: false, message: "Declare your age with let." };
              if (!js.includes("`"))
                return {
                  passed: false,
                  message: "Use a template literal with backticks ` ` and ${} to combine them.",
                };
              return {
                passed: true,
                message: "Challenge complete! Variables and template literals down.",
              };
            },
          }}
          onChallengePassed={() => notifyChallengePassed(moduleId ?? "")}
        />
      </section>

      {/* Gate */}
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
