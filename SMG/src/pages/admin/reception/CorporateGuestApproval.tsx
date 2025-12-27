import { useState } from 'react';
import { Briefcase, Search, Eye, X, CheckCircle, XCircle, Clock, User, Building } from 'lucide-react';

interface CorporateGuest {
  id: number;
  requestId: string;
  guestName: string;
  company: string;
  designation: string;
  visitDate: string;
  visitTime: string;
  purpose: string;
  requestedBy: string;
  requestingDept: string;
  hodName: string;
  numberOfGuests: number;
  duration: string;
  specialRequirements: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
}

export const CorporateGuestApproval = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CorporateGuest | null>(null);

  const [requests, setRequests] = useState<CorporateGuest[]>([
    {
      id: 1,
      requestId: 'CG-2024-001',
      guestName: 'Mr. Arvind Patel',
      company: 'ABC Industries Ltd',
      designation: 'Business Development Manager',
      visitDate: '2024-12-28',
      visitTime: '02:00 PM',
      purpose: 'Business Partnership Discussion',
      requestedBy: 'Rajesh Kumar',
      requestingDept: 'Sales',
      hodName: 'Suresh Sharma',
      numberOfGuests: 3,
      duration: '2 hours',
      specialRequirements: 'Conference room with projector',
      status: 'Pending',
      requestDate: '2024-12-26'
    },
    {
      id: 2,
      requestId: 'CG-2024-002',
      guestName: 'Ms. Priya Verma',
      company: 'Tech Solutions Pvt Ltd',
      designation: 'CEO',
      visitDate: '2024-12-29',
      visitTime: '11:00 AM',
      purpose: 'Strategic Alliance Meeting',
      requestedBy: 'Amit Singh',
      requestingDept: 'Management',
      hodName: 'Director Office',
      numberOfGuests: 5,
      duration: '3 hours',
      specialRequirements: 'VIP lounge access, refreshments',
      status: 'Pending',
      requestDate: '2024-12-25'
    },
    {
      id: 3,
      requestId: 'CG-2024-003',
      guestName: 'Mr. Vikram Mehta',
      company: 'Marketing Corp',
      designation: 'Marketing Head',
      visitDate: '2024-12-24',
      visitTime: '10:00 AM',
      purpose: 'Marketing Campaign Review',
      requestedBy: 'Neha Gupta',
      requestingDept: 'Marketing',
      hodName: 'Rahul Sharma',
      numberOfGuests: 2,
      duration: '1.5 hours',
      specialRequirements: 'None',
      status: 'Approved',
      requestDate: '2024-12-20'
    }
  ]);

  const filteredRequests = requests.filter(req =>
    req.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          <Briefcase className="text-purple-500" size={36} />
          Corporate Guest Approval
        </h1>
        <p className="text-gray-500 mt-1">Approve guest requests from departments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{pendingRequests.length}</p>
              <p className="text-sm text-gray-500">Pending Requests</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-500" size={24} />
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
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Briefcase className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{requests.length}</p>
              <p className="text-sm text-gray-500">Total Requests</p>
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
            placeholder="Search by guest name, company, or request ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <Clock className="text-purple-500" size={24} />
          Pending Corporate Guest Requests ({pendingRequests.length})
        </h2>
        <div className="space-y-3">
          {filteredRequests.filter(r => r.status === 'Pending').map((request) => (
            <div key={request.id} className="p-5 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <h3 className="font-bold text-[#1B254B] text-lg">{request.guestName}</h3>
                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">Pending</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Request ID</p>
                      <p className="font-semibold text-[#1B254B]">{request.requestId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Company</p>
                      <p className="font-semibold text-[#1B254B]">{request.company}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Designation</p>
                      <p className="font-semibold text-[#1B254B]">{request.designation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Visit Date & Time</p>
                      <p className="font-bold text-blue-600">{new Date(request.visitDate).toLocaleDateString()} • {request.visitTime}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Requested By</p>
                      <p className="font-semibold text-[#1B254B]">{request.requestedBy} ({request.requestingDept})</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">HOD</p>
                      <p className="font-semibold text-[#1B254B]">{request.hodName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Number of Guests</p>
                      <p className="font-semibold text-[#1B254B]">{request.numberOfGuests} Guests</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Duration</p>
                      <p className="font-semibold text-[#1B254B]">{request.duration}</p>
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
            <div key={request.id} className={`p-4 rounded-xl border-2 ${request.status === 'Approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1B254B]">{request.guestName} • {request.company}</p>
                  <p className="text-sm text-gray-500">{request.requestId} • {request.requestingDept} • {new Date(request.visitDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 ${request.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold rounded-full`}>
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
                <h2 className="text-2xl font-bold text-[#1B254B]">Review Corporate Guest Request</h2>
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
                  { label: 'Guest Name', value: selectedRequest.guestName },
                  { label: 'Company', value: selectedRequest.company },
                  { label: 'Designation', value: selectedRequest.designation },
                  { label: 'Number of Guests', value: `${selectedRequest.numberOfGuests} Guests` },
                  { label: 'Visit Date', value: new Date(selectedRequest.visitDate).toLocaleDateString() },
                  { label: 'Visit Time', value: selectedRequest.visitTime },
                  { label: 'Duration', value: selectedRequest.duration },
                  { label: 'Requested By', value: selectedRequest.requestedBy },
                  { label: 'Department', value: selectedRequest.requestingDept },
                  { label: 'HOD/Manager', value: selectedRequest.hodName }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-[#1B254B]">{item.value}</p>
                  </div>
                ))}
                <div className="col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-500 mb-2">Purpose of Visit</p>
                  <p className="font-semibold text-[#1B254B]">{selectedRequest.purpose}</p>
                </div>
                <div className="col-span-2 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-sm text-gray-500 mb-2">Special Requirements</p>
                  <p className="font-semibold text-[#1B254B]">{selectedRequest.specialRequirements}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Approve Request
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
