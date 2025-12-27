import { ClipboardCheck, Calendar, Clock, PartyPopper, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface TimeOfficeDashboardProps {
  onNavigate: (page: string) => void;
}

export const TimeOfficeDashboard = ({ onNavigate }: TimeOfficeDashboardProps) => {
  const stats = [
    { label: 'Pending Approvals', value: '15', icon: AlertCircle, color: 'bg-orange-500', change: '+3 today' },
    { label: 'Total Employees', value: '450', icon: Users, color: 'bg-blue-500', change: 'Active' },
    { label: 'Present Today', value: '428', icon: CheckCircle, color: 'bg-green-500', change: '95.1%' },
    { label: 'Upcoming Events', value: '3', icon: PartyPopper, color: 'bg-purple-500', change: 'This month' }
  ];

  const quickActions = [
    { title: 'Leave & Gate Pass', desc: 'Final approval of requests', icon: ClipboardCheck, page: 'leave-gatepass', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Attendance Details', desc: 'Employee attendance records', icon: Calendar, page: 'attendance', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Shift Information', desc: 'Manage shift schedules', icon: Clock, page: 'shifts', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Events Management', desc: 'Share event details', icon: PartyPopper, page: 'events', color: 'from-[#042A5B] to-[#0B4DA2]' }
  ];

  const recentActivity = [
    { type: 'Leave Approved', employee: 'Amit Sharma', detail: 'Casual Leave - 2 days', time: '10 mins ago', status: 'success' },
    { type: 'Gate Pass Pending', employee: 'Priya Singh', detail: 'Medical Appointment', time: '25 mins ago', status: 'warning' },
    { type: 'Attendance Updated', employee: 'Rahul Verma', detail: 'December 2025', time: '1 hour ago', status: 'info' },
    { type: 'Event Posted', employee: 'System', detail: 'Annual Day 2025', time: '2 hours ago', status: 'success' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Time Office Dashboard</h1>
        <p className="text-white/80">Manage attendance, leaves, shifts and events</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(action.page)}
              className={`bg-gradient-to-br ${action.color} rounded-2xl p-6 text-white text-left hover:shadow-xl transition-all transform hover:-translate-y-1`}
            >
              <action.icon size={32} className="mb-4" />
              <h3 className="font-bold text-lg mb-1">{action.title}</h3>
              <p className="text-sm text-white/80">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                    <p className="text-sm text-gray-600">{activity.employee} • {activity.detail}</p>
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
