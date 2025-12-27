import { Users, FileText, ClipboardList, UserPlus, GraduationCap, Heart, TrendingUp, AlertCircle } from 'lucide-react';

interface HRDashboardProps {
  onNavigate: (page: string) => void;
}

export const HRDashboard = ({ onNavigate }: HRDashboardProps) => {
  const stats = [
    { title: 'Total Employees', value: '243', change: '+12', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Pending MRFs', value: '8', change: '+3', icon: FileText, color: 'from-orange-500 to-orange-600' },
    { title: 'Interviews Scheduled', value: '15', change: '+5', icon: ClipboardList, color: 'from-purple-500 to-purple-600' },
    { title: 'New Joinings', value: '6', change: '+2', icon: UserPlus, color: 'from-green-500 to-green-600' },
  ];

  const quickActions = [
    { label: 'MRF & JD Approval', icon: FileText, page: 'mrf-approval', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { label: 'Interview Management', icon: ClipboardList, page: 'interview-management', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
    { label: 'Joining Forms', icon: UserPlus, page: 'joining-forms', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
    { label: 'Training & Development', icon: GraduationCap, page: 'training-development', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
    { label: 'Employee Welfare', icon: Heart, page: 'employee-welfare', color: 'bg-pink-50 text-pink-600 hover:bg-pink-100' },
  ];

  const recentActivities = [
    { type: 'MRF', text: 'New MRF submitted for Sr. Designer position', time: '10 mins ago', status: 'pending' },
    { type: 'Interview', text: 'Interview scheduled for EV Technician role', time: '30 mins ago', status: 'scheduled' },
    { type: 'Joining', text: 'Joining form completed by Rahul Kumar', time: '1 hour ago', status: 'completed' },
    { type: 'Training', text: 'Safety training completed by 25 employees', time: '2 hours ago', status: 'completed' },
    { type: 'Welfare', text: 'New grievance submitted', time: '3 hours ago', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">HR Dashboard</h2>
        <p className="text-white/80">Recruitment, Training & Employee Welfare Management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#1B254B] mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-[#0B4DA2]" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => onNavigate(action.page)}
              className={`${action.color} p-4 rounded-xl transition-all flex flex-col items-center gap-2 text-center`}
            >
              <action.icon size={24} />
              <span className="text-xs font-bold">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-[#0B4DA2]" />
            Recent Activities
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1B254B]">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    activity.status === 'completed' ? 'bg-green-50 text-green-600' :
                    activity.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Pipeline */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-[#1B254B] mb-4">Recruitment Pipeline</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-600">MRF Submitted</span>
                <span className="font-bold text-[#1B254B]">8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-600">Interview Scheduled</span>
                <span className="font-bold text-[#1B254B]">15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-600">Offer Extended</span>
                <span className="font-bold text-[#1B254B]">6</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-600">Joined</span>
                <span className="font-bold text-[#1B254B]">6</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
