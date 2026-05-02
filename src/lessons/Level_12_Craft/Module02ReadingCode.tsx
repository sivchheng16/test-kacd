import React from "react";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module02ReadingCode() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Hook */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          You will read ten times more code than you write. Probably more.
          A junior developer writes features. A senior developer mostly reads — existing
          code, other people's PRs, library internals, error sources.
          The faster you can read code you didn't write, the faster you grow.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#start-at-the-entry-point" className="text-primary hover:underline">→ Start at the entry point</a></li>
          <li><a href="#dont-read-every-line" className="text-primary hover:underline">→ Don't read every line</a></li>
          <li><a href="#follow-the-data" className="text-primary hover:underline">→ Follow the data</a></li>
          <li><a href="#use-your-ide" className="text-primary hover:underline">→ Use your IDE</a></li>
          <li><a href="#git-blame-and-git-log" className="text-primary hover:underline">→ Git blame and git log</a></li>
          <li><a href="#read-the-tests" className="text-primary hover:underline">→ Read the tests</a></li>
          <li><a href="#the-5-minute-rule" className="text-primary hover:underline">→ The 5-minute rule</a></li>
          <li><a href="#when-to-rewrite-vs-when-to-understand" className="text-primary hover:underline">→ When to rewrite vs when to understand</a></li>
          <li><a href="#build-a-mental-model" className="text-primary hover:underline">→ Build a mental model</a></li>
        </ul>
      </section>

      {/* Start at the entry point */}
      <section id="start-at-the-entry-point" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Start at the entry point</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Every codebase has a place where execution begins. In a Node server it's usually
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">index.ts</code> or{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">server.ts</code>.
          In a React app it's <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">main.tsx</code> and{" "}
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">App.tsx</code>.
          In a Next.js app it's <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">app/page.tsx</code>{" "}
          for the root route.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Start there and trace forward. Follow what gets imported, what gets rendered,
          what gets called first. You are building a map, not reading a novel — you do not
          start at chapter one because someone said to, you start at the door you're going
          to enter through.
        </p>
        <CodeBlock language="javascript">
          {`// App.tsx — start here
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

// The providers wrap everything — so context is available everywhere.
// The Router is the decision-maker — it decides what renders per URL.
// Trace into Router next.`}
        </CodeBlock>
      </section>

      {/* Don't read every line */}
      <section id="dont-read-every-line" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Don't read every line</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Reading code is not reading a book. You are not obligated to process every line
          sequentially. Skim function signatures. Read the first and last few lines of a
          function to understand what it receives and what it returns. Let your eye look
          for the shape of things before drilling into detail.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The question you are usually trying to answer is specific: where is this value
          set? What calls this function? Where does this request go? Read for the answer
          to that question, not to understand every corner of the codebase.
        </p>
      </section>

      {/* Follow the data */}
      <section id="follow-the-data" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Follow the data</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The most reliable reading strategy in any codebase is to follow a piece of data.
          Pick something concrete — a user object, a form field value, an API response —
          and trace its entire journey.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="leading-relaxed">Where does it come from? (API response, user input, localStorage, props)</p>
          <p className="leading-relaxed">What transforms it? (parsing, validation, normalization, mapping)</p>
          <p className="leading-relaxed">Where is it stored? (React state, context, Zustand store, server cache)</p>
          <p className="leading-relaxed">Where does it render? (which component reads it, how does it appear)</p>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          If you can trace a piece of data through all four stages, you understand the
          architecture at the level that matters for making changes to it.
        </p>
      </section>

      {/* Use your IDE */}
      <section id="use-your-ide" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Use your IDE</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Reading code with a text editor and no tooling is like navigating a city without
          a map. Your IDE is the map. Use it.
        </p>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-44">Go to Definition</span>
            <p className="leading-relaxed">
              <kbd className="bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 text-foreground text-xs font-mono">F12</kbd>{" "}
              or{" "}
              <kbd className="bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 text-foreground text-xs font-mono">Cmd+Click</kbd>.
              Jump to where a function or type is defined. The single most important shortcut for reading code.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-44">Find All References</span>
            <p className="leading-relaxed">
              <kbd className="bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 text-foreground text-xs font-mono">Shift+F12</kbd>.
              See every place a function or variable is used. Before changing something,
              check all its call sites.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-44">Peek Definition</span>
            <p className="leading-relaxed">
              <kbd className="bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 text-foreground text-xs font-mono">Alt+F12</kbd>.
              Read the definition inline without leaving the file. Good for quick checks
              without losing your place.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-mono font-semibold text-foreground shrink-0 w-44">Breadcrumbs</span>
            <p className="leading-relaxed">
              The file path bar at the top of your editor. Shows you exactly where you are
              in the directory tree. When you have jumped through five files, this keeps
              you oriented.
            </p>
          </div>
        </div>
      </section>

      {/* Git blame */}
      <section id="git-blame-and-git-log" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Git blame and git log</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Code is not written in a vacuum. Every line was written by someone, for a reason,
          in a specific context that may no longer be obvious from the code itself.
        </p>
        <CodeBlock language="javascript">
          {`# Who wrote this line and when?
git blame src/lib/auth.ts

# What changed in this file over time?
git log --follow -p src/lib/auth.ts

# When was this specific function added?
git log -S "function validateToken" --source --all`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          When you see code that looks wrong, or a condition that seems arbitrary, or a
          workaround that makes no sense — git blame will tell you who wrote it and when.
          The commit message (if it was written well) will tell you why. Never assume
          code is wrong just because you don't understand it yet.
        </p>
      </section>

      {/* Read tests */}
      <section id="read-the-tests" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Read the tests</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Tests are the most accurate documentation in a codebase, because unlike comments
          they break when they are wrong. A well-written test shows you exactly how a
          function is supposed to be called and what it is supposed to return.
        </p>
        <CodeBlock language="javascript">
          {`// From the test file — tells you the contract
describe("formatCurrency", () => {
  it("formats USD with two decimal places", () => {
    expect(formatCurrency(1000, "USD")).toBe("$1,000.00");
  });
  it("returns empty string for null input", () => {
    expect(formatCurrency(null, "USD")).toBe("");
  });
  it("handles negative values", () => {
    expect(formatCurrency(-50, "USD")).toBe("-$50.00");
  });
});`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Three tests told you the function's entire behavior contract. You did not need to
          read the implementation at all. When good tests exist, read them first.
        </p>
      </section>

      {/* 5-minute rule */}
      <section id="the-5-minute-rule" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">The 5-minute rule</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Before asking someone to explain a piece of code, spend 5 minutes trying to
          understand it yourself. Use Go to Definition, read the test, check the git log,
          try to trace the data flow. Not because you might figure it out (though you
          often will), but because the effort of trying makes the explanation you receive
          stick.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If after 5 minutes you are still lost, ask. But you will be asking a much better
          question than "what does this do?" — you will be asking "I see it transforms X
          to Y, but I don't understand why it handles the empty string case this way."
        </p>
      </section>

      {/* Rewrite vs understand */}
      <section id="when-to-rewrite-vs-when-to-understand" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">When to rewrite vs when to understand</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The junior developer instinct is to rewrite code that looks messy or hard to
          understand. Resist this. Code that looks wrong was almost always written for a
          reason — a browser bug, a race condition, a business rule from two years ago
          that no one documented. Rewriting it without understanding it means reintroducing
          the bug it was solving.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The rule: understand first, always. If after understanding you still think it
          needs a rewrite, you are now in a position to rewrite it correctly — and to
          write a test proving the edge case still works.
        </p>
      </section>

      {/* Build a mental model */}
      <section id="build-a-mental-model" className="space-y-5">
        <h2 className="text-2xl font-serif text-foreground">Build a mental model — literally draw it</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          When you are reading a complex system — a state machine, a data pipeline, a
          multi-service flow — draw it on paper. Boxes for components or services, arrows
          for data flow and function calls. Not a formal diagram, just a sketch.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          This forces you to externalize your mental model, which reveals the gaps. When
          you can not draw an arrow because you do not know what calls this function, you
          know exactly what to look up next. The drawing is not the goal — the process of
          drawing is.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Senior developers do this. Not just juniors. The difference is that seniors have
          faster pattern recognition, so they need to draw less often — but when they are
          in genuinely unfamiliar territory, they still reach for a pen.
        </p>
      </section>

    </article>
  );
}
