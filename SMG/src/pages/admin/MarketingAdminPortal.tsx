import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import smgLogo from '../../assets/smg-logo.jpg';
import { MarketingDashboard } from './marketing/MarketingDashboard';
import { CampaignStatus } from './marketing/CampaignStatus';
import { MarketingAgencies } from './marketing/MarketingAgencies';
import { NewCampaigns } from './marketing/NewCampaigns';
import { OngoingCampaigns } from './marketing/OngoingCampaigns';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Users,
  Megaphone,
  Target,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award
} from 'lucide-react';

interface MarketingAdminPortalProps {
  onBack: () => void;
}

const MARKETING_USER = {
  name: "Priya Sharma",
  role: "Marketing Manager",
  empId: "SMG-MKT-001",
  dept: "Marketing",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarketingAdmin&backgroundColor=ffdfbf",
  email: "priya.sharma@smg-scooters.com",
  phone: "+91 98765 43210",
  dateOfJoining: "10 February 2019",
  dateOfBirth: "15 March 1988",
  address: "Sector 18, Noida, Uttar Pradesh - 201301",
  reportingTo: "Sales Head",
  shift: "9:30 AM - 6:30 PM",
};

export const MarketingAdminPortal = ({ onBack }: MarketingAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const notifications = [
    { id: 1, text: '3 new campaign proposals pending review', time: '15 mins ago', type: 'warning' },
    { id: 2, text: 'Digital campaign ROI report ready', time: '1 hour ago', type: 'info' },
    { id: 3, text: 'New marketing agency onboarded', time: '2 hours ago', type: 'success' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <MarketingDashboard onNavigate={setActivePage} />;
      case 'campaign-status': return <CampaignStatus />;
      case 'agencies': return <MarketingAgencies />;
      case 'new-campaigns': return <NewCampaigns />;
      case 'ongoing-campaigns': return <OngoingCampaigns />;
      default: return <MarketingDashboard onNavigate={setActivePage} />;
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
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                <div className="p-4 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white">
                  <h3 className="font-bold text-lg">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors">
                      <p className="text-sm text-[#1B254B] font-medium">{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img src={user?.avatar || MARKETING_USER.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
            <ChevronRight size={16} className="text-gray-400 hidden sm:block" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-20 hover:w-64 transition-all duration-300 bg-[#042A5B] min-h-[calc(100vh-64px)] group relative overflow-hidden">
          <nav className="flex-1 px-3 py-6 space-y-8">
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Overview</p>
              
              <button
                onClick={() => setActivePage('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'dashboard' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <LayoutDashboard size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Dashboard</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Campaigns</p>
              
              <button
                onClick={() => setActivePage('campaign-status')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'campaign-status' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <BarChart3 size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Campaign Status</span>
              </button>

              <button
                onClick={() => setActivePage('new-campaigns')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'new-campaigns' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <Megaphone size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">New Campaigns</span>
              </button>

              <button
                onClick={() => setActivePage('ongoing-campaigns')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'ongoing-campaigns' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <Target size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Ongoing Campaigns</span>
              </button>
            </div>

            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Management</p>
              
              <button
                onClick={() => setActivePage('agencies')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'agencies' ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-white/70 hover:bg-white/10'}`}
              >
                <Users size={20} className="shrink-0 text-white" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-white">Marketing Agencies</span>
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
                <h2 className="text-white font-bold text-lg">Marketing Portal</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <nav className="px-3 py-6 space-y-1">
                <button onClick={() => { setActivePage('dashboard'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'dashboard' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </button>
                <button onClick={() => { setActivePage('campaign-status'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'campaign-status' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <BarChart3 size={20} />
                  <span>Campaign Status</span>
                </button>
                <button onClick={() => { setActivePage('new-campaigns'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'new-campaigns' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <Megaphone size={20} />
                  <span>New Campaigns</span>
                </button>
                <button onClick={() => { setActivePage('ongoing-campaigns'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'ongoing-campaigns' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <Target size={20} />
                  <span>Ongoing Campaigns</span>
                </button>
                <button onClick={() => { setActivePage('agencies'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === 'agencies' ? 'bg-[#0B4DA2] text-white' : 'text-white/70'}`}>
                  <Users size={20} />
                  <span>Marketing Agencies</span>
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
        <main className="flex-1 overflow-x-hidden">
          {renderContent()}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <img src={user?.avatar || MARKETING_USER.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white/30" />
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || MARKETING_USER.name}</h2>
                    <p className="text-white/80">{user?.designation || MARKETING_USER.role}</p>
                    <p className="text-white/60 text-sm">{user?.id || MARKETING_USER.empId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1B254B] border-b-2 border-blue-500 pb-2">Personal Information</h3>
                
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="text-blue-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Email</p>
                      <p className="font-bold text-[#1B254B]">{user?.email || MARKETING_USER.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="text-green-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Phone</p>
                      <p className="font-bold text-[#1B254B]">{user?.phone || MARKETING_USER.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="text-purple-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Date of Birth</p>
                      <p className="font-bold text-[#1B254B]">{MARKETING_USER.dateOfBirth}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-red-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Address</p>
                      <p className="font-bold text-[#1B254B] text-sm">{user?.location || MARKETING_USER.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1B254B] border-b-2 border-green-500 pb-2">Employment Details</h3>
                
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="text-blue-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Department</p>
                      <p className="font-bold text-[#1B254B]">{user?.department || MARKETING_USER.dept}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="text-orange-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Reporting To</p>
                      <p className="font-bold text-[#1B254B]">{user?.reportingManager || MARKETING_USER.reportingTo}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="text-green-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Date of Joining</p>
                      <p className="font-bold text-[#1B254B]">{user?.joinDate || MARKETING_USER.dateOfJoining}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="text-purple-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Shift Timing</p>
                      <p className="font-bold text-[#1B254B]">{MARKETING_USER.shift}</p>
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
