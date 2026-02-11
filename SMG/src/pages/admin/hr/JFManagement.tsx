import { useState, useMemo } from 'react';
import { Briefcase, Plus, CheckCircle, Clock, XCircle, X, Target } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

interface JFRequest {
  id: string;
  jobTitle: string;
  department: string;
  jobType: string;
  location: string;
  salaryRange: string;
  jobDescription: string;
  keyResponsibilities: string;
  requiredQualifications: string;
  preferredQualifications: string;
  numberOfOpenings: number;
  reportingManager: string;
  urgency: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
}

export const JFManagement = () => {
  const { currentUser, requests, addRequest } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    jobType: 'Full-time',
    location: 'Noida',
    salaryRange: '',
    jobDescription: '',
    keyResponsibilities: '',
    requiredQualifications: '',
    preferredQualifications: '',
    numberOfOpenings: '1',
    reportingManager: '',
    urgency: 'Normal'
  });

  // Filter JF requests from Firebase
  const jfRequests = useMemo(() => {
    return requests
      .filter(req => req.requestType === 'jf')
      .map(req => ({
        id: req.id,
        jobTitle: req.requestData?.jobTitle || 'N/A',
        department: req.requestData?.department || req.department || 'N/A',
        jobType: req.requestData?.jobType || 'Full-time',
        location: req.requestData?.location || 'Noida',
        salaryRange: req.requestData?.salaryRange || '',
        jobDescription: req.requestData?.jobDescription || req.description || '',
        keyResponsibilities: req.requestData?.keyResponsibilities || '',
        requiredQualifications: req.requestData?.requiredQualifications || '',
        preferredQualifications: req.requestData?.preferredQualifications || '',
        numberOfOpenings: req.requestData?.numberOfOpenings || 1,
        reportingManager: req.requestData?.reportingManager || '',
        urgency: req.priority || 'normal',
        requestDate: req.createdAt?.toDate?.()?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        status: req.status,
        createdBy: req.employeeName || req.userName || currentUser?.name || 'HR'
      }));
  }, [requests, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRequest({
        requestType: 'jf',
        title: `JF: ${formData.jobTitle} - ${formData.department}`,
        description: formData.jobDescription,
        priority: formData.urgency.toLowerCase(),
        requestData: {
          jobTitle: formData.jobTitle,
          department: formData.department,
          jobType: formData.jobType,
          location: formData.location,
          salaryRange: formData.salaryRange,
          jobDescription: formData.jobDescription,
          keyResponsibilities: formData.keyResponsibilities,
          requiredQualifications: formData.requiredQualifications,
          preferredQualifications: formData.preferredQualifications,
          numberOfOpenings: parseInt(formData.numberOfOpenings),
          reportingManager: formData.reportingManager,
          urgency: formData.urgency
        }
      });
      
      setShowForm(false);
      setFormData({
        jobTitle: '',
        department: '',
        jobType: 'Full-time',
        location: 'Noida',
        salaryRange: '',
        jobDescription: '',
        keyResponsibilities: '',
        requiredQualifications: '',
        preferredQualifications: '',
        numberOfOpenings: '1',
        reportingManager: '',
        urgency: 'Normal'
      });
      alert('Job Form submitted successfully! Awaiting Super Admin approval.');
    } catch (error) {
      console.error('Error submitting JF:', error);
      alert('Failed to submit Job Form. Please try again.');
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

  const pendingCount = jfRequests.filter(r => r.status === 'pending').length;
  const approvedCount = jfRequests.filter(r => r.status === 'approved').length;
  const totalOpenings = jfRequests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.numberOfOpenings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Briefcase className="text-purple-500" size={36} />
            Job Form (JF) Management
          </h1>
          <p className="text-gray-500 mt-1">Create and manage job descriptions for approved positions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-br from-purple-600 to-purple-800 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          New Job Form
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
              <p className="text-sm text-gray-500">Approved Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{totalOpenings}</p>
              <p className="text-sm text-gray-500">Open Positions</p>
            </div>
          </div>
        </div>
      </div>

      {/* JF List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Job Forms</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Job Title</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Department</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Type</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Location</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Openings</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Salary Range</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {jfRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No job forms found. Click "New Job Form" to create one.
                  </td>
                </tr>
              ) : (
                jfRequests.map((jf) => (
                  <tr key={jf.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#1B254B]">{jf.jobTitle}</p>
                      <p className="text-xs text-gray-500">{jf.id}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{jf.department}</td>
                    <td className="py-4 px-4 text-gray-700">{jf.jobType}</td>
                    <td className="py-4 px-4 text-gray-700">{jf.location}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-purple-600">{jf.numberOfOpenings}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{jf.salaryRange || 'Not specified'}</td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(jf.status)}`}>
                        {getStatusIcon(jf.status)}
                        {jf.status.charAt(0).toUpperCase() + jf.status.slice(1)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JF Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1B254B]">New Job Form</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      required
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
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
                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Type *</label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
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
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      required
                      placeholder="e.g., Noida, Remote"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Openings *</label>
                    <input
                      type="number"
                      value={formData.numberOfOpenings}
                      onChange={(e) => setFormData({ ...formData, numberOfOpenings: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      required
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Salary Range</label>
                    <input
                      type="text"
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      placeholder="e.g., ₹6-10 LPA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Reporting Manager</label>
                    <input
                      type="text"
                      value={formData.reportingManager}
                      onChange={(e) => setFormData({ ...formData, reportingManager: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      placeholder="e.g., Head of Engineering"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Urgency *</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      required
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4">Job Description</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Description *</label>
                    <textarea
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      rows={4}
                      required
                      placeholder="Provide a comprehensive overview of the role"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Key Responsibilities *</label>
                    <textarea
                      value={formData.keyResponsibilities}
                      onChange={(e) => setFormData({ ...formData, keyResponsibilities: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      rows={4}
                      required
                      placeholder="List the main responsibilities and duties"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Required Qualifications *</label>
                    <textarea
                      value={formData.requiredQualifications}
                      onChange={(e) => setFormData({ ...formData, requiredQualifications: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      rows={3}
                      required
                      placeholder="List essential qualifications, skills, and experience"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Qualifications</label>
                    <textarea
                      value={formData.preferredQualifications}
                      onChange={(e) => setFormData({ ...formData, preferredQualifications: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      rows={3}
                      placeholder="List nice-to-have qualifications and skills"
                    />
                  </div>
                </div>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Submit Job Form for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
