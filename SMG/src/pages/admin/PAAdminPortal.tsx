import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PADashboard } from './pa/PADashboard';
import { BusFacilityApproval } from './pa/transport/BusFacilityApproval';
import { ParkingFacilityApproval } from './pa/transport/ParkingFacilityApproval';
import { TransportationRequestApproval } from './pa/transport/TransportationRequestApproval';
import { TripsToursApproval } from './pa/transport/TripsToursApproval';
import { NewSimApproval } from './pa/sim/NewSimApproval';
import { SimIssueMaintenance } from './pa/sim/SimIssueMaintenance';
import { NewUniformApproval } from './pa/uniform/NewUniformApproval';
import { UniformRequestApproval } from './pa/uniform/UniformRequestApproval';
import { UniformIssueRecords } from './pa/uniform/UniformIssueRecords';
import { UniformStockManagement } from './pa/uniform/UniformStockManagement';
import { GuestHouseManagement } from './pa/guesthouse/GuestHouseManagement';
import { GuestHouseRequestApproval } from './pa/guesthouse/GuestHouseRequestApproval';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Bus,
  Smartphone,
  ShirtIcon,
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

interface PAAdminPortalProps {
  onBack: () => void;
}

const PA_USER = {
  name: "Priya Sharma",
  role: "P&A Manager",
  empId: "SMG-PA-001",
  dept: "Personnel & Administration",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PAAdmin&backgroundColor=ffd5dc",
  email: "priya.sharma@smg-scooters.com",
  phone: "+91 98765 44556",
  dateOfJoining: "10 June 2019",
  dateOfBirth: "15 August 1988",
  address: "Sector 18, Noida, Uttar Pradesh - 201301",
  reportingTo: "Admin Head",
  shift: "9:00 AM - 6:00 PM",
};

