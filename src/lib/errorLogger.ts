import { toast } from "sonner";

export interface AppError {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  path: string;
  userAgent: string;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private errors: AppError[] = [];

  private constructor() {
    // Initialize global listeners
    window.onerror = (message, source, lineno, colno, error) => {
      this.log({
        message: String(message),
        stack: error?.stack,
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        userAgent: navigator.userAgent,
      });
    };

    window.onunhandledrejection = (event) => {
      this.log({
        message: `Unhandled Rejection: ${event.reason}`,
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        userAgent: navigator.userAgent,
      });
    };
  }

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  public log(error: Partial<AppError>) {
    const fullError: AppError = {
      message: error.message || "Unknown Error",
      stack: error.stack,
      componentStack: error.componentStack,
      timestamp: error.timestamp || new Date().toISOString(),
      path: error.path || window.location.pathname,
      userAgent: error.userAgent || navigator.userAgent,
    };

    this.errors.push(fullError);
    
    // Log to console in dev
    console.group("%c[System Error captured]", "color: #ff4444; font-weight: bold;");
    console.error(fullError.message);
    console.log("Path:", fullError.path);
    console.log("Stack:", fullError.stack);
    console.groupEnd();

    // Optionally show a toast for non-fatal errors
    if (!error.componentStack) {
      toast.error("Process error detected", {
        description: fullError.message,
      });
    }

    // This is where you would call Firestore to save the error
    // saveErrorToFirestore(fullError);
    
    // Save to localStorage for recovery analysis
    this.persistToLocal();
  }

  private persistToLocal() {
    try {
      const recentErrors = this.errors.slice(-10); // Keep last 10
      localStorage.setItem("system_error_logs", JSON.stringify(recentErrors));
    } catch (e) {
      console.warn("Failed to persist error logs", e);
    }
  }

  public getErrors(): AppError[] {
    return this.errors;
  }

  public clearErrors() {
    this.errors = [];
    localStorage.removeItem("system_error_logs");
  }
}

export const errorLogger = ErrorLogger.getInstance();
