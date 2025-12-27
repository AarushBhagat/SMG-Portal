import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminsAnalysisPage } from './AdminsAnalysisPage';
import { DepartmentsPage } from './DepartmentsPage';
import { DepartmentWorkingPage } from './DepartmentWorkingPage';
import { UserManagementPage } from './UserManagementPage';
import { AllRequestsPage } from './AllRequestsPage';
import { AnnouncementPage } from './AnnouncementPage';
import { BroadcastPage } from './BroadcastPage';
import { CanteenManagement } from './departments/CanteenManagement';
import { MarketingManagement } from './departments/MarketingManagement';
import { ReceptionManagement } from './departments/ReceptionManagement';
import { HRManagement } from './departments/HRManagement';
import { TransportManagement } from './departments/TransportManagement';
import { FinanceManagement } from './departments/FinanceManagement';
import { TimeOfficeManagement } from './departments/TimeOfficeManagement';
import { EventsManagement } from './departments/EventsManagement';
import { HODManagement } from './departments/HODManagement';
import { TechnicianManagement } from './departments/TechnicianManagement';
import { AssemblyManagement } from './departments/AssemblyManagement';
import { PNAManagement } from './departments/PNAManagement';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Building2,
  Activity,
  FileText,
  Megaphone,
  Radio
} from 'lucide-react';

interface SuperAdminPortalProps {
  onBack: () => void;
}

const SUPER_ADMIN_USER = {
  name: "Aarush Sharma",
  role: "Super Administrator",
  empId: "SMG-SA-001",
  dept: "IT & Administration",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin&backgroundColor=4338ca",
  email: "aarush.sharma@smg-scooters.com",
  phone: "+91 98765 00001",
  dateOfJoining: "01 January 2019",
  dateOfBirth: "15 May 1982",
  address: "Sector 18, Noida, Uttar Pradesh - 201301",
  reportingTo: "CEO",
  shift: "9:00 AM - 6:00 PM",
};

