import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import smgLogo from '../../assets/smg-logo.jpg';
import { ReceptionDashboard } from './reception/ReceptionDashboard';
import { VisitorManagementSystem } from './reception/VisitorManagementSystem';
import { CorporateGuestApproval } from './reception/CorporateGuestApproval';
import { InterviewCandidatesApproval } from './reception/InterviewCandidatesApproval';
import { GovernmentOfficialGuests } from './reception/GovernmentOfficialGuests';
import { KeysInformation } from './reception/KeysInformation';
import { KeyPersonInformation } from './reception/KeyPersonInformation';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Users,
  Briefcase,
  UserCheck,
  Shield,
  Key,
  UserCog,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';

interface ReceptionAdminPortalProps {
  onBack: () => void;
}

const RECEPTION_USER = {
  name: "Meera Gupta",
  role: "Reception Manager",
  empId: "SMG-REC-001",
  dept: "Reception",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ReceptionAdmin&backgroundColor=ffd5dc",
  email: "meera.gupta@smg-scooters.com",
  phone: "+91 98765 55667",
  dateOfJoining: "20 February 2020",
  dateOfBirth: "15 May 1990",
  address: "Sector 45, Noida, Uttar Pradesh - 201301",
  reportingTo: "Admin Head",
  shift: "8:30 AM - 5:30 PM",
};

export const ReceptionAdminPortal = ({ onBack }: ReceptionAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  console.log('📍 ReceptionAdminPortal - Current user:', {
    name: user?.name,
    designation: user?.designation,
    department: user?.department,
    role: user?.role
  });

  const notifications = [
    { id: 1, text: 'New corporate guest request from Sales dept', time: '5 mins ago', type: 'info' },
    { id: 2, text: 'Interview candidate waiting in lobby', time: '15 mins ago', type: 'warning' },
    { id: 3, text: 'Government official visit scheduled tomorrow', time: '1 hour ago', type: 'info' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <ReceptionDashboard onNavigate={setActivePage} />;
      case 'visitor-management': return <VisitorManagementSystem />;
      case 'corporate-guest': return <CorporateGuestApproval />;
      case 'interview-candidates': return <InterviewCandidatesApproval />;
      case 'government-guests': return <GovernmentOfficialGuests />;
      case 'keys-information': return <KeysInformation />;
      case 'key-persons': return <KeyPersonInformation />;
      default: return <ReceptionDashboard onNavigate={setActivePage} />;
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
            <img src={user?.avatar || RECEPTION_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-[#1B254B] leading-tight">{user?.name || RECEPTION_USER.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{user?.designation || RECEPTION_USER.role}</p>
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
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 whitespace-nowrap">Reception Admin</p>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'visitor-management', icon: Users, label: 'Visitor Management' },
                  { id: 'corporate-guest', icon: Briefcase, label: 'Corporate Guests' },
                  { id: 'interview-candidates', icon: UserCheck, label: 'Interview Candidates' },
                  { id: 'government-guests', icon: Shield, label: 'Government Officials' },
                  { id: 'keys-information', icon: Key, label: 'Keys Information' },
                  { id: 'key-persons', icon: UserCog, label: 'Key Persons' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'}`}
                  >
                    <div className="shrink-0 flex justify-center w-6">
                      <item.icon size={20} />
                    </div>
                    <span className="whitespace-nowrap text-sm font-bold flex-1 text-left">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={onBack}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EE5D50] hover:bg-[#EE5D50]/10 transition-all duration-200 font-bold"
              >
                <div className="shrink-0 flex justify-center w-6"><LogOut size={20} /></div>
                <span>Sign Out</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#1B254B]/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-[#1B254B]">Reception Portal</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'visitor-management', icon: Users, label: 'Visitor Management' },
                { id: 'corporate-guest', icon: Briefcase, label: 'Corporate Guests' },
                { id: 'interview-candidates', icon: UserCheck, label: 'Interview Candidates' },
                { id: 'government-guests', icon: Shield, label: 'Government Officials' },
                { id: 'keys-information', icon: Key, label: 'Keys Information' },
                { id: 'key-persons', icon: UserCog, label: 'Key Persons' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === item.id ? 'bg-[#042A5B] text-white' : 'text-[#1B254B] hover:bg-gray-100'}`}
                >
                  <item.icon size={20} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={onBack}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#EE5D50]/10 text-[#EE5D50] rounded-xl font-bold hover:bg-[#EE5D50]/20 transition-all mt-6"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
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
                  <img src={user?.avatar || RECEPTION_USER.avatar} alt={user?.name || RECEPTION_USER.name} className="w-16 h-16 rounded-full border-4 border-white/20" />
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || RECEPTION_USER.name}</h2>
                    <p className="text-white/80 text-sm">{user?.designation || RECEPTION_USER.role} • {user?.department || RECEPTION_USER.dept}</p>
                    <p className="text-white/60 text-xs mt-1">Employee ID: {user?.id || RECEPTION_USER.empId}</p>
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
                      { icon: User, label: 'Full Name', value: user?.name || RECEPTION_USER.name },
                      { icon: Mail, label: 'Email Address', value: user?.email || RECEPTION_USER.email },
                      { icon: Phone, label: 'Phone Number', value: user?.phone || RECEPTION_USER.phone },
                      { icon: Calendar, label: 'Date of Birth', value: RECEPTION_USER.dateOfBirth },
                      { icon: MapPin, label: 'Address', value: user?.location || RECEPTION_USER.address }
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
                      { icon: Briefcase, label: 'Department', value: user?.department || RECEPTION_USER.dept },
                      { icon: Award, label: 'Role / Designation', value: user?.designation || RECEPTION_USER.role },
                      { icon: User, label: 'Employee ID', value: user?.id || RECEPTION_USER.empId },
                      { icon: Calendar, label: 'Date of Joining', value: user?.joinDate || RECEPTION_USER.dateOfJoining },
                      { icon: User, label: 'Reporting To', value: user?.reportingManager || RECEPTION_USER.reportingTo },
                      { icon: Award, label: 'Shift Timing', value: RECEPTION_USER.shift }
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
