import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import BlogEditor from './pages/BlogEditor';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Tags from './pages/Tags';

const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {user && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/blogs" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
            <Route path="/blogs/new" element={<ProtectedRoute roles={['superadmin','editor','author']}><BlogEditor /></ProtectedRoute>} />
            <Route path="/blogs/edit/:id" element={<ProtectedRoute roles={['superadmin','editor','author']}><BlogEditor /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute roles={['superadmin']}><Users /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute roles={['superadmin','editor']}><Categories /></ProtectedRoute>} />
            <Route path="/tags" element={<ProtectedRoute roles={['superadmin','editor','author']}><Tags /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