export const SuperAdminPortal = ({ onBack }: SuperAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('admins-analysis');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileModalOpen = () => {
    console.log('🔍 Opening profile modal with user data:', {
      name: user?.name,
      designation: user?.designation,
      department: user?.department,
      id: user?.id
    });
    setShowProfileModal(true);
  };

  const notifications = [
    { id: 1, text: 'New admin access request from Marketing Dept', time: '5 mins ago', type: 'info' },
    { id: 2, text: 'System backup completed successfully', time: '30 mins ago', type: 'success' },
    { id: 3, text: 'Database optimization required', time: '1 hour ago', type: 'warning' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'admins-analysis': return <AdminsAnalysisPage />;
      case 'departments': return <DepartmentsPage onNavigate={setActivePage} />;
      case 'department-working': return <DepartmentWorkingPage />;
      case 'user-management': return <UserManagementPage />;
      case 'all-requests': return <AllRequestsPage />;
      case 'announcements': return <AnnouncementPage />;
      case 'broadcast': return <BroadcastPage />;
      case 'dept-canteen': return <CanteenManagement />;
      case 'dept-marketing': return <MarketingManagement />;
      case 'dept-reception': return <ReceptionManagement />;
      case 'dept-hr': return <HRManagement />;
      case 'dept-transport': return <TransportManagement />;
      case 'dept-finance': return <FinanceManagement />;
      case 'dept-timeoffice': return <TimeOfficeManagement />;
      case 'dept-events': return <EventsManagement />;
      case 'dept-hod': return <HODManagement />;
      case 'dept-technician': return <TechnicianManagement />;
      case 'dept-assembly': return <AssemblyManagement />;
      case 'dept-pna': return <PNAManagement />;
      default: return <AdminsAnalysisPage />;
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
            onClick={() => setActivePage('admins-analysis')}
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
            onClick={handleProfileModalOpen}
            className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full cursor-pointer hover:bg-gray-100 transition-all"
          >
            <img src={user?.avatar || SUPER_ADMIN_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-[#1B254B] leading-tight">{user?.name || SUPER_ADMIN_USER.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{user?.designation || SUPER_ADMIN_USER.role}</p>
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
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Super Admin</p>
              <div className="space-y-1">
                <button
                  onClick={() => setActivePage('admins-analysis')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activePage === 'admins-analysis'
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <LayoutDashboard size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Dashboard
                  </span>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Departments</p>
              <div className="space-y-1">
                <button
                  onClick={() => setActivePage('departments')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activePage === 'departments' || activePage.startsWith('dept-')
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Building2 size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Departments
                  </span>
                </button>
                <button
                  onClick={() => setActivePage('department-working')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activePage === 'department-working'
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Activity size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Working
                  </span>
                </button>
                <button
                  onClick={() => setActivePage('user-management')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activePage === 'user-management'
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Users size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Users
                  </span>
                </button>
                <button
                  onClick={() => setActivePage('all-requests')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activePage === 'all-requests'
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <FileText size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    All Requests
                  </span>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">System</p>
              <div className="space-y-1">
                <button
                  onClick={() => setActivePage('announcements')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activePage === 'announcements'
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Megaphone size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Announcements
                  </span>
                </button>
                <button
                  onClick={() => setActivePage('broadcast')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activePage === 'broadcast'
                      ? 'bg-white/10 text-white shadow-md'
                      : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Radio size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Broadcast
                  </span>
                </button>
              </div>
            </div>
          </nav>

          {/* Sign Out Button */}
          <div className="mt-auto px-3 pb-6 border-t border-white/10 pt-6">
            <button
              onClick={onBack}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#EE5D50] hover:bg-[#EE5D50]/10 transition-all"
            >
              <LogOut size={22} className="shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Sign Out
              </span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
            <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#042A5B] z-50 lg:hidden shadow-2xl overflow-y-auto">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/Company Logo.jpg" alt="SMG Logo" className="h-10" />
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/10 p-2 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <nav className="px-3 py-6 space-y-1">
                <div className="mb-4">
                  <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2">Super Admin</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActivePage('admins-analysis');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activePage === 'admins-analysis'
                          ? 'bg-white/10 text-white shadow-md'
                          : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <LayoutDashboard size={22} className="shrink-0" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        Dashboard
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2">Departments</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActivePage('departments');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activePage === 'departments' || activePage.startsWith('dept-')
                          ? 'bg-white/10 text-white shadow-md'
                          : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Building2 size={22} className="shrink-0" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        Departments
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('department-working');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activePage === 'department-working'
                          ? 'bg-white/10 text-white shadow-md'
                          : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Activity size={22} className="shrink-0" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        Working
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('user-management');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activePage === 'user-management'
                          ? 'bg-white/10 text-white shadow-md'
                          : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Users size={22} className="shrink-0" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        Users
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('all-requests');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activePage === 'all-requests'
                          ? 'bg-white/10 text-white shadow-md'
                          : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <FileText size={22} className="shrink-0" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        All Requests
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2">System</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActivePage('announcements');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activePage === 'announcements'
                          ? 'bg-white/10 text-white shadow-md'
                          : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Megaphone size={22} className="shrink-0" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        Announcements
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('broadcast');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        activePage === 'broadcast'
                          ? 'bg-white/10 text-white shadow-md'
                          : 'text-[#87CEEB] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Radio size={22} className="shrink-0" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        Broadcast
                      </span>
                    </button>
                  </div>
                </div>
              </nav>

              <div className="mt-auto px-3 pb-6 border-t border-white/10 pt-6">
                <button
                  onClick={onBack}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#EE5D50] hover:bg-[#EE5D50]/10 transition-all"
                >
                  <LogOut size={22} className="shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">
                    Sign Out
                  </span>
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowProfileModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-t-3xl p-8 text-white relative overflow-hidden">
              <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 text-white/80 hover:text-white">
                <X size={24} />
              </button>
              <div className="flex items-center gap-6">
                <img src={user?.avatar || SUPER_ADMIN_USER.avatar} alt="Profile" className="w-24 h-24 rounded-2xl border-4 border-white/20 shadow-xl" />
                <div>
                  <h2 className="text-3xl font-bold mb-1">{user?.name || SUPER_ADMIN_USER.name}</h2>
                  <p className="text-[#87CEEB] text-lg font-medium">{user?.designation || SUPER_ADMIN_USER.role}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                      <p className="text-xs text-[#87CEEB]">Employee ID</p>
                      <p className="font-bold text-sm">{user?.id || SUPER_ADMIN_USER.empId}</p>
                    </div>
                    <div className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                      <p className="text-xs text-[#87CEEB]">Department</p>
                      <p className="font-bold text-sm">{user?.department || SUPER_ADMIN_USER.dept}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#0B4DA2]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email Address</p>
                    <p className="text-sm font-bold text-[#1B254B] mt-0.5">{user?.email || SUPER_ADMIN_USER.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Phone Number</p>
                    <p className="text-sm font-bold text-[#1B254B] mt-0.5">{user?.phone || SUPER_ADMIN_USER.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Date of Joining</p>
                    <p className="text-sm font-bold text-[#1B254B] mt-0.5">{user?.joinDate || SUPER_ADMIN_USER.dateOfJoining}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center shrink-0">
                    <Award size={20} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Date of Birth</p>
                    <p className="text-sm font-bold text-[#1B254B] mt-0.5">{SUPER_ADMIN_USER.dateOfBirth}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                    <Briefcase size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Reporting To</p>
                    <p className="text-sm font-bold text-[#1B254B] mt-0.5">{user?.reportingManager || SUPER_ADMIN_USER.reportingTo}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <User size={20} className="text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Work Shift</p>
                    <p className="text-sm font-bold text-[#1B254B] mt-0.5">{SUPER_ADMIN_USER.shift}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Address</p>
                    <p className="text-sm font-bold text-[#1B254B] mt-0.5">{user?.location || SUPER_ADMIN_USER.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
