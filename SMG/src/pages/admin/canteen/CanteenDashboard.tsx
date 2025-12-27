import { Coffee, TrendingUp, Users, DollarSign, ShoppingCart, FileCheck, UserCheck } from 'lucide-react';

interface CanteenDashboardProps {
  onNavigate: (page: string) => void;
}

export const CanteenDashboard = ({ onNavigate }: CanteenDashboardProps) => {
  const stats = [
    { label: 'Coupons Sold Today', value: '245', icon: ShoppingCart, color: 'bg-blue-500', change: '+12%' },
    { label: 'Coupons Issued', value: '180', icon: FileCheck, color: 'bg-green-500', change: '+8%' },
    { label: 'Pending Guest Requests', value: '5', icon: UserCheck, color: 'bg-orange-500', change: '2 new' },
    { label: 'Total Revenue', value: '₹24,500', icon: DollarSign, color: 'bg-purple-500', change: '+15%' }
  ];

  const quickActions = [
    { id: 'sale-coupons', label: 'Sale New Coupons', icon: ShoppingCart, color: 'from-blue-500 to-blue-600', desc: 'Record coupon sales to employees' },
    { id: 'issue-coupons', label: 'Issue Coupons', icon: FileCheck, color: 'from-green-500 to-green-600', desc: 'Issue coupons to employees' },
    { id: 'approve-guest', label: 'Guest Requests', icon: UserCheck, color: 'from-orange-500 to-orange-600', desc: 'Approve guest coupon requests' }
  ];

  const recentSales = [
    { id: 1, empName: 'Amit Kumar', empId: 'SMG-2024-042', quantity: 10, amount: '₹1,000', time: '10:30 AM', status: 'Completed' },
    { id: 2, empName: 'Priya Sharma', empId: 'SMG-2024-089', quantity: 5, amount: '₹500', time: '11:15 AM', status: 'Completed' },
    { id: 3, empName: 'Rajesh Patel', empId: 'SMG-2024-123', quantity: 20, amount: '₹2,000', time: '12:00 PM', status: 'Completed' },
    { id: 4, empName: 'Sneha Reddy', empId: 'SMG-2024-156', quantity: 15, amount: '₹1,500', time: '01:45 PM', status: 'Completed' }
  ];

  const pendingGuests = [
    { id: 1, empName: 'Vikram Singh', guestName: 'John Anderson', quantity: 3, date: '2024-12-28', status: 'Pending' },
    { id: 2, empName: 'Anita Desai', guestName: 'Sarah Williams', quantity: 2, date: '2024-12-28', status: 'Pending' },
    { id: 3, empName: 'Rahul Mehta', guestName: 'Mike Johnson', quantity: 1, date: '2024-12-29', status: 'Pending' }
  ];

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
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1B254B]">Recent Sales</h2>
            <button onClick={() => onNavigate('sale-coupons')} className="text-sm text-[#0B4DA2] hover:underline font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {recentSales.map((sale) => (
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
            ))}
          </div>
        </div>

        {/* Pending Guest Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1B254B]">Pending Guest Requests</h2>
            <button onClick={() => onNavigate('approve-guest')} className="text-sm text-[#0B4DA2] hover:underline font-semibold">View All</button>
          </div>
          <div className="space-y-3">
            {pendingGuests.map((request) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
