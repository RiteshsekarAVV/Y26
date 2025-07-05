import React from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrator';
      case 'EVENT_TEAM_LEAD':
        return 'Event Team Lead';
      case 'FINANCE_TEAM':
        return 'Finance Team';
      case 'FACILITIES_TEAM':
        return 'Facilities Team';
      case 'EVENT_COORDINATOR':
        return 'Event Coordinator';
      default:
        return role;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome back, {user?.name}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{getRoleDisplayName(user?.role || '')}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;