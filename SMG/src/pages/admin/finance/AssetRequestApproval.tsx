import { useState } from 'react';
import { Package, Search, CheckCircle, XCircle, Eye, X } from 'lucide-react';

interface AssetRequest {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  assetType: string;
  assetName: string;
  specifications: string;
  quantity: number;
  urgency: string;
  purpose: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const AssetRequestApproval = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AssetRequest | null>(null);
  
  const [requests, setRequests] = useState<AssetRequest[]>([
    {
      id: 1,
      empName: 'Rahul Kumar',
      empId: 'SMG-2024-189',
      dept: 'IT',
      assetType: 'Laptop',
      assetName: 'Dell Latitude 5420',
      specifications: 'i7 11th Gen, 16GB RAM, 512GB SSD',
      quantity: 1,
      urgency: 'High',
      purpose: 'Development Work',
      requestDate: '2024-12-20',
      status: 'Pending'
    },
    {
      id: 2,
      empName: 'Priya Sharma',
      empId: 'SMG-2024-245',
      dept: 'Sales',
      assetType: 'Mobile Phone',
      assetName: 'iPhone 14',
      specifications: '128GB, 5G',
      quantity: 1,
      urgency: 'Medium',
      purpose: 'Client Communication',
      requestDate: '2024-12-22',
      status: 'Pending'
    },
    {
      id: 3,
      empName: 'Amit Patel',
      empId: 'SMG-2024-167',
      dept: 'Production',
      assetType: 'Tools',
      assetName: 'Precision Measuring Kit',
      specifications: 'Digital Vernier Caliper, Micrometer Set',
      quantity: 2,
      urgency: 'High',
      purpose: 'Quality Control',
      requestDate: '2024-12-18',
      status: 'Approved'
    },
    {
      id: 4,
      empName: 'Neha Singh',
      empId: 'SMG-2024-201',
      dept: 'Marketing',
      assetType: 'Camera',
      assetName: 'Canon EOS 90D',
      specifications: '32.5MP, 4K Video',
      quantity: 1,
      urgency: 'Low',
      purpose: 'Product Photography',
      requestDate: '2024-12-15',
      status: 'Rejected'
    }
  ]);

  const filteredRequests = requests.filter(req =>
    req.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.assetName.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getUrgencyBadge = (urgency: string) => {
    const colors = {
      High: 'bg-red-500',
      Medium: 'bg-orange-500',
      Low: 'bg-green-500'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Package className="text-purple-500" size={36} />
          Asset Request Approval
        </h1>
        <p className="text-gray-500 mt-1">Review and approve employee asset requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="text-purple-500" size={24} />
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
              <Package className="text-blue-500" size={24} />
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
            placeholder="Search by employee name, ID, or asset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <Package className="text-purple-500" size={24} />
          Pending Asset Requests ({pendingRequests.length})
        </h2>
        <div className="space-y-3">
          {filteredRequests.filter(r => r.status === 'Pending').map((request) => (
            <div key={request.id} className="p-5 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <h3 className="font-bold text-[#1B254B] text-lg">{request.empName}</h3>
                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">Pending</span>
                    <span className={`px-3 py-1 ${getUrgencyBadge(request.urgency)} text-white text-xs font-bold rounded-full`}>
                      {request.urgency} Priority
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Employee ID</p>
                      <p className="font-semibold text-[#1B254B]">{request.empId} • {request.dept}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Asset Type</p>
                      <p className="font-semibold text-[#1B254B]">{request.assetType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Asset Name</p>
                      <p className="font-bold text-purple-600">{request.assetName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Quantity</p>
                      <p className="font-semibold text-[#1B254B]">{request.quantity} Unit(s)</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-semibold text-gray-500">Specifications</p>
                      <p className="font-semibold text-[#1B254B]">{request.specifications}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-semibold text-gray-500">Purpose</p>
                      <p className="font-semibold text-[#1B254B]">{request.purpose}</p>
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
                  <p className="font-semibold text-[#1B254B]">{request.empName} • {request.assetName}</p>
                  <p className="text-sm text-gray-500">{request.empId} • {request.assetType} • Qty: {request.quantity}</p>
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">Review Asset Request</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Employee Name', value: selectedRequest.empName },
                  { label: 'Employee ID', value: `${selectedRequest.empId} • ${selectedRequest.dept}` },
                  { label: 'Asset Type', value: selectedRequest.assetType },
                  { label: 'Request Date', value: new Date(selectedRequest.requestDate).toLocaleDateString() },
                  { label: 'Quantity', value: `${selectedRequest.quantity} Unit(s)` },
                  { label: 'Urgency', value: selectedRequest.urgency }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-[#1B254B]">{item.value}</p>
                  </div>
                ))}
                <div className="col-span-2 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-500 mb-1">Asset Name</p>
                  <p className="text-2xl font-bold text-purple-600">{selectedRequest.assetName}</p>
                </div>
                <div className="col-span-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-500 mb-2">Specifications</p>
                  <p className="font-semibold text-[#1B254B]">{selectedRequest.specifications}</p>
                </div>
                <div className="col-span-2 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-sm text-gray-500 mb-2">Purpose</p>
                  <p className="font-semibold text-[#1B254B]">{selectedRequest.purpose}</p>
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
