import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api';
import { Users, Calendar, CheckCircle, Clock, DollarSign, Receipt } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalEvents: number;
  pendingEvents: number;
  approvedEvents: number;
  totalExpenses: number;
  totalBudget: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.role === 'ADMIN') {
          const data = await adminAPI.getStats();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'You have full access to all system features and can manage users, events, and financial data.';
      case 'EVENT_TEAM_LEAD':
        return 'You can create events, manage budgets, and submit them for approval.';
      case 'FINANCE_TEAM':
        return 'You can review and approve budgets, manage categories, and oversee financial operations.';
      case 'FACILITIES_TEAM':
        return 'You can add expenses to approved events and manage the product catalog.';
      case 'EVENT_COORDINATOR':
        return 'You can view event financial reports and download detailed summaries.';
      default:
        return 'Welcome to the Yugam Finance Portal.';
    }
  };

  if (loading && user?.role === 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-4">
          {getRoleDescription(user?.role || '')}
        </p>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 px-3 py-1 rounded-full">
            <span className="text-blue-800 text-sm font-medium">
              {user?.role?.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Last login: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {user?.role === 'ADMIN' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Events</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Events</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.approvedEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-semibold text-gray-900">₹{stats.totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Receipt className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalExpenses}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.role === 'EVENT_TEAM_LEAD' && (
            <a
              href="/events"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Calendar className="h-6 w-6 text-blue-600 mr-3" />
              <span className="text-blue-700 font-medium">Create New Event</span>
            </a>
          )}
          
          {(user?.role === 'FINANCE_TEAM' || user?.role === 'ADMIN') && (
            <a
              href="/budgets"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <DollarSign className="h-6 w-6 text-green-600 mr-3" />
              <span className="text-green-700 font-medium">Review Budgets</span>
            </a>
          )}
          
          {(user?.role === 'FACILITIES_TEAM' || user?.role === 'ADMIN') && (
            <a
              href="/expenses"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Receipt className="h-6 w-6 text-purple-600 mr-3" />
              <span className="text-purple-700 font-medium">Add Expenses</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;