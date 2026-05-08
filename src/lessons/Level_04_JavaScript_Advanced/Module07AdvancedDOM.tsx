import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2, MousePointer2, Zap, Layers, ShieldX } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module07AdvancedDOM() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          Advanced DOM
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Take full control of user interactions. Master complex event patterns like Bubbling, 
          Capturing, and Event Delegation to build high-performance interactive interfaces.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#bubbling-capturing" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Bubbling & Capturing</a></li>
            <li><a href="#event-delegation" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Event Delegation</a></li>
            <li><a href="#controlling-flow" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Controlling Flow</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
            <li><a href="#challenge" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* 1. Bubbling & Capturing */}
      <section id="bubbling-capturing" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Bubbling & Capturing</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          When an event occurs, it travels through the DOM in three phases. Understanding this 
          allows you to catch events at exactly the right level.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-stone-50 border border-border rounded-xl">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">1</span>
              Capturing Phase
            </h3>
            <p className="text-sm text-muted-foreground mt-1 ml-8">The event goes down from the Document root to the target element.</p>
          </div>
          <div className="p-5 bg-stone-50 border border-border rounded-xl">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">2</span>
              Target Phase
            </h3>
            <p className="text-sm text-muted-foreground mt-1 ml-8">The event reaches the specific element that was clicked/triggered.</p>
          </div>
          <div className="p-5 bg-stone-50 border border-border rounded-xl">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
              Bubbling Phase
            </h3>
            <p className="text-sm text-muted-foreground mt-1 ml-8">The event bubbles up from the target back to the root. (This is the default!)</p>
          </div>
        </div>
      </section>

      {/* 2. Event Delegation */}
      <section id="event-delegation" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Event Delegation</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Instead of adding a listener to every child element, add <strong>one listener to the parent</strong>. 
          This is memory efficient and automatically handles items added to the DOM later!
        </p>
        <CodeBlock language="javascript" title="Practical Delegation">
          {`const list = document.querySelector('#todo-list');

// We listen on the UL, not the individual buttons
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
    console.log("Deleted via delegation!");
  }
});`}
        </CodeBlock>
      </section>

      {/* 3. Controlling Flow */}
      <section id="controlling-flow" className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif font-medium text-foreground">Controlling Flow</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Sometimes you want to prevent an event from triggering parent handlers. 
          You can use <code>e.stopPropagation()</code> to "freeze" the event at the current element.
        </p>
        <CodeBlock language="javascript" title="Stopping the Bubble">
          {`button.addEventListener('click', (e) => {
  e.stopPropagation(); // Parent won't know this was clicked
  console.log("Internal click handled!");
});`}
        </CodeBlock>
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-4 text-base leading-relaxed shadow-inner">
          <p className="font-semibold">Key takeaways:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Bubbling</strong> means events move from child to parent ancestors.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span><strong>Event Delegation</strong> is the best way to handle many items efficiently.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>Use <strong>e.target</strong> to identify which element triggered the event.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
              <span>Use <strong>stopPropagation()</strong> to prevent event bubbling.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Challenge</h2>
        <p className="text-muted-foreground leading-relaxed">
          Implement <strong>Event Delegation</strong>. Add a click listener to the <code>#parent</code> 
          div. If a button is clicked, log its text content.
        </p>
        <CodePlayground
          mode="web"
          starter={{
            html: `<div id="parent" style="padding:20px; background:#f0f0f0;">
  <button>Save</button>
  <button>Edit</button>
  <button>Delete</button>
</div>`,
            js: `const parent = document.querySelector('#parent');

parent.addEventListener('click', (e) => {
  // Check if a button was clicked
  if (e.target.tagName === 'BUTTON') {
    console.log("Clicked: " + e.target.textContent);
  }
});`,
          }}
          challenge={{
            prompt: "Use event delegation to log the text of the clicked button.",
            check(_html, _css, js) {
              if (!js.includes("addEventListener")) return { passed: false, message: "Add an event listener to the parent." };
              if (!js.includes("tagName") && !js.includes("nodeName")) return { passed: false, message: "Check if the clicked target is a BUTTON." };
              return { passed: true, message: "Perfect! Event delegation is a pro skill." };
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
                You've mastered advanced browser interactions.
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
