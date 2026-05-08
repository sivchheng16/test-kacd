import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2, Box, Zap, Repeat, List } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module06ObjectsBasics() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          Objects Basics
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          While Arrays are lists of items, <strong>Objects</strong> are used to describe specific entities 
          using key-value pairs. Master how to group related data and logic into powerful structures.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#what-is-an-object" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ What is an Object?</a></li>
            <li><a href="#methods" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Methods (Actions)</a></li>
            <li><a href="#property-shorthand" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Property Shorthand</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#for-in-loop" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Iterating with for...in</a></li>
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
            <li><a href="#challenge" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* 1. What is an Object? */}
      <section id="what-is-an-object" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">What is an Object?</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Objects use curly braces <code className="font-mono bg-stone-100 px-1 rounded">{`{}`}</code> and consist 
          of properties. A property is a "key: value" pair.
        </p>
        <CodeBlock language="javascript" title="Object Syntax">
          {`const student = {
  name: "Sophea",
  age: 20,
  isGraduated: false
};

// Accessing properties
console.log(student.name);    // "Sophea" (Dot Notation)
console.log(student['age']);  // 20 (Bracket Notation)`}
        </CodeBlock>
      </section>

      {/* 2. Methods */}
      <section id="methods" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Methods (Actions)</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          When a property contains a function, it's called a <strong>Method</strong>. Methods allow 
          objects to "do" things.
        </p>
        <CodeBlock language="javascript" title="Adding Behavior">
          {`const person = {
  firstName: "Dara",
  greet: function() {
    console.log("Hello, my name is " + this.firstName);
  }
};

person.greet(); // "Hello, my name is Dara"`}
        </CodeBlock>
      </section>

      {/* 3. Property Shorthand */}
      <section id="property-shorthand" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Property Shorthand</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          If your variable name matches the key name, you can skip writing it twice. This is a common 
          modern ES6 feature.
        </p>
        <CodeBlock language="javascript" title="Shorthand Syntax">
          {`const title = "Inception";
const year = 2010;

// Instead of { title: title, year: year }
const movie = { title, year };`}
        </CodeBlock>
      </section>

      {/* 4. for...in Loop */}
      <section id="for-in-loop" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Iterating with for...in</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          To loop through all the keys of an object, we use a special loop called <strong>for...in</strong>.
        </p>
        <CodeBlock language="javascript" title="Looping through Properties">
          {`const fruits = { apple: 5, banana: 10, orange: 8 };

for (let key in fruits) {
  console.log(key + ": " + fruits[key]);
}`}
        </CodeBlock>
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-4 text-base leading-relaxed shadow-inner">
          <p className="font-semibold">Key Takeaways:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Objects</strong> store data in key-value pairs.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Methods</strong> are functions defined inside objects.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Property Shorthand</strong> makes code cleaner when names match.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>Use <strong>for...in</strong> to iterate over object properties.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Challenge</h2>
        <p className="text-muted-foreground leading-relaxed">
          Create an object named <code>car</code> with a property <code>brand</code> and a method 
          <code>start</code> that returns the string "Engine Started".
        </p>
        <CodePlayground
          mode="js"
          starter={{
            js: `// 1. Create the car object
const car = {
  brand: "Toyota",
  // 2. Add the start method here
};

console.log(car.brand);
// 3. Call the start method
`,
          }}
          challenge={{
            prompt: "Create a car object with a brand property and a start method.",
            check(_html, _css, js) {
              if (!js.includes("brand")) return { passed: false, message: "Add a brand property." };
              if (!js.includes("start")) return { passed: false, message: "Add a start method." };
              if (!js.includes("function") && !js.includes("() {")) return { passed: false, message: "The start property should be a function (method)." };
              return { passed: true, message: "Excellent! Object basics mastered." };
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
                You've mastered the basics of JavaScript objects.
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
