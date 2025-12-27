import { PartyPopper, Calendar, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

interface EventsDashboardProps {
  onNavigate: (page: string) => void;
}

export const EventsDashboard = ({ onNavigate }: EventsDashboardProps) => {
  const stats = [
    { label: 'Total Events', value: '12', icon: PartyPopper, color: 'bg-blue-500', change: 'This year' },
    { label: 'Upcoming Events', value: '3', icon: Calendar, color: 'bg-yellow-500', change: 'This month' },
    { label: 'Ongoing Events', value: '1', icon: CheckCircle, color: 'bg-green-500', change: 'Active now' },
    { label: 'Total Participants', value: '1,400', icon: Users, color: 'bg-purple-500', change: 'All events' }
  ];

  const recentActivity = [
    { type: 'Event Posted', event: 'Annual Day 2025', detail: 'January 15, 2026', time: '30 mins ago', status: 'success' },
    { type: 'Event Ongoing', event: 'Sports Day', detail: 'December 28, 2025', time: '1 hour ago', status: 'info' },
    { type: 'Registration Open', event: 'New Year Celebration', detail: 'December 31, 2025', time: '2 hours ago', status: 'info' },
    { type: 'Event Completed', event: 'Christmas Celebration', detail: 'December 25, 2025', time: '1 day ago', status: 'success' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Events Dashboard</h1>
        <p className="text-white/80">Manage and share company events on the portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <TrendingUp size={14} />
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Action */}
      <div>
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Quick Access</h2>
        <button
          onClick={() => onNavigate('events')}
          className="w-full bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-2xl p-6 text-white text-left hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <PartyPopper size={32} className="mb-4" />
          <h3 className="font-bold text-lg mb-1">Events Management</h3>
          <p className="text-sm text-white/80">Create, edit and share company events</p>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                activity.status === 'success' ? 'bg-green-500' : 
                activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[#1B254B] text-sm">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.event} • {activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
