import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary - კლასური კომპონენტი PRD P0.6 და O2 მოთხოვნების მიხედვით.
 * იჭერს გაუთვალისწინებელ JavaScript შეცდომებს React-ის ხეში.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an unexpected error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-2xl text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              ⚠️
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Something went wrong.
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
              An unexpected application error occurred. You can reload the page to continue.
            </p>
            {this.state.error && (
              <p className="mt-3 rounded-lg bg-stone-100 p-2 text-left font-mono text-[11px] text-stone-700 dark:bg-stone-800 dark:text-stone-300 overflow-x-auto">
                {this.state.error.message}
              </p>
            )}
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 inline-flex items-center rounded-xl bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
