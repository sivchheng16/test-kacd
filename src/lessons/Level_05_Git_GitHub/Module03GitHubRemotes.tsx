import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";
import { CodeBlock } from "../../components/ui/CodeBlock";

const OPTIONS = [
  "git connect origin <url>",
  "git remote add origin <url>",
  "git push origin main",
  "git link remote <url>",
];
const CORRECT = "git remote add origin <url>";

export default function Module03GitHubRemotes() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
          Track 05 · Git &amp; GitHub
        </p>
        <h1 className="text-4xl font-serif text-foreground">GitHub &amp; Remotes</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          A <em>remote</em> is a copy of your repository hosted on a server — typically GitHub.
          This lesson covers creating a GitHub account, linking a local repo to a remote,
          pushing your work online, cloning existing projects, and pulling updates.
        </p>
      </section>

      {/* ── Overview ───────────────────────────────────────── */}
      <section className="rounded-xl bg-stone-50 border border-border px-6 py-5 space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">In this module</p>
        <ul className="space-y-1.5 text-sm">
          <li><a href="#setting-up-github" className="text-primary hover:underline">→ Setting Up GitHub</a></li>
          <li><a href="#creating-a-remote-repo" className="text-primary hover:underline">→ Creating a Remote Repo</a></li>
          <li><a href="#linking-local-to-remote" className="text-primary hover:underline">→ Linking Local to Remote</a></li>
          <li><a href="#git-push" className="text-primary hover:underline">→ git push</a></li>
          <li><a href="#git-clone" className="text-primary hover:underline">→ git clone</a></li>
          <li><a href="#git-pull" className="text-primary hover:underline">→ git pull</a></li>
          <li><a href="#typical-daily-workflow" className="text-primary hover:underline">→ Typical Daily Workflow</a></li>
          <li><a href="#quick-reference" className="text-primary hover:underline">→ Quick Reference</a></li>
          <li><a href="#knowledge-check" className="text-primary hover:underline">→ Knowledge Check</a></li>
        </ul>
      </section>

      {/* GitHub account */}
      <section id="setting-up-github" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Setting Up GitHub</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Go to <strong>github.com</strong> and create a free account.</li>
          <li>Choose a username you're happy using professionally — it appears on all your public repos.</li>
          <li>
            Set up SSH authentication so you don't type your password on every push:
          </li>
        </ol>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal — SSH key setup (one-time)
          </div>
          <CodeBlock language="json">
          {`# Generate a key pair
ssh-keygen -t ed25519 -C "you@example.com"
# Press Enter three times to accept defaults

# Copy the public key to your clipboard
cat ~/.ssh/id_ed25519.pub

# Paste it at: GitHub → Settings → SSH keys → New SSH key

# Test the connection
ssh -T git@github.com
# "Hi username! You've successfully authenticated."`}
        </CodeBlock>
        </div>
      </section>

      {/* Create a repo on GitHub */}
      <section id="creating-a-remote-repo" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Creating a Remote Repo</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Click the <strong>+</strong> icon in the top-right corner of GitHub → <em>New repository</em>.</li>
          <li>Name it, choose Public or Private, and leave <em>Initialize this repository</em> <strong>unchecked</strong> (you already have a local repo).</li>
          <li>Copy the SSH URL shown: <code className="font-mono">git@github.com:username/repo.git</code></li>
        </ol>
      </section>

      {/* git remote add */}
      <section id="linking-local-to-remote" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Linking Local to Remote</h2>
        <p className="text-base text-muted-foreground">
          A <em>remote</em> is a named URL. The conventional name for the main remote is{" "}
          <code className="font-mono text-sm">origin</code>.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <CodeBlock language="javascript">
          {`# Add the remote (replace with your actual URL)
git remote add origin git@github.com:yourname/my-project.git

# Verify it was added
git remote -v
# origin  git@github.com:yourname/my-project.git (fetch)
# origin  git@github.com:yourname/my-project.git (push)

# Change the URL later if needed
git remote set-url origin git@github.com:yourname/new-name.git`}
        </CodeBlock>
        </div>
      </section>

      {/* git push */}
      <section id="git-push" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git push — Uploading Commits</h2>
        <p className="text-base text-muted-foreground">
          Push sends your local commits to the remote repository.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <CodeBlock language="javascript">
          {`# First push — -u sets the upstream so future pushes are just "git push"
git push -u origin main

# All subsequent pushes
git push

# Push a specific branch
git push origin feature/navbar`}
        </CodeBlock>
        </div>
      </section>

      {/* git clone */}
      <section id="git-clone" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git clone — Downloading a Repo</h2>
        <p className="text-base text-muted-foreground">
          Clone copies an entire repository — all files, history, and branches — to your machine.
          Use it to start working on any existing project.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <CodeBlock language="javascript">
          {`# Clone via SSH (recommended — no password prompts)
git clone git@github.com:username/repo.git

# Clone via HTTPS
git clone https://github.com/username/repo.git

# Clone into a specific folder name
git clone git@github.com:username/repo.git my-folder

# After cloning, enter the directory and start working
cd repo
git log --oneline`}
        </CodeBlock>
        </div>
      </section>

      {/* git pull */}
      <section id="git-pull" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">git pull — Getting Updates</h2>
        <p className="text-base text-muted-foreground">
          Pull fetches the latest commits from the remote and merges them into your current
          branch. Run it before starting work each day to stay in sync with your team.
        </p>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Terminal
          </div>
          <CodeBlock language="javascript">
          {`# Fetch + merge in one step
git pull

# Fetch without merging (inspect first)
git fetch origin
git log origin/main..HEAD    # see what's different

# Pull and rebase instead of merge (cleaner history)
git pull --rebase`}
        </CodeBlock>
        </div>
      </section>

      {/* Typical workflow */}
      <section id="typical-daily-workflow" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Typical Daily Workflow</h2>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-3 bg-stone-50 border-b border-border text-xs font-mono text-muted-foreground">
            Start of each work session
          </div>
          <CodeBlock language="javascript">
          {`git pull                         # get team's latest changes
# ... edit files ...
git add .                        # stage your changes
git commit -m "Add feature X"   # save snapshot
git push                         # share with team`}
        </CodeBlock>
        </div>
      </section>

      {/* Quick reference */}
      <section id="quick-reference" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Quick Reference</h2>
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-foreground">Command</th>
                <th className="text-left px-4 py-2 font-semibold text-foreground">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {[
                ["git remote add origin <url>", "Link local repo to GitHub"],
                ["git remote -v", "List remote URLs"],
                ["git push -u origin main", "First push; set upstream"],
                ["git push", "Push current branch"],
                ["git clone <url>", "Download a repo"],
                ["git pull", "Fetch + merge remote changes"],
                ["git fetch", "Fetch without merging"],
              ].map(([cmd, desc]) => (
                <tr key={cmd}>
                  <td className="px-4 py-2 font-mono text-foreground">{cmd}</td>
                  <td className="px-4 py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Knowledge check */}
      <section id="knowledge-check" className="space-y-4">
        <h2 className="text-2xl font-serif text-foreground">Knowledge Check</h2>
        <p className="text-base text-muted-foreground">
          Which command links your local repository to a GitHub remote?
        </p>
        <div className="flex flex-col gap-2">
          {OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                if (opt === CORRECT) notifyChallengePassed(moduleId ?? "");
              }}
              className={cn(
                "text-left px-5 py-3.5 rounded-xl border text-sm font-sans transition-all",
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
          <p className="text-sm text-muted-foreground">Not quite — try another option.</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700 font-medium">
            Correct!{" "}
            <code className="font-mono">git remote add origin &lt;url&gt;</code> registers
            the GitHub URL as a remote named <code className="font-mono">origin</code> so you
            can push and pull.
          </p>
        )}
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
