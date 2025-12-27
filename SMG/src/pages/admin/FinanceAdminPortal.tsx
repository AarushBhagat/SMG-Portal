import { useState } from 'react';
import { FinanceDashboard } from './finance/FinanceDashboard';
import { SalaryStatusDisplay } from './finance/SalaryStatusDisplay';
import { InsuranceDetailsDisplay } from './finance/InsuranceDetailsDisplay';
import { LoanApproval } from './finance/LoanApproval';
import { AssetRequestApproval } from './finance/AssetRequestApproval';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Wallet,
  IndianRupee,
  Shield,
  TrendingUp,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

interface FinanceAdminPortalProps {
  onBack: () => void;
}

const FINANCE_USER = {
  name: "Priya Sharma",
  role: "Finance Manager",
  empId: "SMG-FIN-001",
  dept: "Finance",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FinanceAdmin&backgroundColor=c0aede",
  email: "priya.sharma@smg-scooters.com",
  phone: "+91 98765 33445",
  dateOfJoining: "10 March 2019",
  dateOfBirth: "12 July 1988",
  address: "Sector 18, Noida, Uttar Pradesh - 201301",
  reportingTo: "CFO",
  shift: "9:00 AM - 6:00 PM",
};

export const FinanceAdminPortal = ({ onBack }: FinanceAdminPortalProps) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const notifications = [
    { id: 1, text: 'New loan request from Vikram Singh', time: '5 mins ago', type: 'info' },
    { id: 2, text: '245 salaries processed successfully', time: '30 mins ago', type: 'success' },
    { id: 3, text: '12 loan approvals pending', time: '1 hour ago', type: 'warning' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <FinanceDashboard onNavigate={setActivePage} />;
      case 'salary-status': return <SalaryStatusDisplay />;
      case 'insurance-details': return <InsuranceDetailsDisplay />;
      case 'loan-approval': return <LoanApproval />;
      case 'asset-request': return <AssetRequestApproval />;
      default: return <FinanceDashboard onNavigate={setActivePage} />;
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
            <img src={FINANCE_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-[#1B254B] leading-tight">{FINANCE_USER.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{FINANCE_USER.role}</p>
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
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Finance Admin</p>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'salary-status', icon: IndianRupee, label: 'Salary Status' },
                  { id: 'insurance-details', icon: Shield, label: 'Insurance Details' },
                  { id: 'loan-approval', icon: TrendingUp, label: 'Loan Approval' },
                  { id: 'asset-request', icon: Package, label: 'Asset Request' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activePage === item.id ? 'bg-[#0B4DA2] text-white shadow-lg' : 'text-[#87CEEB] hover:bg-[#0B4DA2]/20'}`}
                  >
                    <div className="shrink-0 flex justify-center w-6">
                      <item.icon size={20} />
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
          <div className="absolute inset-0 bg-[#1B254B]/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-[#1B254B]">Finance Portal</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'salary-status', icon: IndianRupee, label: 'Salary Status' },
                { id: 'insurance-details', icon: Shield, label: 'Insurance Details' },
                { id: 'loan-approval', icon: TrendingUp, label: 'Loan Approval' },
                { id: 'asset-request', icon: Package, label: 'Asset Request' }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative h-32 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] shrink-0">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            {/* Profile Content */}
            <div className="px-8 pb-8 -mt-16 overflow-y-auto flex-1">
              <div className="flex flex-col items-center mb-6">
                <img src={FINANCE_USER.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-xl mb-4" />
                <h2 className="text-2xl font-bold text-[#1B254B]">{FINANCE_USER.name}</h2>
                <p className="text-gray-500 font-medium">{FINANCE_USER.role}</p>
                <p className="text-sm text-gray-400 mt-1">{FINANCE_USER.empId}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Mail, label: 'Email', value: FINANCE_USER.email },
                  { icon: Phone, label: 'Phone', value: FINANCE_USER.phone },
                  { icon: Briefcase, label: 'Department', value: FINANCE_USER.dept },
                  { icon: Calendar, label: 'Date of Joining', value: FINANCE_USER.dateOfJoining },
                  { icon: Calendar, label: 'Date of Birth', value: FINANCE_USER.dateOfBirth },
                  { icon: Award, label: 'Reporting To', value: FINANCE_USER.reportingTo },
                  { icon: MapPin, label: 'Address', value: FINANCE_USER.address, fullWidth: true }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 bg-gray-50 rounded-xl ${item.fullWidth ? 'md:col-span-2' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#042A5B]/10 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="text-[#0B4DA2]" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-semibold mb-1">{item.label}</p>
                        <p className="text-sm text-[#1B254B] font-medium break-words">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
