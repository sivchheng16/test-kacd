import React from "react";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module07TestingBasics() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Imagine changing a function and knowing — within a second, without clicking around the app —
          whether everything still works. That is what automated tests give you: instant confidence every
          time you touch the code.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#what-is-a-test" className="text-primary hover:underline">→ What is a test?</a></li>
          <li><a href="#why-write-tests" className="text-primary hover:underline">→ Why write tests?</a></li>
          <li><a href="#meet-vitest" className="text-primary hover:underline">→ Meet Vitest</a></li>
          <li><a href="#your-first-test" className="text-primary hover:underline">→ Your first test</a></li>
          <li><a href="#common-matchers" className="text-primary hover:underline">→ Common matchers</a></li>
          <li><a href="#arrange" className="text-primary hover:underline">→ Arrange</a></li>
          <li><a href="#what-to-test" className="text-primary hover:underline">→ What to test</a></li>
          <li><a href="#running-tests" className="text-primary hover:underline">→ Running tests</a></li>
          <li><a href="#test-file-conventions" className="text-primary hover:underline">→ Test file conventions</a></li>
          <li><a href="#key-takeaways" className="text-primary hover:underline">→ Key takeaways</a></li>
        </ul>
      </section>

      {/* ── 2. What is a test? ─────────────────────────────── */}
      <section id="what-is-a-test" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What is a test?</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A test is just code that <strong className="text-foreground">calls your code</strong> and checks
          whether the output matches what you expect. If the check fails, the test fails and you get a
          clear message pointing exactly to the broken line.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          There is nothing magical about it. A test file imports a function, calls it with some input,
          and asserts something about the result — the same thing you would do manually in the browser
          console, but recorded so it runs automatically every time.
        </p>
      </section>

      {/* ── 3. Why write tests? ────────────────────────────── */}
      <section id="why-write-tests" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Why write tests?</h2>
        <ul className="space-y-3 text-base text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">→</span>
            <span><strong className="text-foreground">Catch bugs before users do.</strong> The test suite runs in milliseconds; a manual click-through takes minutes and still misses edge cases.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">→</span>
            <span><strong className="text-foreground">Refactor with confidence.</strong> When all tests stay green after a rewrite, you know the behavior is unchanged — even if the internals look completely different.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">→</span>
            <span><strong className="text-foreground">Tests are living documentation.</strong> A test named <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">returns 0 for negative input</code> tells the next developer exactly what the function is supposed to do.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-bold shrink-0">→</span>
            <span><strong className="text-foreground">The red-green-refactor cycle.</strong> Write a failing test (red), write the minimum code to pass it (green), then clean up the implementation (refactor) — all without breaking the test.</span>
          </li>
        </ul>
      </section>

      {/* ── 4. Vitest ──────────────────────────────────────── */}
      <section id="meet-vitest" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Meet Vitest</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Vitest</strong> is the modern test runner built for Vite projects.
          It is fast (runs tests in parallel using native ES modules), has a Jest-compatible API (so existing
          knowledge transfers), and integrates with TypeScript out of the box.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Install it as a dev dependency and add a script to <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">package.json</code>:
        </p>
        <CodeBlock language="bash">
          {`npm install --save-dev vitest`}
        </CodeBlock>
        <CodeBlock language="json">
          {`// package.json
{
  "scripts": {
    "test": "vitest"
  }
}`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          That is the entire setup. No config file needed for a basic project.
        </p>
      </section>

      {/* ── 5. Your first test ─────────────────────────────── */}
      <section id="your-first-test" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Your first test</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Start with a pure function — something that takes inputs and returns an output with no side effects.
          Create two files side by side:
        </p>
        <CodeBlock language="javascript" title="math.js">
          {`export function add(a, b) {
  return a + b;
}`}
        </CodeBlock>
        <CodeBlock language="javascript" title="math.test.js">
          {`import { test, expect } from 'vitest';
import { add } from './math.js';
import { CodeBlock } from "../../components/ui/CodeBlock";

test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Run <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm test</code> and Vitest finds
          any file matching <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">*.test.js</code> or{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">*.spec.js</code>, executes it, and
          prints a pass/fail summary.
        </p>
      </section>

      {/* ── 6. Common matchers ─────────────────────────────── */}
      <section id="common-matchers" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Common matchers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <strong className="text-foreground">matcher</strong> is the method chained after{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">expect(value)</code>.
          Each one checks the value in a different way:
        </p>
        <CodeBlock language="javascript">
          {`expect(add(2, 3)).toBe(5);            // strict equality (===)
expect(getUser()).toEqual({ id: 1 });  // deep equality (objects/arrays)
expect(isLoggedIn()).toBeTruthy();     // any truthy value
expect(items).toContain('milk');       // array or string includes value
expect(() => divide(1, 0)).toThrow(); // function must throw`}
        </CodeBlock>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><code className="text-primary font-mono shrink-0">toBe</code> uses <code className="bg-stone-100 px-1 rounded">===</code> — use it for primitives (numbers, strings, booleans)</li>
          <li className="flex gap-2"><code className="text-primary font-mono shrink-0">toEqual</code> recursively compares — use it for objects and arrays</li>
          <li className="flex gap-2"><code className="text-primary font-mono shrink-0">toThrow</code> wraps the call in an arrow function so the error is caught by Vitest, not your test</li>
        </ul>
      </section>

      {/* ── 7. Arrange-Act-Assert ──────────────────────────── */}
      <section id="arrange" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Arrange — Act — Assert</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every test, no matter how simple, follows the same three-step structure. Making it explicit keeps
          tests readable even months later:
        </p>
        <CodeBlock language="javascript">
          {`test('returns 0 for negative discount input', () => {
  // Arrange — set up inputs and any state
  const input = -1;

  // Act — call the function under test
  const result = calculateDiscount(input);

  // Assert — verify the output
  expect(result).toBe(0);
});`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Each test should cover <strong className="text-foreground">one behaviour</strong>. If you find
          yourself writing "and" in the test name — "calculates total <em>and</em> applies discount" — split
          it into two tests.
        </p>
      </section>

      {/* ── 8. What to test ────────────────────────────────── */}
      <section id="what-to-test" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What to test — and what to skip</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-green-800">Test these</p>
            <ul className="space-y-1 text-sm text-green-700">
              <li>Pure functions (no side effects)</li>
              <li>Business logic and calculations</li>
              <li>Edge cases: empty arrays, null, zero, negative numbers</li>
              <li>Error conditions — what happens with bad input</li>
            </ul>
          </div>
          <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-red-800">Skip these</p>
            <ul className="space-y-1 text-sm text-red-700">
              <li>Implementation details (internal variable names)</li>
              <li>Third-party library behaviour</li>
              <li>Code that is just wiring with no logic</li>
              <li>Things that are trivially obvious</li>
            </ul>
          </div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          A good rule of thumb: if you had to <em>think</em> about a case when writing the function, write
          a test for it. If it is just passing data through, skip it.
        </p>
      </section>

      {/* ── 9. Running tests ───────────────────────────────── */}
      <section id="running-tests" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Running tests</h2>
        <CodeBlock language="javascript">
          {`npm test              # watch mode — re-runs on every file save
npm test -- --run     # run once and exit (for CI)`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          In watch mode Vitest only re-runs the tests affected by the file you just changed, so feedback
          is near-instant even in large projects. The terminal output shows a green checkmark for each
          passing test and a red cross with a diff for each failure.
        </p>
      </section>

      {/* ── 10. File conventions ───────────────────────────── */}
      <section id="test-file-conventions" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Test file conventions</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          By convention, test files live <strong className="text-foreground">next to the source file</strong> they test.
          Vitest picks up any file that matches <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">**/*.test.{"{js,ts}"}</code> or{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">**/*.spec.{"{js,ts}"}</code>:
        </p>
        <CodeBlock language="javascript">
          {`src/
  utils/
    math.js          //  source
    math.test.js     //  tests for math.js
  checkout/
    discount.js
    discount.spec.js`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Keeping tests alongside source (rather than in a separate <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">__tests__</code> folder)
          means you always know which file a test belongs to, and moving a module also moves its tests.
        </p>
      </section>

      {/* ── Summary ────────────────────────────────────────── */}
      <section id="key-takeaways" className="rounded-2xl bg-stone-50 border border-border px-6 py-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Key takeaways</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary font-bold shrink-0">1.</span> A test calls your function and asserts the output — nothing more.</li>
          <li className="flex gap-2"><span className="text-primary font-bold shrink-0">2.</span> Vitest is installed with one command and needs no config for basic use.</li>
          <li className="flex gap-2"><span className="text-primary font-bold shrink-0">3.</span> Use <code className="bg-stone-100 px-1 rounded">toBe</code> for primitives, <code className="bg-stone-100 px-1 rounded">toEqual</code> for objects.</li>
          <li className="flex gap-2"><span className="text-primary font-bold shrink-0">4.</span> Structure every test as Arrange → Act → Assert.</li>
          <li className="flex gap-2"><span className="text-primary font-bold shrink-0">5.</span> Test pure functions and edge cases; skip implementation details and third-party code.</li>
        </ul>
      </section>

    </article>
  );
}
