import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Unauthorized from '@/pages/Unauthorized';
import Profile from '@/pages/Profile';
import Notifications from '@/pages/Notifications';

// Lazy load pages for better performance
const Events = React.lazy(() => import('@/pages/events/Events'));
const EventDetail = React.lazy(() => import('@/pages/events/EventDetail'));
const CreateEvent = React.lazy(() => import('@/pages/events/CreateEvent'));

const Users = React.lazy(() => import('@/pages/admin/Users'));
const AdminLogs = React.lazy(() => import('@/pages/admin/AdminLogs'));
const AdminEvents = React.lazy(() => import('@/pages/admin/Events'));
const AdminWorkshops = React.lazy(() => import('@/pages/admin/Workshops'));
const AdminNotifications = React.lazy(() => import('@/pages/admin/Notifications'));
const AdminVenues = React.lazy(() => import('@/pages/admin/Venues'));

const Budgets = React.lazy(() => import('@/pages/budgets/Budgets'));
const BudgetDetail = React.lazy(() => import('@/pages/budgets/BudgetDetail'));

const Expenses = React.lazy(() => import('@/pages/expenses/Expenses'));
const ExpenseDetail = React.lazy(() => import('@/pages/expenses/ExpenseDetail'));

const Categories = React.lazy(() => import('@/pages/categories/Categories'));
const Products = React.lazy(() => import('@/pages/products/Products'));
const Reports = React.lazy(() => import('@/pages/reports/Reports'));

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Yugam Finance Portal...</p>
        </div>
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
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          
          {/* Admin Routes */}
          <Route
            path="admin/users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Users />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/events"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/workshops"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminWorkshops />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/budgets"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Budgets />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/expenses"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Expenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/products"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Products />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/categories"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Categories />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/venues"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminVenues />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/reports"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Reports />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/notifications"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminNotifications />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="admin/logs"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminLogs />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Finance Team Routes */}
          <Route
            path="finance/events"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Events />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/budgets"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Budgets />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/expenses"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Expenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/products"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Products />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/categories"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Categories />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="finance/reports"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Reports />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Team Lead Routes */}
          <Route
            path="team-leads/events"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Events />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="team-leads/workshops"
            element={
              <ProtectedRoute allowedRoles={['WORKSHOP_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Events />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="team-leads/budgets"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'WORKSHOP_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Budgets />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="team-leads/expenses"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'WORKSHOP_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Expenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Facilities Team Routes */}
          <Route
            path="facilities/events"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Events />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="facilities/expenses"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Expenses />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="facilities/products"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Products />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="facilities/venues"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <AdminVenues />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Coordinator Routes */}
          <Route
            path="coordinator/events"
            element={
              <ProtectedRoute allowedRoles={['EVENT_COORDINATOR', 'WORKSHOP_COORDINATOR', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Events />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="coordinator/reports"
            element={
              <ProtectedRoute allowedRoles={['EVENT_COORDINATOR', 'WORKSHOP_COORDINATOR', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Reports />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          {/* General Routes */}
          <Route
            path="events"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <Events />
              </React.Suspense>
            }
          />
          
          <Route
            path="events/create"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD', 'ADMIN']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <CreateEvent />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="events/:id"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <EventDetail />
              </React.Suspense>
            }
          />
          
          <Route
            path="budgets"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <Budgets />
              </React.Suspense>
            }
          />
          
          <Route
            path="budgets/:id"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <BudgetDetail />
              </React.Suspense>
            }
          />
          
          <Route
            path="expenses"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <Expenses />
              </React.Suspense>
            }
          />
          
          <Route
            path="expenses/:id"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <ExpenseDetail />
              </React.Suspense>
            }
          />
          
          <Route
            path="categories"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'FINANCE_TEAM']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Categories />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="products"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'FINANCE_TEAM', 'FACILITIES_TEAM']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <Products />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="reports"
            element={
              <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                <Reports />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;