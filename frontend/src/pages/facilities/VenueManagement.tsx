import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Users, Filter, CheckCircle } from 'lucide-react';
import { venuesAPI, eventsAPI, Event, Venue } from '@/api';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/components/ui/Toast';

interface EventForAssignment extends Event {
  venue?: Venue;
}

const VenueManagement = () => {
  const [events, setEvents] = useState<EventForAssignment[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventForAssignment[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    venueAssigned: ''
  });

  const { showSuccess } = useToast();

  const { execute: fetchEvents, loading: eventsLoading } = useApi(eventsAPI.getAll, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch events'
  });

  const { execute: fetchVenues } = useApi(venuesAPI.getAll, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch venues'
  });

  const { execute: assignVenue } = useApi(venuesAPI.assignVenue, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to assign venue'
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters]);

  const loadData = async () => {
    const [eventsData, venuesData] = await Promise.all([
      fetchEvents(),
      fetchVenues()
    ]);

    if (eventsData) setEvents(eventsData);
    if (venuesData) setVenues(venuesData);
  };

  const applyFilters = () => {
    let filtered = [...events];

    if (filters.status) {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    if (filters.type) {
      filtered = filtered.filter(event => event.type === filters.type);
    }

    if (filters.venueAssigned === 'assigned') {
      filtered = filtered.filter(event => event.venueId);
    } else if (filters.venueAssigned === 'unassigned') {
      filtered = filtered.filter(event => !event.venueId);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(event => 
        event.dateTime && new Date(event.dateTime) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(event => 
        event.dateTime && new Date(event.dateTime) <= new Date(filters.dateTo)
      );
    }

    setFilteredEvents(filtered);
  };

  const handleAssignVenue = async (eventId: string, venueId: string) => {
    const result = await assignVenue(venueId, eventId);
    if (result) {
      showSuccess('Venue assigned successfully');
      loadData();
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
      COMPLETED: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (eventsLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Venue Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Assign venues to approved events and workshops
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="EVENT">Event</option>
              <option value="WORKSHOP">Workshop</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Venue Status</label>
            <select
              value={filters.venueAssigned}
              onChange={(e) => setFilters(prev => ({ ...prev, venueAssigned: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All</option>
              <option value="assigned">Venue Assigned</option>
              <option value="unassigned">No Venue</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Events & Workshops</h3>
            <span className="text-sm text-gray-500">{filteredEvents.length} items</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event/Workshop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assign Venue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No events match the current filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.type === 'EVENT' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.dateTime ? (
                        <div>
                          <div>{new Date(event.dateTime).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(event.dateTime).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        'TBD'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.venue ? (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {event.venue.name}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.status === 'APPROVED' && (
                        <select
                          value={event.venueId || ''}
                          onChange={(e) => e.target.value && handleAssignVenue(event.id, e.target.value)}
                          className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Venue</option>
                          {venues.map(venue => (
                            <option key={venue.id} value={venue.id}>
                              {venue.name} ({venue.capacity ? `${venue.capacity} capacity` : 'No limit'})
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VenueManagement;