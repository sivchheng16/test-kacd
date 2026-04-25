import type { Course, CourseModule, OutlineModule, UserCredits, Block } from "../types/course";

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
  if (!res.ok) throw new Error(data.error ?? "request_failed");
  return data as T;
}

export const courseApi = {
  getCredits(): Promise<UserCredits> {
    return api("/api/courses/credits");
  },

  requestCredits(reason: string, amount_requested = 10): Promise<{ ok: boolean }> {
    return api("/api/credits/request", {
      method: "POST",
      body: JSON.stringify({ reason, amount_requested }),
    });
  },

  generateOutline(params: {
    title: string;
    description: string;
    level: string;
    num_modules: number;
  }): Promise<{ modules: OutlineModule[] }> {
    return api("/api/courses/generate/outline", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  generateModule(params: {
    course_title: string;
    course_level: string;
    module_title: string;
    module_description: string;
  }): Promise<{ blocks: Block[] }> {
    return api("/api/courses/generate/module", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  saveCourse(params: {
    title: string;
    description: string;
    level: string;
    is_public: boolean;
    modules: Array<{ title: string; duration: string; blocks: Block[] }>;
  }): Promise<{ ok: boolean; course: Course & { modules: CourseModule[] } }> {
    return api("/api/courses", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  getMyCourses(): Promise<{ courses: Array<Course & { module_count: number }> }> {
    return api("/api/courses/mine");
  },

  getCourse(slug: string): Promise<{ course: Course & { modules: CourseModule[] } }> {
    return api(`/api/courses/${slug}`);
  },

  deleteCourse(slug: string): Promise<{ ok: boolean }> {
    return api(`/api/courses/${slug}`, { method: "DELETE" });
  },
};
