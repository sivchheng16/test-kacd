import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, RefreshCcw, Copy, ShieldAlert, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { errorLogger } from "../lib/errorLogger";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log the error to our system
    errorLogger.log({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
    });
  }

  private handleReset = () => {
    // Clear potentially corrupt data and refresh
    localStorage.removeItem("auth_token"); // Optional: deep reset
    window.location.href = "/";
  };

  private copyDiagnostics = () => {
    const diagnosticData = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    navigator.clipboard.writeText(JSON.stringify(diagnosticData, null, 2));
    alert("Diagnostics copied to clipboard.");
  };

  public render() {
  if (this.state.hasError) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#00ffcc] font-mono flex items-center justify-center p-6 sm:p-12 overflow-hidden relative">
        {/* Background scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

        {/* Glowing background blooms */}
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-red-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-primary/10 blur-[150px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-4xl relative z-10"
        >
          <div className="glass-panel border-red-500/30 bg-red-500/5 p-8 md:p-16 rounded-[40px] shadow-[0_32px_128px_rgba(255,0,0,0.1)] relative overflow-hidden">
            {/* Internal glowing line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-3xl bg-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                  <ShieldAlert size={48} strokeWidth={1.5} />
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-red-500 uppercase tracking-[0.5em] text-[10px] font-bold">
                    <span className="w-8 h-[1px] bg-red-500" />
                    SYSTEM_HALT_DETECTED
                  </div>
                  <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter text-white uppercase italic">
                    Kernel <span className="text-red-500">Panic.</span>
                  </h1>
                  <p className="text-white/60 text-lg leading-relaxed max-w-xl italic">
                    "A critical exception has occurred in the frontend orchestration layer. The current process has been suspended to prevent further state corruption."
                  </p>
                </div>

                {/* Diagnostic Console */}
                <div className="bg-black/60 rounded-3xl p-8 border border-white/5 font-mono text-[11px] space-y-4 relative group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-white/20 uppercase tracking-widest text-[9px]">DIAGNOSTICS_V2.6</div>
                  </div>

                  <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-4">
                    <div className="text-red-400">
                      <span className="text-white/40 mr-2">[!]</span>
                      FATAL_ERROR: {this.state.error?.name || "Exception"}
                    </div>
                    <div className="text-white/80">
                      <span className="text-white/40 mr-2">»</span>
                      {this.state.error?.message}
                    </div>
                    <div className="text-white/30 text-[9px] leading-tight pt-4">
                      STACK_TRACE: {this.state.error?.stack?.split('\n').slice(0, 3).join('\n ')}...
                    </div>
                  </div>

                  <Button
                    onClick={this.copyDiagnostics}
                    variant="ghost"
                    className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/5 text-[9px] uppercase tracking-widest gap-2"
                  >
                    <Copy size={12} /> Copy UUID
                  </Button>
                </div>

                <div className="flex flex-wrap gap-6 pt-8">
                  <Button
                    onClick={this.handleReset}
                    className="h-16 px-10 rounded-full bg-primary text-background font-bold tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-xl shadow-primary/20 gap-3"
                  >
                    <RefreshCcw size={18} />
                    Initialize System Reboot
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 px-10 rounded-full border-white/10 hover:bg-white/5 font-bold tracking-[0.2em] uppercase transition-all"
                    onClick={() => window.history.back()}
                  >
                    Return to safe_mode
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.8em]">
              KOOMPI_OS_RECOVERY_PROTOCOL // NO_DATA_LOST
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return this.props.children;
}
}

export default ErrorBoundary;
