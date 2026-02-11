import { useState, useMemo } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertTriangle, TrendingUp, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContextEnhanced';
import { useNavigate } from 'react-router-dom';

const TimeOfficeDashboard = () => {
  const { allUsers, requests } = useApp();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEmployees = allUsers.filter(u => u.role === 'employee').length;
    
    // Attendance stats (mock for now)
    const presentToday = Math.floor(totalEmployees * 0.85);
    const absentToday = Math.floor(totalEmployees * 0.10);
    const lateToday = Math.floor(totalEmployees * 0.05);
    
    // Pending approvals (leave & gate pass requests for Time Office)
    const pendingApprovals = requests.filter(req =>
      (req.requestType === 'leave' || req.requestType === 'gate_pass') &&
      req.status === 'pending' &&
      req.currentApprover === 'Time Office'
    ).length;

    // Shift assignments
    const assignedShifts = allUsers.filter(u => u.shift && u.role === 'employee').length;
    const unassignedShifts = totalEmployees - assignedShifts;

    return {
      totalEmployees,
      presentToday,
      absentToday,
      lateToday,
      attendanceRate: totalEmployees > 0 ? ((presentToday / totalEmployees) * 100).toFixed(1) : '0.0',
      pendingApprovals,
      assignedShifts,
      unassignedShifts
    };
  }, [allUsers, requests]);

  // Get pending leave/gate pass requests
  const pendingRequests = useMemo(() => {
    return requests
      .filter(req =>
        (req.requestType === 'leave' || req.requestType === 'gate_pass') &&
        req.status === 'pending' &&
        req.currentApprover === 'Time Office'
      )
      .slice(0, 5); // Show only first 5
  }, [requests]);

  // Quick actions
  const quickActions = [
    {
      title: 'Attendance Management',
      description: 'Mark and update daily attendance',
      icon: CheckCircle,
      color: 'from-emerald-600 to-emerald-800',
      route: '/time-office/attendance'
    },
    {
      title: 'Shift Management',
      description: 'Manage employee shifts and schedules',
      icon: Clock,
      color: 'from-indigo-600 to-indigo-800',
      route: '/time-office/shifts'
    },
    {
      title: 'Leave Approvals',
      description: 'Review pending leave requests',
      icon: FileText,
      color: 'from-blue-600 to-blue-800',
      route: '/time-office/leave-approvals'
    },
    {
      title: 'Gate Pass Approvals',
      description: 'Process gate pass requests',
      icon: Users,
      color: 'from-purple-600 to-purple-800',
      route: '/time-office/gatepass-approvals'
    }
  ];

  const getRequestTypeBadge = (type: string) => {
    const badges = {
      'leave': 'bg-blue-100 text-blue-800',
      'gate_pass': 'bg-purple-100 text-purple-800'
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3">Time Office Dashboard</h1>
            <p className="text-emerald-100 text-lg">Welcome back! Manage attendance, shifts, and approvals</p>
            <p className="text-emerald-200 text-sm mt-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Calendar className="w-24 h-24 opacity-20" />
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalEmployees}</p>
          <p className="text-sm text-gray-600">Total Employees</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-500">Today</span>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-1">{stats.presentToday}</p>
          <p className="text-sm text-gray-600">Present Today</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-semibold">{stats.attendanceRate}%</span>
            <span className="text-gray-500 ml-1">attendance rate</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <XCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-500">Today</span>
          </div>
          <p className="text-3xl font-bold text-red-600 mb-1">{stats.absentToday}</p>
          <p className="text-sm text-gray-600">Absent Today</p>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-orange-600 font-semibold">{stats.lateToday}</span>
              <span className="text-gray-500 ml-1">late</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-500">Pending</span>
          </div>
          <p className="text-3xl font-bold text-indigo-600 mb-1">{stats.pendingApprovals}</p>
          <p className="text-sm text-gray-600">Pending Approvals</p>
        </div>
      </div>

      {/* Shift Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Shift Assignments Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {stats.assignedShifts}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Assigned Shifts</p>
                  <p className="text-sm text-gray-600">Employees with active shifts</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-indigo-600">
                  {stats.totalEmployees > 0 ? ((stats.assignedShifts / stats.totalEmployees) * 100).toFixed(0) : 0}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {stats.unassignedShifts}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unassigned</p>
                  <p className="text-sm text-gray-600">Employees without shifts</p>
                </div>
              </div>
              {stats.unassignedShifts > 0 && (
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
                  Assign Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Attendance Trends
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">This Week</span>
                <span className="text-lg font-bold text-emerald-600">{stats.attendanceRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all"
                  style={{ width: `${stats.attendanceRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Present</p>
                <p className="text-xl font-bold text-blue-600">{stats.presentToday}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Absent</p>
                <p className="text-xl font-bold text-red-600">{stats.absentToday}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Late</p>
                <p className="text-xl font-bold text-orange-600">{stats.lateToday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.route)}
              className="group relative p-6 bg-gradient-to-br hover:shadow-xl transition-all rounded-xl text-white overflow-hidden"
              style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <action.icon className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                <p className="text-sm opacity-90 mb-3">{action.description}</p>
                <div className="flex items-center text-sm font-semibold">
                  <span>Go to {action.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pending Approvals */}
      {pendingRequests.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
              {stats.pendingApprovals} Pending
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingRequests.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{request.employeeName}</p>
                        <p className="text-sm text-gray-500">{request.employeeId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRequestTypeBadge(request.requestType)}`}>
                        {request.requestType === 'leave' ? 'Leave' : 'Gate Pass'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {request.requestData?.leaveType && <span>Type: {request.requestData.leaveType}</span>}
                      {request.requestData?.totalDays && <span className="ml-2">({request.requestData.totalDays} days)</span>}
                      {request.requestData?.gatePassType && <span>Type: {request.requestData.gatePassType}</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {request.submittedAt && new Date(request.submittedAt.toDate()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/time-office/approvals/${request.id}`)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeOfficeDashboard;
