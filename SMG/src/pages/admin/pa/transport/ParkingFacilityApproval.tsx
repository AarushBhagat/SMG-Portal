import { useState } from 'react';
import { Car, Search, CheckCircle, XCircle, Eye } from 'lucide-react';

interface ParkingRequest {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  vehicleType: string;
  vehicleNumber: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const ParkingFacilityApproval = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<ParkingRequest[]>([
    {
      id: 1,
      empName: 'Vikram Singh',
      empId: 'SMG-2024-189',
      dept: 'Production',
      vehicleType: 'Car',
      vehicleNumber: 'UP16 AB 1234',
      requestDate: '2024-12-26 11:00 AM',
      status: 'Pending'
    },
    {
      id: 2,
      empName: 'Anita Desai',
      empId: 'SMG-2024-145',
      dept: 'Marketing',
      vehicleType: 'Motorcycle',
      vehicleNumber: 'UP16 XY 5678',
      requestDate: '2024-12-26 12:30 PM',
      status: 'Pending'
    },
    {
      id: 3,
      empName: 'Rahul Mehta',
      empId: 'SMG-2024-098',
      dept: 'IT',
      vehicleType: 'Car',
      vehicleNumber: 'DL10 CD 9012',
      requestDate: '2024-12-25 03:15 PM',
      status: 'Approved'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<ParkingRequest | null>(null);
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
    req.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = filteredRequests.filter(r => r.status === 'Pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Car className="text-purple-500" size={36} />
          Parking Facility Approval
        </h1>
        <p className="text-gray-500 mt-1">Issue new parking stickers to employees</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Car className="text-purple-500" size={24} />
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
              <p className="text-sm text-gray-500">Stickers Issued</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Car className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">145</p>
              <p className="text-sm text-gray-500">Active Permits</p>
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
            placeholder="Search by name, ID, or vehicle number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Parking Sticker Requests</h2>
        <div className="space-y-3">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <div key={request.id} className="p-5 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="font-bold text-[#1B254B] text-lg">{request.empName}</h3>
                      <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full whitespace-nowrap">Pending</span>
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
                        <p className="text-xs font-semibold text-gray-500 mb-1">Vehicle Type</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.vehicleType}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Vehicle Number</p>
                        <p className="font-semibold text-[#1B254B] text-sm">{request.vehicleNumber}</p>
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
              <Car size={64} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-semibold text-gray-500">No pending requests</p>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#1B254B]">Review Parking Request</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Employee Name', value: selectedRequest.empName },
                  { label: 'Employee ID', value: selectedRequest.empId },
                  { label: 'Department', value: selectedRequest.dept },
                  { label: 'Vehicle Type', value: selectedRequest.vehicleType },
                  { label: 'Vehicle Number', value: selectedRequest.vehicleNumber },
                  { label: 'Request Date', value: selectedRequest.requestDate }
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
                  Issue Sticker
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
