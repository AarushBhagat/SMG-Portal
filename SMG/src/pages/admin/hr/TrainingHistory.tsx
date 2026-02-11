import { useState } from 'react';
import { Award, Plus, BookOpen, Calendar, CheckCircle, Clock, X, Download, TrendingUp } from 'lucide-react';

interface TrainingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  trainingTitle: string;
  trainingType: string;
  provider: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';
  completionPercentage: number;
  certificateUrl?: string;
  skillsAcquired: string[];
  assessmentScore?: number;
  notes: string;
}

export const TrainingHistory = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    trainingTitle: '',
    trainingType: 'Technical',
    provider: '',
    startDate: '',
    endDate: '',
    duration: '',
    status: 'Planned' as const,
    completionPercentage: 0,
    certificateUrl: '',
    skillsAcquired: '',
    assessmentScore: '',
    notes: ''
  });

  // Mock training data - in real app, this would come from Firebase
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>([
    {
      id: 'TR-001',
      employeeId: 'EMP-101',
      employeeName: 'Mr Praphull Chandra',
      trainingTitle: 'React Advanced Patterns',
      trainingType: 'Technical',
      provider: 'Udemy',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      duration: '30 days',
      status: 'In Progress',
      completionPercentage: 65,
      skillsAcquired: ['React Hooks', 'Context API', 'Performance Optimization'],
      assessmentScore: 0,
      notes: 'Employee showing excellent progress'
    },
    {
      id: 'TR-002',
      employeeId: 'EMP-102',
      employeeName: 'John Doe',
      trainingTitle: 'Leadership Development Program',
      trainingType: 'Soft Skills',
      provider: 'Internal Training',
      startDate: '2024-12-01',
      endDate: '2024-12-15',
      duration: '15 days',
      status: 'Completed',
      completionPercentage: 100,
      certificateUrl: 'https://example.com/cert/002',
      skillsAcquired: ['Team Management', 'Communication', 'Conflict Resolution'],
      assessmentScore: 92,
      notes: 'Outstanding performance throughout'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: TrainingRecord = {
      id: `TR-${String(trainingRecords.length + 1).padStart(3, '0')}`,
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      trainingTitle: formData.trainingTitle,
      trainingType: formData.trainingType,
      provider: formData.provider,
      startDate: formData.startDate,
      endDate: formData.endDate,
      duration: formData.duration,
      status: formData.status,
      completionPercentage: formData.completionPercentage,
      certificateUrl: formData.certificateUrl,
      skillsAcquired: formData.skillsAcquired.split(',').map(s => s.trim()),
      assessmentScore: formData.assessmentScore ? parseInt(formData.assessmentScore) : undefined,
      notes: formData.notes
    };

    setTrainingRecords([...trainingRecords, newRecord]);
    setShowAddForm(false);
    setFormData({
      employeeId: '',
      employeeName: '',
      trainingTitle: '',
      trainingType: 'Technical',
      provider: '',
      startDate: '',
      endDate: '',
      duration: '',
      status: 'Planned',
      completionPercentage: 0,
      certificateUrl: '',
      skillsAcquired: '',
      assessmentScore: '',
      notes: ''
    });
    alert('Training record added successfully!');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'Planned': 'bg-blue-100 text-blue-700',
      'In Progress': 'bg-yellow-100 text-yellow-700',
      'Completed': 'bg-green-100 text-green-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} />;
      case 'In Progress': return <Clock size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const filteredRecords = selectedEmployee === 'all' 
    ? trainingRecords 
    : trainingRecords.filter(r => r.employeeId === selectedEmployee);

  const stats = {
    totalTrainings: trainingRecords.length,
    completed: trainingRecords.filter(r => r.status === 'Completed').length,
    inProgress: trainingRecords.filter(r => r.status === 'In Progress').length,
    averageScore: trainingRecords.filter(r => r.assessmentScore).reduce((sum, r) => sum + (r.assessmentScore || 0), 0) / trainingRecords.filter(r => r.assessmentScore).length || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Award className="text-orange-500" size={36} />
            Training History Management
          </h1>
          <p className="text-gray-500 mt-1">Track employee training programs and development</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-br from-orange-600 to-orange-800 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Add Training Record
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{stats.totalTrainings}</p>
              <p className="text-sm text-gray-500">Total Trainings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{stats.completed}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{stats.inProgress}</p>
              <p className="text-sm text-gray-500">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{stats.averageScore.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <label className="font-bold text-gray-700">Filter by Employee:</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
          >
            <option value="all">All Employees</option>
            <option value="EMP-101">Mr Praphull Chandra (EMP-101)</option>
            <option value="EMP-102">John Doe (EMP-102)</option>
          </select>
        </div>
      </div>

      {/* Training Records Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Training Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Employee</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Training</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Type</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Provider</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Duration</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Progress</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No training records found. Click "Add Training Record" to create one.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#1B254B]">{record.employeeName}</p>
                      <p className="text-xs text-gray-500">{record.employeeId}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-700">{record.trainingTitle}</p>
                      <p className="text-xs text-gray-500">{record.startDate} - {record.endDate}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                        {record.trainingType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{record.provider}</td>
                    <td className="py-4 px-4 text-gray-700">{record.duration}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all"
                            style={{ width: `${record.completionPercentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-600">{record.completionPercentage}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {record.status}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {record.certificateUrl ? (
                        <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                          <Download size={18} />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Training Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1B254B]">Add Training Record</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Employee Information */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4">Employee Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Employee ID *</label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                      placeholder="e.g., EMP-101"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Employee Name *</label>
                    <input
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                      placeholder="Enter employee name"
                    />
                  </div>
                </div>
              </div>

              {/* Training Details */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4">Training Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Training Title *</label>
                    <input
                      type="text"
                      value={formData.trainingTitle}
                      onChange={(e) => setFormData({ ...formData, trainingTitle: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                      placeholder="e.g., Advanced React Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Training Type *</label>
                    <select
                      value={formData.trainingType}
                      onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                    >
                      <option value="Technical">Technical</option>
                      <option value="Soft Skills">Soft Skills</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Safety">Safety</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Provider *</label>
                    <input
                      type="text"
                      value={formData.provider}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                      placeholder="e.g., Udemy, Internal Training"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Date *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">End Date *</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Duration *</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                      placeholder="e.g., 30 days, 5 hours"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Completion % *</label>
                    <input
                      type="number"
                      value={formData.completionPercentage}
                      onChange={(e) => setFormData({ ...formData, completionPercentage: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Assessment Score (%)</label>
                    <input
                      type="number"
                      value={formData.assessmentScore}
                      onChange={(e) => setFormData({ ...formData, assessmentScore: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      min="0"
                      max="100"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Certificate URL</label>
                    <input
                      type="url"
                      value={formData.certificateUrl}
                      onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Skills Acquired (comma-separated) *</label>
                    <input
                      type="text"
                      value={formData.skillsAcquired}
                      onChange={(e) => setFormData({ ...formData, skillsAcquired: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      required
                      placeholder="e.g., React, TypeScript, API Development"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                      rows={3}
                      placeholder="Additional notes or comments"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-orange-600 to-orange-800 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Add Training Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
