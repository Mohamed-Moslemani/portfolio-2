import { BrowserRouter } from 'react-router-dom'
import AppShell from './AppShell'

/* ---------------------------------------------------------------
   App: the browser entry. The shell itself lives in AppShell so the
   build can pre-render it with a StaticRouter.
   --------------------------------------------------------------- */

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
