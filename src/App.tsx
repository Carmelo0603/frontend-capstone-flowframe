import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { type RootState } from "./store/store";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Workspace } from "./pages/Workspace";
import { UxLibrary } from "./pages/UxLibrary";
import { Filosofia } from "./pages/Filosofia";
import { Contatti } from "./pages/Contatti";

// Wrapper di protezione
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// Layout con SOLO Navbar (Per il Workspace)
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 font-sans">
      <Navbar />
      <Outlet />
    </div>
  );
}

// Layout con Navbar + Footer (Per Dashboard e pagine standard)
function StandardPageLayout() {
  return (
    <>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Pagine fittizie per i link
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex-1 flex items-center justify-center p-8 text-neutral-400 font-mono text-sm border-2 border-dashed border-neutral-200 m-8">
    [ {title} - CANTIERE APERTO ]
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Alberatura con Navbar Globale */}
        <Route element={<RootLayout />}>
          {/* Sotto-alberatura con Footer */}
          <Route element={<StandardPageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ux-library" element={<UxLibrary />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/filosofia" element={<Filosofia />} />
            <Route path="/contatti" element={<Contatti />} />
          </Route>

          {/* Il Workspace sta fuori dal Footer, ma dentro la Navbar */}
          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<div className="h-screen flex items-center justify-center font-mono text-xl bg-neutral-100">404 - FLOWFRAME NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
}