export const PAAdminPortal = ({ onBack }: PAAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const notifications = [
    { id: 1, text: 'New bus pass request from John Doe', time: '5 mins ago', type: 'info' },
    { id: 2, text: '3 parking requests pending approval', time: '30 mins ago', type: 'warning' },
    { id: 3, text: 'New uniform request approved', time: '1 hour ago', type: 'success' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <PADashboard onNavigate={setActivePage} />;
      // Transport
      case 'bus-facility': return <BusFacilityApproval />;
      case 'parking-facility': return <ParkingFacilityApproval />;
      case 'transport-request': return <TransportationRequestApproval />;
      case 'trips-tours': return <TripsToursApproval />;
      // SIM
      case 'new-sim': return <NewSimApproval />;
      case 'sim-maintenance': return <SimIssueMaintenance />;
      // Uniform
      case 'new-uniform': return <NewUniformApproval />;
      case 'uniform-request': return <UniformRequestApproval />;
      case 'uniform-records': return <UniformIssueRecords />;
      case 'uniform-stock': return <UniformStockManagement />;
      // Guest House
      case 'guesthouse-management': return <GuestHouseManagement />;
      case 'guesthouse-request': return <GuestHouseRequestApproval />;
      default: return <PADashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* Topbar */}
      <header className="sticky top-0 z-50 bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src="/Company Logo.jpg"
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
            <img src={user?.avatar || PA_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-[#1B254B] leading-tight">{user?.name || PA_USER.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{user?.designation || PA_USER.role}</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[80px] hover:w-[260px] bg-[#042A5B] flex-col transition-all duration-300 group shadow-2xl overflow-y-auto sticky top-0 h-screen">
          <nav className="px-3 py-6 space-y-1">
            <div className="mb-4">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">P&A Admin</p>
              <button
                onClick={() => setActivePage('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === 'dashboard' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'}`}
              >
                <div className="shrink-0 flex justify-center w-6">
                  <LayoutDashboard size={20} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-bold flex-1 text-left">
                  Dashboard
                </span>
              </button>
            </div>

            {/* Transport Section */}
            <div className="mb-3">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Transport</p>
              <div className="space-y-1">
                {[
                  { id: 'bus-facility', label: 'Bus Pass Approval' },
                  { id: 'parking-facility', label: 'Parking Approval' },
                  { id: 'transport-request', label: 'Transport Requests' },
                  { id: 'trips-tours', label: 'Trips & Tours' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'}`}
                  >
                    <div className="shrink-0 flex justify-center w-6">
                      <Bus size={18} />
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-bold flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* SIM Section */}
            <div className="mb-3">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">SIM Management</p>
              <div className="space-y-1">
                {[
                  { id: 'new-sim', label: 'New SIM Approval' },
                  { id: 'sim-maintenance', label: 'SIM Maintenance' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'}`}
                  >
                    <div className="shrink-0 flex justify-center w-6">
                      <Smartphone size={18} />
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-bold flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Uniform Section */}
            <div className="mb-3">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Uniform</p>
              <div className="space-y-1">
                {[
                  { id: 'new-uniform', label: 'New Uniform Approval' },
                  { id: 'uniform-request', label: 'Uniform Requests' },
                  { id: 'uniform-records', label: 'Issue Records' },
                  { id: 'uniform-stock', label: 'Stock Management' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'}`}
                  >
                    <div className="shrink-0 flex justify-center w-6">
                      <ShirtIcon size={18} />
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-bold flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest House Section */}
            <div className="mb-3">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Guest House</p>
              <div className="space-y-1">
                {[
                  { id: 'guesthouse-management', label: 'Management' },
                  { id: 'guesthouse-request', label: 'Request Approval' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'}`}
                  >
                    <div className="shrink-0 flex justify-center w-6">
                      <Home size={18} />
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-bold flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </nav>

          <div className="p-4 border-t border-[#0B4DA2]/30 shrink-0 mt-auto">
            <button
              onClick={onBack}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EE5D50] hover:bg-[#EE5D50]/10 transition-all duration-200 font-bold"
            >
              <div className="shrink-0 flex justify-center w-6"><LogOut size={20} /></div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <main className="px-6 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-8">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#1B254B]/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1B254B]">Menu</h2>
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
                {/* Add mobile menu items here */}
              </nav>
              <div className="mt-auto pt-6 border-t border-gray-100">
                <button onClick={onBack} className="flex items-center gap-2 text-[#EE5D50] font-bold w-full p-2 hover:bg-red-50 rounded-xl transition-colors">
                  <LogOut size={18} /> Sign Out
                </button>
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
                  <img src={user?.avatar || PA_USER.avatar} alt={user?.name || PA_USER.name} className="w-16 h-16 rounded-full border-4 border-white/20" />
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || PA_USER.name}</h2>
                    <p className="text-white/80 text-sm">{user?.designation || PA_USER.role} • {user?.department || PA_USER.dept}</p>
                    <p className="text-white/60 text-xs mt-1">Employee ID: {user?.id || PA_USER.empId}</p>
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
                      { icon: User, label: 'Full Name', value: user?.name || PA_USER.name },
                      { icon: Mail, label: 'Email Address', value: user?.email || PA_USER.email },
                      { icon: Phone, label: 'Phone Number', value: user?.phone || PA_USER.phone },
                      { icon: Calendar, label: 'Date of Birth', value: PA_USER.dateOfBirth },
                      { icon: MapPin, label: 'Address', value: user?.location || PA_USER.address }
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
                      { icon: Briefcase, label: 'Department', value: user?.department || PA_USER.dept },
                      { icon: Award, label: 'Role / Designation', value: user?.designation || PA_USER.role },
                      { icon: User, label: 'Employee ID', value: user?.id || PA_USER.empId },
                      { icon: Calendar, label: 'Date of Joining', value: user?.joinDate || PA_USER.dateOfJoining },
                      { icon: User, label: 'Reporting To', value: user?.reportingManager || PA_USER.reportingTo },
                      { icon: Award, label: 'Shift Timing', value: PA_USER.shift }
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
