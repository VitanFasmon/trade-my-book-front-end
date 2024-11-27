import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { Routes } from "../../navigation/routes";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-8">
          <Typography as="h1" variant="h1">
            Something went wrong
          </Typography>
          <Typography as="p" variant="p">
            {this.state.error?.message}
          </Typography>
          <div className="flex flex-row">
            <Button
              type="secondary"
              onClick={this.handleRetry}
              className="min-w-28 rounded-r-none"
            >
              Retry
            </Button>
            <Button
              link
              href={Routes.Home}
              type="primary"
              className="min-w-28 rounded-l-none"
            >
              Go home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
