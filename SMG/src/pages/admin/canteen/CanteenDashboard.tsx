import { Coffee, TrendingUp, Users, DollarSign, ShoppingCart, FileCheck, UserCheck } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

interface CanteenDashboardProps {
  onNavigate: (page: string) => void;
}

export const CanteenDashboard = ({ onNavigate }: CanteenDashboardProps) => {
  const { requests } = useApp();

  // Filter canteen requests from Firestore
  const canteenRequests = requests.filter((r: any) => r.requestType === 'canteen');
  const pendingCanteenRequests = canteenRequests.filter((r: any) => r.status === 'pending');
  const approvedCanteenRequests = canteenRequests.filter((r: any) => r.status === 'approved');

  // Guest-type requests (guesthouse or canteen guest)
  const guestRequests = requests.filter((r: any) => r.requestType === 'guesthouse' || r.requestType === 'guest_house');
  const pendingGuestRequests = guestRequests.filter((r: any) => r.status === 'pending');

  // Compute stats from real data
  const totalRevenue = approvedCanteenRequests.reduce((sum: number, r: any) => sum + (r.requestData?.amount || 0), 0);
  const totalCouponsSold = approvedCanteenRequests.reduce((sum: number, r: any) => sum + (r.requestData?.coupons || 0), 0);

  const stats = [
    { label: 'Total Coupons Sold', value: String(totalCouponsSold), icon: ShoppingCart, color: 'bg-blue-500', change: `${approvedCanteenRequests.length} orders` },
    { label: 'Pending Requests', value: String(pendingCanteenRequests.length), icon: FileCheck, color: 'bg-green-500', change: 'awaiting review' },
    { label: 'Guest Requests', value: String(pendingGuestRequests.length), icon: UserCheck, color: 'bg-orange-500', change: 'pending' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: 'bg-purple-500', change: `${canteenRequests.length} total` }
  ];

  const quickActions = [
    { id: 'approve-requests', label: 'Employee Requests', icon: FileCheck, color: 'from-blue-500 to-blue-600', desc: 'Approve employee coupon requests' },
    { id: 'approve-guest', label: 'Guest Requests', icon: UserCheck, color: 'from-orange-500 to-orange-600', desc: 'Approve guest coupon requests' },
    { id: 'sale-coupons', label: 'Sale New Coupons', icon: ShoppingCart, color: 'from-green-500 to-green-600', desc: 'Record coupon sales to employees' },
    { id: 'issue-coupons', label: 'Issue Coupons', icon: FileCheck, color: 'from-purple-500 to-purple-600', desc: 'Issue coupons to employees' }
  ];

  // Recent approved canteen requests as "recent sales"
  const recentSales = approvedCanteenRequests.slice(0, 4).map((r: any) => ({
    id: r.id,
    empName: r.employeeName || r.userName || 'Employee',
    empId: r.employeeId || r.id?.substring(0, 12),
    quantity: r.requestData?.coupons || 0,
    amount: `₹${(r.requestData?.amount || 0).toLocaleString('en-IN')}`,
    time: r.createdAt?.toDate?.()?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) || '',
    status: 'Completed'
  }));

  // Pending guest requests for the dashboard
  const pendingGuests = pendingGuestRequests.slice(0, 3).map((r: any) => ({
    id: r.id,
    empName: r.employeeName || r.userName || 'Employee',
    guestName: r.requestData?.guestName || 'Guest',
    quantity: r.requestData?.coupons || r.requestData?.quantity || 0,
    date: r.createdAt?.toDate?.()?.toISOString().split('T')[0] || '',
    status: 'Pending'
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Coffee className="text-orange-500" size={36} />
            Canteen Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Manage canteen operations and coupon sales</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1B254B] mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-[#0B4DA2] transition-all hover:shadow-lg"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${action.color} opacity-10 rounded-bl-full`}></div>
              <action.icon className="text-[#0B4DA2] mb-3" size={32} />
              <h3 className="font-bold text-[#1B254B] text-left mb-1">{action.label}</h3>
              <p className="text-sm text-gray-500 text-left">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1B254B]">Recent Approved Requests</h2>
            <button onClick={() => onNavigate('approve-requests')} className="text-sm text-[#0B4DA2] hover:underline font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {recentSales.length > 0 ? (
              recentSales.map((sale: any) => (
                <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-[#1B254B]">{sale.empName}</p>
                    <p className="text-sm text-gray-500">{sale.empId} • {sale.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1B254B]">{sale.amount}</p>
                    <p className="text-sm text-gray-500">{sale.quantity} coupons</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No approved requests yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Pending Guest Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1B254B]">Pending Guest Requests</h2>
            <button onClick={() => onNavigate('approve-guest')} className="text-sm text-[#0B4DA2] hover:underline font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {pendingGuests.length > 0 ? (
              pendingGuests.map((request: any) => (
                <div key={request.id} className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-[#1B254B]">{request.guestName}</p>
                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">Pending</span>
                  </div>
                  <p className="text-sm text-gray-600">Requested by: {request.empName}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-500">{request.quantity} coupons • {request.date}</p>
                    <button onClick={() => onNavigate('approve-guest')} className="text-sm text-[#0B4DA2] hover:underline font-semibold">Review</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No pending guest requests</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
