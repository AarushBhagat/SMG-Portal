import { useState } from 'react';
import { UserCheck, Search, Eye, X, CheckCircle, XCircle, Clock, User, Briefcase } from 'lucide-react';

interface InterviewCandidate {
  id: number;
  requestId: string;
  candidateName: string;
  position: string;
  department: string;
  interviewDate: string;
  interviewTime: string;
  interviewType: string;
  interviewerName: string;
  hrContact: string;
  candidatePhone: string;
  candidateEmail: string;
  experience: string;
  expectedDuration: string;
  roomRequired: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
}

export const InterviewCandidatesApproval = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<InterviewCandidate | null>(null);

  const [requests, setRequests] = useState<InterviewCandidate[]>([
    {
      id: 1,
      requestId: 'INT-2024-001',
      candidateName: 'Rahul Verma',
      position: 'Software Engineer',
      department: 'IT Department',
      interviewDate: '2024-12-28',
      interviewTime: '10:00 AM',
      interviewType: 'Technical Round',
      interviewerName: 'Amit Patel',
      hrContact: 'Neha HR (+91 98765 11111)',
      candidatePhone: '+91 87654 32109',
      candidateEmail: 'rahul.verma@email.com',
      experience: '3 years',
      expectedDuration: '1 hour',
      roomRequired: 'Meeting Room 2',
      status: 'Pending',
      requestDate: '2024-12-26'
    },
    {
      id: 2,
      requestId: 'INT-2024-002',
      candidateName: 'Priya Sharma',
      position: 'Marketing Manager',
      department: 'Marketing',
      interviewDate: '2024-12-28',
      interviewTime: '02:00 PM',
      interviewType: 'HR Round',
      interviewerName: 'Suresh Kumar',
      hrContact: 'Anjali HR (+91 98765 22222)',
      candidatePhone: '+91 76543 21098',
      candidateEmail: 'priya.sharma@email.com',
      experience: '5 years',
      expectedDuration: '45 minutes',
      roomRequired: 'Conference Room A',
      status: 'Pending',
      requestDate: '2024-12-25'
    },
    {
      id: 3,
      requestId: 'INT-2024-003',
      candidateName: 'Vikram Singh',
      position: 'Production Supervisor',
      department: 'Production',
      interviewDate: '2024-12-27',
      interviewTime: '11:00 AM',
      interviewType: 'Final Round',
      interviewerName: 'Production Head',
      hrContact: 'HR Team (+91 98765 33333)',
      candidatePhone: '+91 65432 10987',
      candidateEmail: 'vikram.singh@email.com',
      experience: '8 years',
      expectedDuration: '1.5 hours',
      roomRequired: 'Meeting Room 1',
      status: 'Approved',
      requestDate: '2024-12-20'
    }
  ]);

  const filteredRequests = requests.filter(req =>
    req.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.requestId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const approvedRequests = requests.filter(r => r.status === 'Approved');
  const rejectedRequests = requests.filter(r => r.status === 'Rejected');

  const handleAction = (action: 'approve' | 'reject') => {
    if (selectedRequest) {
      setRequests(requests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: action === 'approve' ? 'Approved' : 'Rejected' }
          : req
      ));
      setShowModal(false);
      setSelectedRequest(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <UserCheck className="text-green-500" size={36} />
          Interview Candidates Approval
        </h1>
        <p className="text-gray-500 mt-1">Approve interview candidate visit requests from HR</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Clock className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{pendingRequests.length}</p>
              <p className="text-sm text-gray-500">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{approvedRequests.length}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{rejectedRequests.length}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <UserCheck className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{requests.length}</p>
              <p className="text-sm text-gray-500">Total Interviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by candidate name, position, or request ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <UserCheck className="text-green-500" size={24} />
          Pending Interview Requests ({pendingRequests.length})
        </h2>
        <div className="space-y-3">
          {filteredRequests.filter(r => r.status === 'Pending').map((request) => (
            <div key={request.id} className="p-5 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <h3 className="font-bold text-[#1B254B] text-lg">{request.candidateName}</h3>
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">Pending</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Request ID</p>
                      <p className="font-semibold text-[#1B254B]">{request.requestId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Position</p>
                      <p className="font-bold text-blue-600">{request.position}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Department</p>
                      <p className="font-semibold text-[#1B254B]">{request.department}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Interview Date & Time</p>
                      <p className="font-bold text-orange-600">{new Date(request.interviewDate).toLocaleDateString()} • {request.interviewTime}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Interview Type</p>
                      <p className="font-semibold text-[#1B254B]">{request.interviewType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Interviewer</p>
                      <p className="font-semibold text-[#1B254B]">{request.interviewerName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Experience</p>
                      <p className="font-semibold text-[#1B254B]">{request.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Duration</p>
                      <p className="font-semibold text-[#1B254B]">{request.expectedDuration}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedRequest(request); setShowModal(true); }}
                  className="px-4 py-2 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
                >
                  <Eye size={18} />
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processed Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Processed Requests</h2>
        <div className="space-y-2">
          {filteredRequests.filter(r => r.status !== 'Pending').map((request) => (
            <div key={request.id} className={`p-4 rounded-xl border-2 ${request.status === 'Approved' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1B254B]">{request.candidateName} • {request.position}</p>
                  <p className="text-sm text-gray-500">{request.requestId} • {request.department} • {new Date(request.interviewDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 ${request.status === 'Approved' ? 'bg-blue-500' : 'bg-red-500'} text-white text-xs font-bold rounded-full`}>
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">Review Interview Request</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Request ID', value: selectedRequest.requestId },
                  { label: 'Request Date', value: new Date(selectedRequest.requestDate).toLocaleDateString() },
                  { label: 'Candidate Name', value: selectedRequest.candidateName },
                  { label: 'Position Applied', value: selectedRequest.position },
                  { label: 'Department', value: selectedRequest.department },
                  { label: 'Experience', value: selectedRequest.experience },
                  { label: 'Interview Date', value: new Date(selectedRequest.interviewDate).toLocaleDateString() },
                  { label: 'Interview Time', value: selectedRequest.interviewTime },
                  { label: 'Interview Type', value: selectedRequest.interviewType },
                  { label: 'Expected Duration', value: selectedRequest.expectedDuration },
                  { label: 'Interviewer', value: selectedRequest.interviewerName },
                  { label: 'Room Required', value: selectedRequest.roomRequired }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-[#1B254B]">{item.value}</p>
                  </div>
                ))}
                <div className="col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-500 mb-2">Candidate Contact</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-[#1B254B]">📞 {selectedRequest.candidatePhone}</p>
                    <p className="font-semibold text-[#1B254B]">📧 {selectedRequest.candidateEmail}</p>
                  </div>
                </div>
                <div className="col-span-2 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm text-gray-500 mb-2">HR Contact</p>
                  <p className="font-semibold text-[#1B254B]">{selectedRequest.hrContact}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Approve Interview
                </button>
                <button
                  onClick={() => handleAction('reject')}
                  className="flex-1 bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  Reject Request
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
