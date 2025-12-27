import { Building2, Bus, Smartphone, ShirtIcon, Home, TrendingUp } from 'lucide-react';

interface PADashboardProps {
  onNavigate: (page: string) => void;
}

export const PADashboard = ({ onNavigate }: PADashboardProps) => {
  const stats = [
    { label: 'Pending Bus Passes', value: '12', icon: Bus, color: 'bg-blue-500', change: '+3 today' },
    { label: 'Parking Requests', value: '8', icon: Building2, color: 'bg-purple-500', change: '5 pending' },
    { label: 'SIM Approvals', value: '6', icon: Smartphone, color: 'bg-green-500', change: '2 new' },
    { label: 'Uniform Requests', value: '15', icon: ShirtIcon, color: 'bg-orange-500', change: '+4 today' },
    { label: 'Guest House Bookings', value: '9', icon: Home, color: 'bg-pink-500', change: '3 active' },
    { label: 'Transport Trips', value: '4', icon: TrendingUp, color: 'bg-indigo-500', change: '1 upcoming' }
  ];

  const quickActions = [
    { id: 'transport', label: 'Transport Management', icon: Bus, color: 'from-blue-500 to-blue-600', desc: 'Manage bus, parking & trips', items: ['bus-facility', 'parking-facility', 'transport-request', 'trips-tours'] },
    { id: 'sim', label: 'SIM Management', icon: Smartphone, color: 'from-green-500 to-green-600', desc: 'Handle SIM approvals & maintenance', items: ['new-sim', 'sim-maintenance'] },
    { id: 'uniform', label: 'Uniform Management', icon: ShirtIcon, color: 'from-orange-500 to-orange-600', desc: 'Approve & track uniforms', items: ['new-uniform', 'uniform-request', 'uniform-stock'] },
    { id: 'guesthouse', label: 'Guest House', icon: Home, color: 'from-pink-500 to-pink-600', desc: 'Manage bookings & requests', items: ['guesthouse-management', 'guesthouse-request'] }
  ];

  const recentActivities = [
    { id: 1, type: 'Bus Pass', employee: 'Amit Kumar', action: 'Approved', time: '10 mins ago', status: 'success' },
    { id: 2, type: 'Parking', employee: 'Priya Sharma', action: 'Pending Review', time: '25 mins ago', status: 'warning' },
    { id: 3, type: 'Uniform', employee: 'Rajesh Patel', action: 'Issued', time: '1 hour ago', status: 'success' },
    { id: 4, type: 'SIM Card', employee: 'Sneha Reddy', action: 'Approved', time: '2 hours ago', status: 'success' },
    { id: 5, type: 'Guest House', employee: 'Vikram Singh', action: 'Booked', time: '3 hours ago', status: 'info' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Building2 className="text-blue-600" size={36} />
            P&A Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Personnel & Administration Management Portal</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.items[0])}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-[#0B4DA2] transition-all hover:shadow-lg text-left"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${action.color} opacity-10 rounded-bl-full`}></div>
              <action.icon className="text-[#0B4DA2] mb-3" size={32} />
              <h3 className="font-bold text-[#1B254B] mb-1">{action.label}</h3>
              <p className="text-sm text-gray-500">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activity.status === 'success' ? 'bg-green-100 text-green-700' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.type}
                  </span>
                  <p className="font-semibold text-[#1B254B]">{activity.employee}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{activity.action} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
