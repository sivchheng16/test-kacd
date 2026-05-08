import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

const EXPLORE_TRY = `// try / catch / finally
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  console.log(divide(10, 2));  // 5
  console.log(divide(10, 0));  // throws
} catch (err) {
  console.error("Caught:", err.message);
} finally {
  console.log("This always runs");
}`;

const EXPLORE_CUSTOM = `// Custom error class
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (typeof age !== "number") throw new TypeError("Age must be a number");
  if (age < 0) throw new ValidationError("Age cannot be negative", "age");
  if (age > 150) throw new ValidationError("Age is unreasonably large", "age");
  return age;
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(\`Field "\${err.field}": \${err.message}\`);
  } else {
    throw err; // re-throw unknown errors
  }
}`;

const EXPLORE_ASYNC_ERROR = `// Async error handling
async function loadUser(id) {
  try {
    const res = await fetch(
      \`https://jsonplaceholder.typicode.com/users/\${id}\`
    );
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("loadUser failed:", err.message);
    return null; // fallback value
  }
}

loadUser(1).then(u => console.log(u?.name ?? "Not found"));
loadUser(9999).then(u => console.log(u?.name ?? "Not found"));`;

const CHALLENGE_STARTER = `// Write a function "checkPositive(n)" that:
//   • Throws a new Error("Must be positive") if n is negative.
//   • Returns n if it is non-negative.
// Then call it twice inside a try/catch:
//   • Once with a positive number (should succeed).
//   • Once with a negative number (should be caught).

function checkPositive(n) {
  // your code
}

try {
  // your calls here
} catch (err) {
  console.error("Caught:", err.message);
}
`;

const challenge = {
  prompt:
    "Write a function that `throw`s an Error for negative numbers, then call it inside `try` / `catch`.",
  check(_html: string, _css: string, js: string) {
    if (!/\bthrow\b/.test(js))
      return { passed: false, message: "Use `throw new Error(...)` to raise the error." };
    if (!/\btry\b/.test(js))
      return { passed: false, message: "Wrap the call in a `try` block." };
    if (!/\bcatch\b/.test(js))
      return { passed: false, message: "Add a `catch` block to handle the error." };
    return { passed: true, message: "Solid error handling — your code now fails safely!" };
  },
};

export default function Module10ErrorHandling() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          Error Handling
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Things go wrong. Networks fail, users type invalid input, third-party APIs return
          unexpected shapes. Robust code anticipates these situations and fails gracefully
          rather than crashing silently.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#types-of-errors" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Types of Errors</a></li>
            <li><a href="#try-catch-finally" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ try / catch / finally</a></li>
            <li><a href="#throwing-errors" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Throwing Errors</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#async-error-handling" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Async Error Handling</a></li>
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
            <li><a href="#challenge" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* Types of errors */}
      <section id="types-of-errors" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Types of Errors</h2>

        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Type</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">When it happens</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Can catch?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["SyntaxError", "Invalid code — won't even parse", "No — fix the code"],
                ["ReferenceError", "Variable doesn't exist", "Yes"],
                ["TypeError", "Wrong type: null.foo, 5()", "Yes"],
                ["RangeError", "Number out of valid range", "Yes"],
                ["Network Error", "fetch() can't reach server", "Yes"],
                ["Logic Error", "Code runs but gives wrong answer", "No — fix the logic"],
              ].map(([t, w, c]) => (
                <tr key={t}>
                  <td className="px-4 py-2 font-mono text-foreground">{t}</td>
                  <td className="px-4 py-2">{w}</td>
                  <td className="px-4 py-2">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* try/catch/finally */}
      <section id="try-catch-finally" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">try / catch / finally</h2>
        <p className="text-base text-muted-foreground">
          Wrap risky code in a <code className="font-mono text-sm">try</code> block. If anything
          inside it throws, control jumps immediately to <code className="font-mono text-sm">catch</code>.
          The <code className="font-mono text-sm">finally</code> block runs regardless — perfect
          for cleanup like hiding a loading spinner.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Structure
          </div>
          <CodeBlock language="json">
          {`try {
  // code that might throw
  const data = JSON.parse(rawInput);
  process(data);
} catch (err) {
  // err.name    — e.g. "SyntaxError"
  // err.message — human-readable description
  // err.stack   — call stack at the point of throw
  console.error(err.name + ":", err.message);
} finally {
  hideSpinner(); // always runs
}`}
        </CodeBlock>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_TRY }} height="260px" />
      </section>

      {/* Throwing errors */}
      <section id="throwing-errors" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Throwing Errors</h2>
        <p className="text-base text-muted-foreground">
          Use <code className="font-mono text-sm">throw</code> to signal a problem intentionally.
          Always throw an <code className="font-mono text-sm">Error</code> object (or a subclass) — never a
          plain string — so callers get a stack trace.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Throw and re-throw
          </div>
          <CodeBlock language="javascript">
          {`// Throw from a validation function
function requireEmail(email) {
  if (!email.includes("@")) {
    throw new TypeError("Invalid email address");
  }
}

// Re-throw errors you can't handle
try {
  processData();
} catch (err) {
  if (err.name === "NetworkError") {
    showOfflineBanner();
  } else {
    throw err; // let the caller deal with unexpected errors
  }
}`}
        </CodeBlock>
        </div>
      </section>

      {/* Custom errors */}
      <section id="custom-error-classes" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Custom Error Classes</h2>
        <p className="text-base text-muted-foreground">
          Extend the built-in <code className="font-mono text-sm">Error</code> class to create
          domain-specific errors that carry extra fields. Callers can then use{" "}
          <code className="font-mono text-sm">instanceof</code> to handle each type differently.
        </p>

        <CodePlayground mode="js" starter={{ js: EXPLORE_CUSTOM }} height="320px" />
      </section>

      {/* Async error handling */}
      <section id="async-error-handling" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Async Error Handling</h2>
        <p className="text-base text-muted-foreground">
          Async functions throw errors the same way sync functions do — just use{" "}
          <code className="font-mono text-sm">try/catch</code> around your <code className="font-mono text-sm">await</code> calls.
          Remember: <code className="font-mono text-sm">fetch()</code> only rejects on network failure,
          not on HTTP 4xx/5xx — check <code className="font-mono text-sm">response.ok</code> yourself.
        </p>

        <CodePlayground mode="js" starter={{ js: EXPLORE_ASYNC_ERROR }} height="280px" />

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Defensive programming pattern
          </div>
          <CodeBlock language="json">
          {`// Safe wrapper — always returns something useful
async function safeGet(url, fallback = null) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("safeGet:", err.message);
    return fallback;
  }
}

const users = await safeGet("/api/users", []); // empty array if it fails`}
        </CodeBlock>
        </div>
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Writing resilient code that handles the unexpected:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use <strong>try / catch</strong> to handle runtime errors without crashing your app.</li>
            <li>The <strong>finally</strong> block is ideal for cleanup tasks that must run regardless of success or failure.</li>
            <li><strong>throw new Error()</strong> lets you signal problems intentionally.</li>
            <li><strong>Custom Error classes</strong> allow for more specific error identification using <code>instanceof</code>.</li>
            <li>Async errors should be handled with <strong>try / catch</strong> around <code>await</code> calls.</li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Challenge</h2>
        <p className="text-base text-muted-foreground">
          Write a function <code className="font-mono text-sm">checkPositive(n)</code> that throws a
          new <code className="font-mono text-sm">Error</code> if <code className="font-mono text-sm">n</code> is
          negative. Call it twice inside a <code className="font-mono text-sm">try/catch</code> — once
          with a positive number and once with a negative one — and log the caught error message.
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
