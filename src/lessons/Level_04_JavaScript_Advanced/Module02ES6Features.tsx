import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

const EXPLORE_DESTRUCTURING = `// Object destructuring
const user = { name: "Sokha", age: 22, city: "Phnom Penh" };
const { name, age, city } = user;
console.log(name, age, city);

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, , third] = colors;
console.log(first, third);

// Rename + default value
const { name: userName, country = "Cambodia" } = user;
console.log(userName, country);`;

const EXPLORE_SPREAD = `// Spread arrays
const a = [1, 2, 3];
const b = [4, 5, 6];
const combined = [...a, ...b];
console.log(combined);

// Spread objects — merge two objects
const base = { theme: "dark", lang: "km" };
const extra = { lang: "en", role: "admin" };
const merged = { ...base, ...extra };
console.log(merged); // later key wins

// Rest params
function sum(...nums) {
  return nums.reduce((t, n) => t + n, 0);
}
console.log(sum(1, 2, 3, 4, 5));`;

const EXPLORE_MODERN = `// Template literals — full power
const price = 100;
const tax = 0.1;
const receipt = \`
  Price : $\${price}
  Tax   : $\${price * tax}
  Total : $\${price * (1 + tax)}
\`.trim();
console.log(receipt);

// Optional chaining
const user = { address: { city: "Phnom Penh" } };
console.log(user.address?.country); // undefined — no error
console.log(user.phone?.number);    // undefined — no error

// Nullish coalescing
const count = 0;
console.log(count || 10);  // 10  ← wrong, 0 is falsy
console.log(count ?? 10);  //  0  ← correct, 0 is not null/undefined`;

const CHALLENGE_STARTER = `// 1. Destructure at least 3 keys from this object.
const product = { id: 42, name: "KOOMPI E13", price: 299, stock: 5 };


// 2. Use spread (...) to merge these two objects into one.
const specs = { ram: "8GB", storage: "256GB" };


// Log both results so you can see them in the console.
`;

