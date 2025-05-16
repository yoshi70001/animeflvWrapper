import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnimePage from './pages/AnimePage';

// Wrapper that handles view transitions between routes
function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();

  React.useEffect(() => {
    // Skip transitions on back/forward navigation to avoid visual issues
    if (navigationType !== 'POP' && document.startViewTransition) {
      (document as any).startViewTransition(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [location, navigationType]);

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <ViewTransitionsProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/anime" element={<AnimePage />} />
        </Routes>
      </ViewTransitionsProvider>
    </Router>
  );
}

export default App;