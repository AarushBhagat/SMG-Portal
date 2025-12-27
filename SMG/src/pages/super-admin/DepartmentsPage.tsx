import { useState } from 'react';
import { 
  Coffee, 
  Megaphone, 
  Building2, 
  UserCheck, 
  Bus,
  DollarSign,
  Clock,
  PartyPopper,
  Users,
  Wrench,
  PackageCheck,
  ClipboardList,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';

interface Department {
  id: string;
  name: string;
  icon: any;
  description: string;
  adminName: string;
  adminRole: string;
  stats: {
    activeRequests: number;
    completedRequests: number;
    pendingApprovals: number;
    efficiency: number;
  };
  color: string;
  bgColor: string;
}

export const DepartmentsPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState('canteen');

  const departments: Department[] = [
    {
      id: 'canteen',
      name: 'Canteen',
      icon: Coffee,
      description: 'Manage canteen operations, meal requests, and menu planning',
      adminName: 'Priya Sharma',
      adminRole: 'Canteen Manager',
      stats: {
        activeRequests: 45,
        completedRequests: 890,
        pendingApprovals: 12,
        efficiency: 94
      },
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      description: 'Oversee marketing campaigns, promotional materials, and brand management',
      adminName: 'Rahul Verma',
      adminRole: 'Marketing Head',
      stats: {
        activeRequests: 23,
        completedRequests: 456,
        pendingApprovals: 8,
        efficiency: 88
      },
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'reception',
      name: 'Reception',
      icon: Building2,
      description: 'Handle visitor management, guest requests, and front desk operations',
      adminName: 'Anjali Patel',
      adminRole: 'Reception Supervisor',
      stats: {
        activeRequests: 67,
        completedRequests: 1234,
        pendingApprovals: 15,
        efficiency: 92
      },
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      id: 'hr',
      name: 'HR',
      icon: UserCheck,
      description: 'Manage employee requests, leave approvals, and HR policies',
      adminName: 'Vikram Singh',
      adminRole: 'HR Manager',
      stats: {
        activeRequests: 89,
        completedRequests: 2345,
        pendingApprovals: 34,
        efficiency: 96
      },
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'transport',
      name: 'Transport',
      icon: Bus,
      description: 'Coordinate transportation, vehicle allocation, and route management',
      adminName: 'Suresh Kumar',
      adminRole: 'Transport Officer',
      stats: {
        activeRequests: 56,
        completedRequests: 1567,
        pendingApprovals: 19,
        efficiency: 90
      },
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: DollarSign,
      description: 'Handle financial requests, reimbursements, and budget management',
      adminName: 'Meera Reddy',
      adminRole: 'Finance Head',
      stats: {
        activeRequests: 34,
        completedRequests: 987,
        pendingApprovals: 21,
        efficiency: 93
      },
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'timeoffice',
      name: 'Time Office',
      icon: Clock,
      description: 'Monitor attendance, shift management, and overtime requests',
      adminName: 'Karthik Nair',
      adminRole: 'Time Office Manager',
      stats: {
        activeRequests: 78,
        completedRequests: 3456,
        pendingApprovals: 45,
        efficiency: 91
      },
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50'
    },
    {
      id: 'events',
      name: 'Events',
      icon: PartyPopper,
      description: 'Organize company events, celebrations, and team activities',
      adminName: 'Neha Gupta',
      adminRole: 'Events Coordinator',
      stats: {
        activeRequests: 12,
        completedRequests: 234,
        pendingApprovals: 5,
        efficiency: 87
      },
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'hod',
      name: 'HOD',
      icon: Users,
      description: 'Department head approvals, strategic decisions, and team oversight',
      adminName: 'Dr. Amit Joshi',
      adminRole: 'Head of Department',
      stats: {
        activeRequests: 43,
        completedRequests: 876,
        pendingApprovals: 28,
        efficiency: 95
      },
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'technician',
      name: 'Technician',
      icon: Wrench,
      description: 'Technical maintenance, repairs, and equipment management',
      adminName: 'Rajesh Yadav',
      adminRole: 'Chief Technician',
      stats: {
        activeRequests: 61,
        completedRequests: 1789,
        pendingApprovals: 23,
        efficiency: 89
      },
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'assembly',
      name: 'Assembly',
      icon: PackageCheck,
      description: 'Production line management, quality control, and assembly operations',
      adminName: 'Deepak Shah',
      adminRole: 'Assembly Supervisor',
      stats: {
        activeRequests: 92,
        completedRequests: 4567,
        pendingApprovals: 37,
        efficiency: 97
      },
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'pna',
      name: 'PNA',
      icon: ClipboardList,
      description: 'Process and approvals, documentation, and compliance management',
      adminName: 'Kavita Desai',
      adminRole: 'PNA Manager',
      stats: {
        activeRequests: 38,
        completedRequests: 1123,
        pendingApprovals: 16,
        efficiency: 92
      },
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50'
    }
  ];

  const activeDept = departments.find(d => d.id === activeTab) || departments[0];
  if (!activeDept) return null;
  const Icon = activeDept.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Department Management</h1>
        <p className="text-blue-100 text-sm">Access and manage all department portals with full administrative privileges</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex gap-2 p-4 bg-gray-50 border-b border-gray-200 min-w-max">
            {departments.map((dept) => {
              const DeptIcon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all rounded-xl ${
                    activeTab === dept.id
                      ? 'bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <DeptIcon size={18} />
                  {dept.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Department Info */}
            <div className="space-y-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeDept.color} flex items-center justify-center shadow-lg`}>
                <Icon size={32} className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1B254B] mb-2">{activeDept.name} Department</h2>
                <p className="text-gray-600">{activeDept.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-3">ADMIN IN-CHARGE</p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${activeDept.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                    {activeDept.adminName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-[#1B254B] text-lg">{activeDept.adminName}</p>
                    <p className="text-sm text-gray-500">{activeDept.adminRole}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate(`dept-${activeDept.id}`)}
                className="w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Enter {activeDept.name} Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Column - Statistics */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1B254B] mb-4">Department Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity size={20} className="text-blue-600" />
                    <p className="text-xs font-semibold text-blue-700">ACTIVE</p>
                  </div>
                  <p className="text-3xl font-bold text-[#1B254B]">{activeDept.stats.activeRequests}</p>
                  <p className="text-xs text-gray-600 mt-1">Current requests</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <PackageCheck size={20} className="text-green-600" />
                    <p className="text-xs font-semibold text-green-700">COMPLETED</p>
                  </div>
                  <p className="text-3xl font-bold text-[#1B254B]">{activeDept.stats.completedRequests}</p>
                  <p className="text-xs text-gray-600 mt-1">Total resolved</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={20} className="text-orange-600" />
                    <p className="text-xs font-semibold text-orange-700">PENDING</p>
                  </div>
                  <p className="text-3xl font-bold text-[#1B254B]">{activeDept.stats.pendingApprovals}</p>
                  <p className="text-xs text-gray-600 mt-1">Awaiting approval</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp size={20} className="text-purple-600" />
                    <p className="text-xs font-semibold text-purple-700">EFFICIENCY</p>
                  </div>
                  <p className="text-3xl font-bold text-[#1B254B]">{activeDept.stats.efficiency}%</p>
                  <p className="text-xs text-gray-600 mt-1">Performance rate</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 mt-6">
                <h4 className="font-bold text-[#1B254B] mb-3">Super Admin Access</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    View all department requests and activities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    Approve or disapprove any request
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    Edit department configurations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    Manage admin permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    Generate department reports
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