const challenge = {
  prompt:
    "Destructure at least 3 keys from the product object using `const {` or `let {`, and merge two objects using the spread operator `...`.",
  check(_html: string, _css: string, js: string) {
    const hasDestructure = /(?:const|let)\s*\{/.test(js);
    if (!hasDestructure)
      return { passed: false, message: "Use object destructuring: `const { key1, key2, key3 } = obj`." };
    const hasSpread = /\.\.\.[a-zA-Z_$]/.test(js);
    if (!hasSpread)
      return { passed: false, message: "Use the spread operator to merge the two objects: `{ ...obj1, ...obj2 }`." };
    return { passed: true, message: "Destructuring and spread — both nailed it!" };
  },
};

export default function Module02ES6Features() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          ES6+ Modern Features
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Modern JavaScript (ES6 and beyond) gives you cleaner syntax for common tasks.
          Master destructuring, spread/rest, template literals, and defensive operators used 
          in every real-world codebase.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#destructuring" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Destructuring</a></li>
            <li><a href="#spread-amp-rest" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Spread & Rest</a></li>
            <li><a href="#template-literals" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Template Literals</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#optional-chaining-amp-nullish-coalescing" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Optional Chaining & Nullish</a></li>
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
            <li><a href="#challenge" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* Destructuring */}
      <section id="destructuring" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Destructuring</h2>
        <p className="text-base text-muted-foreground">
          Destructuring extracts values from objects or arrays into named variables without
          repeated property access.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Object destructuring
          </div>
          <CodeBlock language="json">
          {`const user = { name: "Sokha", age: 22, city: "Phnom Penh" };

// Without destructuring
const name = user.name;
const age  = user.age;

// With destructuring — one line
const { name, age, city } = user;

// Rename while destructuring
const { name: userName } = user;   // userName === "Sokha"

// Default value when key is absent
const { country = "Cambodia" } = user;  // country === "Cambodia"`}
        </CodeBlock>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Array destructuring
          </div>
          <CodeBlock language="javascript">
          {`const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

// Skip elements with an empty comma
const [primary, , tertiary] = colors;   // tertiary === "blue"

// Classic swap — no temp variable needed
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1`}
        </CodeBlock>
        </div>
      </section>

      {/* Spread & Rest */}
      <section id="spread-amp-rest" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Spread &amp; Rest</h2>
        <p className="text-base text-muted-foreground">
          The same <code className="font-mono text-sm">...</code> syntax plays two roles: <em>spread</em> expands
          an iterable into individual items; <em>rest</em> collects remaining items into an array.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Shallow Copy vs Deep Copy
          </div>
          <CodeBlock language="javascript">
          {`// Shallow Copy (using spread)
const original = { name: "Dara", stats: { hp: 100 } };
const shallow = { ...original };

shallow.name = "Sokha";       // original.name stays "Dara"
shallow.stats.hp = 50;        // original.stats.hp ALSO becomes 50! (Shared reference)

// Deep Copy (modern way)
const deep = structuredClone(original);
deep.stats.hp = 0;            // original.stats.hp stays 50! (Independent copy)`}
        </CodeBlock>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Spread — expand
          </div>
          <CodeBlock language="json">
          {`// Combine arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const all  = [...arr1, ...arr2];     // [1,2,3,4,5,6]

// Copy (no mutation of original)
const copy = [...arr1];
copy.push(99);
console.log(arr1); // [1, 2, 3] — untouched

// Merge objects (later key wins)
const base  = { theme: "dark", lang: "km" };
const patch = { lang: "en", role: "admin" };
const final = { ...base, ...patch };
// { theme: "dark", lang: "en", role: "admin" }

// Spread into function args
const nums = [5, 2, 8, 1];
Math.max(...nums); // 8`}
        </CodeBlock>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Rest — collect
          </div>
          <CodeBlock language="json">
          {`// Rest in function parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4, 5); // 15

// Rest in destructuring
const [head, ...tail] = [10, 20, 30, 40];
// head === 10, tail === [20, 30, 40]

const { name, ...rest } = { name: "Sokha", age: 22, city: "PP" };
// rest === { age: 22, city: "PP" }`}
        </CodeBlock>
        </div>
      </section>

      {/* Template literals */}
      <section id="template-literals" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Template Literals</h2>
        <p className="text-base text-muted-foreground">
          Backtick strings support multi-line content and embed any JavaScript expression with{" "}
          <code className="font-mono text-sm">{"${...}"}</code>.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Expressions inside strings
          </div>
          <CodeBlock language="json">
          {`const name  = "Sokha";
const score = 95;

// Old way
"Hello " + name + ", you scored " + score + "%";

// Template literal
\`Hello \${name}, you scored \${score}%\`;

// Any expression works
\`Tax: $\${(price * 0.1).toFixed(2)}\`;
\`Status: \${score >= 60 ? "Pass" : "Fail"}\`;

// Multi-line — preserves whitespace
const html = \`
  <div class="card">
    <h2>\${name}</h2>
  </div>
\`;`}
        </CodeBlock>
        </div>
      </section>

      {/* Optional chaining & nullish */}
      <section id="optional-chaining-amp-nullish-coalescing" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Optional Chaining &amp; Nullish Coalescing</h2>
        <p className="text-base text-muted-foreground">
          These two operators make defensive code much shorter.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            ?. and ??
          </div>
          <CodeBlock language="json">
          {`const user = { address: { city: "Phnom Penh" } };

// Optional chaining — returns undefined instead of throwing
user.address?.country;    // undefined
user.phone?.number;       // undefined
user.getName?.();         // undefined (method that may not exist)
arr?.[0];                 // undefined if arr is null/undefined

// Nullish coalescing — default ONLY for null/undefined
const count = 0;
count || 10;   // 10  ← bug! 0 is falsy
count ?? 10;   //  0  ← correct, 0 is a valid value

const name = "";
name ?? "Anonymous"; // ""  — empty string is intentional`}
        </CodeBlock>
        </div>
      </section>

      {/* Try it */}
      <section id="try-it" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Try it</h2>
        <p className="text-base text-muted-foreground">
          Experiment with all three features. Open the console tab in the playground to see output.
        </p>
        <CodePlayground mode="js" starter={{ js: EXPLORE_DESTRUCTURING }} height="280px" />
        <CodePlayground mode="js" starter={{ js: EXPLORE_SPREAD }} height="260px" />
        <CodePlayground mode="js" starter={{ js: EXPLORE_MODERN }} height="280px" />
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-4 text-base leading-relaxed shadow-inner">
          <p className="font-semibold">In this module, you've learned:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>**Destructuring** extracts values from arrays and objects elegantly.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>**Spread (...)** creates shallow copies, while **structuredClone()** creates deep copies.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>**Optional Chaining (?.)** and **Nullish Coalescing (??)** provide safety for missing data.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>**Template Literals** enable multi-line strings and easy expression embedding.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Challenge</h2>
        <p className="text-base text-muted-foreground">
          Destructure at least 3 keys from <code className="font-mono text-sm">product</code> and
          use the spread operator to merge <code className="font-mono text-sm">product</code> with{" "}
          <code className="font-mono text-sm">specs</code>. Log both results.
        </p>
        <CodePlayground
          mode="js"
          starter={{ js: CHALLENGE_STARTER }}
          height="260px"
          challenge={challenge}
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
