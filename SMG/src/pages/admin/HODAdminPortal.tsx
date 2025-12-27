import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HODDashboard } from './hod/HODDashboard';
import { SMGImagineApproval } from './hod/SMGImagineApproval';
import { LeaveGatePassResignationApproval } from './hod/LeaveGatePassResignationApproval';
import { ResignationAcceptance } from './hod/ResignationAcceptance';
import { EmployeeRatings } from './hod/EmployeeRatings';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Lightbulb,
  ClipboardCheck,
  UserX,
  Star,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award
} from 'lucide-react';

interface HODAdminPortalProps {
  onBack: () => void;
}

const HOD_USER = {
  name: "Vikram Patel",
  role: "Head of Department - IT",
  empId: "SMG-HOD-001",
  dept: "Information Technology",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HODAdmin&backgroundColor=ffd5dc",
  email: "vikram.patel@smg-scooters.com",
  phone: "+91 98765 12345",
  dateOfJoining: "15 January 2016",
  dateOfBirth: "8 July 1980",
  address: "Sector 15, Noida, Uttar Pradesh - 201301",
  reportingTo: "Managing Director",
  shift: "9:00 AM - 6:00 PM",
};

export const HODAdminPortal = ({ onBack }: HODAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const notifications = [
    { id: 1, text: '5 SMG IMAGINE ideas pending approval', time: '10 mins ago', type: 'warning' },
    { id: 2, text: '3 leave requests awaiting review', time: '1 hour ago', type: 'info' },
    { id: 3, text: 'New resignation request submitted', time: '2 hours ago', type: 'warning' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <HODDashboard onNavigate={setActivePage} />;
      case 'smg-imagine': return <SMGImagineApproval />;
      case 'leave-gatepass': return <LeaveGatePassResignationApproval />;
      case 'resignation': return <ResignationAcceptance />;
      case 'ratings': return <EmployeeRatings />;
      default: return <HODDashboard onNavigate={setActivePage} />;
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
            <img src={user?.avatar || HOD_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-[#1B254B] leading-tight">{user?.name || HOD_USER.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{user?.designation || HOD_USER.role}</p>
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
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">HOD Portal</p>
              <button
                onClick={() => setActivePage('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'dashboard' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <LayoutDashboard size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Dashboard</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Approvals</p>
              
              <button
                onClick={() => setActivePage('smg-imagine')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'smg-imagine' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <Lightbulb size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">SMG IMAGINE</span>
              </button>

              <button
                onClick={() => setActivePage('leave-gatepass')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'leave-gatepass' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <ClipboardCheck size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Leave & Gate Pass</span>
              </button>

              <button
                onClick={() => setActivePage('resignation')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'resignation' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <UserX size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Resignation</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Performance</p>
              
              <button
                onClick={() => setActivePage('ratings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'ratings' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <Star size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Employee Ratings</span>
              </button>
            </div>

            <div className="absolute bottom-6 left-0 right-0 px-3">
              <button
                onClick={onBack}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#EE5D50]/10 text-[#EE5D50] rounded-xl font-bold hover:bg-[#EE5D50]/20 transition-all"
              >
                <LogOut size={20} className="shrink-0" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Sign Out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#042A5B] z-50 lg:hidden overflow-y-auto">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">HOD Portal</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <nav className="px-3 py-6 space-y-1">
                <button onClick={() => { setActivePage('dashboard'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'dashboard' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </button>
                <button onClick={() => { setActivePage('smg-imagine'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'smg-imagine' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <Lightbulb size={20} />
                  <span>SMG IMAGINE</span>
                </button>
                <button onClick={() => { setActivePage('leave-gatepass'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'leave-gatepass' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <ClipboardCheck size={20} />
                  <span>Leave & Gate Pass</span>
                </button>
                <button onClick={() => { setActivePage('resignation'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'resignation' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <UserX size={20} />
                  <span>Resignation</span>
                </button>
                <button onClick={() => { setActivePage('ratings'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'ratings' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <Star size={20} />
                  <span>Employee Ratings</span>
                </button>
                <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#EE5D50] bg-[#EE5D50]/10 mt-6 font-bold hover:bg-[#EE5D50]/20">
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <img src={user?.avatar || HOD_USER.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white/20" />
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || HOD_USER.name}</h2>
                    <p className="text-white/80">{user?.designation || HOD_USER.role}</p>
                    <p className="text-sm text-white/60">{user?.id || HOD_USER.empId}</p>
                  </div>
                </div>
                <button onClick={() => setShowProfileModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1B254B] mb-4 pb-2 border-b-2 border-blue-500">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Full Name</p>
                        <p className="font-semibold text-[#1B254B]">{user?.name || HOD_USER.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-semibold text-[#1B254B]">{user?.email || HOD_USER.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-semibold text-[#1B254B]">{user?.phone || HOD_USER.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="font-semibold text-[#1B254B]">{user?.location || HOD_USER.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1B254B] mb-4 pb-2 border-b-2 border-blue-500">Employment Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Briefcase className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="font-semibold text-[#1B254B]">{user?.department || HOD_USER.dept}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Position</p>
                        <p className="font-semibold text-[#1B254B]">{user?.designation || HOD_USER.role}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Reporting To</p>
                        <p className="font-semibold text-[#1B254B]">{user?.reportingManager || HOD_USER.reportingTo}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="text-blue-500 mt-1" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Date of Joining</p>
                        <p className="font-semibold text-[#1B254B]">{user?.joinDate || HOD_USER.dateOfJoining}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
