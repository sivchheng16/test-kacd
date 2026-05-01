import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { progressApi, Progress } from "../lib/progressApi";
import { useAuth } from "./AuthContext";

interface ProgressContextType {
  progress: Progress;
  markComplete: (lessonId: string, topicId: string, challengePassed?: boolean) => void;
  setLastViewed: (lessonId: string, topicId: string) => void;
  isComplete: (lessonId: string) => boolean;
  notifyChallengePassed: (lessonId: string) => void;
  isLessonUnlocked: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress>(() => progressApi.get());
  const [syncing, setSyncing] = useState(false);
  // In-memory: challenge passes during this browser session
  const sessionPassedRef = useRef<Set<string>>(new Set());
  const [, forceUpdate] = useState(0);

  // Initial load and sync on login
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        setSyncing(true);
        try {
          const synced = await progressApi.syncRemote(user._id);
          setProgress(synced);
        } catch (err) {
          console.error("Failed to sync progress:", err);
          // Fallback to local
          setProgress(progressApi.get());
        } finally {
          setSyncing(false);
        }
        sessionPassedRef.current.clear();
      } else {
        // Guest mode
        setProgress(progressApi.get());
      }
    };

    loadProgress();
  }, [user]);

  const markComplete = useCallback(async (lessonId: string, topicId: string, challengePassed?: boolean) => {
    const passed = challengePassed ?? sessionPassedRef.current.has(lessonId);
    
    // 1. Update local immediately for UI responsiveness
    const next = progressApi.markComplete(lessonId, topicId, passed);
    setProgress({ ...next });

    // 2. Push to backend if logged in
    if (user) {
      await progressApi.notifyComplete(lessonId, topicId, passed);
      // Optional: re-sync to ensure we have exactly what's on server
      // const synced = await progressApi.syncRemote(user._id);
      // setProgress(synced);
    }
  }, [user]);

  const setLastViewed = useCallback(async (lessonId: string, topicId: string) => {
    // 1. Update local immediately
    progressApi.setLastViewed(lessonId, topicId);
    setProgress(p => ({ ...p, lastViewed: { lessonId, topicId, at: new Date().toISOString() } }));

    // 2. Push to backend if logged in
    if (user) {
      await progressApi.notifyViewed(lessonId, topicId);
    }
  }, [user]);

  const isComplete = useCallback(
    (lessonId: string) => !!progress.completed[lessonId],
    [progress]
  );

  const notifyChallengePassed = useCallback((lessonId: string) => {
    sessionPassedRef.current.add(lessonId);
    forceUpdate(n => n + 1);
  }, []);

  const isLessonUnlocked = useCallback(
    (lessonId: string) =>
      sessionPassedRef.current.has(lessonId) ||
      !!progress.completed[lessonId]?.challengePassed,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress, forceUpdate]
  );

  return (
    <ProgressContext.Provider value={{ progress, markComplete, setLastViewed, isComplete, notifyChallengePassed, isLessonUnlocked }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
