import { useState } from 'react';
import { UserCheck, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

interface GuestRequest {
  id: number;
  empName: string;
  empId: string;
  guestName: string;
  guestContact: string;
  quantity: number;
  visitDate: string;
  purpose: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const ApproveGuestCoupons = () => {
  const [requests, setRequests] = useState<GuestRequest[]>([
    {
      id: 1,
      empName: 'Vikram Singh',
      empId: 'SMG-2024-189',
      guestName: 'John Anderson',
      guestContact: '+91 98765 12345',
      quantity: 3,
      visitDate: '2024-12-28',
      purpose: 'Business Meeting',
      requestDate: '2024-12-26 10:30 AM',
      status: 'Pending'
    },
    {
      id: 2,
      empName: 'Anita Desai',
      empId: 'SMG-2024-145',
      guestName: 'Sarah Williams',
      guestContact: '+91 98765 67890',
      quantity: 2,
      visitDate: '2024-12-28',
      purpose: 'Client Visit',
      requestDate: '2024-12-26 11:15 AM',
      status: 'Pending'
    },
    {
      id: 3,
      empName: 'Rahul Mehta',
      empId: 'SMG-2024-098',
      guestName: 'Mike Johnson',
      guestContact: '+91 98765 11111',
      quantity: 1,
      visitDate: '2024-12-29',
      purpose: 'Interview',
      requestDate: '2024-12-26 02:45 PM',
      status: 'Pending'
    },
    {
      id: 4,
      empName: 'Priya Sharma',
      empId: 'SMG-2024-089',
      guestName: 'David Lee',
      guestContact: '+91 98765 22222',
      quantity: 2,
      visitDate: '2024-12-27',
      purpose: 'Vendor Meeting',
      requestDate: '2024-12-25 04:00 PM',
      status: 'Approved'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<GuestRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [remarks, setRemarks] = useState('');

  const handleViewDetails = (request: GuestRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
    setRemarks('');
  };

  const handleAction = (type: 'approve' | 'reject') => {
    if (selectedRequest) {
      const updatedRequests = requests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: type === 'approve' ? 'Approved' : 'Rejected' as 'Approved' | 'Rejected' }
          : req
      );
      setRequests(updatedRequests);
      setShowModal(false);
      setSelectedRequest(null);
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const processedRequests = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <UserCheck className="text-orange-500" size={36} />
          Guest Coupon Requests
        </h1>
        <p className="text-gray-500 mt-1">Review and approve guest coupon requests from employees</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="text-orange-500" size={24} />
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

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <Clock className="text-orange-500" size={24} />
          Pending Requests ({pendingRequests.length})
        </h2>
        <div className="space-y-3">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <div key={request.id} className="p-5 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="font-bold text-[#1B254B] text-lg">{request.guestName}</h3>
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap">Pending</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Requested By</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.empName}</p>
                        <p className="text-xs text-gray-500">{request.empId}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Visit Date</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{new Date(request.visitDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Quantity</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.quantity} coupons</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Purpose</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.purpose}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDetails(request)}
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
              <Clock size={64} className="mx-auto mb-4 opacity-20" />
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
                  <p className="font-semibold text-[#1B254B]">{request.guestName}</p>
                  <p className="text-sm text-gray-500">Requested by {request.empName} • {request.quantity} coupons</p>
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#1B254B]">Review Guest Coupon Request</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Guest Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Guest Name</p>
                  <p className="font-bold text-[#1B254B]">{selectedRequest.guestName}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Contact</p>
                  <p className="font-bold text-[#1B254B]">{selectedRequest.guestContact}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Requested By</p>
                  <p className="font-bold text-[#1B254B]">{selectedRequest.empName}</p>
                  <p className="text-sm text-gray-500">{selectedRequest.empId}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Visit Date</p>
                  <p className="font-bold text-[#1B254B]">{new Date(selectedRequest.visitDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-500 mb-1">Coupons Requested</p>
                  <p className="text-2xl font-bold text-[#0B4DA2]">{selectedRequest.quantity}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Purpose</p>
                  <p className="font-bold text-[#1B254B]">{selectedRequest.purpose}</p>
                </div>
              </div>

              {/* Request Date */}
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-gray-600">Request submitted on: <span className="font-semibold text-[#1B254B]">{selectedRequest.requestDate}</span></p>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Remarks (Optional)
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add any notes or comments..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
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
