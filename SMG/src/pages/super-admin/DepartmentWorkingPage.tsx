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
  CheckCircle2,
  XCircle,
  TrendingUp,
  Activity,
  ShirtIcon,
  Box,
  FileText,
  Calendar,
  User
} from 'lucide-react';

interface WorkingActivity {
  id: string;
  type: 'approval' | 'disapproval' | 'asset' | 'uniform' | 'request';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  status?: string;
}

interface Department {
  id: string;
  name: string;
  icon: any;
  color: string;
  activities: WorkingActivity[];
}

export const DepartmentWorkingPage = () => {
  const [selectedDept, setSelectedDept] = useState('canteen');

  const departments: Department[] = [
    {
      id: 'canteen',
      name: 'Canteen',
      icon: Coffee,
      color: 'from-orange-500 to-orange-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Meal Request Approved',
          description: 'Approved special diet meal request for 15 employees',
          timestamp: '2 hours ago',
          user: 'Priya Sharma'
        },
        {
          id: '2',
          type: 'disapproval',
          title: 'Menu Change Rejected',
          description: 'Weekend special menu rejected due to budget constraints',
          timestamp: '4 hours ago',
          user: 'Priya Sharma'
        },
        {
          id: '3',
          type: 'asset',
          title: 'New Kitchen Equipment',
          description: 'Issued 2 new commercial refrigerators for storage',
          timestamp: '1 day ago',
          user: 'Priya Sharma'
        },
        {
          id: '4',
          type: 'uniform',
          title: 'Chef Uniforms Distributed',
          description: 'Distributed new uniforms to 8 canteen staff members',
          timestamp: '2 days ago',
          user: 'Priya Sharma'
        }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      color: 'from-purple-500 to-purple-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Campaign Budget Approved',
          description: 'Approved Q1 2025 digital marketing campaign budget',
          timestamp: '3 hours ago',
          user: 'Rahul Verma'
        },
        {
          id: '2',
          type: 'asset',
          title: 'New Camera Equipment',
          description: 'Issued professional DSLR camera and lighting kit',
          timestamp: '5 hours ago',
          user: 'Rahul Verma'
        },
        {
          id: '3',
          type: 'approval',
          title: 'Social Media Content Approved',
          description: 'Approved content calendar for next 2 weeks',
          timestamp: '1 day ago',
          user: 'Rahul Verma'
        },
        {
          id: '4',
          type: 'disapproval',
          title: 'Print Ad Rejected',
          description: 'Magazine advertisement design needs revision',
          timestamp: '2 days ago',
          user: 'Rahul Verma'
        }
      ]
    },
    {
      id: 'reception',
      name: 'Reception',
      icon: Building2,
      color: 'from-cyan-500 to-cyan-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Visitor Pass Approved',
          description: 'Approved 12 visitor passes for client meeting',
          timestamp: '1 hour ago',
          user: 'Anjali Patel'
        },
        {
          id: '2',
          type: 'uniform',
          title: 'Receptionist Uniforms',
          description: 'Distributed new uniforms to front desk staff',
          timestamp: '6 hours ago',
          user: 'Anjali Patel'
        },
        {
          id: '3',
          type: 'asset',
          title: 'Guest Seating Furniture',
          description: 'Issued new waiting area chairs and coffee table',
          timestamp: '1 day ago',
          user: 'Anjali Patel'
        },
        {
          id: '4',
          type: 'approval',
          title: 'Guest House Booking',
          description: 'Approved guest house reservation for 3 visitors',
          timestamp: '3 days ago',
          user: 'Anjali Patel'
        }
      ]
    },
    {
      id: 'hr',
      name: 'HR',
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Leave Request Approved',
          description: 'Approved 23 leave requests for this week',
          timestamp: '30 mins ago',
          user: 'Vikram Singh'
        },
        {
          id: '2',
          type: 'disapproval',
          title: 'Transfer Request Rejected',
          description: 'Department transfer rejected due to ongoing project',
          timestamp: '2 hours ago',
          user: 'Vikram Singh'
        },
        {
          id: '3',
          type: 'uniform',
          title: 'New Employee Uniforms',
          description: 'Distributed uniforms to 12 new joiners',
          timestamp: '5 hours ago',
          user: 'Vikram Singh'
        },
        {
          id: '4',
          type: 'approval',
          title: 'Training Program Approved',
          description: 'Approved soft skills training for 30 employees',
          timestamp: '1 day ago',
          user: 'Vikram Singh'
        }
      ]
    },
    {
      id: 'transport',
      name: 'Transport',
      icon: Bus,
      color: 'from-indigo-500 to-indigo-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Route Change Approved',
          description: 'Approved new pickup route for Sector 62 employees',
          timestamp: '45 mins ago',
          user: 'Suresh Kumar'
        },
        {
          id: '2',
          type: 'asset',
          title: 'New Company Vehicle',
          description: 'Issued new Toyota Innova for executive transport',
          timestamp: '3 hours ago',
          user: 'Suresh Kumar'
        },
        {
          id: '3',
          type: 'uniform',
          title: 'Driver Uniforms',
          description: 'Distributed new uniforms to 15 drivers',
          timestamp: '1 day ago',
          user: 'Suresh Kumar'
        },
        {
          id: '4',
          type: 'disapproval',
          title: 'Vehicle Request Rejected',
          description: 'Personal vehicle use request declined',
          timestamp: '2 days ago',
          user: 'Suresh Kumar'
        }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Reimbursement Approved',
          description: 'Approved 45 expense reimbursements totaling ₹2.3L',
          timestamp: '1 hour ago',
          user: 'Meera Reddy'
        },
        {
          id: '2',
          type: 'disapproval',
          title: 'Budget Request Rejected',
          description: 'Additional budget request needs more justification',
          timestamp: '4 hours ago',
          user: 'Meera Reddy'
        },
        {
          id: '3',
          type: 'approval',
          title: 'Invoice Payment Approved',
          description: 'Approved vendor payments for Q4 2024',
          timestamp: '1 day ago',
          user: 'Meera Reddy'
        },
        {
          id: '4',
          type: 'asset',
          title: 'Financial Software',
          description: 'Issued new accounting software licenses',
          timestamp: '3 days ago',
          user: 'Meera Reddy'
        }
      ]
    },
    {
      id: 'timeoffice',
      name: 'Time Office',
      icon: Clock,
      color: 'from-rose-500 to-rose-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Overtime Approved',
          description: 'Approved overtime requests for 34 employees',
          timestamp: '2 hours ago',
          user: 'Karthik Nair'
        },
        {
          id: '2',
          type: 'disapproval',
          title: 'Shift Change Rejected',
          description: 'Shift swap request rejected due to staffing needs',
          timestamp: '5 hours ago',
          user: 'Karthik Nair'
        },
        {
          id: '3',
          type: 'approval',
          title: 'Attendance Regularization',
          description: 'Approved attendance corrections for 18 employees',
          timestamp: '1 day ago',
          user: 'Karthik Nair'
        },
        {
          id: '4',
          type: 'asset',
          title: 'Biometric Devices',
          description: 'Installed 4 new biometric attendance machines',
          timestamp: '2 days ago',
          user: 'Karthik Nair'
        }
      ]
    },
    {
      id: 'events',
      name: 'Events',
      icon: PartyPopper,
      color: 'from-pink-500 to-pink-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Annual Day Approved',
          description: 'Approved annual day celebration budget and plan',
          timestamp: '3 hours ago',
          user: 'Neha Gupta'
        },
        {
          id: '2',
          type: 'asset',
          title: 'Event Decorations',
          description: 'Issued decorative items and stage equipment',
          timestamp: '6 hours ago',
          user: 'Neha Gupta'
        },
        {
          id: '3',
          type: 'approval',
          title: 'Sports Day Approved',
          description: 'Approved inter-department sports tournament',
          timestamp: '1 day ago',
          user: 'Neha Gupta'
        },
        {
          id: '4',
          type: 'uniform',
          title: 'Event Staff T-shirts',
          description: 'Distributed event coordination t-shirts to volunteers',
          timestamp: '3 days ago',
          user: 'Neha Gupta'
        }
      ]
    },
    {
      id: 'hod',
      name: 'HOD',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Project Approval',
          description: 'Approved new product development project proposal',
          timestamp: '1 hour ago',
          user: 'Dr. Amit Joshi'
        },
        {
          id: '2',
          type: 'approval',
          title: 'Resource Allocation',
          description: 'Approved team expansion for R&D department',
          timestamp: '4 hours ago',
          user: 'Dr. Amit Joshi'
        },
        {
          id: '3',
          type: 'disapproval',
          title: 'Budget Extension Rejected',
          description: 'Project budget extension needs detailed breakdown',
          timestamp: '1 day ago',
          user: 'Dr. Amit Joshi'
        },
        {
          id: '4',
          type: 'asset',
          title: 'Laboratory Equipment',
          description: 'Issued new testing equipment for quality lab',
          timestamp: '2 days ago',
          user: 'Dr. Amit Joshi'
        }
      ]
    },
    {
      id: 'technician',
      name: 'Technician',
      icon: Wrench,
      color: 'from-amber-500 to-amber-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Maintenance Schedule',
          description: 'Approved preventive maintenance plan for Q1 2025',
          timestamp: '2 hours ago',
          user: 'Rajesh Yadav'
        },
        {
          id: '2',
          type: 'asset',
          title: 'Tool Kit Distribution',
          description: 'Issued advanced tool kits to 12 technicians',
          timestamp: '5 hours ago',
          user: 'Rajesh Yadav'
        },
        {
          id: '3',
          type: 'uniform',
          title: 'Safety Gear',
          description: 'Distributed new safety uniforms and protective gear',
          timestamp: '1 day ago',
          user: 'Rajesh Yadav'
        },
        {
          id: '4',
          type: 'approval',
          title: 'Equipment Repair',
          description: 'Approved repair work for production machinery',
          timestamp: '2 days ago',
          user: 'Rajesh Yadav'
        }
      ]
    },
    {
      id: 'assembly',
      name: 'Assembly',
      icon: PackageCheck,
      color: 'from-teal-500 to-teal-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Production Target Approved',
          description: 'Approved increased monthly production target',
          timestamp: '1 hour ago',
          user: 'Deepak Shah'
        },
        {
          id: '2',
          type: 'asset',
          title: 'Assembly Line Equipment',
          description: 'Issued new automated assembly station',
          timestamp: '3 hours ago',
          user: 'Deepak Shah'
        },
        {
          id: '3',
          type: 'uniform',
          title: 'Worker Uniforms',
          description: 'Distributed new safety uniforms to 45 workers',
          timestamp: '6 hours ago',
          user: 'Deepak Shah'
        },
        {
          id: '4',
          type: 'approval',
          title: 'Quality Standards Updated',
          description: 'Approved new quality control procedures',
          timestamp: '1 day ago',
          user: 'Deepak Shah'
        }
      ]
    },
    {
      id: 'pna',
      name: 'PNA',
      icon: ClipboardList,
      color: 'from-violet-500 to-violet-600',
      activities: [
        {
          id: '1',
          type: 'approval',
          title: 'Document Verification',
          description: 'Approved 56 employee document submissions',
          timestamp: '2 hours ago',
          user: 'Kavita Desai'
        },
        {
          id: '2',
          type: 'disapproval',
          title: 'Compliance Issue',
          description: 'Document rejected - missing required signatures',
          timestamp: '4 hours ago',
          user: 'Kavita Desai'
        },
        {
          id: '3',
          type: 'approval',
          title: 'Process Update Approved',
          description: 'Approved new document workflow process',
          timestamp: '1 day ago',
          user: 'Kavita Desai'
        },
        {
          id: '4',
          type: 'asset',
          title: 'Document Scanner',
          description: 'Issued high-speed document scanners',
          timestamp: '3 days ago',
          user: 'Kavita Desai'
        }
      ]
    }
  ];

  const activeDept = departments.find(d => d.id === selectedDept) || departments[0];
  const Icon = activeDept.icon;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval': return CheckCircle2;
      case 'disapproval': return XCircle;
      case 'asset': return Box;
      case 'uniform': return ShirtIcon;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'approval': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'disapproval': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'asset': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'uniform': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'approval': return 'Approved';
      case 'disapproval': return 'Rejected';
      case 'asset': return 'Asset Issued';
      case 'uniform': return 'Uniform Issued';
      default: return 'Activity';
    }
  };

  // Calculate stats
  const approvals = activeDept.activities.filter(a => a.type === 'approval').length;
  const disapprovals = activeDept.activities.filter(a => a.type === 'disapproval').length;
  const assetIssues = activeDept.activities.filter(a => a.type === 'asset').length;
  const uniformIssues = activeDept.activities.filter(a => a.type === 'uniform').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Department Working Activity</h1>
        <p className="text-blue-100 text-sm">Monitor recent approvals, disapprovals, asset issues, and uniform distributions across all departments</p>
      </div>

      {/* Department Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Department</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {departments.map((dept) => {
              const DeptIcon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all border-2 ${
                    selectedDept === dept.id
                      ? 'border-[#0B4DA2] bg-blue-50 text-[#0B4DA2] shadow-md'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <DeptIcon size={24} className={selectedDept === dept.id ? 'text-[#0B4DA2]' : 'text-blue-600'} />
                  <span className="text-xs text-center">{dept.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeDept.color} flex items-center justify-center shadow-lg`}>
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1B254B]">{activeDept.name} Department</h2>
              <p className="text-sm text-gray-600">Recent Activity Summary</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={20} className="text-blue-600" />
                <p className="text-xs font-semibold text-blue-700">APPROVALS</p>
              </div>
              <p className="text-3xl font-bold text-[#1B254B]">{approvals}</p>
              <p className="text-xs text-gray-600 mt-1">Recent approvals</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <XCircle size={20} className="text-blue-600" />
                <p className="text-xs font-semibold text-blue-700">REJECTIONS</p>
              </div>
              <p className="text-3xl font-bold text-[#1B254B]">{disapprovals}</p>
              <p className="text-xs text-gray-600 mt-1">Disapprovals</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Box size={20} className="text-blue-600" />
                <p className="text-xs font-semibold text-blue-700">ASSETS</p>
              </div>
              <p className="text-3xl font-bold text-[#1B254B]">{assetIssues}</p>
              <p className="text-xs text-gray-600 mt-1">Items issued</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <ShirtIcon size={20} className="text-blue-600" />
                <p className="text-xs font-semibold text-blue-700">UNIFORMS</p>
              </div>
              <p className="text-3xl font-bold text-[#1B254B]">{uniformIssues}</p>
              <p className="text-xs text-gray-600 mt-1">Distributed</p>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#1B254B] mb-4 flex items-center gap-2">
            <Activity size={20} />
            Recent Activity Timeline
          </h3>

          <div className="space-y-4">
            {activeDept.activities.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);
              const badge = getActivityBadge(activity.type);

              return (
                <div key={activity.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colorClass} border flex items-center justify-center shrink-0`}>
                      <ActivityIcon size={20} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-[#1B254B] text-base">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          activity.type === 'approval' ? 'bg-blue-100 text-blue-700' :
                          activity.type === 'disapproval' ? 'bg-blue-100 text-blue-700' :
                          activity.type === 'asset' ? 'bg-blue-100 text-blue-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {activity.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeDept.activities.length === 0 && (
            <div className="text-center py-12">
              <Activity size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No recent activity found</p>
              <p className="text-sm text-gray-400 mt-2">Activities will appear here once department starts working</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
