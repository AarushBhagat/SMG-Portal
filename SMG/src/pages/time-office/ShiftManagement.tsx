import { useState, useMemo, useEffect } from 'react';
import { Clock, Plus, Edit, Search, X, Save, Users, Calendar, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContextEnhanced';
import { collection, addDoc, updateDoc, doc, serverTimestamp, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Shift {
  id?: string;
  shiftName: string;
  shiftCode: string;
  startTime: string;
  endTime: string;
  duration: number;
  breakDuration: number;
  workdays: string[];
  gracePeriod: number;
  isActive: boolean;
  description: string;
}

interface ShiftAssignment {
  id?: string;
  userId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  shiftId: string;
  shiftName: string;
  shiftCode: string;
  startTime: string;
  endTime: string;
  assignedBy: string;
  assignedByName: string;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  status: 'active' | 'expired' | 'cancelled';
  reason: string;
}

const ShiftManagement = () => {
  const { allUsers, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'shifts' | 'assignments'>('shifts');
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);

  // Mock shifts data (will be replaced with Firebase)
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: '1',
      shiftName: 'Morning Shift',
      shiftCode: 'MS',
      startTime: '09:00',
      endTime: '18:00',
      duration: 9,
      breakDuration: 60,
      workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      gracePeriod: 15,
      isActive: true,
      description: 'Standard morning shift for regular employees'
    },
    {
      id: '2',
      shiftName: 'Evening Shift',
      shiftCode: 'ES',
      startTime: '14:00',
      endTime: '23:00',
      duration: 9,
      breakDuration: 60,
      workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      gracePeriod: 15,
      isActive: true,
      description: 'Evening shift for production team'
    },
    {
      id: '3',
      shiftName: 'Night Shift',
      shiftCode: 'NS',
      startTime: '22:00',
      endTime: '07:00',
      duration: 9,
      breakDuration: 60,
      workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      gracePeriod: 15,
      isActive: true,
      description: 'Night shift for 24/7 operations'
    },
    {
      id: '4',
      shiftName: 'General Shift',
      shiftCode: 'GS',
      startTime: '08:00',
      endTime: '17:00',
      duration: 9,
      breakDuration: 60,
      workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      gracePeriod: 10,
      isActive: true,
      description: 'Flexible general shift'
    }
  ]);

  const [shiftFormData, setShiftFormData] = useState<Shift>({
    shiftName: '',
    shiftCode: '',
    startTime: '09:00',
    endTime: '18:00',
    duration: 9,
    breakDuration: 60,
    workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    gracePeriod: 15,
    isActive: true,
    description: ''
  });

  const [assignFormData, setAssignFormData] = useState<Partial<ShiftAssignment>>({
    shiftId: '',
    effectiveFrom: new Date(),
    effectiveTo: null,
    status: 'active',
    reason: ''
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

  // Calculate statistics
  const stats = useMemo(() => {
    const activeShifts = shifts.filter(s => s.isActive).length;
    const totalAssignments = filteredEmployees.filter(e => e.shift).length;
    
    return {
      totalShifts: shifts.length,
      activeShifts,
      totalAssignments,
      unassigned: filteredEmployees.length - totalAssignments
    };
  }, [shifts, filteredEmployees]);

  const handleOpenShiftModal = (shift?: Shift) => {
    if (shift) {
      setShiftFormData(shift);
      setEditingShift(shift);
    } else {
      setShiftFormData({
        shiftName: '',
        shiftCode: '',
        startTime: '09:00',
        endTime: '18:00',
        duration: 9,
        breakDuration: 60,
        workdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        gracePeriod: 15,
        isActive: true,
        description: ''
      });
      setEditingShift(null);
    }
    setShowShiftModal(true);
  };

  const handleOpenAssignModal = (employee: any) => {
    setSelectedEmployee(employee);
    setAssignFormData({
      userId: employee.id,
      employeeId: employee.employeeId,
      employeeName: employee.name,
      department: employee.department,
      shiftId: '',
      effectiveFrom: new Date(),
      effectiveTo: null,
      status: 'active',
      reason: ''
    });
    setShowAssignModal(true);
  };

  const handleSubmitShift = async () => {
    if (!shiftFormData.shiftName || !shiftFormData.shiftCode) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const shiftData = {
        ...shiftFormData,
        createdBy: currentUser.id,
        createdByName: currentUser.name,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (editingShift?.id) {
        // Update existing shift
        await updateDoc(doc(db, 'shifts', editingShift.id), {
          ...shiftFormData,
          updatedAt: serverTimestamp()
        });
        alert('Shift updated successfully!');
      } else {
        // Create new shift
        await addDoc(collection(db, 'shifts'), shiftData);
        alert('Shift created successfully!');
      }

      setShowShiftModal(false);
      setEditingShift(null);
    } catch (error) {
      console.error('Error saving shift:', error);
      alert('Failed to save shift');
    }
  };

  const handleAssignShift = async () => {
    if (!assignFormData.shiftId) {
      alert('Please select a shift');
      return;
    }

    try {
      const selectedShift = shifts.find(s => s.id === assignFormData.shiftId);
      if (!selectedShift) return;

      // Create shift assignment
      const assignmentData = {
        userId: assignFormData.userId,
        employeeId: assignFormData.employeeId,
        employeeName: assignFormData.employeeName,
        department: assignFormData.department,
        shiftId: selectedShift.id,
        shiftName: selectedShift.shiftName,
        shiftCode: selectedShift.shiftCode,
        startTime: selectedShift.startTime,
        endTime: selectedShift.endTime,
        assignedBy: currentUser.id,
        assignedByName: currentUser.name,
        assignedDate: serverTimestamp(),
        effectiveFrom: assignFormData.effectiveFrom,
        effectiveTo: assignFormData.effectiveTo,
        status: 'active',
        reason: assignFormData.reason || 'Shift assignment',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Add to assignments collection
      await addDoc(collection(db, 'shifts', 'assignments', 'all'), assignmentData);

      // Update user document with current shift
      await updateDoc(doc(db, 'users', assignFormData.userId!), {
        shift: {
          shiftId: selectedShift.id,
          shiftName: selectedShift.shiftName,
          startTime: selectedShift.startTime,
          endTime: selectedShift.endTime,
          assignedBy: currentUser.id,
          assignedDate: serverTimestamp(),
          effectiveFrom: assignFormData.effectiveFrom
        },
        updatedAt: serverTimestamp()
      });

      alert('Shift assigned successfully!');
      setShowAssignModal(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error assigning shift:', error);
      alert('Failed to assign shift');
    }
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shift Management</h1>
            <p className="text-indigo-100">Manage employee work shifts and schedules</p>
          </div>
          <Clock className="w-16 h-16 opacity-20" />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Shifts</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalShifts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Active Shifts</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeShifts}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Assigned Employees</p>
              <p className="text-3xl font-bold text-indigo-600">{stats.totalAssignments}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Unassigned</p>
              <p className="text-3xl font-bold text-orange-600">{stats.unassigned}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('shifts')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'shifts'
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Shift Definitions
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'assignments'
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Employee Assignments
            </button>
          </div>
        </div>

        {/* Shift Definitions Tab */}
        {activeTab === 'shifts' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Shift Definitions</h2>
              <button
                onClick={() => handleOpenShiftModal()}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Shift
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {shifts.map(shift => (
                <div key={shift.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{shift.shiftName}</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                          {shift.shiftCode}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{shift.description}</p>
                    </div>
                    <button
                      onClick={() => handleOpenShiftModal(shift)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 font-semibold">{shift.startTime} - {shift.endTime}</span>
                      <span className="text-gray-500">({shift.duration} hours)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Break Duration</p>
                        <p className="font-semibold">{shift.breakDuration} minutes</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Grace Period</p>
                        <p className="font-semibold">{shift.gracePeriod} minutes</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm mb-2">Work Days</p>
                      <div className="flex flex-wrap gap-2">
                        {shift.workdays.map(day => (
                          <span key={day} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        shift.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {shift.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Employee Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Current Shift</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Timing</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold">
                            {employee.name?.charAt(0) || 'E'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{employee.department}</td>
                      <td className="px-6 py-4">
                        {employee.shift ? (
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                            {employee.shift.shiftName || 'Assigned'}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                            Not Assigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {employee.shift ? `${employee.shift.startTime} - ${employee.shift.endTime}` : '--'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleOpenAssignModal(employee)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          {employee.shift ? 'Change Shift' : 'Assign Shift'}
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

      {/* Shift Modal */}
      {showShiftModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{editingShift ? 'Edit Shift' : 'Create New Shift'}</h2>
                <button
                  onClick={() => setShowShiftModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Shift Name *</label>
                  <input
                    type="text"
                    value={shiftFormData.shiftName}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, shiftName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Morning Shift"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Shift Code *</label>
                  <input
                    type="text"
                    value={shiftFormData.shiftCode}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, shiftCode: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., MS"
                    maxLength={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
                  <input
                    type="time"
                    value={shiftFormData.startTime}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Time *</label>
                  <input
                    type="time"
                    value={shiftFormData.endTime}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (hours)</label>
                  <input
                    type="number"
                    value={shiftFormData.duration}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, duration: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    min="1"
                    max="24"
                    step="0.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Break Duration (minutes)</label>
                  <input
                    type="number"
                    value={shiftFormData.breakDuration}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, breakDuration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    min="0"
                    step="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grace Period (minutes)</label>
                  <input
                    type="number"
                    value={shiftFormData.gracePeriod}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, gracePeriod: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    min="0"
                    step="5"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={shiftFormData.isActive}
                    onChange={(e) => setShiftFormData({ ...shiftFormData, isActive: e.target.checked })}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">Active Shift</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Work Days</label>
                <div className="flex flex-wrap gap-3">
                  {weekdays.map(day => (
                    <label key={day} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={shiftFormData.workdays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setShiftFormData({
                              ...shiftFormData,
                              workdays: [...shiftFormData.workdays, day]
                            });
                          } else {
                            setShiftFormData({
                              ...shiftFormData,
                              workdays: shiftFormData.workdays.filter(d => d !== day)
                            });
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={shiftFormData.description}
                  onChange={(e) => setShiftFormData({ ...shiftFormData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Brief description of this shift..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowShiftModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitShift}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingShift ? 'Update Shift' : 'Create Shift'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Shift Modal */}
      {showAssignModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Assign Shift</h2>
                  <p className="text-indigo-100">{selectedEmployee.name} - {selectedEmployee.employeeId}</p>
                </div>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Shift *</label>
                <select
                  value={assignFormData.shiftId}
                  onChange={(e) => setAssignFormData({ ...assignFormData, shiftId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Choose a shift...</option>
                  {shifts.filter(s => s.isActive).map(shift => (
                    <option key={shift.id} value={shift.id}>
                      {shift.shiftName} ({shift.shiftCode}) - {shift.startTime} to {shift.endTime}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Effective From *</label>
                  <input
                    type="date"
                    value={assignFormData.effectiveFrom ? new Date(assignFormData.effectiveFrom).toISOString().split('T')[0] : ''}
                    onChange={(e) => setAssignFormData({ ...assignFormData, effectiveFrom: new Date(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Effective To (Optional)</label>
                  <input
                    type="date"
                    value={assignFormData.effectiveTo ? new Date(assignFormData.effectiveTo).toISOString().split('T')[0] : ''}
                    onChange={(e) => setAssignFormData({ ...assignFormData, effectiveTo: e.target.value ? new Date(e.target.value) : null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Assignment</label>
                <textarea
                  value={assignFormData.reason}
                  onChange={(e) => setAssignFormData({ ...assignFormData, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Reason for assigning/changing shift..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignShift}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Assign Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;
