import React, { useState, useMemo } from 'react';
import { Users, TrendingUp, Activity, UserCheck, Search, Download, Eye, BarChart3, LayoutDashboard, X, Mail, Phone, CheckCircle, Clock as ClockIcon, Building2, ArrowUp, ArrowDown, Minus, Calendar, Award } from 'lucide-react';

export const AdminsAnalysisPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  // Mock data for departments with admin details
  const departmentsData = [
    {
      id: 1,
      name: 'Canteen',
      icon: '🍽️',
      color: 'from-[#0B4DA2] to-[#042A5B]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      admin: {
        name: 'Rajesh Kumar',
        role: 'Canteen Manager',
        empId: 'SMG-CANT-001',
        email: 'rajesh.kumar@smg-scooters.com',
        phone: '+91 98765 11223',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CanteenAdmin',
        lastActive: '5 mins ago'
      },
      stats: {
        activeRequests: 12,
        completedRequests: 145,
        pendingApprovals: 3,
        totalRequests: 160,
        avgResponseTime: '2.5 hrs',
        performance: 92,
        efficiency: 90,
        satisfaction: 4.5,
        trend: 'up'
      },
      weeklyData: [65, 72, 68, 85, 90, 88, 92],
      requestTypes: [
        { type: 'Coupon Sales', count: 85, percentage: 53 },
        { type: 'Guest Coupons', count: 45, percentage: 28 },
        { type: 'Stock Issues', count: 30, percentage: 19 }
      ]
    },
    {
      id: 2,
      name: 'Marketing',
      icon: '📢',
      color: 'from-[#0B4DA2] to-[#042A5B]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      admin: {
        name: 'Priya Sharma',
        role: 'Marketing Admin',
        empId: 'SMG-MKT-001',
        email: 'priya.sharma@smg-scooters.com',
        phone: '+91 98765 22334',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarketingAdmin',
        lastActive: '15 mins ago'
      },
      stats: {
        activeRequests: 8,
        completedRequests: 234,
        pendingApprovals: 5,
        totalRequests: 247,
        avgResponseTime: '1.8 hrs',
        performance: 95,
        efficiency: 94,
        satisfaction: 4.8,
        trend: 'up'
      },
      weeklyData: [88, 90, 92, 93, 94, 95, 95],
      requestTypes: [
        { type: 'Campaign Approvals', count: 120, percentage: 49 },
        { type: 'Content Reviews', count: 80, percentage: 32 },
        { type: 'Event Planning', count: 47, percentage: 19 }
      ]
    },
    {
      id: 3,
      name: 'Reception',
      icon: '🏢',
      color: 'from-[#0B4DA2] to-[#042A5B]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      admin: {
        name: 'Amit Verma',
        role: 'Reception Admin',
        empId: 'SMG-REC-001',
        email: 'amit.verma@smg-scooters.com',
        phone: '+91 98765 33445',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ReceptionAdmin',
        lastActive: '1 hour ago'
      },
      stats: {
        activeRequests: 15,
        completedRequests: 189,
        pendingApprovals: 7,
        totalRequests: 211,
        avgResponseTime: '3.2 hrs',
        performance: 88,
        efficiency: 85,
        satisfaction: 4.2,
        trend: 'down'
      },
      weeklyData: [92, 90, 88, 87, 86, 87, 88],
      requestTypes: [
        { type: 'Visitor Management', count: 95, percentage: 45 },
        { type: 'Meeting Rooms', count: 70, percentage: 33 },
        { type: 'General Queries', count: 46, percentage: 22 }
      ]
    },
    {
      id: 4,
      name: 'HR',
      icon: '👥',
      color: 'from-[#0B4DA2] to-[#042A5B]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      admin: {
        name: 'Neha Gupta',
        role: 'HR Admin',
        empId: 'SMG-HR-001',
        email: 'neha.gupta@smg-scooters.com',
        phone: '+91 98765 44556',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HRAdmin',
        lastActive: '2 mins ago'
      },
      stats: {
        activeRequests: 20,
        completedRequests: 312,
        pendingApprovals: 4,
        totalRequests: 336,
        avgResponseTime: '1.5 hrs',
        performance: 97,
        efficiency: 96,
        satisfaction: 4.9,
        trend: 'up'
      },
      weeklyData: [93, 94, 95, 96, 96, 97, 97],
      requestTypes: [
        { type: 'Leave Approvals', count: 180, percentage: 54 },
        { type: 'Payroll Queries', count: 95, percentage: 28 },
        { type: 'Policy Updates', count: 61, percentage: 18 }
      ]
    },
    {
      id: 5,
      name: 'Transport',
      icon: '🚌',
      color: 'from-[#0B4DA2] to-[#042A5B]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      admin: {
        name: 'Vikram Singh',
        role: 'Transport Admin',
        empId: 'SMG-TRP-001',
        email: 'vikram.singh@smg-scooters.com',
        phone: '+91 98765 55667',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TransportAdmin',
        lastActive: '30 mins ago'
      },
      stats: {
        activeRequests: 18,
        completedRequests: 267,
        pendingApprovals: 6,
        totalRequests: 291,
        avgResponseTime: '2.1 hrs',
        performance: 91,
        efficiency: 90,
        satisfaction: 4.6,
        trend: 'stable'
      },
      weeklyData: [90, 91, 90, 91, 91, 90, 91],
      requestTypes: [
        { type: 'Route Changes', count: 120, percentage: 41 },
        { type: 'Vehicle Issues', count: 95, percentage: 33 },
        { type: 'Reimbursements', count: 76, percentage: 26 }
      ]
    }
  ];

  const filteredDepartments = useMemo(() => {
    return departmentsData.filter(dept =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.admin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculate overall stats
  const totalStats = useMemo(() => {
    return {
      totalDepartments: departmentsData.length,
      totalActiveRequests: departmentsData.reduce((sum, dept) => sum + dept.stats.activeRequests, 0),
      totalCompletedRequests: departmentsData.reduce((sum, dept) => sum + dept.stats.completedRequests, 0),
      avgPerformance: Math.round(departmentsData.reduce((sum, dept) => sum + dept.stats.performance, 0) / departmentsData.length)
    };
  }, []);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUp size={16} className="text-green-600" />;
    if (trend === 'down') return <ArrowDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <LayoutDashboard size={32} />
          Super Admin Dashboard
        </h1>
        <p className="text-[#87CEEB] opacity-90">
          Department-wise performance analysis and monitoring
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Total Departments</p>
              <p className="text-2xl font-bold text-[#1B254B]">{totalStats.totalDepartments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Active Requests</p>
              <p className="text-2xl font-bold text-[#1B254B]">{totalStats.totalActiveRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <UserCheck className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Completed</p>
              <p className="text-2xl font-bold text-[#1B254B]">{totalStats.totalCompletedRequests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Avg Performance</p>
              <p className="text-2xl font-bold text-[#1B254B]">{totalStats.avgPerformance}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search departments or admin names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 p-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:outline-none text-sm font-medium"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDepartments.map((dept) => (
          <div key={dept.id} className={`bg-white rounded-3xl p-6 shadow-lg border-2 ${dept.borderColor} hover:shadow-2xl transition-all`}>
            {/* Department Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {dept.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1B254B] mb-1">{dept.name} Department</h3>
                  <p className="text-sm text-gray-600">Performance Score: <span className="font-bold text-[#0B4DA2]">{dept.stats.performance}%</span></p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(dept.stats.trend)}
                <span className={`text-sm font-bold ${dept.stats.trend === 'up' ? 'text-green-600' : dept.stats.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {dept.stats.trend === 'up' ? '+5%' : dept.stats.trend === 'down' ? '-3%' : '0%'}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className={`${dept.bgColor} rounded-xl p-3 text-center border ${dept.borderColor}`}>
                <p className="text-xs text-gray-600 mb-1">Active</p>
                <p className="text-xl font-bold text-[#1B254B]">{dept.stats.activeRequests}</p>
              </div>
              <div className={`${dept.bgColor} rounded-xl p-3 text-center border ${dept.borderColor}`}>
                <p className="text-xs text-gray-600 mb-1">Completed</p>
                <p className="text-xl font-bold text-[#1B254B]">{dept.stats.completedRequests}</p>
              </div>
              <div className={`${dept.bgColor} rounded-xl p-3 text-center border ${dept.borderColor}`}>
                <p className="text-xs text-gray-600 mb-1">Pending</p>
                <p className="text-xl font-bold text-[#1B254B]">{dept.stats.pendingApprovals}</p>
              </div>
            </div>

            {/* Weekly Performance Chart */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-[#1B254B] mb-3">Weekly Performance Trend</h4>
              <div className="flex items-end justify-between gap-2 h-32">
                {dept.weeklyData.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                      <div 
                        className={`absolute bottom-0 w-full bg-gradient-to-t ${dept.color} rounded-t-lg transition-all`}
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Types Distribution */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-[#1B254B] mb-3">Request Types Distribution</h4>
              <div className="space-y-2">
                {dept.requestTypes.map((type, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">{type.type}</span>
                      <span className="text-xs font-bold text-[#1B254B]">{type.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${dept.color} rounded-full transition-all`}
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <ClockIcon size={16} className="text-blue-600" />
                  <p className="text-xs text-gray-600">Avg Response</p>
                </div>
                <p className="text-lg font-bold text-[#1B254B]">{dept.stats.avgResponseTime}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                <div className="flex items-center gap-2 mb-1">
                  <Award size={16} className="text-green-600" />
                  <p className="text-xs text-gray-600">Satisfaction</p>
                </div>
                <p className="text-lg font-bold text-[#1B254B]">{dept.stats.satisfaction}/5.0</p>
              </div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => setSelectedDepartment(dept)}
              className={`w-full bg-gradient-to-r ${dept.color} text-white py-3.5 p-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2`}
            >
              <Eye size={20} />
              View Detailed Analysis
            </button>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
          <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-bold text-gray-400">No departments found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search query</p>
        </div>
      )}

      {/* Detailed Analysis Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDepartment(null)}>
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={`bg-gradient-to-r ${selectedDepartment.color} rounded-t-3xl p-8 text-white relative`}>
              <button onClick={() => setSelectedDepartment(null)} className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-xl p-2 backdrop-blur-sm">
                <X size={24} />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{selectedDepartment.icon}</div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold mb-2">{selectedDepartment.name} Department</h2>
                  <p className="text-white/90 text-lg">Comprehensive Performance Analysis</p>
                </div>
              </div>

              {/* Top Stats in Header */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Performance', value: `${selectedDepartment.stats.performance}%`, icon: TrendingUp },
                  { label: 'Efficiency', value: `${selectedDepartment.stats.efficiency}%`, icon: Activity },
                  { label: 'Total Requests', value: selectedDepartment.stats.totalRequests, icon: BarChart3 },
                  { label: 'Satisfaction', value: `${selectedDepartment.stats.satisfaction}/5`, icon: Award }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <stat.icon size={20} className="mb-2 opacity-80" />
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs opacity-80">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Admin in Charge Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                  <Users size={24} className="text-[#0B4DA2]" />
                  Admin In-Charge
                </h3>
                <div className={`${selectedDepartment.bgColor} border-2 ${selectedDepartment.borderColor} rounded-2xl p-6`}>
                  <div className="flex items-start gap-6">
                    <img 
                      src={selectedDepartment.admin.avatar} 
                      alt={selectedDepartment.admin.name}
                      className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl"
                    />
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-[#1B254B] mb-1">{selectedDepartment.admin.name}</h4>
                      <p className="text-gray-600 font-medium mb-3">{selectedDepartment.admin.role}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700">{selectedDepartment.admin.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700">{selectedDepartment.admin.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700">Employee ID: {selectedDepartment.admin.empId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-green-500" />
                          <span className="text-sm text-gray-700">Last active: {selectedDepartment.admin.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Performance Metrics */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                  <BarChart3 size={24} className="text-[#0B4DA2]" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Active Requests', value: selectedDepartment.stats.activeRequests, color: 'blue', icon: Activity },
                    { label: 'Completed', value: selectedDepartment.stats.completedRequests, color: 'green', icon: CheckCircle },
                    { label: 'Pending', value: selectedDepartment.stats.pendingApprovals, color: 'orange', icon: ClockIcon },
                    { label: 'Total Handled', value: selectedDepartment.stats.totalRequests, color: 'purple', icon: BarChart3 }
                  ].map((metric, idx) => (
                    <div key={idx} className={`bg-${metric.color}-50 border-2 border-${metric.color}-100 rounded-2xl p-5 text-center`}>
                      <metric.icon size={28} className={`mx-auto mb-3 text-${metric.color}-600`} />
                      <p className="text-3xl font-bold text-[#1B254B] mb-1">{metric.value}</p>
                      <p className="text-xs text-gray-600 font-medium">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Performance Chart */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                  <Calendar size={24} className="text-[#0B4DA2]" />
                  7-Day Performance Trend
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-end justify-between gap-3 h-56">
                    {selectedDepartment.weeklyData.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-3">
                        <div className="w-full bg-white rounded-t-xl relative overflow-hidden shadow-inner border-2 border-gray-200" style={{ height: '100%' }}>
                          <div 
                            className={`absolute bottom-0 w-full bg-gradient-to-t ${selectedDepartment.color} rounded-t-xl transition-all shadow-lg`}
                            style={{ height: `${value}%` }}
                          >
                            <div className="absolute top-2 left-0 right-0 text-center">
                              <span className="text-xs font-bold text-white">{value}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-700">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                          </p>
                          <p className="text-xs text-gray-500">Day {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Request Types Analysis */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1B254B] mb-4">Request Types Breakdown</h3>
                <div className="space-y-4">
                  {selectedDepartment.requestTypes.map((type, index) => (
                    <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-5">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-[#1B254B] text-lg">{type.type}</h4>
                          <p className="text-sm text-gray-600">{type.percentage}% of total requests</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-[#0B4DA2]">{type.count}</p>
                          <p className="text-xs text-gray-500">Requests</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${selectedDepartment.color} rounded-full transition-all shadow-md`}
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                  <ClockIcon size={32} className="text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-[#1B254B] mb-2">Response Time</h4>
                  <p className="text-4xl font-bold text-blue-600 mb-2">{selectedDepartment.stats.avgResponseTime}</p>
                  <p className="text-sm text-gray-600">Average response time to requests</p>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-xs text-green-600 font-bold">↓ 12% faster than last month</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                  <Award size={32} className="text-green-600 mb-3" />
                  <h4 className="text-lg font-bold text-[#1B254B] mb-2">Customer Satisfaction</h4>
                  <p className="text-4xl font-bold text-green-600 mb-2">{selectedDepartment.stats.satisfaction}/5.0</p>
                  <p className="text-sm text-gray-600">Employee satisfaction rating</p>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <span key={star} className={`text-xl ${star <= Math.floor(selectedDepartment.stats.satisfaction) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDepartment(null)}
                className="w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all text-lg"
              >
                Close Detailed Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
