import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';

// Lazy load pages for better performance
const Events = React.lazy(() => import('./pages/Events'));
const EventDetail = React.lazy(() => import('./pages/EventDetail'));
const Users = React.lazy(() => import('./pages/Users'));
const Budgets = React.lazy(() => import('./pages/Budgets'));
const Expenses = React.lazy(() => import('./pages/Expenses'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Products = React.lazy(() => import('./pages/Products'));
const Reports = React.lazy(() => import('./pages/Reports'));
const AdminLogs = React.lazy(() => import('./pages/AdminLogs'));

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Users />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="events"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Events />
              </React.Suspense>
            }
          />
          
          <Route
            path="events/:id"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <EventDetail />
              </React.Suspense>
            }
          />
          
          <Route
            path="budgets"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Budgets />
              </React.Suspense>
            }
          />
          
          <Route
            path="expenses"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Expenses />
              </React.Suspense>
            }
          />
          
          <Route
            path="categories"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'FINANCE_TEAM']}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Categories />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="products"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'FINANCE_TEAM', 'FACILITIES_TEAM']}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Products />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="reports"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Reports />
              </React.Suspense>
            }
          />
          
          <Route
            path="admin/logs"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <AdminLogs />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;