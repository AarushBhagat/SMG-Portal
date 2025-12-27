import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HRDashboard } from './hr/HRDashboard';
import { MRFApproval } from './hr/MRFApproval';
import { InterviewManagement } from './hr/InterviewManagement';
import { JoiningForms } from './hr/JoiningForms';
import { TrainingDevelopment } from './hr/TrainingDevelopment';
import { EmployeeWelfare } from './hr/EmployeeWelfare';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Users,
  FileText,
  UserPlus,
  GraduationCap,
  Heart,
  ClipboardList,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

interface HRAdminPortalProps {
  onBack: () => void;
}

const HR_USER = {
  name: "Priya Sharma",
  role: "HR Manager",
  empId: "SMG-HR-001",
  dept: "Human Resources",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HRAdmin&backgroundColor=c0aede",
  email: "priya.sharma@smg-scooters.com",
  phone: "+91 98765 33445",
  dateOfJoining: "10 March 2019",
  dateOfBirth: "20 June 1985",
  address: "Sector 50, Noida, Uttar Pradesh - 201301",
  reportingTo: "Admin Head",
  shift: "9:00 AM - 6:00 PM",
};

export const HRAdminPortal = ({ onBack }: HRAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const notifications = [
    { id: 1, text: 'New MRF request pending approval', time: '10 mins ago', type: 'warning' },
    { id: 2, text: 'Interview scheduled for tomorrow 10 AM', time: '1 hour ago', type: 'info' },
    { id: 3, text: 'New joining form submitted', time: '2 hours ago', type: 'success' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <HRDashboard onNavigate={setActivePage} />;
      case 'mrf-approval': return <MRFApproval />;
      case 'interview-management': return <InterviewManagement />;
      case 'joining-forms': return <JoiningForms />;
      case 'training-development': return <TrainingDevelopment />;
      case 'employee-welfare': return <EmployeeWelfare />;
      default: return <HRDashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* Topbar */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-[#1B254B]" />
            </button>
            <div className="flex items-center gap-3">
              <img 
                src="/Company Logo.jpg" 
                alt="SMG Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 gap-2 min-w-[300px]">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search employees, forms..." 
                className="bg-transparent outline-none text-sm w-full text-[#1B254B] placeholder-gray-400"
              />
            </div>

            {mobileMenuOpen && (
              <>
                <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)} />
                <div className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-[#042A5B] z-50 overflow-y-auto">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-white font-bold text-lg">HR Menu</h2>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <nav className="p-3 space-y-1">
                    {[
                      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                      { id: 'mrf-approval', icon: FileText, label: 'MRF & JD Approval' },
                      { id: 'interview-management', icon: ClipboardList, label: 'Interview Management' },
                      { id: 'joining-forms', icon: UserPlus, label: 'Joining Forms' },
                      { id: 'training-development', icon: GraduationCap, label: 'Training & Development' },
                      { id: 'employee-welfare', icon: Heart, label: 'Employee Welfare' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                          activePage === item.id 
                            ? 'bg-white text-[#0B4DA2]' 
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <item.icon size={20} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </>
            )}

            <div className="relative">
              <button 
                onClick={() => setShowNotificationPopup(!showNotificationPopup)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell size={20} className="text-[#1B254B]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotificationPopup && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    <p className="text-xs text-white/80 mt-1">You have {notifications.length} new notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                        <p className="text-sm text-[#1B254B] font-medium">{notif.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div 
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full cursor-pointer hover:bg-gray-100 transition-all"
            >
              <img src={user?.avatar || HR_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-bold text-[#1B254B] leading-tight">{user?.name || HR_USER.name}</p>
                <p className="text-[10px] text-gray-400 font-medium">{user?.designation || HR_USER.role}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[80px] hover:w-[260px] bg-[#042A5B] flex-col transition-all duration-300 group shadow-2xl overflow-y-auto sticky top-0 h-screen">
          <nav className="px-3 py-6 space-y-1">
            <div className="mb-4">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">HR Admin</p>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'mrf-approval', icon: FileText, label: 'MRF & JD Approval' },
                  { id: 'interview-management', icon: ClipboardList, label: 'Interview Management' },
                  { id: 'joining-forms', icon: UserPlus, label: 'Joining Forms' },
                  { id: 'training-development', icon: GraduationCap, label: 'Training & Development' },
                  { id: 'employee-welfare', icon: Heart, label: 'Employee Welfare' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group/item ${
                      activePage === item.id 
                        ? 'bg-white text-[#0B4DA2] shadow-lg' 
                        : 'text-white hover:bg-white/10'
                    }`}
                    title={item.label}
                  >
                    <item.icon size={22} className="shrink-0" />
                    <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button 
                onClick={onBack}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#EE5D50] hover:bg-[#EE5D50]/10 transition-all"
              >
                <LogOut size={22} className="shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Back to Home
                </span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <img src={user?.avatar || HR_USER.avatar} alt={user?.name || HR_USER.name} className="w-16 h-16 rounded-full border-4 border-white/20" />
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || HR_USER.name}</h2>
                    <p className="text-white/80 text-sm">{user?.designation || HR_USER.role} • {user?.department || HR_USER.dept}</p>
                    <p className="text-white/60 text-xs mt-1">Employee ID: {user?.id || HR_USER.empId}</p>
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

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                    <User size={20} className="text-[#0B4DA2]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Full Name</p>
                        <p className="font-bold text-[#1B254B]">{user?.name || HR_USER.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Email Address</p>
                        <p className="font-bold text-[#1B254B]">{user?.email || HR_USER.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Phone Number</p>
                        <p className="font-bold text-[#1B254B]">{user?.phone || HR_USER.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Address</p>
                        <p className="font-bold text-[#1B254B]">{user?.location || HR_USER.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-[#0B4DA2]" />
                    Employment Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Briefcase className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Department</p>
                        <p className="font-bold text-[#1B254B]">{user?.department || HR_USER.dept}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Role / Designation</p>
                        <p className="font-bold text-[#1B254B]">{user?.designation || HR_USER.role}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Employee ID</p>
                        <p className="font-bold text-[#1B254B]">{user?.id || HR_USER.empId}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Date of Joining</p>
                        <p className="font-bold text-[#1B254B]">{user?.joinDate || HR_USER.dateOfJoining}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Reporting To</p>
                        <p className="font-bold text-[#1B254B]">{user?.reportingManager || HR_USER.reportingTo}</p>
                      </div>
                    </div>
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
