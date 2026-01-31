import { useMemo } from 'react';
import { ClipboardCheck, Calendar, Clock, PartyPopper, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

interface TimeOfficeDashboardProps {
  onNavigate: (page: string) => void;
}

export const TimeOfficeDashboard = ({ onNavigate }: TimeOfficeDashboardProps) => {
  const { requests = [], users = [], attendanceRecords = [] } = useApp();

  // Calculate real stats from Firebase data
  const stats = useMemo(() => {
    const pendingLeaveRequests = requests.filter(r => 
      (r.requestType === 'leave' || r.requestType === 'gatepass') && 
      r.status === 'pending'
    ).length;

    const totalEmployees = users.filter(u => u.role === 'employee').length;

    const today = new Date().toISOString().split('T')[0];
    const presentToday = attendanceRecords.filter(record => {
      const recordDate = record.date?.toDate?.()?.toISOString()?.split('T')[0] || '';
      return recordDate === today && record.status === 'present';
    }).length;

    const attendancePercentage = totalEmployees > 0 
      ? ((presentToday / totalEmployees) * 100).toFixed(1) 
      : '0.0';

    return [
      { label: 'Pending Approvals', value: pendingLeaveRequests.toString(), icon: AlertCircle, color: 'bg-orange-500', change: 'Leaves/Gatepasses' },
      { label: 'Total Employees', value: totalEmployees.toString(), icon: Users, color: 'bg-blue-500', change: 'Active' },
      { label: 'Present Today', value: presentToday.toString(), icon: CheckCircle, color: 'bg-green-500', change: `${attendancePercentage}%` },
      { label: 'Total Requests', value: requests.length.toString(), icon: PartyPopper, color: 'bg-purple-500', change: 'All time' }
    ];
  }, [requests, users, attendanceRecords]);

  const quickActions = [
    { title: 'Leave & Gate Pass', desc: 'Final approval of requests', icon: ClipboardCheck, page: 'leave-gatepass', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Attendance Details', desc: 'Employee attendance records', icon: Calendar, page: 'attendance', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Shift Information', desc: 'Manage shift schedules', icon: Clock, page: 'shifts', color: 'from-[#042A5B] to-[#0B4DA2]' },
    { title: 'Events Management', desc: 'Share event details', icon: PartyPopper, page: 'events', color: 'from-[#042A5B] to-[#0B4DA2]' }
  ];

  // Helper function to calculate time ago
  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Recent activity from real Firebase data
  const recentActivity = useMemo(() => {
    return requests
      .filter(r => r.requestType === 'leave' || r.requestType === 'gatepass')
      .sort((a, b) => {
        const aTime = a.createdAt?.toDate?.()?.getTime() || 0;
        const bTime = b.createdAt?.toDate?.()?.getTime() || 0;
        return bTime - aTime;
      })
      .slice(0, 4)
      .map(req => {
        const createdTime = req.createdAt?.toDate?.();
        const timeAgo = createdTime 
          ? getTimeAgo(createdTime)
          : 'Recently';

        return {
          type: req.status === 'approved' ? 'Leave Approved' : req.status === 'rejected' ? 'Leave Rejected' : 'Pending Approval',
          employee: req.employeeName || req.userName || 'Employee',
          detail: `${req.requestType === 'leave' ? 'Leave' : 'Gate Pass'} - ${req.description || 'N/A'}`,
          time: timeAgo,
          status: req.status === 'approved' ? 'success' as const : req.status === 'rejected' ? 'warning' as const : 'info' as const
        };
      });
  }, [requests]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Time Office Dashboard</h1>
        <p className="text-white/80">Manage attendance, leaves, shifts and events</p>
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
