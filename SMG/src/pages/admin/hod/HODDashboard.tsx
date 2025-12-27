import { Lightbulb, ClipboardCheck, UserX, Star, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface HODDashboardProps {
  onNavigate: (page: string) => void;
}

export const HODDashboard = ({ onNavigate }: HODDashboardProps) => {
  const stats = [
    { label: 'Pending IMAGINE Ideas', value: '5', icon: AlertCircle, color: 'bg-yellow-500', change: '+2 this week' },
    { label: 'Leave Requests', value: '3', icon: ClipboardCheck, color: 'bg-blue-500', change: 'Pending approval' },
    { label: 'Resignation Requests', value: '1', icon: UserX, color: 'bg-red-500', change: 'Requires action' },
    { label: 'Team Members', value: '45', icon: Users, color: 'bg-green-500', change: 'Active employees' }
  ];

  const quickActions = [
    { title: 'SMG IMAGINE Approval', desc: 'Review innovation ideas', icon: Lightbulb, page: 'smg-imagine', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Leave & Gate Pass', desc: 'Approve employee requests', icon: ClipboardCheck, page: 'leave-gatepass', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Resignation Approval', desc: 'Review resignation requests', icon: UserX, page: 'resignation', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Employee Ratings', desc: 'Rate team performance', icon: Star, page: 'ratings', color: 'from-[#042A5B] to-[#0B4DA2]' }
  ];

  const recentActivity = [
    { type: 'IMAGINE Idea Submitted', employee: 'Amit Kumar', detail: 'Digital attendance tracking system', time: '15 mins ago', status: 'warning' },
    { type: 'Leave Request', employee: 'Priya Singh', detail: 'Casual Leave - 2 days', time: '1 hour ago', status: 'info' },
    { type: 'Resignation', employee: 'Rahul Verma', detail: 'Notice period - 30 days', time: '3 hours ago', status: 'warning' },
    { type: 'Rating Reminder', employee: 'System', detail: 'Quarterly ratings due', time: '5 hours ago', status: 'info' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Head of Department Dashboard</h1>
        <p className="text-white/80">Manage approvals, reviews and team performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-600">
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
