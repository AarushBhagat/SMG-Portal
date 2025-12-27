import { useState } from 'react';
import { Bus, Search, CheckCircle, XCircle, Eye } from 'lucide-react';

interface BusRequest {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  route: string;
  pickupPoint: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const BusFacilityApproval = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<BusRequest[]>([
    {
      id: 1,
      empName: 'Amit Kumar',
      empId: 'SMG-2024-042',
      dept: 'Assembly',
      route: 'Route A - Sector 62',
      pickupPoint: 'Metro Station Gate 1',
      requestDate: '2024-12-26 09:30 AM',
      status: 'Pending'
    },
    {
      id: 2,
      empName: 'Priya Sharma',
      empId: 'SMG-2024-089',
      dept: 'HR',
      route: 'Route B - Noida City Center',
      pickupPoint: 'Botanical Garden Metro',
      requestDate: '2024-12-26 10:15 AM',
      status: 'Pending'
    },
    {
      id: 3,
      empName: 'Rajesh Patel',
      empId: 'SMG-2024-123',
      dept: 'Finance',
      route: 'Route C - Greater Noida',
      pickupPoint: 'Pari Chowk',
      requestDate: '2024-12-25 02:00 PM',
      status: 'Approved'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<BusRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAction = (action: 'approve' | 'reject') => {
    if (selectedRequest) {
      const updated = requests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: action === 'approve' ? 'Approved' as const : 'Rejected' as const }
          : req
      );
      setRequests(updated);
      setShowModal(false);
      setSelectedRequest(null);
    }
  };

  const filteredRequests = requests.filter(req =>
    req.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = filteredRequests.filter(r => r.status === 'Pending');
  const processedRequests = filteredRequests.filter(r => r.status !== 'Pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Bus className="text-blue-500" size={36} />
          Bus Facility Pass Approval
        </h1>
        <p className="text-gray-500 mt-1">Review and approve bus pass requests from employees</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Bus className="text-orange-500" size={24} />
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
              <p className="text-2xl font-bold text-[#1B254B]">{requests.filter(r => r.status === 'Approved').length}</p>
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
              <p className="text-2xl font-bold text-[#1B254B]">{requests.filter(r => r.status === 'Rejected').length}</p>
              <p className="text-sm text-gray-500">Rejected</p>
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
            placeholder="Search by employee name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Pending Approvals</h2>
        <div className="space-y-3">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <div key={request.id} className="p-5 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="font-bold text-[#1B254B] text-lg">{request.empName}</h3>
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap">Pending</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Employee ID</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.empId}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Department</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.dept}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Route</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.route}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Pickup Point</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.pickupPoint}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedRequest(request); setShowModal(true); }}
                    className="ml-4 px-4 py-2 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
                  >
                    <Eye size={18} />
                    Review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Bus size={64} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-semibold text-gray-500">No pending requests</p>
            </div>
          )}
        </div>
      </div>

      {/* Processed Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {processedRequests.slice(0, 5).map((request) => (
            <div key={request.id} className={`p-4 rounded-xl border-2 ${request.status === 'Approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1B254B]">{request.empName}</p>
                  <p className="text-sm text-gray-500">{request.empId} • {request.route}</p>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#1B254B]">Review Bus Pass Request</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Employee Name', value: selectedRequest.empName },
                  { label: 'Employee ID', value: selectedRequest.empId },
                  { label: 'Department', value: selectedRequest.dept },
                  { label: 'Request Date', value: selectedRequest.requestDate },
                  { label: 'Bus Route', value: selectedRequest.route },
                  { label: 'Pickup Point', value: selectedRequest.pickupPoint }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-[#1B254B]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
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
