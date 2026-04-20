import { useAuth } from "../context/AuthContext";

/**
 * A hook to protect actions that require authentication.
 * If the user is authenticated, the action is executed immediately.
 * If not, the Auth Modal is opened and the action is queued for execution after login.
 */
export function useRequireAuth() {
  const { user, openAuthModal } = useAuth();

  const requireAuth = <T extends (...args: any[]) => any>(action: T) => {
    return ((...args: Parameters<T>) => {
      if (user) {
        return action(...args);
      } else {
        openAuthModal(() => action(...args));
      }
    }) as T;
  };

  return { requireAuth, isAuthenticated: !!user };
}
