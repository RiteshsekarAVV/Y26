import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import { eventsAPI, usersAPI, CreateEventRequest, User } from '@/api';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/components/ui/Toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { showSuccess } = useToast();
  
  const [formData, setFormData] = useState<CreateEventRequest>({
    name: '',
    description: '',
    type: 'CULTURAL',
    expectedParticipants: undefined,
    venue: '',
    dateTime: '',
    coordinatorId: ''
  });

  const [coordinators, setCoordinators] = useState<User[]>([]);

  const { execute: createEvent, loading: creating } = useApi(eventsAPI.create, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to create event'
  });

  const { execute: fetchUsers } = useApi(usersAPI.getAll, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch coordinators'
  });

  useEffect(() => {
    const loadCoordinators = async () => {
      const users = await fetchUsers();
      if (users) {
        const eventCoordinators = users.filter(user => user.role === 'EVENT_COORDINATOR');
        setCoordinators(eventCoordinators);
      }
    };

    loadCoordinators();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      expectedParticipants: formData.expectedParticipants || undefined,
      dateTime: formData.dateTime || undefined,
      coordinatorId: formData.coordinatorId || undefined
    };

    const result = await createEvent(eventData);
    if (result) {
      showSuccess('Event created successfully', 'Your event has been created and is pending approval.');
      navigate('/events');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'expectedParticipants' ? (value ? parseInt(value) : undefined) : value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/events"
          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          <p className="mt-1 text-sm text-gray-600">Fill in the details to create a new event</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Event Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter event name"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Event Type *
              </label>
              <select
                name="type"
                id="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="CULTURAL">Cultural</option>
                <option value="TECHNICAL">Technical</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="COMPETITION">Competition</option>
                <option value="SEMINAR">Seminar</option>
              </select>
            </div>

            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                Venue
              </label>
              <input
                type="text"
                name="venue"
                id="venue"
                value={formData.venue}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter venue"
              />
            </div>

            <div>
              <label htmlFor="expectedParticipants" className="block text-sm font-medium text-gray-700">
                Expected Participants
              </label>
              <input
                type="number"
                name="expectedParticipants"
                id="expectedParticipants"
                min="1"
                value={formData.expectedParticipants || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Number of participants"
              />
            </div>

            <div>
              <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                id="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="coordinatorId" className="block text-sm font-medium text-gray-700">
                Event Coordinator
              </label>
              <select
                name="coordinatorId"
                id="coordinatorId"
                value={formData.coordinatorId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a coordinator</option>
                {coordinators.map((coordinator) => (
                  <option key={coordinator.id} value={coordinator.id}>
                    {coordinator.name} ({coordinator.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter event description"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/events"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {creating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;