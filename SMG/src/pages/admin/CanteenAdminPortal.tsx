import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import smgLogo from '../../assets/smg-logo.jpg';
import { CanteenDashboard } from './canteen/CanteenDashboard';
import { SaleCoupons } from './canteen/SaleCoupons';
import { IssueCoupons } from './canteen/IssueCoupons';
import { ApproveGuestCoupons } from './canteen/ApproveGuestCoupons';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Coffee,
  ShoppingCart,
  FileCheck,
  UserCheck,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

interface CanteenAdminPortalProps {
  onBack: () => void;
}

const CANTEEN_USER = {
  name: "Rajesh Kumar",
  role: "Canteen Manager",
  empId: "SMG-CANT-001",
  dept: "Canteen",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CanteenAdmin&backgroundColor=b6e3f4",
  email: "rajesh.kumar@smg-scooters.com",
  phone: "+91 98765 11223",
  dateOfJoining: "15 January 2020",
  dateOfBirth: "25 March 1985",
  address: "Sector 62, Noida, Uttar Pradesh - 201301",
  reportingTo: "HR Manager",
  shift: "10:00 AM - 7:00 PM",
};

export const CanteenAdminPortal = ({ onBack }: CanteenAdminPortalProps) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const notifications = [
    { id: 1, text: 'New guest coupon request from John Doe', time: '10 mins ago', type: 'info' },
    { id: 2, text: '50 coupons sold today', time: '1 hour ago', type: 'success' },
    { id: 3, text: 'Low coupon stock alert', time: '2 hours ago', type: 'warning' }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <CanteenDashboard onNavigate={setActivePage} />;
      case 'sale-coupons': return <SaleCoupons />;
      case 'issue-coupons': return <IssueCoupons />;
      case 'approve-guest': return <ApproveGuestCoupons />;
      default: return <CanteenDashboard onNavigate={setActivePage} />;
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
            <img src={user?.avatar || CANTEEN_USER.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-[#1B254B] leading-tight">{user?.name || CANTEEN_USER.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{user?.designation || CANTEEN_USER.role}</p>
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
              <p className="px-3 text-[10px] font-bold text-[#87CEEB]/60 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Canteen Admin</p>
              <div className="space-y-1">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'sale-coupons', icon: ShoppingCart, label: 'Sale Coupons' },
                  { id: 'issue-coupons', icon: FileCheck, label: 'Issue Coupons' },
                  { id: 'approve-guest', icon: UserCheck, label: 'Guest Requests' }
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
              <span className="text-2xl font-bold text-[#1B254B]">Canteen Portal</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-2 overflow-y-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'sale-coupons', label: 'Sale Coupons', icon: ShoppingCart },
                { id: 'issue-coupons', label: 'Issue Coupons', icon: FileCheck },
                { id: 'approve-guest', label: 'Guest Requests', icon: UserCheck }
              ].map(item => (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-colors ${activePage === item.id ? 'bg-[#0B4DA2] text-white' : 'text-gray-500 hover:bg-[#F4F7FE]'}`}
                  onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                >
                  <item.icon size={20} />{item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-100">
              <button onClick={onBack} className="flex items-center gap-2 text-[#EE5D50] font-bold w-full p-2 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <img src={user?.avatar || CANTEEN_USER.avatar} alt={user?.name || CANTEEN_USER.name} className="w-16 h-16 rounded-full border-4 border-white/20" />
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || CANTEEN_USER.name}</h2>
                    <p className="text-white/80 text-sm">{user?.designation || CANTEEN_USER.role} • {user?.department || CANTEEN_USER.dept}</p>
                    <p className="text-white/60 text-xs mt-1">Employee ID: {user?.id || CANTEEN_USER.empId}</p>
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
                        <p className="font-bold text-[#1B254B]">{user?.name || CANTEEN_USER.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Email Address</p>
                        <p className="font-bold text-[#1B254B]">{user?.email || CANTEEN_USER.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Phone Number</p>
                        <p className="font-bold text-[#1B254B]">{user?.phone || CANTEEN_USER.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Date of Birth</p>
                        <p className="font-bold text-[#1B254B]">{CANTEEN_USER.dateOfBirth}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Address</p>
                        <p className="font-bold text-[#1B254B]">{user?.location || CANTEEN_USER.address}</p>
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
                        <p className="font-bold text-[#1B254B]">{user?.department || CANTEEN_USER.dept}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Role / Designation</p>
                        <p className="font-bold text-[#1B254B]">{user?.designation || CANTEEN_USER.role}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Employee ID</p>
                        <p className="font-bold text-[#1B254B]">{user?.id || CANTEEN_USER.empId}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Date of Joining</p>
                        <p className="font-bold text-[#1B254B]">{user?.joinDate || CANTEEN_USER.dateOfJoining}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Reporting To</p>
                        <p className="font-bold text-[#1B254B]">{user?.reportingManager || CANTEEN_USER.reportingTo}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="text-[#0B4DA2] mt-1 shrink-0" size={18} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-semibold">Shift Timing</p>
                        <p className="font-bold text-[#1B254B]">{CANTEEN_USER.shift}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <ShoppingCart className="text-blue-600" size={24} />
                      <span className="text-xs font-bold text-blue-600 bg-white px-2 py-1 rounded-full">Today</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">245</p>
                    <p className="text-sm text-blue-700 font-medium">Coupons Sold</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <FileCheck className="text-green-600" size={24} />
                      <span className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded-full">This Week</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">180</p>
                    <p className="text-sm text-green-700 font-medium">Coupons Issued</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <UserCheck className="text-orange-600" size={24} />
                      <span className="text-xs font-bold text-orange-600 bg-white px-2 py-1 rounded-full">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">5</p>
                    <p className="text-sm text-orange-700 font-medium">Guest Requests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
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
