import { useState, useMemo } from 'react';
import { Users, Plus, Calendar, Clock, CheckCircle, XCircle, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

interface InterviewRequest {
  id: string;
  candidateName: string;
  position: string;
  department: string;
  interviewDate: string;
  interviewTime: string;
  interviewType: string;
  interviewMode: string;
  interviewers: string;
  location: string;
  contactNumber: string;
  email: string;
  resumeLink: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  createdBy: string;
}

export const InterviewManagement = () => {
  const { currentUser, requests, addRequest } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    position: '',
    department: '',
    interviewDate: '',
    interviewTime: '',
    interviewType: 'Technical',
    interviewMode: 'In-person',
    interviewers: '',
    location: '',
    contactNumber: '',
    email: '',
    resumeLink: '',
    notes: ''
  });

  // Filter interview requests from Firebase
  const interviewRequests = useMemo(() => {
    return requests
      .filter(req => req.requestType === 'interview')
      .map(req => ({
        id: req.id,
        candidateName: req.requestData?.candidateName || 'N/A',
        position: req.requestData?.position || req.title || 'N/A',
        department: req.requestData?.department || req.department || 'N/A',
        interviewDate: req.requestData?.interviewDate || '',
        interviewTime: req.requestData?.interviewTime || '',
        interviewType: req.requestData?.interviewType || 'Technical',
        interviewMode: req.requestData?.interviewMode || 'In-person',
        interviewers: req.requestData?.interviewers || '',
        location: req.requestData?.location || '',
        contactNumber: req.requestData?.contactNumber || '',
        email: req.requestData?.email || '',
        resumeLink: req.requestData?.resumeLink || '',
        notes: req.requestData?.notes || req.description || '',
        status: req.status,
        createdBy: req.employeeName || req.userName || currentUser?.name || 'HR'
      }));
  }, [requests, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRequest({
        requestType: 'interview',
        title: `Interview: ${formData.candidateName} - ${formData.position}`,
        description: formData.notes || `Interview scheduled for ${formData.candidateName}`,
        priority: 'normal',
        requestData: {
          candidateName: formData.candidateName,
          position: formData.position,
          department: formData.department,
          interviewDate: formData.interviewDate,
          interviewTime: formData.interviewTime,
          interviewType: formData.interviewType,
          interviewMode: formData.interviewMode,
          interviewers: formData.interviewers,
          location: formData.location,
          contactNumber: formData.contactNumber,
          email: formData.email,
          resumeLink: formData.resumeLink,
          notes: formData.notes
        }
      });
      
      setShowForm(false);
      setFormData({
        candidateName: '',
        position: '',
        department: '',
        interviewDate: '',
        interviewTime: '',
        interviewType: 'Technical',
        interviewMode: 'In-person',
        interviewers: '',
        location: '',
        contactNumber: '',
        email: '',
        resumeLink: '',
        notes: ''
      });
      alert('Interview scheduled and forwarded to Reception!');
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Failed to schedule interview. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      cancelled: 'bg-gray-100 text-gray-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'rejected':
      case 'cancelled': return <XCircle size={16} />;
      case 'approved': return <ArrowRight size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const todayInterviews = interviewRequests.filter(i => i.interviewDate === new Date().toISOString().split('T')[0]).length;
  const upcomingInterviews = interviewRequests.filter(i => new Date(i.interviewDate) > new Date()).length;
  const completedInterviews = interviewRequests.filter(i => i.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Users className="text-indigo-500" size={36} />
            Interview Sheet Management
          </h1>
          <p className="text-gray-500 mt-1">Schedule interviews and coordinate with reception</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Schedule Interview
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{todayInterviews}</p>
              <p className="text-sm text-gray-500">Today's Interviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{upcomingInterviews}</p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{completedInterviews}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interview List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Scheduled Interviews</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Candidate</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Position</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Date & Time</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Type</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Mode</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Interviewers</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {interviewRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No interviews scheduled. Click "Schedule Interview" to create one.
                  </td>
                </tr>
              ) : (
                interviewRequests.map((interview) => (
                  <tr key={interview.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#1B254B]">{interview.candidateName}</p>
                      <p className="text-xs text-gray-500">{interview.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-700">{interview.position}</p>
                      <p className="text-xs text-gray-500">{interview.department}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-700">{interview.interviewDate}</p>
                      <p className="text-xs text-gray-500">{interview.interviewTime}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                        {interview.interviewType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{interview.interviewMode}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{interview.interviewers || 'Not assigned'}</td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(interview.status)}`}>
                        {getStatusIcon(interview.status)}
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interview Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1B254B]">Schedule Interview</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Candidate Information */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4">Candidate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Candidate Name *</label>
                    <input
                      type="text"
                      value={formData.candidateName}
                      onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                      placeholder="Enter candidate name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                      placeholder="candidate@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number *</label>
                    <input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Resume Link</label>
                    <input
                      type="url"
                      value={formData.resumeLink}
                      onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Position Details */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4">Position Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Position *</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                      placeholder="e.g., Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
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
                </div>
              </div>

              {/* Interview Details */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4">Interview Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Interview Date *</label>
                    <input
                      type="date"
                      value={formData.interviewDate}
                      onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Interview Time *</label>
                    <input
                      type="time"
                      value={formData.interviewTime}
                      onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Interview Type *</label>
                    <select
                      value={formData.interviewType}
                      onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                    >
                      <option value="Technical">Technical</option>
                      <option value="HR">HR</option>
                      <option value="Managerial">Managerial</option>
                      <option value="Final">Final Round</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Interview Mode *</label>
                    <select
                      value={formData.interviewMode}
                      onChange={(e) => setFormData({ ...formData, interviewMode: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      required
                    >
                      <option value="In-person">In-person</option>
                      <option value="Video Call">Video Call</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      placeholder="Conference Room / Meeting Link"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Interviewers</label>
                    <input
                      type="text"
                      value={formData.interviewers}
                      onChange={(e) => setFormData({ ...formData, interviewers: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      placeholder="e.g., John Doe, Jane Smith"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                  rows={3}
                  placeholder="Any additional notes or special instructions"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
