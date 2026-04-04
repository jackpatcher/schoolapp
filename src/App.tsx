import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/Layout";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import AppStorePage from "@/pages/AppStorePage";
import MessagesPage from "@/pages/MessagesPage";
import CalendarPage from "@/pages/CalendarPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) return <LoginPage />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<AppStorePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
