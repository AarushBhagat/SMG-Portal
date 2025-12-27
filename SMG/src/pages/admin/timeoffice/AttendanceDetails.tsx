import { useState } from 'react';
import { Search, Download, Calendar, TrendingUp, Users, Clock, FileText, Eye, X } from 'lucide-react';

interface EmployeeAttendance {
  empId: string;
  empName: string;
  department: string;
  workingDays: number;
  overtimeHrs: number;
  totalWorkingHrs: number;
  casualLeave: number;
  medicalLeave: number;
  present: number;
  absent: number;
  halfDays: number;
  attendance: string;
}

export const AttendanceDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('December 2025');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeAttendance | null>(null);

  const attendanceData: EmployeeAttendance[] = [
    {
      empId: 'SMG-EMP-001',
      empName: 'Amit Sharma',
      department: 'IT',
      workingDays: 26,
      overtimeHrs: 15,
      totalWorkingHrs: 208,
      casualLeave: 2,
      medicalLeave: 1,
      present: 23,
      absent: 0,
      halfDays: 1,
      attendance: '95.8%'
    },
    {
      empId: 'SMG-EMP-002',
      empName: 'Priya Singh',
      department: 'HR',
      workingDays: 26,
      overtimeHrs: 8,
      totalWorkingHrs: 200,
      casualLeave: 1,
      medicalLeave: 0,
      present: 24,
      absent: 1,
      halfDays: 0,
      attendance: '92.3%'
    },
    {
      empId: 'SMG-EMP-003',
      empName: 'Rahul Verma',
      department: 'Production',
      workingDays: 26,
      overtimeHrs: 22,
      totalWorkingHrs: 220,
      casualLeave: 0,
      medicalLeave: 2,
      present: 24,
      absent: 0,
      halfDays: 0,
      attendance: '96.2%'
    },
    {
      empId: 'SMG-EMP-004',
      empName: 'Sneha Patel',
      department: 'Finance',
      workingDays: 26,
      overtimeHrs: 12,
      totalWorkingHrs: 212,
      casualLeave: 3,
      medicalLeave: 0,
      present: 22,
      absent: 1,
      halfDays: 2,
      attendance: '88.5%'
    },
    {
      empId: 'SMG-EMP-005',
      empName: 'Vikram Singh',
      department: 'Sales',
      workingDays: 26,
      overtimeHrs: 18,
      totalWorkingHrs: 218,
      casualLeave: 1,
      medicalLeave: 1,
      present: 24,
      absent: 0,
      halfDays: 0,
      attendance: '94.2%'
    }
  ];

  const filteredData = attendanceData.filter(emp =>
    emp.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Avg Attendance', value: '93.4%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Total Working Days', value: '26', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Avg Working Hours', value: '211.6', icon: Clock, color: 'bg-purple-500' },
    { label: 'Total Employees', value: attendanceData.length.toString(), icon: Users, color: 'bg-orange-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employee Attendance Details</h1>
            <p className="text-white/80">Comprehensive attendance records for {selectedMonth}</p>
          </div>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
          >
            <option>December 2025</option>
            <option>November 2025</option>
            <option>October 2025</option>
            <option>September 2025</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Working Days</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Overtime Hrs</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Total Hrs</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">CL</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">ML</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Present</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Absent</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Half Days</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Attendance %</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((emp) => (
                <tr key={emp.empId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-[#1B254B]">{emp.empName}</p>
                      <p className="text-sm text-gray-500">{emp.empId}</p>
                      <p className="text-xs text-gray-400">{emp.department}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-[#1B254B]">{emp.workingDays}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">{emp.overtimeHrs} hrs</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-[#1B254B]">{emp.totalWorkingHrs}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold">{emp.casualLeave}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-bold">{emp.medicalLeave}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold">{emp.present}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold">{emp.absent}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-bold">{emp.halfDays}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${parseFloat(emp.attendance) >= 95 ? 'bg-green-500' : parseFloat(emp.attendance) >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: emp.attendance }}
                        ></div>
                      </div>
                      <span className="font-bold text-[#1B254B]">{emp.attendance}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedEmployee(emp)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">{selectedEmployee.empName}</h2>
                  <p className="text-white/80 text-sm">{selectedEmployee.empId} • {selectedEmployee.department}</p>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <Calendar className="mx-auto mb-2 text-blue-600" size={24} />
                  <p className="text-xs text-blue-700 font-semibold mb-1">Working Days</p>
                  <p className="text-2xl font-bold text-blue-900">{selectedEmployee.workingDays}</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                  <Clock className="mx-auto mb-2 text-purple-600" size={24} />
                  <p className="text-xs text-purple-700 font-semibold mb-1">Overtime Hours</p>
                  <p className="text-2xl font-bold text-purple-900">{selectedEmployee.overtimeHrs}</p>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
                  <Clock className="mx-auto mb-2 text-indigo-600" size={24} />
                  <p className="text-xs text-indigo-700 font-semibold mb-1">Total Working Hours</p>
                  <p className="text-2xl font-bold text-indigo-900">{selectedEmployee.totalWorkingHrs}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <FileText className="mx-auto mb-2 text-blue-600" size={24} />
                  <p className="text-xs text-blue-700 font-semibold mb-1">Casual Leave</p>
                  <p className="text-2xl font-bold text-blue-900">{selectedEmployee.casualLeave}</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <FileText className="mx-auto mb-2 text-red-600" size={24} />
                  <p className="text-xs text-red-700 font-semibold mb-1">Medical Leave</p>
                  <p className="text-2xl font-bold text-red-900">{selectedEmployee.medicalLeave}</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <TrendingUp className="mx-auto mb-2 text-green-600" size={24} />
                  <p className="text-xs text-green-700 font-semibold mb-1">Present Days</p>
                  <p className="text-2xl font-bold text-green-900">{selectedEmployee.present}</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                  <X className="mx-auto mb-2 text-orange-600" size={24} />
                  <p className="text-xs text-orange-700 font-semibold mb-1">Absent Days</p>
                  <p className="text-2xl font-bold text-orange-900">{selectedEmployee.absent}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                  <Clock className="mx-auto mb-2 text-yellow-600" size={24} />
                  <p className="text-xs text-yellow-700 font-semibold mb-1">Half Days</p>
                  <p className="text-2xl font-bold text-yellow-900">{selectedEmployee.halfDays}</p>
                </div>

                <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-xl p-4 text-center text-white">
                  <TrendingUp className="mx-auto mb-2" size={24} />
                  <p className="text-xs font-semibold mb-1 text-white/80">Attendance %</p>
                  <p className="text-3xl font-bold">{selectedEmployee.attendance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
