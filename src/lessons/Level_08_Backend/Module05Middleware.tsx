import React from "react";
import { CodeBlock } from "../../components/ui/CodeBlock";

export default function Module05Middleware() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── 1. Hook ───────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Middleware is the assembly line of an Express application. Each function in the chain
          can inspect the request, modify it, reject it early, or pass it to the next function.
          Cross-cutting concerns — auth, validation, logging, rate limits — live here so your
          route handlers stay focused on business logic.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#middleware-is-just-a-function" className="text-primary hover:underline">→ Middleware is just a function</a></li>
          <li><a href="#global-vs-route-middleware" className="text-primary hover:underline">→ Global vs route middleware</a></li>
          <li><a href="#input-validation-with-zod" className="text-primary hover:underline">→ Input validation with Zod</a></li>
          <li><a href="#cors" className="text-primary hover:underline">→ CORS</a></li>
          <li><a href="#rate-limiting" className="text-primary hover:underline">→ Rate limiting</a></li>
          <li><a href="#helmet" className="text-primary hover:underline">→ Helmet</a></li>
          <li><a href="#request-logging-with-morgan" className="text-primary hover:underline">→ Request logging with Morgan</a></li>
        </ul>
      </section>

      {/* ── 2. What middleware is ─────────────────────────────── */}
      <section id="middleware-is-just-a-function" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Middleware is just a function</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          An Express middleware function receives
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">req</code>,
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">res</code>, and
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">next</code>.
          Calling <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">next()</code> passes control
          to the next middleware in the chain. Not calling it — or calling
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">res.json()</code> instead —
          ends the chain.
        </p>
        <CodeBlock language="javascript">
          {`// A minimal middleware
function logRequest(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next();   // must call next() or the request hangs forever
}

app.use(logRequest);`}
        </CodeBlock>
      </section>

      {/* ── 3. Global vs route middleware ─────────────────────── */}
      <section id="global-vs-route-middleware" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Global vs route middleware</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">app.use(fn)</code> runs on every request.
          Passing a middleware function directly to a route handler runs it only for that route.
        </p>
        <CodeBlock language="javascript">
          {`// Global — runs on EVERY request
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Route-level — only on this endpoint
app.get('/api/v1/me', requireAuth, (req, res) => {
  res.json({ data: req.user });
});

// Multiple middleware on one route
app.post('/api/v1/posts', requireAuth, validatePost, createPost);`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Order matters. Middleware registered with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">app.use</code> runs
          in the order it is registered. Always register
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">express.json()</code> before any route that
          reads <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">req.body</code>.
        </p>
      </section>

      {/* ── 4. Input validation with Zod ──────────────────────── */}
      <section id="input-validation-with-zod" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Input validation with Zod</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Never trust <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">req.body</code> without validation.
          <strong className="text-foreground"> Zod</strong> lets you declare a schema and parse the input,
          returning either the validated data or a typed error.
        </p>
        <CodeBlock language="javascript">
          {`import { z } from 'zod';

const CreateUserSchema = z.object({
  name:  z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
});

function validateCreateUser(req, res, next) {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({ error: result.error.flatten() });
  }
  req.body = result.data;   // strip unknown fields
  next();
}

app.post('/api/v1/users', validateCreateUser, registerUser);`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Reassigning <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">req.body = result.data</code> strips any
          extra fields the client sent, preventing mass-assignment vulnerabilities.
          Install with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install zod</code>.
        </p>
      </section>

      {/* ── 5. CORS ───────────────────────────────────────────── */}
      <section id="cors" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">CORS</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Browsers block cross-origin requests by default. When your frontend runs on
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">https://myapp.com</code> and your API runs on
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">https://api.myapp.com</code>, the browser sends a
          CORS preflight and rejects the response unless the API explicitly allows it.
        </p>
        <CodeBlock language="javascript">
          {`import cors from 'cors';

// Allow only your frontend — production setting
app.use(cors({
  origin: 'https://myapp.com',
  credentials: true,   // required if you send cookies
}));

// During development: allow localhost
app.use(cors({
  origin: ['https://myapp.com', 'http://localhost:5173'],
  credentials: true,
}));`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Never use <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">origin: '*'</code> with
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">credentials: true</code> — browsers reject
          the combination. Install with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install cors</code>.
        </p>
      </section>

      {/* ── 6. Rate limiting ──────────────────────────────────── */}
      <section id="rate-limiting" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Rate limiting</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Rate limiting protects your API from abuse — scrapers, credential stuffing attacks, and
          runaway clients. Apply a strict limit on auth endpoints and a looser one globally.
        </p>
        <CodeBlock language="javascript">
          {`import rateLimit from 'express-rate-limit';

// Global limit: 100 requests per minute per IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Auth limit: 10 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, try again in 15 minutes' },
});
app.post('/api/v1/auth/login', authLimiter, login);`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Install with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install express-rate-limit</code>.
          In production, configure a Redis store to share rate-limit state across multiple server instances.
        </p>
      </section>

      {/* ── 7. Helmet ─────────────────────────────────────────── */}
      <section id="helmet" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Helmet — security headers</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Helmet sets a collection of security-related HTTP response headers in one line.
          It does not prevent all attacks but closes several common vectors with zero effort.
        </p>
        <CodeBlock language="javascript">
          {`import helmet from 'helmet';

app.use(helmet());   // sets X-Content-Type-Options, X-Frame-Options,
                     // Content-Security-Policy, and more`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Install with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install helmet</code>.
          Register it before your routes.
        </p>
      </section>

      {/* ── 8. Request logging with Morgan ────────────────────── */}
      <section id="request-logging-with-morgan" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">Request logging with Morgan</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Morgan logs every incoming request — method, URL, status code, response time.
          It is the fastest way to understand what your server is receiving.
        </p>
        <CodeBlock language="javascript">
          {`import morgan from 'morgan';

// 'dev' format is compact and coloured — good for development
app.use(morgan('dev'));

// 'combined' format includes IP and user-agent — good for production
app.use(morgan('combined'));`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Output from <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">morgan('dev')</code> looks like:
        </p>
        <CodeBlock language="javascript">
          {`GET /api/v1/posts 200 12.345 ms - 843
POST /api/v1/auth/login 401 3.210 ms - 31`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Install with <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">npm install morgan</code>.
        </p>
      </section>

    </article>
  );
}
