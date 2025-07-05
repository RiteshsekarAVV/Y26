import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Receipt, 
  Package, 
  Users, 
  Settings, 
  FileText,
  BarChart3,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/' },
    ];

    if (user?.role === 'ADMIN') {
      return [
        ...baseItems,
        { icon: Users, label: 'Users', path: '/users' },
        { icon: Calendar, label: 'Events', path: '/events' },
        { icon: DollarSign, label: 'Budgets', path: '/budgets' },
        { icon: Receipt, label: 'Expenses', path: '/expenses' },
        { icon: Package, label: 'Products', path: '/products' },
        { icon: Settings, label: 'Categories', path: '/categories' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: Shield, label: 'Admin Logs', path: '/admin/logs' },
      ];
    }

    if (user?.role === 'FINANCE_TEAM') {
      return [
        ...baseItems,
        { icon: Calendar, label: 'Events', path: '/events' },
        { icon: DollarSign, label: 'Budgets', path: '/budgets' },
        { icon: Receipt, label: 'Expenses', path: '/expenses' },
        { icon: Package, label: 'Products', path: '/products' },
        { icon: Settings, label: 'Categories', path: '/categories' },
        { icon: FileText, label: 'Reports', path: '/reports' },
      ];
    }

    if (user?.role === 'EVENT_TEAM_LEAD') {
      return [
        ...baseItems,
        { icon: Calendar, label: 'My Events', path: '/events' },
        { icon: DollarSign, label: 'Budgets', path: '/budgets' },
        { icon: Receipt, label: 'Expenses', path: '/expenses' },
      ];
    }

    if (user?.role === 'FACILITIES_TEAM') {
      return [
        ...baseItems,
        { icon: Calendar, label: 'Events', path: '/events' },
        { icon: Receipt, label: 'Expenses', path: '/expenses' },
        { icon: Package, label: 'Products', path: '/products' },
      ];
    }

    if (user?.role === 'EVENT_COORDINATOR') {
      return [
        ...baseItems,
        { icon: Calendar, label: 'My Events', path: '/events' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Yugam Finance</h1>
        <p className="text-sm text-gray-600 mt-1">Financial Management Portal</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;