import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center min-h-[200px] p-8 rounded-sm text-center"
          style={{
            background: 'rgba(212,146,42,0.05)',
            border: '1px solid rgba(212,146,42,0.2)',
          }}
        >
          <div className="text-4xl mb-4">⚠️</div>
          <p className="font-cinzel text-sm tracking-widest text-champagne-400 uppercase mb-2">
            Something went wrong
          </p>
          <p className="font-inter text-xs text-ivory/40 mb-6 max-w-xs">
            {this.props.fallbackMessage || 'This section encountered an error. The rest of the page is still working.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="font-cinzel text-xs tracking-widest uppercase px-5 py-2 border border-champagne-400/30 text-champagne-400 hover:border-champagne-400 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
