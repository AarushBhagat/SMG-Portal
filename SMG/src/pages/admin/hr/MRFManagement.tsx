import { useState, useMemo } from 'react';
import { FileText, Plus, CheckCircle, Clock, XCircle, Eye, X, Users } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

interface MRFRequest {
  id: string;
  position: string;
  department: string;
  numberOfPositions: number;
  employmentType: string;
  urgency: string;
  justification: string;
  requiredSkills: string;
  experienceRequired: string;
  budgetRange: string;
  reportingTo: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
}

export const MRFManagement = () => {
  const { currentUser, requests, addRequest } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    numberOfPositions: '1',
    employmentType: 'Full-time',
    urgency: 'Normal',
    justification: '',
    requiredSkills: '',
    experienceRequired: '',
    budgetRange: '',
    reportingTo: ''
  });

  // Filter MRF requests from Firebase
  const mrfRequests = useMemo(() => {
    return requests
      .filter(req => req.requestType === 'mrf')
      .map(req => ({
        id: req.id,
        position: req.requestData?.position || 'N/A',
        department: req.requestData?.department || req.department || 'N/A',
        numberOfPositions: req.requestData?.numberOfPositions || 1,
        employmentType: req.requestData?.employmentType || 'Full-time',
        urgency: req.priority || 'normal',
        justification: req.requestData?.justification || req.description || '',
        requiredSkills: req.requestData?.requiredSkills ||'',
        experienceRequired: req.requestData?.experienceRequired || '',
        budgetRange: req.requestData?.budgetRange || '',
        reportingTo: req.requestData?.reportingTo || '',
        requestDate: req.createdAt?.toDate?.()?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        status: req.status,
        createdBy: req.employeeName || req.userName || currentUser?.name || 'HR'
      }));
  }, [requests, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRequest({
        requestType: 'mrf',
        title: `MRF: ${formData.position} (${formData.numberOfPositions} positions)`,
        description: formData.justification,
        priority: formData.urgency.toLowerCase(),
        requestData: {
          position: formData.position,
          department: formData.department,
          numberOfPositions: parseInt(formData.numberOfPositions),
          employmentType: formData.employmentType,
          urgency: formData.urgency,
          justification: formData.justification,
          requiredSkills: formData.requiredSkills,
          experienceRequired: formData.experienceRequired,
          budgetRange: formData.budgetRange,
          reportingTo: formData.reportingTo
        }
      });
      
      setShowForm(false);
      setFormData({
        position: '',
        department: '',
        numberOfPositions: '1',
        employmentType: 'Full-time',
        urgency: 'Normal',
        justification: '',
        requiredSkills: '',
        experienceRequired: '',
        budgetRange: '',
        reportingTo: ''
      });
      alert('MRF submitted successfully! Awaiting Super Admin approval.');
    } catch (error) {
      console.error('Error submitting MRF:', error);
      alert('Failed to submit MRF. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const pendingCount = mrfRequests.filter(r => r.status === 'pending').length;
  const approvedCount = mrfRequests.filter(r => r.status === 'approved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <FileText className="text-blue-500" size={36} />
            Manpower Requisition Form (MRF)
          </h1>
          <p className="text-gray-500 mt-1">Create and manage manpower requisition requests</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          New MRF
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{pendingCount}</p>
              <p className="text-sm text-gray-500">Pending Approval</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{approvedCount}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">
                {mrfRequests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.numberOfPositions, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Positions</p>
            </div>
          </div>
        </div>
      </div>

      {/* MRF List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">MRF Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Position</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Department</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Positions</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Type</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Urgency</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Request Date</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {mrfRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No MRF requests found. Click "New MRF" to create one.
                  </td>
                </tr>
              ) : (
                mrfRequests.map((mrf) => (
                  <tr key={mrf.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#1B254B]">{mrf.position}</p>
                      <p className="text-xs text-gray-500">{mrf.id}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{mrf.department}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-blue-600">{mrf.numberOfPositions}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{mrf.employmentType}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        mrf.urgency.toLowerCase() === 'high' || mrf.urgency.toLowerCase() === 'urgent' ? 'bg-red-100 text-red-700' :
                        mrf.urgency.toLowerCase() === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {mrf.urgency}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{mrf.requestDate}</td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(mrf.status)}`}>
                        {getStatusIcon(mrf.status)}
                        {mrf.status.charAt(0).toUpperCase() + mrf.status.slice(1)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MRF Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1B254B]">New Manpower Requisition Form</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Position Title *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Production">Production</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Number of Positions *</label>
                  <input
                    type="number"
                    value={formData.numberOfPositions}
                    onChange={(e) => setFormData({ ...formData, numberOfPositions: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type *</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Urgency *</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Experience Required</label>
                  <input
                    type="text"
                    value={formData.experienceRequired}
                    onChange={(e) => setFormData({ ...formData, experienceRequired: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="e.g., 3-5 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Budget Range</label>
                  <input
                    type="text"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="e.g., ₹8-12 LPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Reporting To</label>
                  <input
                    type="text"
                    value={formData.reportingTo}
                    onChange={(e) => setFormData({ ...formData, reportingTo: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="e.g., IT Manager"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Required Skills *</label>
                <textarea
                  value={formData.requiredSkills}
                  onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  rows={3}
                  required
                  placeholder="List required skills, qualifications, and competencies"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Justification *</label>
                <textarea
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  rows={4}
                  required
                  placeholder="Provide business justification for this requisition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Submit MRF for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
