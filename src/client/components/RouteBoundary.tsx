import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { failed: boolean }

export default class RouteBoundary extends Component<Props, State> {
  state: State = { failed: false }
  static getDerivedStateFromError(): State { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('[afyra:route-render]', error, info.componentStack) }
  render() {
    if (!this.state.failed) return this.props.children
    return <div className="af-route-error" role="alert"><header className="af-route-error__header"><a href="/"><img src="/static/img/logo-mark.png" alt="" /><span>AFYRA DIGITAL</span></a></header><main><p>We could not finish opening this page.</p><h1>Let’s get you back to Afyra Digital.</h1><a className="af-route-error__action" href="/">Return to Home</a></main><footer>© {new Date().getFullYear()} Afyra Digital</footer></div>
  }
}
