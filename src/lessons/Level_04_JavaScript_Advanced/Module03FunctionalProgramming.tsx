import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2, ShieldCheck, Zap, Filter, Calculator } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module03FunctionalProgramming() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          Functional Programming
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Write cleaner, more predictable code with Functional Programming patterns. Master 
          immutability, pure functions, and the "Big Three" array methods used in every modern codebase.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#pure-functions" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Pure Functions</a></li>
            <li><a href="#first-class-functions" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ First-Class Functions</a></li>
            <li><a href="#array-methods" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Map, Filter, Reduce</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
            <li><a href="#challenge" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* 1. Pure Functions */}
      <section id="pure-functions" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Pure Functions</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          A <strong>Pure Function</strong> always returns the same output for the same input and has 
          <strong>no side effects</strong> (like modifying a global variable or logging to the console).
        </p>
        <CodeBlock language="javascript" title="Pure vs Impure">
          {`// Impure: Modifies external state
let total = 0;
function addImpure(a) { total += a; return total; }

// Pure: Depends only on inputs, doesn't change anything outside
function addPure(a, b) { return a + b; }`}
        </CodeBlock>
      </section>

      {/* 2. First-Class Functions */}
      <section id="first-class-functions" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">First-Class Functions</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          In JavaScript, functions are <strong>First-Class Citizens</strong>. You can store them in 
          variables, pass them as arguments, and return them from other functions (Higher-Order Functions).
        </p>
        <CodeBlock language="javascript" title="Higher-Order Functions">
          {`function multiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10`}
        </CodeBlock>
      </section>

      {/* 3. Map, Filter, Reduce */}
      <section id="array-methods" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Map, Filter, Reduce</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          These methods allow you to transform and manipulate arrays without using <code>for</code> loops, 
          leading to more declarative and readable code.
        </p>
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Zap size={18} className="text-amber-500" />
            Map: Transform
          </h3>
          <CodeBlock language="javascript">
            {`const prices = [10, 20, 30];
const taxed = prices.map(p => p * 1.1); // [11, 22, 33]`}
          </CodeBlock>

          <h3 className="text-lg font-bold flex items-center gap-2">
            <Filter size={18} className="text-blue-500" />
            Filter: Select
          </h3>
          <CodeBlock language="javascript">
            {`const scores = [45, 80, 92, 30];
const passing = scores.filter(s => s >= 50); // [80, 92]`}
          </CodeBlock>

          <h3 className="text-lg font-bold flex items-center gap-2">
            <Calculator size={18} className="text-purple-500" />
            Reduce: Accumulate
          </h3>
          <CodeBlock language="javascript">
            {`const cart = [5, 15, 10];
const total = cart.reduce((acc, curr) => acc + curr, 0); // 30`}
          </CodeBlock>
        </div>
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-4 text-base leading-relaxed shadow-inner">
          <p className="font-semibold">Key takeaways:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Pure Functions</strong> are predictable and easy to test.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Higher-Order Functions</strong> take or return other functions.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Map & Filter</strong> create new arrays without mutating the original.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Reduce</strong> is the most flexible tool for boiling down data.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Challenge</h2>
        <p className="text-muted-foreground leading-relaxed">
          Use <code>filter</code> to find all numbers greater than 10, then use <code>map</code> 
          to double those numbers.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `const numbers = [5, 12, 8, 130, 44];

// 1. Filter numbers > 10
const filtered = numbers.filter(n => n > 10);

// 2. Map the filtered numbers to double their value
const doubled = filtered.map(n => n * 2);

console.log(doubled); // Should output: [24, 260, 88]`,
          }}
          challenge={{
            prompt: "Filter numbers > 10 and map them to double their value.",
            check(_html, _css, js) {
              if (!js.includes("filter")) return { passed: false, message: "Use the filter method." };
              if (!js.includes("map")) return { passed: false, message: "Use the map method." };
              return { passed: true, message: "Great! Functional chains are very powerful." };
            }
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
              <p className="text-lg font-bold text-green-900">Module Complete!</p>
              <p className="text-green-700 mt-1">
                You're thinking like a functional programmer now.
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
