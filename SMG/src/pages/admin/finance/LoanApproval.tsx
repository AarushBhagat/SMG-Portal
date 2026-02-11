import { useState, useMemo } from 'react';
import { TrendingUp, Search, CheckCircle, XCircle, Eye, X } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';

interface LoanRequest {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  loanType: string;
  amount: number;
  purpose: string;
  requestDate: string;
  tenure: number;
  monthlyEMI: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const LoanApproval = () => {
  const { requests: allRequests, approveRequest, rejectRequest } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LoanRequest | null>(null);
  
  // Filter and transform loan requests from Firebase
  const requests = useMemo(() => {
    return allRequests
      .filter(req => req.requestType === 'loan')
      .map(req => ({
        id: req.id,
        empName: req.employeeName || req.userName || 'N/A',
        empId: req.employeeId || 'N/A',
        dept: req.department || 'N/A',
        loanType: req.requestData?.loanType || 'Personal Loan',
        amount: req.requestData?.amount || 0,
        purpose: req.requestData?.purpose || req.description || 'N/A',
        requestDate: req.createdAt?.toDate?.()?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        tenure: req.requestData?.tenure || 0,
        monthlyEMI: req.requestData?.emi || 0,
        status: req.status === 'approved' ? 'Approved' : req.status === 'rejected' ? 'Rejected' : 'Pending'
      }));
  }, [allRequests]);

  const filteredRequests = requests.filter(req =>
    req.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const approvedRequests = requests.filter(r => r.status === 'Approved');
  const totalLoanAmount = requests.filter(r => r.status === 'Approved').reduce((sum, r) => sum + r.amount, 0);

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
        console.error('Error processing loan request:', error);
        alert('Failed to process request. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <TrendingUp className="text-orange-500" size={36} />
          Loan Approval Management
        </h1>
        <p className="text-gray-500 mt-1">Review and approve employee loan requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-orange-500" size={24} />
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
              <p className="text-2xl font-bold text-[#1B254B]">{requests.filter(r => r.status === 'Rejected').length}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">₹{(totalLoanAmount / 100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-500">Total Approved</p>
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
        <h2 className="text-xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <TrendingUp className="text-orange-500" size={24} />
          Pending Loan Requests ({pendingRequests.length})
        </h2>
        <div className="space-y-3">
          {filteredRequests.filter(r => r.status === 'Pending').map((request) => (
            <div key={request.id} className="p-5 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <h3 className="font-bold text-[#1B254B] text-lg">{request.empName}</h3>
                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">Pending</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Employee ID</p>
                      <p className="font-semibold text-[#1B254B]">{request.empId} • {request.dept}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Loan Type</p>
                      <p className="font-semibold text-[#1B254B]">{request.loanType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Amount</p>
                      <p className="text-xl font-bold text-blue-600">₹{request.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Monthly EMI</p>
                      <p className="font-bold text-orange-600">₹{request.monthlyEMI.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">Tenure</p>
                      <p className="font-semibold text-[#1B254B]">{request.tenure} months</p>
                    </div>
                    <div>
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
                  <p className="font-semibold text-[#1B254B]">{request.empName} • {request.loanType}</p>
                  <p className="text-sm text-gray-500">{request.empId} • ₹{request.amount.toLocaleString()}</p>
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
                <h2 className="text-2xl font-bold text-[#1B254B]">Review Loan Request</h2>
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
                  { label: 'Loan Type', value: selectedRequest.loanType },
                  { label: 'Request Date', value: new Date(selectedRequest.requestDate).toLocaleDateString() },
                  { label: 'Purpose', value: selectedRequest.purpose },
                  { label: 'Tenure', value: `${selectedRequest.tenure} months` }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-[#1B254B]">{item.value}</p>
                  </div>
                ))}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-gray-500 mb-1">Loan Amount</p>
                  <p className="text-3xl font-bold text-blue-600">₹{selectedRequest.amount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
                  <p className="text-3xl font-bold text-orange-600">₹{selectedRequest.monthlyEMI.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Approve Loan
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
