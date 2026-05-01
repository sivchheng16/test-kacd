import { TOPICS } from "../constants";

const KEY = "koompi_progress";

export interface LessonProgress {
  lessonId: string;
  topicId: string;
  completedAt: string;
  challengePassed: boolean;
}

export interface LastViewed {
  lessonId: string;
  topicId: string;
  at: string;
}

export interface Progress {
  completed: Record<string, LessonProgress>;
  lastViewed: LastViewed | null;
  userId?: string | null;
}

const token = () => localStorage.getItem("kid_access_token") ?? "";

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
      ...options?.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = data.details ? `${data.error}: ${JSON.stringify(data.details)}` : (data.error ?? "request_failed");
    throw new Error(msg);
  }
  return data as T;
}

function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : { completed: {}, lastViewed: null, userId: null };
  } catch {
    return { completed: {}, lastViewed: null, userId: null };
  }
}

function write(p: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export const progressApi = {
  get(): Progress {
    return read();
  },

  clearLocal(): void {
    localStorage.removeItem(KEY);
  },

  markComplete(lessonId: string, topicId: string, challengePassed = false): Progress {
    const p = read();
    const existing = p.completed[lessonId];
    p.completed[lessonId] = {
      lessonId,
      topicId,
      completedAt: existing?.completedAt ?? new Date().toISOString(),
      challengePassed: existing?.challengePassed || challengePassed,
    };
    p.lastViewed = { lessonId, topicId, at: new Date().toISOString() };
    write(p);
    return p;
  },

  setLastViewed(lessonId: string, topicId: string): void {
    const p = read();
    p.lastViewed = { lessonId, topicId, at: new Date().toISOString() };
    write(p);
  },

  isComplete(lessonId: string): boolean {
    return !!read().completed[lessonId];
  },

  completedInTopic(topicId: string): number {
    const p = read();
    return Object.values(p.completed).filter(l => l.topicId === topicId).length;
  },

  recentlyCompleted(limit = 5): LessonProgress[] {
    const p = read();
    return Object.values(p.completed)
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, limit);
  },

  // ── Backend Sync ──

  async syncRemote(currentUserId?: string): Promise<Progress> {
    if (!token() || !currentUserId) return read();

    try {
      const remote = await api<{
        completed: Record<string, any>;
        lastViewed: any;
      }>("/api/progress");

      let local = read();
      let localChanged = false;

      // Handle user switch: if local progress belongs to another user, wipe it
      if (local.userId && local.userId !== currentUserId) {
        console.log("[Progress] User switched — clearing local progress");
        local = { completed: {}, lastViewed: null, userId: currentUserId };
        localChanged = true;
      }

      // 1. Merge remote -> local (Database-First)
      // We prioritize remote data but allow local data if it's more complete (e.g. offline work)
      const mergedCompleted: Record<string, LessonProgress> = { ...local.completed };

      for (const r of Object.values(remote.completed)) {
        const id = r.lesson_id;
        const remoteItem: LessonProgress = {
          lessonId: r.lesson_id,
          topicId: r.topic_id ?? this.findTopicForLesson(r.lesson_id),
          completedAt: r.completed_at,
          challengePassed: r.challenge_passed ?? false,
        };

        const l = mergedCompleted[id];
        // Remote wins if: local doesn't have it, remote is newer, or remote has challengePassed that local doesn't
        if (!l || new Date(remoteItem.completedAt) > new Date(l.completedAt) || (remoteItem.challengePassed && !l.challengePassed)) {
          mergedCompleted[id] = remoteItem;
          localChanged = true;
        }
      }
      local.completed = mergedCompleted;

      // 2. Merge lastViewed
      if (remote.lastViewed) {
        const remoteLV: LastViewed = {
          lessonId: remote.lastViewed.lesson_id,
          topicId: remote.lastViewed.topic_id,
          at: remote.lastViewed.updated_at,
        };

        if (!local.lastViewed || new Date(remoteLV.at) > new Date(local.lastViewed.at)) {
          local.lastViewed = remoteLV;
          localChanged = true;
        }
      }

      // 3. Push local -> remote (Sync Up)
      // This ensures progress made while anonymous OR while offline gets saved to the account
      for (const l of Object.values(local.completed)) {
        const r = remote.completed[l.lessonId];
        // Push if remote is missing this lesson, or local has challenge_passed that remote doesn't
        if (!r || (l.challengePassed && !r.challenge_passed)) {
          console.log("[Progress] Pushing local lesson to remote:", l.lessonId);
          await this.notifyComplete(l.lessonId, l.topicId, l.challengePassed);
        }
      }

      if (local.lastViewed && (!remote.lastViewed || new Date(local.lastViewed.at) > new Date(remote.lastViewed.updated_at))) {
        await this.notifyViewed(local.lastViewed.lessonId, local.lastViewed.topicId);
      }

      // Update the userId on local storage
      if (local.userId !== currentUserId) {
        local.userId = currentUserId;
        localChanged = true;
      }

      if (localChanged) {
        write(local);
      }

      console.log(`[Progress] Sync complete. ${Object.keys(local.completed).length} lessons loaded from remote.`);
      return local;
    } catch (err) {
      console.error("[Progress] syncRemote FAILED — falling back to local storage:", err);
      // If signed in, we still return local but at least we tried to sync
      return read();
    }
  },


  async notifyComplete(lessonId: string, topicId: string, challengePassed: boolean) {
    if (!token()) return;
    try {
      await api("/api/progress/complete", {
        method: "POST",
        body: JSON.stringify({ lessonId, topicId, challengePassed }),
      });
    } catch (err) {
      console.warn("Failed to notify backend of completion:", err);
    }
  },

  async notifyViewed(lessonId: string, topicId: string) {
    if (!token()) return;
    try {
      await api("/api/progress/viewed", {
        method: "POST",
        body: JSON.stringify({ lessonId, topicId }),
      });
    } catch (err) {
      console.warn("Failed to notify backend of view:", err);
    }
  },

  findTopicForLesson(lessonId: string): string {
    for (const t of TOPICS) {
      if (t.lessons.some(l => l.id === lessonId)) return t.id;
    }
    return "unknown";
  },
};
