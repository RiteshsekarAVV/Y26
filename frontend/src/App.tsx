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

// Admin pages
const AdminUsers = React.lazy(() => import('@/pages/admin/Users'));
const AdminEvents = React.lazy(() => import('@/pages/admin/Events'));
const AdminWorkshops = React.lazy(() => import('@/pages/admin/Workshops'));
const AdminVenues = React.lazy(() => import('@/pages/admin/Venues'));
const AdminLogs = React.lazy(() => import('@/pages/admin/AdminLogs'));
const AdminNotifications = React.lazy(() => import('@/pages/admin/Notifications'));

// Finance pages
const FinanceEvents = React.lazy(() => import('@/pages/finance/Events'));
const FinanceBudgets = React.lazy(() => import('@/pages/finance/Budgets'));

// Event Lead pages
const EventLeadEvents = React.lazy(() => import('@/pages/event-lead/Events'));
const EventLeadBudgets = React.lazy(() => import('@/pages/event-lead/Budgets'));

// Workshop Lead pages
const WorkshopLeadWorkshops = React.lazy(() => import('@/pages/workshop-lead/Workshops'));
const WorkshopLeadBudgets = React.lazy(() => import('@/pages/workshop-lead/Budgets'));

// Facilities pages
const FacilitiesEvents = React.lazy(() => import('@/pages/facilities/Events'));
const FacilitiesVenues = React.lazy(() => import('@/pages/facilities/VenueManagement'));

// Coordinator pages
const CoordinatorEvents = React.lazy(() => import('@/pages/coordinator/Events'));

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
                  <AdminUsers />
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

          {/* Finance Routes */}
          <Route
            path="finance/events"
            element={
              <ProtectedRoute allowedRoles={['FINANCE_TEAM']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FinanceEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Event Lead Routes */}
          <Route
            path="event-lead/events"
            element={
              <ProtectedRoute allowedRoles={['EVENT_TEAM_LEAD']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <EventLeadEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Workshop Lead Routes */}
          <Route
            path="workshop-lead/workshops"
            element={
              <ProtectedRoute allowedRoles={['WORKSHOP_TEAM_LEAD']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <WorkshopLeadWorkshops />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Facilities Routes */}
          <Route
            path="facilities/events"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FacilitiesEvents />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="facilities/venues"
            element={
              <ProtectedRoute allowedRoles={['FACILITIES_TEAM']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <FacilitiesVenues />
                </React.Suspense>
              </ProtectedRoute>
            }
          />

          {/* Coordinator Routes */}
          <Route
            path="coordinator/events"
            element={
              <ProtectedRoute allowedRoles={['EVENT_COORDINATOR', 'WORKSHOP_COORDINATOR']}>
                <React.Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
                  <CoordinatorEvents />
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
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;