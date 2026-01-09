// src/components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-md">
          <h3 className="text-red-400 font-medium">Something went wrong</h3>
          <p className="text-red-300 text-sm mt-1">
            We're having trouble loading this content. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-3 py-1.5 text-sm bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;