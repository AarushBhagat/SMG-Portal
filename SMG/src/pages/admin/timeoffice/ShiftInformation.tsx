import { useState } from 'react';
import { Clock, Users, Edit, Trash2, Plus, X, Save } from 'lucide-react';

interface Shift {
  id: string;
  name: string;
  timing: string;
  startTime: string;
  endTime: string;
  breakDuration: string;
  workingHours: string;
  employees: number;
  days: string;
  color: string;
}

export const ShiftInformation = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    breakDuration: '',
    days: ''
  });

  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 'SH001',
      name: 'Morning Shift',
      timing: '8:00 AM - 5:00 PM',
      startTime: '08:00',
      endTime: '17:00',
      breakDuration: '1 hour',
      workingHours: '8 hours',
      employees: 245,
      days: 'Mon - Sat',
      color: 'from-[#042A5B] to-[#0B4DA2]'
    },
    {
      id: 'SH002',
      name: 'Evening Shift',
      timing: '3:00 PM - 12:00 AM',
      startTime: '15:00',
      endTime: '00:00',
      breakDuration: '1 hour',
      workingHours: '8 hours',
      employees: 120,
      days: 'Mon - Sat',
      color: 'from-[#042A5B] to-[#0B4DA2]'
    },
    {
      id: 'SH003',
      name: 'Night Shift',
      timing: '11:00 PM - 8:00 AM',
      startTime: '23:00',
      endTime: '08:00',
      breakDuration: '1 hour',
      workingHours: '8 hours',
      employees: 85,
      days: 'Mon - Sat',
      color: 'from-[#042A5B] to-[#0B4DA2]'
    },
    {
      id: 'SH004',
      name: 'General Shift',
      timing: '9:00 AM - 6:00 PM',
      startTime: '09:00',
      endTime: '18:00',
      breakDuration: '1 hour',
      workingHours: '8 hours',
      employees: 180,
      days: 'Mon - Fri',
      color: 'from-[#042A5B] to-[#0B4DA2]'
    }
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this shift?')) {
      setShifts(shifts.filter(shift => shift.id !== id));
    }
  };

  const handleEdit = (shift: Shift) => {
    setEditingShift(shift);
    setFormData({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      breakDuration: shift.breakDuration,
      days: shift.days
    });
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (editingShift) {
      // Calculate timing string and working hours
      const startHour = parseInt(formData.startTime.split(':')[0]);
      const endHour = parseInt(formData.endTime.split(':')[0]);
      const startMinute = parseInt(formData.startTime.split(':')[1]);
      const endMinute = parseInt(formData.endTime.split(':')[1]);
      
      const startPeriod = startHour >= 12 ? 'PM' : 'AM';
      const endPeriod = endHour >= 12 ? 'PM' : 'AM';
      const displayStartHour = startHour > 12 ? startHour - 12 : startHour === 0 ? 12 : startHour;
      const displayEndHour = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour;
      
      const timing = `${displayStartHour}:${startMinute.toString().padStart(2, '0')} ${startPeriod} - ${displayEndHour}:${endMinute.toString().padStart(2, '0')} ${endPeriod}`;
      
      let workHours = endHour - startHour;
      if (endHour < startHour) workHours += 24;
      const breakHours = parseInt(formData.breakDuration.split(' ')[0]);
      const workingHours = `${workHours - breakHours} hours`;

      setShifts(shifts.map(shift =>
        shift.id === editingShift.id
          ? { ...shift, ...formData, timing, workingHours }
          : shift
      ));
    } else {
      const newShift: Shift = {
        id: `SH${(shifts.length + 1).toString().padStart(3, '0')}`,
        ...formData,
        timing: `${formData.startTime} - ${formData.endTime}`,
        workingHours: '8 hours',
        employees: 0,
        color: 'from-[#042A5B] to-[#0B4DA2]'
      };
      setShifts([...shifts, newShift]);
    }
    setShowAddModal(false);
    setEditingShift(null);
    setFormData({ name: '', startTime: '', endTime: '', breakDuration: '', days: '' });
  };

  const totalEmployees = shifts.reduce((sum, shift) => sum + shift.employees, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shift Information</h1>
            <p className="text-white/80">Manage employee shift schedules and timings</p>
          </div>
          <button
            onClick={() => {
              setEditingShift(null);
              setFormData({ name: '', startTime: '', endTime: '', breakDuration: '', days: '' });
              setShowAddModal(true);
            }}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            Add New Shift
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Clock className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{shifts.length}</h3>
          <p className="text-sm text-gray-500 font-medium">Total Shifts</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{totalEmployees}</h3>
          <p className="text-sm text-gray-500 font-medium">Total Employees</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Clock className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-[#1B254B] mb-1">24/7</h3>
          <p className="text-sm text-gray-500 font-medium">Operation Hours</p>
        </div>
      </div>

      {/* Shifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shifts.map((shift) => (
          <div key={shift.id} className={`bg-gradient-to-br ${shift.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-1">{shift.name}</h3>
                <p className="text-white/80 text-sm">Shift ID: {shift.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(shift)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(shift.id)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-medium">Timing:</span>
                </div>
                <span className="font-bold">{shift.timing}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-medium">Working Hours:</span>
                </div>
                <span className="font-bold">{shift.workingHours}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-medium">Break Duration:</span>
                </div>
                <span className="font-bold">{shift.breakDuration}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span className="font-medium">Employees:</span>
                </div>
                <span className="font-bold">{shift.employees}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-medium">Working Days:</span>
                </div>
                <span className="font-bold">{shift.days}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <h2 className="text-2xl font-bold">{editingShift ? 'Edit Shift' : 'Add New Shift'}</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Shift Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Morning Shift"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1B254B] mb-2">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1B254B] mb-2">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Break Duration</label>
                <select
                  value={formData.breakDuration}
                  onChange={(e) => setFormData({ ...formData, breakDuration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select break duration</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1.5 hours">1.5 hours</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1B254B] mb-2">Working Days</label>
                <select
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select working days</option>
                  <option value="Mon - Fri">Mon - Fri</option>
                  <option value="Mon - Sat">Mon - Sat</option>
                  <option value="Mon - Sun">Mon - Sun</option>
                  <option value="All Days">All Days</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {editingShift ? 'Update Shift' : 'Add Shift'}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
