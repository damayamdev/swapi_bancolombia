import type React from "react";

interface MesajeErrorProps {
    error: Error;
    onRetry?: () => void;
}

export const MesajeError = ({ error, onRetry }: MesajeErrorProps): React.ReactElement => {
    return (
        <div
            className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto"
            data-testid="error-message"
        >
            <div className="flex items-start">
                <div className="shrink-0">
                    <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-lg font-medium text-red-900">Error</h3>
                    <p className="mt-2 text-sm text-red-700">{error.message}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            data-testid="retry-button"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
