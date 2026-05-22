import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import Users from "./pages/admin/Users";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="blogs" element={<ProtectedRoute roles={["superadmin","editor","author"]}><BlogList /></ProtectedRoute>} />
            <Route path="blogs/new" element={<ProtectedRoute roles={["superadmin","editor","author"]}><BlogEditor /></ProtectedRoute>} />
            <Route path="blogs/edit/:id" element={<ProtectedRoute roles={["superadmin","editor","author"]}><BlogEditor /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute roles={["superadmin"]}><Users /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
