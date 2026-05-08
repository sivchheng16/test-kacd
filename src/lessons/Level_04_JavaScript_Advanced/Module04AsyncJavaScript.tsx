import React from "react";
import { useParams } from "react-router-dom";
import { CodePlayground } from "../../components/playground/CodePlayground";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { CodeBlock } from "../../components/ui/CodeBlock";

const EXPLORE_SYNC = `// Synchronous — runs line by line
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third (in order)`;

const EXPLORE_PROMISES = `// Creating a Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// .then / .catch chain
delay(500)
  .then(() => {
    console.log("500ms passed");
    return "next value";
  })
  .then(val => console.log("Chained:", val))
  .catch(err => console.error("Error:", err))
  .finally(() => console.log("Always runs"));`;

const EXPLORE_ASYNC = `// async / await — reads like synchronous code
function fakeRequest(value) {
  return new Promise(resolve =>
    setTimeout(() => resolve(value), 300)
  );
}

async function loadData() {
  console.log("Fetching...");
  const result = await fakeRequest("Hello from server!");
  console.log("Got:", result);

  // Error handling
  try {
    const data = await fakeRequest("more data");
    console.log("Also got:", data);
  } catch (err) {
    console.error("Failed:", err);
  }
}

loadData();`;

const CHALLENGE_STARTER = `// Write an async function called "wait" that:
//  1. Uses "new Promise(resolve => setTimeout(resolve, 1000))" to pause for 1 second
//  2. Logs "Done!" after the wait
// Then call wait() to run it.

async function wait() {
  // your code here
}

wait();
`;

const challenge = {
  prompt:
    "Write an async function that uses `new Promise(resolve => setTimeout(resolve, 1000))` to wait 1 second. Your code must contain `async`, `await`, and `new Promise`.",
  check(_html: string, _css: string, js: string) {
    if (!/\basync\b/.test(js))
      return { passed: false, message: "Your function needs the `async` keyword." };
    if (!/\bawait\b/.test(js))
      return { passed: false, message: "Use `await` to pause until the Promise resolves." };
    if (!/new\s+Promise/.test(js))
      return { passed: false, message: "Create the delay with `new Promise(resolve => setTimeout(resolve, 1000))`." };
    return { passed: true, message: "Async/await mastered — you just wrote non-blocking code!" };
  },
};

