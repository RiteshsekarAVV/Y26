import React, { useEffect, useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { eventsAPI, Event } from '../../api';

const EventLeadDashboard = () => {
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
          Event Team Lead Dashboard
        </h1>
        <p className="text-gray-600 mb-4">
          Create and manage events, submit budgets for approval
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">Event Team Lead Access</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            You can create events, manage budgets, and track approval status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Events</p>
              <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
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
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-semibold text-gray-900">₹{totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/events/create"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-blue-700 font-medium">Create New Event</span>
          </a>
          
          <a
            href="/budgets"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <DollarSign className="h-6 w-6 text-green-600 mr-3" />
            <span className="text-green-700 font-medium">Manage Budgets</span>
          </a>
          
          <a
            href="/events"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Calendar className="h-6 w-6 text-purple-600 mr-3" />
            <span className="text-purple-700 font-medium">View All Events</span>
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h2>
        <div className="space-y-4">
          {events.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{event.name}</h3>
                <p className="text-sm text-gray-600">{event.type} • {event.venue || 'Venue TBD'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  event.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {event.status}
                </span>
                <a
                  href={`/events/${event.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventLeadDashboard;