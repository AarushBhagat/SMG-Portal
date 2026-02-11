import { useState, useMemo } from 'react';
import { Calendar, Clock, Plus, Search, Filter, CheckCircle, XCircle, Edit, Save, X, Users, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContextEnhanced';
import { collection, addDoc, updateDoc, doc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface AttendanceRecord {
  id?: string;
  userId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  status: 'present' | 'absent' | 'half_day' | 'leave' | 'late' | 'overtime';
  workHours: number;
  overtimeHours: number;
  manualEntry: boolean;
  manualEntryReason: string;
  enteredBy: string;
  enteredByName: string;
  notes: string;
}

const AttendanceManagement = () => {
  const { allUsers, currentUser } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);

  const [formData, setFormData] = useState<Partial<AttendanceRecord>>({
    date: new Date(),
    checkIn: null,
    checkOut: null,
    status: 'present',
    workHours: 0,
    overtimeHours: 0,
    manualEntry: true,
    manualEntryReason: '',
    notes: ''
  });

  // Get departments
  const departments = useMemo(() => {
    const depts = new Set(allUsers.map(user => user.department).filter(Boolean));
    return ['All', ...Array.from(depts)];
  }, [allUsers]);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return allUsers.filter(user => {
      const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'All' || user.department === filterDepartment;
      return matchesSearch && matchesDepartment && user.role === 'employee';
    });
  }, [allUsers, searchTerm, filterDepartment]);

  // Calculate statistics for selected date
  const stats = useMemo(() => {
    // In real implementation, fetch from Firebase attendance collection
    const totalEmployees = filteredEmployees.length;
    const present = Math.floor(totalEmployees * 0.85);
    const absent = Math.floor(totalEmployees * 0.10);
    const late = Math.floor(totalEmployees * 0.05);

    return {
      totalEmployees,
      present,
      absent,
      late,
      attendanceRate: totalEmployees > 0 ? ((present / totalEmployees) * 100).toFixed(1) : '0.0'
    };
  }, [filteredEmployees, selectedDate]);

  const handleOpenAddModal = (employee: any) => {
    setSelectedEmployee(employee);
    setFormData({
      userId: employee.id,
      employeeId: employee.employeeId,
      employeeName: employee.name,
      department: employee.department,
      date: new Date(selectedDate),
      checkIn: null,
      checkOut: null,
      status: 'present',
      workHours: 0,
      overtimeHours: 0,
      manualEntry: true,
      manualEntryReason: '',
      notes: ''
    });
    setShowAddModal(true);
  };

  const handleSubmitAttendance = async () => {
    if (!formData.userId || !formData.status) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Calculate work hours if check-in and check-out are provided
      let workHours = 0;
      let overtimeHours = 0;
      
      if (formData.checkIn && formData.checkOut) {
        const checkInTime = new Date(formData.checkIn).getTime();
        const checkOutTime = new Date(formData.checkOut).getTime();
        const totalHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        workHours = Math.min(totalHours, 8); // Regular hours capped at 8
        overtimeHours = Math.max(0, totalHours - 8); // Overtime beyond 8 hours
      }

      const attendanceData = {
        userId: formData.userId,
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        department: formData.department,
        date: formData.date,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        status: formData.status,
        workHours,
        overtimeHours,
        manualEntry: true,
        manualEntryReason: formData.manualEntryReason || 'Manual entry by Time Office',
        enteredBy: currentUser.id,
        enteredByName: currentUser.name,
        notes: formData.notes || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Create attendance record in sub-collection
      await addDoc(collection(db, 'attendance', formData.userId, 'records'), attendanceData);

      alert('Attendance record added successfully!');
      setShowAddModal(false);
      setSelectedEmployee(null);
      setFormData({});
    } catch (error) {
      console.error('Error adding attendance:', error);
      alert('Failed to add attendance record');
    }
  };

  const handleUpdateAttendance = async () => {
    if (!editingRecord?.id) {
      alert('Invalid record');
      return;
    }

    try {
      await updateDoc(
        doc(db, 'attendance', editingRecord.userId, 'records', editingRecord.id),
        {
          checkIn: editingRecord.checkIn,
          checkOut: editingRecord.checkOut,
          status: editingRecord.status,
          workHours: editingRecord.workHours,
          overtimeHours: editingRecord.overtimeHours,
          notes: editingRecord.notes,
          updatedAt: serverTimestamp()
        }
      );

      alert('Attendance updated successfully!');
      setShowEditModal(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update attendance');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'present': 'bg-green-100 text-green-800',
      'absent': 'bg-red-100 text-red-800',
      'half_day': 'bg-yellow-100 text-yellow-800',
      'leave': 'bg-blue-100 text-blue-800',
      'late': 'bg-orange-100 text-orange-800',
      'overtime': 'bg-purple-100 text-purple-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'late':
        return <Clock className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Attendance Management</h1>
            <p className="text-emerald-100">Manage daily employee attendance records</p>
          </div>
          <Calendar className="w-16 h-16 opacity-20" />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalEmployees}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Present Today</p>
              <p className="text-3xl font-bold text-green-600">{stats.present}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Absent Today</p>
              <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Attendance Rate</p>
              <p className="text-3xl font-bold text-emerald-600">{stats.attendanceRate}%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Employee</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="min-w-[180px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="min-w-[180px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="leave">On Leave</option>
              <option value="half_day">Half Day</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Attendance for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check-In</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check-Out</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Work Hours</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                        {employee.name?.charAt(0) || 'E'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">--:--</td>
                  <td className="px-6 py-4 text-sm text-gray-500">--:--</td>
                  <td className="px-6 py-4 text-sm text-gray-500">-- hrs</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                      Not Marked
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOpenAddModal(employee)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Mark Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No employees found</p>
          </div>
        )}
      </div>

      {/* Add Attendance Modal */}
      {showAddModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Mark Attendance</h2>
                  <p className="text-emerald-100">{selectedEmployee.name} - {selectedEmployee.employeeId}</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="half_day">Half Day</option>
                  <option value="leave">On Leave</option>
                  <option value="late">Late</option>
                  <option value="overtime">Overtime</option>
                </select>
              </div>

              {/* Check-in Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-In Time</label>
                <input
                  type="time"
                  value={formData.checkIn ? new Date(formData.checkIn).toTimeString().slice(0, 5) : ''}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date(formData.date || new Date());
                    date.setHours(parseInt(hours), parseInt(minutes));
                    setFormData({ ...formData, checkIn: date });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Check-out Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-Out Time</label>
                <input
                  type="time"
                  value={formData.checkOut ? new Date(formData.checkOut).toTimeString().slice(0, 5) : ''}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date(formData.date || new Date());
                    date.setHours(parseInt(hours), parseInt(minutes));
                    setFormData({ ...formData, checkOut: date });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Reason for Manual Entry */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Manual Entry</label>
                <textarea
                  value={formData.manualEntryReason}
                  onChange={(e) => setFormData({ ...formData, manualEntryReason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Why is this being manually entered..."
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Additional notes..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAttendance}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;
