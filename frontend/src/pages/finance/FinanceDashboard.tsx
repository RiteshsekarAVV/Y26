import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, XCircle, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { eventsAPI, Event } from '../../api';

const FinanceDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getAll();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const pendingEvents = events.filter(event => event.status === 'PENDING');
  const approvedEvents = events.filter(event => event.status === 'APPROVED');
  const rejectedEvents = events.filter(event => event.status === 'REJECTED');

  const totalBudget = events.reduce((sum, event) => {
    return sum + (event.budgets?.reduce((budgetSum, budget) => budgetSum + budget.amount, 0) || 0);
  }, 0);

  if (loading) {
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
          Finance Team Dashboard
        </h1>
        <p className="text-gray-600 mb-4">
          Review and approve event budgets, manage financial operations
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Finance Team Access</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            You can review budgets, approve/reject events, and manage financial categories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">{pendingEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">{approvedEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900">{rejectedEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-semibold text-gray-900">₹{totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Finance Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/budgets"
            className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <Clock className="h-6 w-6 text-yellow-600 mr-3" />
            <span className="text-yellow-700 font-medium">Review Pending Budgets</span>
          </a>
          
          <a
            href="/categories"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <DollarSign className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-blue-700 font-medium">Manage Categories</span>
          </a>
          
          <a
            href="/reports"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <TrendingUp className="h-6 w-6 text-purple-600 mr-3" />
            <span className="text-purple-700 font-medium">Financial Reports</span>
          </a>
        </div>
      </div>

      {pendingEvents.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Events Pending Review</h2>
          <div className="space-y-4">
            {pendingEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-600">Created by {event.creator.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                  <a
                    href={`/events/${event.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Review →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceDashboard;