import React from "react";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module01Philosophy() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Tests don't slow you down. Lack of tests does — when you're afraid to change code
          you don't understand, when a bug in production traces back to a function no one
          dared to touch, when every deploy is a gamble.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#the-testing-pyramid" className="text-primary hover:underline">→ The testing pyramid</a></li>
          <li><a href="#what-makes-a-good-test" className="text-primary hover:underline">→ What makes a good test</a></li>
          <li><a href="#test-doubles-mocks-stubs-spies-fakes" className="text-primary hover:underline">→ Test doubles: mocks, stubs, spies, fakes</a></li>
          <li><a href="#tdd-red-green-refactor" className="text-primary hover:underline">→ TDD: red → green → refactor</a></li>
          <li><a href="#what-to-test" className="text-primary hover:underline">→ What to test</a></li>
          <li><a href="#coverage-is-a-metric-not-a-goal" className="text-primary hover:underline">→ Coverage is a metric, not a goal</a></li>
        </ul>
      </section>

      {/* ── 2. The testing pyramid ─────────────────────────── */}
      <section id="the-testing-pyramid" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">The testing pyramid</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Think of your test suite as a pyramid. Many unit tests at the base — fast, cheap,
          run on every keystroke. Fewer integration tests in the middle — slower, but they
          catch bugs that unit tests miss. A small number of E2E tests at the top — they
          prove the user can do the thing, but they're slow and brittle.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Inverting the pyramid is a common mistake: relying on a handful of slow E2E tests
          instead of a broad base of fast unit tests. The suite takes ten minutes, everyone
          skips it locally, and bugs slip through.
        </p>
        <CodeBlock language="javascript">
          {`        ▲
       /E2E\\          few — slow — expensive
      /──────\\
     /  Integ  \\       some — seconds each
    /────────────\\
   /  Unit Tests  \\    many — milliseconds each
  /________________\\`}
        </CodeBlock>
      </section>

      {/* ── 3. What makes a good test ──────────────────────── */}
      <section id="what-makes-a-good-test" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What makes a good test</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every test follows the same three-phase structure: <strong className="text-foreground">Arrange</strong> the
          inputs and dependencies, <strong className="text-foreground">Act</strong> by calling the code under test,
          then <strong className="text-foreground">Assert</strong> that the output is what you expected.
        </p>
        <CodeBlock language="javascript">
          {`test('calculates total with tax', () => {
  // Arrange
  const price = 100;
  const taxRate = 0.1;

  // Act
  const total = calculateTotal(price, taxRate);

  // Assert
  expect(total).toBe(110);
});`}
        </CodeBlock>
        <ul className="space-y-3 text-base text-muted-foreground">
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">One assertion per test.</strong> When a test has five assertions and fails, you don't know which one mattered.</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">Descriptive names.</strong> The test name should read like a sentence: <em>"returns null when user is not found"</em>.</span></li>
          <li className="flex gap-3"><span className="text-primary shrink-0">—</span><span><strong className="text-foreground">Independent tests.</strong> Each test should be able to run alone, in any order, without setup left over from a previous test.</span></li>
        </ul>
      </section>

      {/* ── 4. Test doubles ────────────────────────────────── */}
      <section id="test-doubles-mocks-stubs-spies-fakes" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Test doubles: mocks, stubs, spies, fakes</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          A test double is a stand-in for a real dependency. There are four flavors, and
          using the right one keeps your tests fast and deterministic.
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Stub</p>
            <p className="text-sm text-muted-foreground mt-1">Returns a hard-coded value. Use when you need a dependency to produce a specific result and you don't care how it's called.</p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Mock</p>
            <p className="text-sm text-muted-foreground mt-1">Records how it was called. Use when the <em>interaction</em> is what you're testing — did the function call the email service with the right arguments?</p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Spy</p>
            <p className="text-sm text-muted-foreground mt-1">Wraps a real implementation and records calls. Use when you want real behavior but also want to assert it was called.</p>
          </div>
          <div className="rounded-xl border border-border px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Fake</p>
            <p className="text-sm text-muted-foreground mt-1">A lightweight working implementation — like an in-memory database. Use when a stub is too simple but a real dependency is too heavy.</p>
          </div>
        </div>
      </section>

      {/* ── 5. TDD ─────────────────────────────────────────── */}
      <section id="tdd-red-green-refactor" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">TDD: red → green → refactor</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Test-Driven Development inverts the usual order. Write the test first, watch it
          fail (red), write the minimum code to make it pass (green), then clean up (refactor).
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The discipline of watching a test fail before making it pass is not ceremonial.
          It confirms your test is actually testing something — a test that passes before
          you write the implementation is not testing anything.
        </p>
        <CodeBlock language="javascript">
          {`// Step 1: write the test — it fails because slugify doesn't exist yet
test('converts spaces to hyphens', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});

// Step 2: write the minimum code to pass
function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

// Step 3: refactor — handle edge cases, clean up, test still passes`}
        </CodeBlock>
      </section>

      {/* ── 6. What to test ────────────────────────────────── */}
      <section id="what-to-test" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">What to test — and what not to</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Test:</strong> business logic, edge cases (empty string, zero, null, negative numbers),
          error paths (what happens when the database is down), and anything you've had to
          debug more than once.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Don't test:</strong> implementation details (the private function your public function calls),
          third-party libraries (trust the maintainers), or CSS (screenshot tests exist, but
          they're fragile).
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If you find yourself rewriting tests every time you refactor, you're testing
          implementation details. Test the contract — the input/output behavior — not how
          the code achieves it.
        </p>
      </section>

      {/* ── 7. Coverage ────────────────────────────────────── */}
      <section id="coverage-is-a-metric-not-a-goal" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Coverage is a metric, not a goal</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Code coverage measures which lines were executed by your tests. 100% coverage
          with bad tests gives you false confidence — every line ran, but no assertion
          checked anything meaningful.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Use coverage as a diagnostic tool: low coverage on a critical module is a signal
          to add tests. Don't use it as a target you optimize for — that produces tests
          written to hit numbers, not to catch bugs.
        </p>
        <CodeBlock language="bash">
          {`# generate a coverage report
npx vitest run --coverage

# output shows which lines, branches, and functions were hit
# focus on the uncovered branches in your business logic`}
        </CodeBlock>
      </section>

    </article>
  );
}
