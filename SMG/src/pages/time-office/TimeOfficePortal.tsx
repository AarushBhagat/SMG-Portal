import { useState } from 'react';
import { Calendar, Clock, Users, LogOut, Menu, X, FileText, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import TimeOfficeDashboard from './TimeOfficeDashboard';
import AttendanceManagement from './AttendanceManagement';
import ShiftManagement from './ShiftManagement';

const TimeOfficePortal = () => {
  const { logout, user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Calendar },
    { id: 'attendance', name: 'Attendance Management', icon: Users },
    { id: 'shifts', name: 'Shift Management', icon: Clock },
    { id: 'approvals', name: 'Leave & Gate Pass Approvals', icon: FileText }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <TimeOfficeDashboard onNavigate={setActivePage} />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'shifts':
        return <ShiftManagement />;
      case 'approvals':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Leave & Gate Pass Approvals</h2>
              <p className="text-gray-600">This page will show pending leave and gate pass requests for Time Office review.</p>
            </div>
          </div>
        );
      default:
        return <TimeOfficeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Time Office Portal</h1>
              <p className="text-sm text-gray-500">Manage attendance and shifts</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user?.name || 'Time Office'}</p>
                <p className="text-sm text-gray-500">Time Office</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'T'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    activePage === item.id
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileMenu(false)}>
            <div className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              </div>
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                        activePage === item.id
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-[calc(100vh-73px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TimeOfficePortal;
