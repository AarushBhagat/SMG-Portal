import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter,
  CheckCircle, 
  XCircle, 
  Eye,
  Calendar,
  Clock,
  User,
  Building2,
  AlertCircle,
  X
} from 'lucide-react';

interface Request {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  type: string;
  title: string;
  description: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  attachments?: string[];
}

export const AllRequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 'REQ-001',
      employeeName: 'Rohit Sharma',
      employeeId: 'EMP1001',
      department: 'Assembly',
      type: 'Leave',
      title: 'Annual Leave Request',
      description: 'Request for 5 days annual leave from Jan 10-14, 2025 for family vacation.',
      submittedDate: '2024-12-27',
      status: 'pending',
      priority: 'medium',
      attachments: ['leave-form.pdf']
    },
    {
      id: 'REQ-002',
      employeeName: 'Priya Singh',
      employeeId: 'EMP1002',
      department: 'HR',
      type: 'Document',
      title: 'Educational Certificate Verification',
      description: 'Need verification of MBA degree certificate for promotion review.',
      submittedDate: '2024-12-26',
      status: 'pending',
      priority: 'high',
      attachments: ['certificate.pdf', 'marksheet.pdf']
    },
    {
      id: 'REQ-003',
      employeeName: 'Amit Patel',
      employeeId: 'EMP1003',
      department: 'Quality',
      type: 'Asset',
      title: 'Laptop Replacement Request',
      description: 'Current laptop is 5 years old and experiencing frequent crashes. Requesting new laptop for quality testing work.',
      submittedDate: '2024-12-25',
      status: 'approved',
      priority: 'high'
    },
    {
      id: 'REQ-004',
      employeeName: 'Sneha Reddy',
      employeeId: 'EMP1004',
      department: 'Technology',
      type: 'Training',
      title: 'Cloud Computing Certification',
      description: 'Request to attend AWS certification training program in January 2025.',
      submittedDate: '2024-12-24',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'REQ-005',
      employeeName: 'Vikram Kumar',
      employeeId: 'EMP1005',
      department: 'Finance',
      type: 'Reimbursement',
      title: 'Travel Expense Reimbursement',
      description: 'Reimbursement for client meeting travel to Mumbai on Dec 20, 2024. Total amount: ₹12,500.',
      submittedDate: '2024-12-23',
      status: 'approved',
      priority: 'medium',
      attachments: ['receipts.pdf', 'invoice.pdf']
    },
    {
      id: 'REQ-006',
      employeeName: 'Anjali Gupta',
      employeeId: 'EMP1006',
      department: 'Marketing',
      type: 'Leave',
      title: 'Sick Leave',
      description: 'Sick leave request for 2 days due to viral fever. Medical certificate attached.',
      submittedDate: '2024-12-22',
      status: 'rejected',
      priority: 'high',
      attachments: ['medical-certificate.pdf']
    },
    {
      id: 'REQ-007',
      employeeName: 'Karthik Nair',
      employeeId: 'EMP1007',
      department: 'Time Office',
      type: 'Overtime',
      title: 'Overtime Approval Request',
      description: 'Request approval for 10 hours overtime worked during month-end processing.',
      submittedDate: '2024-12-21',
      status: 'pending',
      priority: 'low'
    },
    {
      id: 'REQ-008',
      employeeName: 'Neha Desai',
      employeeId: 'EMP1008',
      department: 'Canteen',
      type: 'Uniform',
      title: 'Uniform Replacement',
      description: 'Request for new uniform set as current ones are worn out after 2 years of use.',
      submittedDate: '2024-12-20',
      status: 'pending',
      priority: 'low'
    },
    {
      id: 'REQ-009',
      employeeName: 'Deepak Shah',
      employeeId: 'EMP1009',
      department: 'Assembly',
      type: 'Asset',
      title: 'Safety Equipment Request',
      description: 'Requesting new safety goggles and gloves for assembly line workers (15 sets).',
      submittedDate: '2024-12-19',
      status: 'approved',
      priority: 'high'
    },
    {
      id: 'REQ-010',
      employeeName: 'Kavita Rao',
      employeeId: 'EMP1010',
      department: 'PNA',
      type: 'Document',
      title: 'Address Proof Update',
      description: 'Update address proof in employee records due to relocation to new residence.',
      submittedDate: '2024-12-18',
      status: 'pending',
      priority: 'medium',
      attachments: ['aadhar-card.pdf', 'utility-bill.pdf']
    }
  ]);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || request.type === filterType;
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
  };

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-blue-100 text-blue-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">All Requests</h1>
        <p className="text-blue-100 text-sm">Review and manage all employee requests across departments</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={20} className="text-blue-600" />
            <p className="text-xs font-semibold text-blue-700">PENDING</p>
          </div>
          <p className="text-3xl font-bold text-[#1B254B]">{pendingCount}</p>
          <p className="text-xs text-gray-600 mt-1">Awaiting review</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-blue-600" />
            <p className="text-xs font-semibold text-blue-700">APPROVED</p>
          </div>
          <p className="text-3xl font-bold text-[#1B254B]">{approvedCount}</p>
          <p className="text-xs text-gray-600 mt-1">Total approved</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <XCircle size={20} className="text-blue-600" />
            <p className="text-xs font-semibold text-blue-700">REJECTED</p>
          </div>
          <p className="text-3xl font-bold text-[#1B254B]">{rejectedCount}</p>
          <p className="text-xs text-gray-600 mt-1">Total rejected</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, title, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Types</option>
            <option value="Leave">Leave</option>
            <option value="Document">Document</option>
            <option value="Asset">Asset</option>
            <option value="Training">Training</option>
            <option value="Reimbursement">Reimbursement</option>
            <option value="Overtime">Overtime</option>
            <option value="Uniform">Uniform</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Showing <span className="font-bold text-[#0B4DA2]">{filteredRequests.length}</span> of <span className="font-bold">{requests.length}</span> requests
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-gray-900">{request.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{request.employeeName}</p>
                      <p className="text-xs text-gray-500">{request.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 font-medium">{request.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium max-w-xs truncate">{request.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{request.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadgeColor(request.priority)}`}>
                      {request.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(request.status)}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{request.submittedDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewRequest(request)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="View Details"
                      >
                        <Eye size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                            title="Approve"
                          >
                            <CheckCircle size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Reject"
                          >
                            <XCircle size={18} className="text-red-600 group-hover:scale-110 transition-transform" />
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

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No requests found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold text-[#1B254B]">Request Details</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Request Header */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-[#1B254B] mb-2">{selectedRequest.title}</h4>
                    <p className="text-sm text-gray-600">Request ID: <span className="font-mono font-semibold">{selectedRequest.id}</span></p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusBadgeColor(selectedRequest.status)}`}>
                    {selectedRequest.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Employee Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <User size={18} className="text-blue-600" />
                    <p className="text-xs font-semibold text-gray-500">EMPLOYEE</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">{selectedRequest.employeeName}</p>
                  <p className="text-sm text-gray-600">{selectedRequest.employeeId}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 size={18} className="text-blue-600" />
                    <p className="text-xs font-semibold text-gray-500">DEPARTMENT</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">{selectedRequest.department}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText size={18} className="text-blue-600" />
                    <p className="text-xs font-semibold text-gray-500">REQUEST TYPE</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">{selectedRequest.type}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={18} className="text-blue-600" />
                    <p className="text-xs font-semibold text-gray-500">SUBMITTED DATE</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">{selectedRequest.submittedDate}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle size={18} className="text-blue-600" />
                    <p className="text-xs font-semibold text-gray-500">PRIORITY</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadgeColor(selectedRequest.priority)}`}>
                    {selectedRequest.priority.toUpperCase()}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={18} className="text-blue-600" />
                    <p className="text-xs font-semibold text-gray-500">STATUS</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(selectedRequest.status)}`}>
                    {selectedRequest.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h5 className="text-sm font-bold text-gray-700 mb-3">DESCRIPTION</h5>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-900 leading-relaxed">{selectedRequest.description}</p>
                </div>
              </div>

              {/* Attachments */}
              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div>
                  <h5 className="text-sm font-bold text-gray-700 mb-3">ATTACHMENTS</h5>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer">
                        <FileText size={20} className="text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0 bg-white">
              {selectedRequest.status === 'pending' ? (
                <>
                  <button
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      setShowDetailModal(false);
                    }}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      setShowDetailModal(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