export default function Module04AsyncJavaScript() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans py-8">

      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          Asynchronous JavaScript
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Almost everything that makes a web app interesting — fetching data, waiting for a user, 
          reading a file — is asynchronous. This lesson walks you through the event loop, Promises, and the async/await syntax 
          that makes async code as readable as synchronous code.
        </p>
      </section>

      {/* Navigation Box */}
      <section className="rounded-[2.5rem] bg-stone-50/50 border border-stone-200/60 p-10 space-y-5">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-stone-400">In this module</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#why-async-exists" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Why Async Exists</a></li>
            <li><a href="#callbacks-brief" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Callbacks (Brief)</a></li>
            <li><a href="#promises" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Promises</a></li>
          </ul>
          <ul className="space-y-3 text-[15px] font-medium">
            <li><a href="#async-await" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ async / await</a></li>
            <li><a href="#summary" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Summary</a></li>
            <li><a href="#challenge" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">→ Challenge</a></li>
          </ul>
        </div>
      </section>

      {/* The Event Loop */}
      <section id="why-async-exists" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Why Async Exists</h2>
        <p className="text-base text-muted-foreground">
          JavaScript runs on a single thread. Without async, any slow operation — a network
          request, a timer, a large computation — would freeze the entire page. The <em>event
          loop</em> lets JavaScript hand slow work to the browser or Node.js, continue running
          other code, then come back when the slow work is done.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Sync vs async execution
          </div>
          <CodeBlock language="json">
          {`console.log("A");

setTimeout(() => {
  console.log("B — after 0 ms");
}, 0);

console.log("C");

// Output: A, C, B
// Even with 0 ms, setTimeout is async — B runs after the current call stack clears.`}
        </CodeBlock>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_SYNC }} height="160px" />
      </section>

      {/* Callbacks */}
      <section id="callbacks-brief" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Callbacks (Brief)</h2>
        <p className="text-base text-muted-foreground">
          The original async pattern: pass a function to be called later. Simple for single
          operations, but deeply nested callbacks become unreadable — the so-called
          "callback hell."
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Callback hell — why we moved on
          </div>
          <CodeBlock language="javascript">
          {`getUser(id, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      getLikes(comments[0].id, (likes) => {
        // Four levels deep — and this is still simple!
        console.log(likes);
      });
    });
  });
});

// Promises and async/await solve this.`}
        </CodeBlock>
        </div>
      </section>

      {/* Promises */}
      <section id="promises" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Promises</h2>
        <p className="text-base text-muted-foreground">
          A Promise is an object that represents a value which may arrive now, later, or never.
          It has three states: <em>pending</em>, <em>fulfilled</em>, or <em>rejected</em>.
          Once settled it never changes state.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Creating and consuming a Promise
          </div>
          <CodeBlock language="json">
          {`// Create
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Sokha" });
      else reject(new Error("Invalid ID"));
    }, 1000);
  });
}

// Consume — .then / .catch chain
fetchUser(1)
  .then(user => {
    console.log(user);         // { id: 1, name: "Sokha" }
    return user.name;          // passes to next .then
  })
  .then(name => console.log("Name:", name))
  .catch(err => console.error("Oops:", err.message))
  .finally(() => console.log("Request finished"));

// Run multiple in parallel
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .then(([u1, u2, u3]) => console.log(u1, u2, u3));`}
        </CodeBlock>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_PROMISES }} height="280px" />
      </section>

      {/* Async/await */}
      <section id="async-await" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">async / await</h2>
        <p className="text-base text-muted-foreground">
          The <code className="font-mono text-sm">async</code> keyword makes a function return a
          Promise. Inside it, <code className="font-mono text-sm">await</code> pauses execution
          until the awaited Promise settles — without blocking the main thread.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            The modern pattern
          </div>
          <CodeBlock language="json">
          {`// Promise chain version
function loadData() {
  return fetchUser(1)
    .then(user => fetchPosts(user.id))
    .then(posts => console.log(posts));
}

// async/await version — same logic, easier to read
async function loadData() {
  const user  = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  console.log(posts);
}

// Error handling with try/catch
async function safeLoad(id) {
  try {
    const user = await fetchUser(id);
    return user;
  } catch (err) {
    console.error("Failed:", err.message);
    throw err; // re-throw if the caller needs to know
  }
}

// Sequential vs parallel
async function sequential() {
  const a = await fetch("/one");   // waits
  const b = await fetch("/two");   // then waits again → slower
}

async function parallel() {
  const [a, b] = await Promise.all([fetch("/one"), fetch("/two")]); // both at once
}`}
        </CodeBlock>
        </div>

        <CodePlayground mode="js" starter={{ js: EXPLORE_ASYNC }} height="300px" />
      </section>

      {/* ── Summary ───────────────────────────────────────── */}
      <section id="summary" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Summary</h2>
        <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 space-y-3 text-base leading-relaxed">
          <p>Asynchronous programming is key to a smooth web experience:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The <strong>Event Loop</strong> allows JS to handle slow tasks without freezing the main thread.</li>
            <li><strong>Promises</strong> represent a future value and have three states: pending, fulfilled, or rejected.</li>
            <li><strong>async / await</strong> is modern syntax that makes asynchronous code look and behave like synchronous code.</li>
            <li>Use <strong>try / catch</strong> for error handling in async functions.</li>
            <li>Use <strong>Promise.all()</strong> to run multiple async operations in parallel.</li>
          </ul>
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="space-y-4">
        <h2 className="text-3xl font-serif font-medium text-foreground">Challenge</h2>
        <p className="text-base text-muted-foreground">
          Write an async function called <code className="font-mono text-sm">wait</code> that
          creates a real 1-second delay using{" "}
          <code className="font-mono text-sm">{"new Promise(resolve => setTimeout(resolve, 1000))"}</code>,
          awaits it, then logs <code className="font-mono text-sm">"Done!"</code>.
        </p>
        <CodePlayground
          mode="js"
          starter={{ js: CHALLENGE_STARTER }}
          height="220px"
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
