import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import { eventsAPI, usersAPI, categoriesAPI, CreateEventRequest, User, BudgetCategory } from '@/api';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/components/ui/Toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { showSuccess } = useToast();
  
  const [formData, setFormData] = useState<CreateEventRequest>({
    title: '',
    type: 'EVENT',
    coordinatorEmail: '',
    description: '',
    venue: '',
    dateTime: ''
  });

  const [budgets, setBudgets] = useState<{ categoryId: string; amount: number; sponsorAmount: number; remarks: string }[]>([]);
  const [coordinators, setCoordinators] = useState<User[]>([]);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);

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

  const { execute: fetchCategories } = useApi(categoriesAPI.getAll, {
    showSuccessToast: false,
    showErrorToast: true,
    errorMessage: 'Failed to fetch categories'
  });

  useEffect(() => {
    const loadData = async () => {
      const [users, categoriesData] = await Promise.all([
        fetchUsers(),
        fetchCategories()
      ]);

      if (users) {
        const eventCoordinators = users.filter(user => user.role === 'EVENT_COORDINATOR');
        setCoordinators(eventCoordinators);
      }

      if (categoriesData) {
        setCategories(categoriesData);
        // Initialize budget entries for each category
        setBudgets(categoriesData.map(category => ({
          categoryId: category.id,
          amount: 0,
          sponsorAmount: 0,
          remarks: ''
        })));
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      dateTime: formData.dateTime || undefined,
      coordinatorEmail: formData.coordinatorEmail || undefined
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
      [name]: value
    }));
  };

  const handleBudgetChange = (categoryId: string, field: string, value: string) => {
    setBudgets(prev => prev.map(budget => 
      budget.categoryId === categoryId 
        ? { ...budget, [field]: field === 'remarks' ? value : parseFloat(value) || 0 }
        : budget
    ));
  };

  const getTotalBudget = () => {
    return budgets.reduce((sum, budget) => sum + budget.amount, 0);
  };

  const getTotalSponsorAmount = () => {
    return budgets.reduce((sum, budget) => sum + budget.sponsorAmount, 0);
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
          <h1 className="text-2xl font-bold text-gray-900">Create New Event/Workshop</h1>
          <p className="mt-1 text-sm text-gray-600">Fill in the details and budget to create a new event or workshop</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Basic Event Information */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Event Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Event/Workshop Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter event/workshop title"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type *
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="EVENT">Event</option>
                  <option value="WORKSHOP">Workshop</option>
                </select>
              </div>

              <div>
                <label htmlFor="coordinatorEmail" className="block text-sm font-medium text-gray-700">
                  Coordinator Email
                </label>
                <select
                  name="coordinatorEmail"
                  id="coordinatorEmail"
                  value={formData.coordinatorEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a coordinator</option>
                  {coordinators.map((coordinator) => (
                    <option key={coordinator.id} value={coordinator.email}>
                      {coordinator.name} ({coordinator.email})
                    </option>
                  ))}
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

              <div className="md:col-span-2">
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

              <div className="md:col-span-2">
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
                  placeholder="Enter event/workshop description"
                />
              </div>
            </div>
          </div>

          {/* Budget Planning */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Planning</h3>
            <div className="space-y-4">
              {categories.map((category) => {
                const budget = budgets.find(b => b.categoryId === category.id);
                return (
                  <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">{category.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Requested Amount (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={budget?.amount || 0}
                          onChange={(e) => handleBudgetChange(category.id, 'amount', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Sponsor Contribution (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={budget?.sponsorAmount || 0}
                          onChange={(e) => handleBudgetChange(category.id, 'sponsorAmount', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Remarks
                        </label>
                        <input
                          type="text"
                          value={budget?.remarks || ''}
                          onChange={(e) => handleBudgetChange(category.id, 'remarks', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Optional remarks"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Budget Summary */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Budget Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Total Requested:</span>
                  <span className="font-semibold text-blue-900 ml-2">₹{getTotalBudget().toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-blue-700">Total Sponsor:</span>
                  <span className="font-semibold text-blue-900 ml-2">₹{getTotalSponsorAmount().toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-blue-700">Net Request:</span>
                  <span className="font-semibold text-blue-900 ml-2">₹{(getTotalBudget() - getTotalSponsorAmount()).toLocaleString()}</span>
                </div>
              </div>
            </div>
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
              Create Event/Workshop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;