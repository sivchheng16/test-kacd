import { CodeBlock } from "@/components/ui/CodeBlock";
import React from "react";

export default function Module06ProjectAPI() {
  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* ── Hook ──────────────────────────────────────────────── */}
      <section>
        <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif">
          Time to put it all together. In this project you will build a REST API from scratch:
          user registration and login, JWT auth, and full CRUD for posts.
          By the end, every endpoint will be testable with a single
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">curl</code> command.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#1-project-setup" className="text-primary hover:underline">→ 1. Project setup</a></li>
          <li><a href="#2-database-connection-supabase" className="text-primary hover:underline">→ 2. Database connection (Supabase)</a></li>
          <li><a href="#3-app-entry-point" className="text-primary hover:underline">→ 3. App entry point</a></li>
          <li><a href="#4-auth-middleware" className="text-primary hover:underline">→ 4. Auth middleware</a></li>
          <li><a href="#5-registration-and-login-endpoints" className="text-primary hover:underline">→ 5. Registration and login endpoints</a></li>
          <li><a href="#6-protected-crud-routes-for-posts" className="text-primary hover:underline">→ 6. Protected CRUD routes for posts</a></li>
          <li><a href="#7-testing-with-curl" className="text-primary hover:underline">→ 7. Testing with curl</a></li>
          <li><a href="#what-you-built" className="text-primary hover:underline">→ What you built</a></li>
        </ul>
      </section>

      {/* ── 1. Project setup ──────────────────────────────────── */}
      <section id="1-project-setup" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">1. Project setup</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Create a new Node project and install the dependencies:
        </p>
        <CodeBlock language="bash">
          {`mkdir blog-api && cd blog-api
npm init -y
npm install express bcrypt jsonwebtoken zod cors helmet morgan @supabase/supabase-js
npm install --save-dev @types/express @types/bcrypt @types/jsonwebtoken @types/cors @types/morgan`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Add <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">"type": "module"</code> to
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">package.json</code> to use ESM imports,
          then create a <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">.env</code> file:
        </p>
        <CodeBlock language="javascript">
          {`# .env
PORT=3000
JWT_SECRET=your-long-random-secret-here
SUPABASE_URL=https://xyzxyz.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...`}
        </CodeBlock>
      </section>

      {/* ── 2. Database connection ────────────────────────────── */}
      <section id="2-database-connection-supabase" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">2. Database connection (Supabase)</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          This project uses Supabase as the database layer. Create two tables in the Supabase dashboard:
        </p>
        <CodeBlock language="javascript">
          {`-- users table
create table users (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  name       text not null,
  password   text not null,
  created_at timestamptz default now()
);

-- posts table
create table posts (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text not null,
  author_id  uuid references users(id) on delete cascade,
  created_at timestamptz default now()
);`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Create <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">src/db.js</code> to initialise the Supabase client:
        </p>
        <CodeBlock language="javascript">
          {`// src/db.js
import { createClient } from '@supabase/supabase-js';

export const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);`}
        </CodeBlock>
      </section>

      {/* ── 3. App entry point ────────────────────────────────── */}
      <section id="3-app-entry-point" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">3. App entry point</h2>
        <CodeBlock language="javascript">
          {`// src/app.js
import express from 'express';
import cors    from 'cors';
import helmet  from 'helmet';
import morgan  from 'morgan';
import { authRouter }  from './routes/auth.js';
import { postsRouter } from './routes/posts.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL ?? '*' }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/auth',  authRouter);
app.use('/api/v1/posts', postsRouter);

// Error handler
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err.message ?? 'Internal server error' });
});`}
        </CodeBlock>
        <CodeBlock language="javascript">
          {`// src/index.js
import 'dotenv/config';
import { app } from './app.js';

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(\`API running on http://localhost:\${PORT}\`));`}
        </CodeBlock>
      </section>

      {/* ── 4. Auth middleware ────────────────────────────────── */}
      <section id="4-auth-middleware" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">4. Auth middleware</h2>
        <CodeBlock language="javascript">
          {`// src/middleware/requireAuth.js
import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}`}
        </CodeBlock>
      </section>

      {/* ── 5. Registration and login ─────────────────────────── */}
      <section id="5-registration-and-login-endpoints" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">5. Registration and login endpoints</h2>
        <CodeBlock language="javascript">
          {`// src/routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../db.js';

export const authRouter = Router();

const RegisterSchema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(8),
});

authRouter.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = RegisterSchema.parse(req.body);
    const hash = await bcrypt.hash(password, 10);

    const { data: user, error } = await db
      .from('users')
      .insert({ name, email, password: hash })
      .select('id, name, email')
      .single();

    if (error?.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    if (error) throw error;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ data: { user, token } });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(422).json({ error: err.flatten() });
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { data: user } = await db
      .from('users')
      .select('id, name, email, password')
      .eq('email', email)
      .single();

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...safeUser } = user;
    res.json({ data: { user: safeUser, token } });
  } catch (err) {
    next(err);
  }
});`}
        </CodeBlock>
      </section>

      {/* ── 6. Protected CRUD routes for posts ───────────────── */}
      <section id="6-protected-crud-routes-for-posts" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">6. Protected CRUD routes for posts</h2>
        <CodeBlock language="javascript">
          {`// src/routes/posts.js
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { CodeBlock } from "../../components/ui/CodeBlock";

export const postsRouter = Router();

const PostSchema = z.object({
  title: z.string().min(1).max(200),
  body:  z.string().min(1),
});

// GET /api/v1/posts — public, paginated
postsRouter.get('/', async (req, res, next) => {
  try {
    const page  = Number(req.query.page ?? 1);
    const limit = Math.min(Number(req.query.limit ?? 20), 100);
    const from  = (page - 1) * limit;

    const { data, error, count } = await db
      .from('posts')
      .select('id, title, body, created_at, author_id', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;
    res.json({ data, pagination: { total: count, page, limit } });
  } catch (err) { next(err); }
});

// GET /api/v1/posts/:id — public
postsRouter.get('/:id', async (req, res, next) => {
  try {
    const { data: post, error } = await db
      .from('posts').select('*').eq('id', req.params.id).single();
    if (error || !post) return res.status(404).json({ error: 'Post not found' });
    res.json({ data: post });
  } catch (err) { next(err); }
});

// POST /api/v1/posts — requires auth
postsRouter.post('/', requireAuth, async (req, res, next) => {
  try {
    const { title, body } = PostSchema.parse(req.body);
    const { data: post, error } = await db
      .from('posts')
      .insert({ title, body, author_id: req.user.userId })
      .select().single();
    if (error) throw error;
    res.status(201).json({ data: post });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(422).json({ error: err.flatten() });
    next(err);
  }
});

// PATCH /api/v1/posts/:id — requires auth + ownership
postsRouter.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const updates = PostSchema.partial().parse(req.body);

    const { data: existing } = await db.from('posts').select('author_id').eq('id', req.params.id).single();
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    if (existing.author_id !== req.user.userId) return res.status(403).json({ error: 'Forbidden' });

    const { data: post, error } = await db
      .from('posts').update(updates).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json({ data: post });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(422).json({ error: err.flatten() });
    next(err);
  }
});

// DELETE /api/v1/posts/:id — requires auth + ownership
postsRouter.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { data: existing } = await db.from('posts').select('author_id').eq('id', req.params.id).single();
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    if (existing.author_id !== req.user.userId) return res.status(403).json({ error: 'Forbidden' });

    const { error } = await db.from('posts').delete().eq('id', req.params.id);
    if (error) throw error;
    res.status(204).end();
  } catch (err) { next(err); }
});`}
        </CodeBlock>
      </section>

      {/* ── 7. Testing with curl ──────────────────────────────── */}
      <section id="7-testing-with-curl" className="space-y-6">
        <h2 className="text-2xl font-serif text-foreground">7. Testing with curl</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Start the server:
        </p>
        <CodeBlock language="javascript">
          {`node src/index.js`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Register a user:
        </p>
        <CodeBlock language="json">
          {`curl -s -X POST http://localhost:3000/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Rithy","email":"rithy@example.com","password":"secret123"}' | jq .`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Log in and capture the token:
        </p>
        <CodeBlock language="json">
          {`TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"rithy@example.com","password":"secret123"}' | jq -r '.data.token')

echo $TOKEN`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Create a post:
        </p>
        <CodeBlock language="json">
          {`curl -s -X POST http://localhost:3000/api/v1/posts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"title":"My First Post","body":"Hello from the backend!"}' | jq .`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Fetch all posts (no auth required):
        </p>
        <CodeBlock language="javascript">
          {`curl -s http://localhost:3000/api/v1/posts | jq .`}
        </CodeBlock>
        <p className="text-base text-muted-foreground leading-relaxed">
          Try accessing a protected route without a token — expect a
          <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded mx-1">401</code>:
        </p>
        <CodeBlock language="json">
          {`curl -s -X POST http://localhost:3000/api/v1/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title":"No token","body":"This should fail"}' | jq .
# → { "error": "Unauthorized" }`}
        </CodeBlock>
      </section>

      {/* ── Summary ───────────────────────────────────────────── */}
      <section id="what-you-built" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">What you built</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          In this project you assembled every concept from the track into a working system:
        </p>
        <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
          <li>A Node.js + Express server with a clean route/middleware structure</li>
          <li>User registration with bcrypt-hashed passwords and JWT issuance</li>
          <li>A reusable <code className="text-sm bg-stone-100 px-1.5 py-0.5 rounded">requireAuth</code> middleware</li>
          <li>Zod validation on every write endpoint</li>
          <li>Full CRUD for posts with ownership checks</li>
          <li>Consistent JSON responses and correct HTTP status codes throughout</li>
        </ul>
        <p className="text-base text-muted-foreground leading-relaxed">
          This API is ready to connect to any frontend — React, Next.js, or a mobile app.
          The next track will go deeper on databases: schema design, migrations, and querying patterns.
        </p>
      </section>

    </article>
  );
}
