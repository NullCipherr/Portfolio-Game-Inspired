import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 font-mono">
                    <div className="max-w-md w-full border border-red-500/50 bg-red-900/10 p-8 rounded-xl relative overflow-hidden">
                        {/* Scanlines */}
                        <div className="absolute inset-0 pointer-events-none opacity-20"
                            style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)', backgroundSize: '100% 4px' }}>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <i className="fas fa-biohazard text-6xl text-red-500 mb-6 animate-pulse"></i>
                            <h2 className="text-2xl font-bold text-red-500 mb-2 font-['Audiowide']">SYSTEM FAILURE</h2>
                            <p className="text-gray-400 text-sm mb-6">
                                A critical error occurred while loading the neural interface.
                                <br />
                                <span className="text-xs opacity-50 mt-2 block">{this.state.error?.message || "Unknown Error"}</span>
                            </p>

                            <button
                                onClick={this.handleRetry}
                                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-black font-bold rounded uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                            >
                                Reboot System
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
