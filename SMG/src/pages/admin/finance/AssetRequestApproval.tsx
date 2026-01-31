import { useState, useEffect, useMemo } from 'react';
import { Package, Search, CheckCircle, XCircle, Eye, X } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

interface AssetRequest {
  id: string;
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
  status: 'pending' | 'approved' | 'rejected';
  title?: string;
  description?: string;
  priority?: string;
  requestData?: any;
}

export const AssetRequestApproval = () => {
  const { requests = [], approveRequest, rejectRequest } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AssetRequest | null>(null);
  
  // Filter and transform Firebase requests to asset requests
  const assetRequests = useMemo(() => {
    return requests
      .filter(req => req.requestType === 'asset')
      .map(req => ({
        id: req.id,
        empName: req.employeeName || req.userName || 'N/A',
        empId: req.employeeId || 'N/A',
        dept: req.department || 'N/A',
        assetType: req.requestData?.assetType || 'N/A',
        assetName: req.requestData?.assetType || req.title || 'N/A',
        specifications: req.requestData?.specifications || req.description || 'N/A',
        quantity: req.requestData?.quantity || 1,
        urgency: req.priority || 'medium',
        purpose: req.requestData?.justification || req.requestData?.purpose || req.description || 'N/A',
        requestDate: req.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        status: req.status || 'pending',
        title: req.title,
        description: req.description,
        priority: req.priority,
        requestData: req.requestData
      }));
  }, [requests]);

  const filteredRequests = assetRequests.filter(req =>
    req.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.assetName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = assetRequests.filter(r => r.status === 'pending');
  const approvedRequests = assetRequests.filter(r => r.status === 'approved');
  const rejectedRequests = assetRequests.filter(r => r.status === 'rejected');

  const handleAction = async (action: 'approve' | 'reject') => {
    if (selectedRequest) {
      try {
        if (action === 'approve') {
          await approveRequest(selectedRequest.id);
        } else {
          await rejectRequest(selectedRequest.id, 'Rejected by Finance Admin');
        }
        setShowModal(false);
        setSelectedRequest(null);
      } catch (error) {
        console.error('Error processing request:', error);
        alert('Failed to process request. Please try again.');
      }
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    const colors = {
      high: 'bg-red-500',
      urgent: 'bg-red-500',
      medium: 'bg-orange-500',
      low: 'bg-green-500'
    };
    return colors[urgency?.toLowerCase() as keyof typeof colors] || 'bg-gray-500';
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
              <p className="text-2xl font-bold text-[#1B254B]">{assetRequests.length}</p>
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
        {pendingRequests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No pending asset requests</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.filter(r => r.status === 'pending').map((request) => (
              <div key={request.id} className="p-5 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h3 className="font-bold text-[#1B254B] text-lg">{request.empName}</h3>
                      <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">Pending</span>
                      <span className={`px-3 py-1 ${getUrgencyBadge(request.urgency)} text-white text-xs font-bold rounded-full`}>
                        {capitalizeFirst(request.urgency)} Priority
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
        )}
      </div>

      {/* Processed Requests */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Processed Requests</h2>
        {(approvedRequests.length + rejectedRequests.length) === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No processed requests yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredRequests.filter(r => r.status !== 'pending').map((request) => (
              <div key={request.id} className={`p-4 rounded-xl border-2 ${request.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#1B254B]">{request.empName} • {request.assetName}</p>
                    <p className="text-sm text-gray-500">{request.empId} • {request.assetType} • Qty: {request.quantity}</p>
                  </div>
                  <span className={`px-3 py-1 ${request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold rounded-full`}>
                    {capitalizeFirst(request.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
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
