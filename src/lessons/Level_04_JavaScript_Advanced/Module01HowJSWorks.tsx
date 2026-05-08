import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2, Cpu, Zap, Layers, RefreshCw, Box } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module01HowJSWorks() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          How JavaScript Works
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Go under the hood to understand the engine powering your code. Master the mechanics 
          of the call stack, hoisting, scope, and closures to write high-performance, bug-free JavaScript.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#execution-context" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Execution Context & Stack</a></li>
            <li><a href="#hoisting-tdz" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Hoisting & TDZ</a></li>
            <li><a href="#scope-chain" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Scope Chain</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#recursion" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Recursion</a></li>
            <li><a href="#closures" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Closures</a></li>
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
          </ul>
        </div>
      </section>

      {/* 1. Execution Context & Call Stack */}
      <section id="execution-context" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Execution Context & Stack</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Everything in JavaScript happens inside an <strong>Execution Context</strong>. It's like a container 
          where your code is evaluated and executed. It has two components:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-stone-50 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Box size={18} className="text-blue-500" />
              Memory Component
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Also known as Variable Environment. This is where variables and functions are stored as key-value pairs.
            </p>
          </div>
          <div className="p-6 bg-stone-50 rounded-xl border border-border">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Zap size={18} className="text-amber-500" />
              Code Component
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Also known as Thread of Execution. This is where code is executed one line at a time.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The <strong>Call Stack</strong> manages these contexts using the LIFO (Last In, First Out) principle. 
          When a function is called, a new context is pushed; when it finishes, it's popped.
        </p>
      </section>

      {/* 2. Hoisting & TDZ */}
      <section id="hoisting-tdz" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Hoisting & TDZ</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Hoisting</strong> is the behavior of moving declarations to the top of their scope during 
          the memory creation phase.
        </p>
        <CodeBlock language="javascript" title="Hoisting Behavior">
          {`console.log(a); // undefined (hoisted with default value)
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

// Temporal Dead Zone (TDZ)
// The period between the start of the scope and the actual declaration of 'b'.`}
        </CodeBlock>
      </section>

      {/* 3. Scope Chain */}
      <section id="scope-chain" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Scope Chain</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The <strong>Scope Chain</strong> is how JS looks for variables. If a variable isn't in the current scope, 
          it looks in the outer environment, all the way to the Global Scope.
        </p>
        <CodeBlock language="javascript" title="Lexical Scope">
          {`const globalVar = "I am global";

function outer() {
  const outerVar = "I am outer";
  
  function inner() {
    console.log(globalVar); // Found in Global Scope
    console.log(outerVar);  // Found in Outer Scope
  }
  inner();
}
outer();`}
        </CodeBlock>
      </section>

      {/* 4. Recursion */}
      <section id="recursion" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Recursion</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Recursion is when a function calls itself. To avoid infinite loops (Stack Overflow), 
          you must always have a <strong>Base Case</strong>.
        </p>
        <CodeBlock language="javascript" title="Factorial Example">
          {`function factorial(n) {
  if (n === 1) return 1; // Base Case
  return n * factorial(n - 1); // Recursive Step
}

console.log(factorial(5)); // 120`}
        </CodeBlock>
      </section>

      {/* 5. Closures */}
      <section id="closures" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Closures</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          A <strong>Closure</strong> is a function bundled together with its lexical environment. 
          It allows an inner function to access variables from an outer function even after 
          the outer function has finished executing.
        </p>
        <CodeBlock language="javascript" title="Counter Closure">
          {`function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`}
        </CodeBlock>
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-4 text-base leading-relaxed shadow-inner">
          <p className="font-semibold">Key takeaways from this module:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Execution Context</strong> is the foundation of how JS runs code.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Hoisting</strong> behaves differently for <code>var</code> (undefined) and <code>let/const</code> (TDZ).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Recursion</strong> requires a base case to prevent stack overflows.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Closures</strong> are powerful for data privacy and functional patterns.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Final Challenge</h2>
        <p className="text-muted-foreground leading-relaxed">
          Implement a function that uses a <strong>Closure</strong> to create a private state. 
          Create a function <code>createSecret</code> that takes a string and returns a function 
          which, when called, returns that string.
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `function createSecret(message) {
  // Implement closure here
}

const getSecret = createSecret("JavaScript is awesome!");
console.log(getSecret()); // Should output: "JavaScript is awesome!"`,
          }}
          challenge={{
            prompt: "Create a closure that returns a private message.",
            check(_html, _css, js) {
              if (!js.includes("return function"))
                return { passed: false, message: "Use a nested function to create a closure." };
              return { passed: true, message: "Perfect! You've mastered closures." };
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
              <p className="text-lg font-bold text-green-900">Module Complete!</p>
              <p className="text-green-700 mt-1">
                You now understand the inner workings of JavaScript.
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
