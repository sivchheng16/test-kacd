import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";
import { CodeBlock } from "../../components/ui/CodeBlock";

const CORRECT = "app/products/[id]/page.tsx";

export default function Module02Routing() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          In Next.js, your folder structure <em>is</em> your URL structure. There is no route
          configuration file — you create a folder, add a{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono">page.tsx</code>, and the
          URL exists.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#static-routes" className="text-primary hover:underline">→ Static routes</a></li>
          <li><a href="#dynamic-routes" className="text-primary hover:underline">→ Dynamic routes</a></li>
          <li><a href="#route-groups" className="text-primary hover:underline">→ Route groups</a></li>
          <li><a href="#nested-layouts" className="text-primary hover:underline">→ Nested layouts</a></li>
          <li><a href="#the-link-component" className="text-primary hover:underline">→ The Link component</a></li>
          <li><a href="#userouter-and-usepathname" className="text-primary hover:underline">→ useRouter and usePathname</a></li>
          <li><a href="#parallel-routes" className="text-primary hover:underline">→ Parallel routes</a></li>
          <li><a href="#middleware" className="text-primary hover:underline">→ Middleware</a></li>
          <li><a href="#knowledge-check" className="text-primary hover:underline">→ Knowledge Check</a></li>
        </ul>
      </section>

      {/* ── 2. Static routes ───────────────────────────────── */}
      <section id="static-routes" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Static routes</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every folder inside <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">app/</code>{" "}
          that contains a <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">page.tsx</code>{" "}
          becomes a publicly accessible URL:
        </p>
        <CodeBlock language="javascript">
          {`app/page.tsx          →  /
app/about/page.tsx    →  /about
app/blog/page.tsx     →  /blog
app/contact/page.tsx  →  /contact`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Each <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">page.tsx</code>{" "}
          is just a React component that exports a default function. No special syntax, no imports
          from a router package.
        </p>
      </section>

      {/* ── 3. Dynamic routes ──────────────────────────────── */}
      <section id="dynamic-routes" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Dynamic routes</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Wrap a folder name in square brackets to make it dynamic. The bracket name becomes the
          parameter your component receives:
        </p>
        <CodeBlock language="javascript">
          {`app/blog/[slug]/page.tsx   →  /blog/hello-world
                           →  /blog/next-js-guide
                           →  /blog/anything-at-all`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Inside the page component, the parameter arrives via{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">props.params</code>:
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">
            app/blog/[slug]/page.tsx
          </div>
          <CodeBlock language="json">
          {`interface Props {
  params: { slug: string };
}

export default async function BlogPost({ params }: Props) {
  const post = await fetchPost(params.slug); // "hello-world"

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`}
        </CodeBlock>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You can have multiple dynamic segments — for example{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">app/shop/[category]/[id]/page.tsx</code>{" "}
          → <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">/shop/electronics/42</code>.
          Both <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">category</code>{" "}
          and <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">id</code> appear in{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">params</code>.
        </p>
      </section>

      {/* ── 4. Route groups ────────────────────────────────── */}
      <section id="route-groups" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Route groups</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Wrap a folder name in parentheses to create a{" "}
          <strong className="text-foreground">route group</strong>. The folder is used for
          organisation only — it does not appear in the URL:
        </p>
        <CodeBlock language="javascript">
          {`app/
├── (marketing)/
│   ├── about/page.tsx    →  /about   (not /marketing/about)
│   └── contact/page.tsx  →  /contact
└── (dashboard)/
    ├── layout.tsx        //   separate layout for dashboard only
    ├── overview/page.tsx →  /overview
    └── settings/page.tsx →  /settings`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Route groups are most useful when you want different layouts for different sections of your
          site without that section name showing in the URL.
        </p>
      </section>

      {/* ── 5. Nested layouts ──────────────────────────────── */}
      <section id="nested-layouts" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Nested layouts</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every folder can have its own{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">layout.tsx</code>.
          Layouts nest: a child layout renders inside its parent's{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">{"{children}"}</code>{" "}
          slot.
        </p>
        <CodeBlock language="html">
          {`app/
├── layout.tsx          <!--  root layout: <html>, <body>, global nav -->
└── dashboard/
    ├── layout.tsx      <!--  dashboard layout: sidebar + main area -->
    ├── page.tsx        →  /dashboard
    └── settings/
        └── page.tsx    →  /dashboard/settings`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When a user visits <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">/dashboard/settings</code>,
          the render tree is: root layout → dashboard layout → settings page. Both layouts stay
          mounted as you navigate within the dashboard.
        </p>
      </section>

      {/* ── 6. Link component ──────────────────────────────── */}
      <section id="the-link-component" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">The Link component</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">{"<Link>"}</code>{" "}
          from{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">next/link</code>{" "}
          instead of a plain{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">{"<a>"}</code>{" "}
          tag. It prefetches the linked page in the background when the link enters the viewport, so
          navigation feels instant.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">
            app/layout.tsx
          </div>
          <CodeBlock language="json">
          {`import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 p-4">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}`}
        </CodeBlock>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">{"<Link>"}</code>{" "}
          also accepts a{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">replace</code>{" "}
          prop to replace the history entry instead of pushing, and a{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">prefetch={"{false}"}</code>{" "}
          prop to disable prefetching when you don't want it.
        </p>
      </section>

      {/* ── 7. useRouter and usePathname ───────────────────── */}
      <section id="userouter-and-usepathname" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">useRouter and usePathname</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For programmatic navigation — redirecting after a form submit, for example — use the hooks
          from{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">next/navigation</code>{" "}
          (not <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">next/router</code>{" "}
          — that's the legacy Pages Router import):
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">
            Client Component — programmatic navigation
          </div>
          <CodeBlock language="json">
          {`'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/about"

  function handleLogin() {
    // do auth work...
    router.push('/dashboard');   // programmatic navigate
  }

  return (
    <nav>
      <span>Current page: {pathname}</span>
      <button onClick={handleLogin}>Log in</button>
    </nav>
  );
}`}
        </CodeBlock>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Hook</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Returns</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Use for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["useRouter()", "router object", "push(), replace(), back(), refresh()"],
                ["usePathname()", "string", "Current URL path (highlight active nav link)"],
                ["useSearchParams()", "ReadonlyURLSearchParams", "Read ?query=value from the URL"],
                ["useParams()", "Record<string, string>", "Read [slug] dynamic segment values"],
              ].map(([hook, ret, use]) => (
                <tr key={hook} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{hook}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{ret}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 8. Parallel routes (brief) ─────────────────────── */}
      <section id="parallel-routes" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Parallel routes</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A folder prefixed with <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">@</code>{" "}
          is a <strong className="text-foreground">slot</strong>. A layout can render multiple slots
          simultaneously — useful for modals that overlay a page without unmounting it:
        </p>
        <CodeBlock language="javascript">
          {`app/
├── layout.tsx            //  receives both { children, modal }
├── page.tsx              //  main feed
└── @modal/
    └── photo/
        └── [id]/
            └── page.tsx  →  overlaid on top of the feed`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is an advanced pattern. You'll use it later in the project module — for now, just
          know the{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">@folder</code>{" "}
          convention means "render this alongside the main page, not instead of it."
        </p>
      </section>

      {/* ── 9. Middleware ──────────────────────────────────── */}
      <section id="middleware" className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">Middleware</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">middleware.ts</code>{" "}
          file at the project root runs <strong className="text-foreground">before every request</strong>{" "}
          — before the page renders, before the API route responds. The most common use is
          protecting routes: check for a session cookie and redirect to{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">/login</code>{" "}
          if the user isn't authenticated.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="px-4 py-2 bg-stone-50 border-b border-border text-xs font-medium text-muted-foreground">
            middleware.ts — protect /dashboard routes
          </div>
          <CodeBlock language="javascript">
          {`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CodeBlock } from "../../components/ui/CodeBlock";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // allow the request through
}

// Run middleware only on these paths
export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};`}
        </CodeBlock>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">matcher</code>{" "}
          config limits which routes trigger the middleware — without it, the middleware runs on
          every request including static files.
        </p>
      </section>

      {/* ── Knowledge Check ────────────────────────────────── */}
      <section id="knowledge-check" className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          You are building a product detail page at the URL{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">/products/42</code>,
          where <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">42</code>{" "}
          is any product ID. Which file path should you create?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "app/products/page.tsx",
            CORRECT,
            "app/products/:id/page.tsx",
            "app/[products]/[id]/page.tsx",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                if (opt === CORRECT) notifyChallengePassed(moduleId ?? "");
              }}
              className={cn(
                "text-left px-5 py-3.5 rounded-xl border text-sm font-mono transition-all",
                selected === opt
                  ? opt === CORRECT
                    ? "border-green-400 bg-green-50 text-green-800"
                    : "border-red-300 bg-red-50 text-red-800"
                  : "border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {selected && selected !== CORRECT && (
          <p className="text-sm text-red-600">
            Not quite — Next.js dynamic segments use square brackets, not colons. Only the segment
            that should be dynamic needs brackets.
          </p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">
            Correct!{" "}
            <code className="bg-stone-100 px-1 rounded text-xs font-mono">app/products/[id]/page.tsx</code>{" "}
            creates the route. Inside the component,{" "}
            <code className="bg-stone-100 px-1 rounded text-xs font-mono">params.id</code> will hold
            the value — <code className="bg-stone-100 px-1 rounded text-xs font-mono">"42"</code> for{" "}
            <code className="bg-stone-100 px-1 rounded text-xs font-mono">/products/42</code>.
          </p>
        )}
      </section>

      {/* ── Gate ───────────────────────────────────────────── */}
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
              Answer the knowledge check above to unlock the next lesson.
            </p>
          </div>
        )}
      </section>

    </article>
  );
}
