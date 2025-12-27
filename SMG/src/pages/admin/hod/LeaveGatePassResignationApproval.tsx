import { useState } from 'react';
import { Search, Eye, Check, X, Calendar, Clock, User, FileText } from 'lucide-react';

interface Request {
  id: string;
  empId: string;
  empName: string;
  type: 'Leave' | 'Gate Pass';
  category?: string;
  reason: string;
  from: string;
  to: string;
  duration: string;
  appliedOn: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const LeaveGatePassResignationApproval = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Leave' | 'Gate Pass'>('All');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 'REQ001',
      empId: 'SMG-EMP-245',
      empName: 'Amit Sharma',
      type: 'Leave',
      category: 'Casual Leave',
      reason: 'Family function',
      from: '28 Dec 2025',
      to: '30 Dec 2025',
      duration: '3 days',
      appliedOn: '20 Dec 2025',
      status: 'Pending'
    },
    {
      id: 'REQ002',
      empId: 'SMG-EMP-189',
      empName: 'Priya Singh',
      type: 'Gate Pass',
      reason: 'Medical appointment',
      from: '26 Dec 2025 2:00 PM',
      to: '26 Dec 2025 4:30 PM',
      duration: '2.5 hours',
      appliedOn: '26 Dec 2025',
      status: 'Pending'
    },
    {
      id: 'REQ003',
      empId: 'SMG-EMP-312',
      empName: 'Rahul Verma',
      type: 'Leave',
      category: 'Medical Leave',
      reason: 'Health checkup',
      from: '2 Jan 2026',
      to: '3 Jan 2026',
      duration: '2 days',
      appliedOn: '25 Dec 2025',
      status: 'Approved'
    }
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Approved' as const } : req
    ));
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Rejected' as const } : req
    ));
    setSelectedRequest(null);
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.empName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         req.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || req.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leave & Gate Pass Approval</h1>
            <p className="text-white/80">HOD level approval before Time Office final approval</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
            <div className="text-4xl font-bold">{pendingCount}</div>
            <div className="text-sm text-white/80">Pending</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Leave', 'Gate Pass'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  filterType === type
                    ? 'bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="w-28 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Request ID</th>
                <th className="w-40 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="w-40 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="w-48 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Duration</th>
                <th className="w-32 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Applied On</th>
                <th className="w-28 px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="w-32 px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm font-bold text-blue-600 block truncate">{request.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold text-[#1B254B] text-sm truncate">{request.empName}</p>
                      <p className="text-xs text-gray-500 truncate">{request.empId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold w-fit ${
                        request.type === 'Leave' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {request.type}
                      </span>
                      {request.category && (
                        <span className="text-xs text-gray-600 font-medium truncate">{request.category}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-[#1B254B]">{request.duration}</p>
                    <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                      <p className="truncate">From: {request.from}</p>
                      <p className="truncate">To: {request.to}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 block truncate">{request.appliedOn}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold inline-block ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      request.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shrink-0"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shrink-0"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">{selectedRequest.type} Request Details</h2>
                  <p className="text-white/80 text-sm">Request ID: {selectedRequest.id}</p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <User className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Employee Details</p>
                      <p className="font-bold text-[#1B254B]">{selectedRequest.empName}</p>
                      <p className="text-sm text-gray-600">{selectedRequest.empId}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">From</p>
                      <p className="font-bold text-[#1B254B]">{selectedRequest.from}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">To</p>
                      <p className="font-bold text-[#1B254B]">{selectedRequest.to}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Duration</p>
                      <p className="font-bold text-[#1B254B]">{selectedRequest.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Type</p>
                      <p className="font-bold text-[#1B254B]">{selectedRequest.type} {selectedRequest.category && `- ${selectedRequest.category}`}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Reason</p>
                      <p className="font-bold text-[#1B254B]">{selectedRequest.reason}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedRequest.status === 'Pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
