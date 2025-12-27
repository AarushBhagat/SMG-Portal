import { Users, UserCheck, Briefcase, Shield, Key, UserCog, ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ReceptionDashboardProps {
  onNavigate: (page: string) => void;
}

export const ReceptionDashboard = ({ onNavigate }: ReceptionDashboardProps) => {
  const stats = [
    { label: 'Visitors Today', value: '34', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Pending Approvals', value: '8', icon: Clock, color: 'bg-orange-500', change: '+3' },
    { label: 'Active Keys', value: '156', icon: Key, color: 'bg-purple-500', change: '89%' },
    { label: 'VIP Guests', value: '5', icon: Shield, color: 'bg-green-500', change: 'Today' }
  ];

  const quickActions = [
    { id: 'visitor-management', icon: Users, label: 'Visitor Management', desc: 'Track all visitors', color: 'blue' },
    { id: 'corporate-guest', icon: Briefcase, label: 'Corporate Guests', desc: 'Approve guest requests', color: 'purple' },
    { id: 'interview-candidates', icon: UserCheck, label: 'Interview Candidates', desc: 'Manage interviews', color: 'green' },
    { id: 'government-guests', icon: Shield, label: 'Government Officials', desc: 'VIP guest details', color: 'red' },
    { id: 'keys-information', icon: Key, label: 'Keys Information', desc: 'Key inventory', color: 'orange' },
    { id: 'key-persons', icon: UserCog, label: 'Key Persons', desc: 'Important contacts', color: 'indigo' }
  ];

  const recentVisitors = [
    { name: 'Amit Sharma', company: 'Tech Solutions Pvt Ltd', purpose: 'Business Meeting', time: '10:30 AM', status: 'Checked In' },
    { name: 'Priya Gupta', company: 'Marketing Corp', purpose: 'Interview', time: '11:15 AM', status: 'Waiting' },
    { name: 'Rajesh Kumar', company: 'Government Office', purpose: 'Official Visit', time: '12:00 PM', status: 'In Meeting' }
  ];

  const pendingApprovals = [
    { name: 'Corporate Guest - ABC Industries', dept: 'Sales', type: 'Corporate', time: '30 mins ago' },
    { name: 'Interview - Software Engineer', dept: 'HR', type: 'Interview', time: '1 hour ago' },
    { name: 'Ministry Official Visit', dept: 'Management', type: 'Government', time: '2 hours ago' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-200',
      red: 'bg-red-100 text-red-600 hover:bg-red-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
      indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B]">Reception Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage visitors, guests, and key information</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#1B254B] mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`p-4 rounded-xl ${getColorClasses(action.color)} transition-all hover:scale-[1.02] text-left`}
            >
              <div className="flex items-start gap-3">
                <action.icon size={24} />
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{action.label}</h3>
                  <p className="text-xs opacity-80">{action.desc}</p>
                </div>
                <ArrowRight size={16} className="opacity-50" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Visitors */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1B254B] flex items-center gap-2">
              <Users className="text-blue-500" size={24} />
              Recent Visitors
            </h2>
            <button
              onClick={() => onNavigate('visitor-management')}
              className="text-sm text-[#0B4DA2] hover:underline font-semibold"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentVisitors.map((visitor, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-[#1B254B]">{visitor.name}</h3>
                    <p className="text-sm text-gray-500">{visitor.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    visitor.status === 'Checked In' ? 'bg-green-100 text-green-600' :
                    visitor.status === 'Waiting' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {visitor.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} />
                    {visitor.purpose}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {visitor.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#1B254B] flex items-center gap-2">
              <AlertCircle className="text-orange-500" size={24} />
              Pending Approvals
            </h2>
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              {pendingApprovals.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval, idx) => (
              <div key={idx} className="p-4 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-[#1B254B] text-sm">{approval.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {approval.dept} • {approval.type}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    Pending
                  </span>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {approval.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm opacity-80 mb-1">Total Check-ins</p>
            <p className="text-3xl font-bold">34</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm opacity-80 mb-1">Active Visitors</p>
            <p className="text-3xl font-bold">18</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm opacity-80 mb-1">Keys Issued</p>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};
