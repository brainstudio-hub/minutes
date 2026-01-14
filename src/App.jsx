import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import MainLayout from './components/MainLayout';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0a1a] flex items-center justify-center p-4">
          <div className="text-center p-8 bg-[#1e1633] rounded-2xl border border-purple-900/50 shadow-2xl max-w-lg">
            <h1 className="text-3xl font-bold text-white mb-4">Algo salió mal</h1>
            <p className="text-purple-200 mb-6">Ocurrió un error inesperado en la aplicación.</p>
            <div className="bg-black/30 p-4 rounded text-left mb-6 overflow-auto max-h-32">
                <code className="text-red-300 text-xs">{this.state.error?.toString()}</code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/30"
            >
              Recargar Aplicación
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0f0a1a]">
        <Header />
        <MainLayout />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e1633',
              color: '#fff',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#8b5cf6',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;