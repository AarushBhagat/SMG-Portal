import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import smgLogo from '../../assets/smg-logo.jpg';
import { EventsDashboard } from './events/EventsDashboard';
import { EventsManagement } from './events/EventsManagement';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  PartyPopper,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

interface EventsAdminPortalProps {
  onBack: () => void;
}

const EVENTS_USER = {
  name: "Ananya Reddy",
  role: "Events Manager",
  empId: "SMG-EVT-001",
  dept: "Events & Communications",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EventsAdmin&backgroundColor=ffdfbf",
  email: "ananya.reddy@smg-scooters.com",
  phone: "+91 98765 99001",
  dateOfJoining: "15 August 2019",
  dateOfBirth: "10 March 1987",
  address: "Sector 15, Noida, Uttar Pradesh - 201301",
  reportingTo: "Admin Head",
  shift: "9:00 AM - 6:00 PM",
};

export const EventsAdminPortal = ({ onBack }: EventsAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const notifications = [
    { id: 1, text: 'New event posted: Annual Day 2025', time: '30 mins ago', type: 'success' },
    { id: 2, text: 'Sports Day event starts tomorrow', time: '1 hour ago', type: 'info' },
    { id: 3, text: 'New Year celebration registration open', time: '2 hours ago', type: 'info' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <EventsDashboard onNavigate={setActivePage} />;
      case 'events': return <EventsManagement />;
      default: return <EventsDashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* Topbar */}
      <header className="sticky top-0 z-50 bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={smgLogo}
            alt="SMG Logo"
            className="h-10 w-auto cursor-pointer"
            onClick={() => setActivePage('dashboard')}
          />
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-[#042A5B] bg-gray-50 rounded-lg hover:bg-gray-100">
            <Menu size={24} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-gray-50 rounded-full px-4 py-2 w-64 hover:bg-gray-100 transition-colors">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-2 w-full text-[#1B254B] placeholder:text-gray-400" />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotificationPopup(!showNotificationPopup)}
              className="relative p-2.5 bg-gray-50 text-gray-600 hover:text-[#0B4DA2] rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#EE5D50] rounded-full border-2 border-white"></span>
            </button>

            {showNotificationPopup && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotificationPopup(false)}></div>
                <div className="absolute right-0 top-14 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1B254B] text-lg">Notifications</h3>
                      <span className="bg-[#EE5D50] text-white text-xs font-bold px-2 py-1 rounded-full">{notifications.length}</span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-[#1B254B] leading-tight">{notification.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full cursor-pointer hover:bg-gray-100 transition-all"
          >
            <img src={user?.avatar || EVENTS_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-[#1B254B] leading-tight">{user?.name || EVENTS_USER.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{user?.designation || EVENTS_USER.role}</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-[240px] bg-[#042A5B] flex-col shadow-2xl">
          <nav className="px-3 py-6 space-y-1 flex-1 overflow-y-auto">
            <div className="mb-4">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 whitespace-nowrap">Events Admin</p>
              <button
                onClick={() => setActivePage('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'dashboard' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <LayoutDashboard size={20} className="shrink-0 text-white" />
                <span className="whitespace-nowrap font-medium text-white">Dashboard</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 whitespace-nowrap">Events</p>
              <button
                onClick={() => setActivePage('events')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'events' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <PartyPopper size={20} className="shrink-0 text-white" />
                <span className="whitespace-nowrap font-medium text-white">Events Management</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={onBack}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#EE5D50]/10 text-[#EE5D50] rounded-xl font-bold hover:bg-[#EE5D50]/20 transition-all"
              >
                <LogOut size={20} className="shrink-0" />
                <span className="whitespace-nowrap">Sign Out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <img src={EVENTS_USER.avatar} alt="Profile" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-[#1B254B]">{EVENTS_USER.name}</p>
                    <p className="text-xs text-gray-500">{EVENTS_USER.role}</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-2 overflow-y-auto">
                <button
                  onClick={() => { setActivePage('dashboard'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${activePage === 'dashboard' ? 'bg-[#0B4DA2] text-white' : 'text-gray-500 hover:bg-[#F4F7FE]'}`}
                >
                  <LayoutDashboard size={20} />Dashboard
                </button>
                <button
                  onClick={() => { setActivePage('events'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${activePage === 'events' ? 'bg-[#0B4DA2] text-white' : 'text-gray-500 hover:bg-[#F4F7FE]'}`}
                >
                  <PartyPopper size={20} />Events Management
                </button>
              </nav>
              <div className="mt-auto pt-6 border-t border-gray-100">
                <button onClick={onBack} className="flex items-center gap-2 text-[#EE5D50] font-bold w-full p-2 hover:bg-red-50 rounded-xl transition-colors">
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <img src={user?.avatar || EVENTS_USER.avatar} alt={user?.name || EVENTS_USER.name} className="w-16 h-16 rounded-full border-4 border-white/20" />
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || EVENTS_USER.name}</h2>
                    <p className="text-white/80 text-sm">{user?.designation || EVENTS_USER.role} • {user?.department || EVENTS_USER.dept}</p>
                    <p className="text-white/60 text-xs mt-1">Employee ID: {user?.id || EVENTS_USER.empId}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                    <User size={20} className="text-[#0B4DA2]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: User, label: 'Full Name', value: user?.name || EVENTS_USER.name },
                      { icon: Mail, label: 'Email Address', value: user?.email || EVENTS_USER.email },
                      { icon: Phone, label: 'Phone Number', value: user?.phone || EVENTS_USER.phone },
                      { icon: Calendar, label: 'Date of Birth', value: EVENTS_USER.dateOfBirth },
                      { icon: MapPin, label: 'Address', value: user?.location || EVENTS_USER.address }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <item.icon className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-semibold">{item.label}</p>
                          <p className="font-bold text-[#1B254B]">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-[#0B4DA2]" />
                    Employment Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Briefcase, label: 'Department', value: user?.department || EVENTS_USER.dept },
                      { icon: Award, label: 'Role / Designation', value: user?.designation || EVENTS_USER.role },
                      { icon: User, label: 'Employee ID', value: user?.id || EVENTS_USER.empId },
                      { icon: Calendar, label: 'Date of Joining', value: user?.joinDate || EVENTS_USER.dateOfJoining },
                      { icon: User, label: 'Reporting To', value: user?.reportingManager || EVENTS_USER.reportingTo },
                      { icon: Award, label: 'Shift Timing', value: EVENTS_USER.shift }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <item.icon className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-semibold">{item.label}</p>
                          <p className="font-bold text-[#1B254B]">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
