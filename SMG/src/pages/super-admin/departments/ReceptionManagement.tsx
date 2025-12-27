import { useState } from 'react';
import { Building2, Search, Filter, CheckCircle, XCircle, Edit3, Eye, Calendar, Clock } from 'lucide-react';

interface Request {
  id: string;
  employeeName: string;
  employeeId: string;
  type: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

export const ReceptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [requests, setRequests] = useState<Request[]>([
    { id: 'RCP-001', employeeName: 'Anjali Verma', employeeId: 'EMP-3421', type: 'Visitor Pass', description: 'Guest pass for client meeting', date: '2024-12-27', status: 'pending', priority: 'high' },
    { id: 'RCP-002', employeeName: 'Suresh Kumar', employeeId: 'EMP-4532', type: 'Meeting Room', description: 'Conference room booking for December 30', date: '2024-12-26', status: 'approved', priority: 'medium' },
    { id: 'RCP-003', employeeName: 'Priya Shah', employeeId: 'EMP-5643', type: 'Guest Registration', description: 'VIP guest registration and welcome package', date: '2024-12-25', status: 'pending', priority: 'high' },
    { id: 'RCP-004', employeeName: 'Ravi Patel', employeeId: 'EMP-6754', type: 'Courier Service', description: 'Urgent document courier to Mumbai office', date: '2024-12-24', status: 'approved', priority: 'low' },
    { id: 'RCP-005', employeeName: 'Kavita Desai', employeeId: 'EMP-7865', type: 'Phone Directory', description: 'Update employee contact directory', date: '2024-12-23', status: 'rejected', priority: 'medium' }
  ]);

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req => req.id === requestId ? { ...req, status: 'approved' as const } : req));
    setShowDetailModal(false);
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.map(req => req.id === requestId ? { ...req, status: 'rejected' as const } : req));
    setShowDetailModal(false);
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || req.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) || req.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center"><Building2 size={28} /></div>
          <div><h1 className="text-2xl font-bold">Reception Management</h1><p className="text-blue-100 text-sm">Super Admin Portal - Full Access Control</p></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center justify-between mb-2"><p className="text-xs font-semibold text-blue-700">TOTAL REQUESTS</p><Building2 size={20} className="text-blue-600" /></div>
          <p className="text-3xl font-bold text-[#1B254B]">{stats.total}</p><p className="text-xs text-gray-600 mt-1">All time</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center justify-between mb-2"><p className="text-xs font-semibold text-blue-700">PENDING</p><Clock size={20} className="text-blue-600" /></div>
          <p className="text-3xl font-bold text-[#1B254B]">{stats.pending}</p><p className="text-xs text-gray-600 mt-1">Awaiting action</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center justify-between mb-2"><p className="text-xs font-semibold text-blue-700">APPROVED</p><CheckCircle size={20} className="text-blue-600" /></div>
          <p className="text-3xl font-bold text-[#1B254B]">{stats.approved}</p><p className="text-xs text-gray-600 mt-1">Completed</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center justify-between mb-2"><p className="text-xs font-semibold text-blue-700">REJECTED</p><XCircle size={20} className="text-blue-600" /></div>
          <p className="text-3xl font-bold text-[#1B254B]">{stats.rejected}</p><p className="text-xs text-gray-600 mt-1">Declined</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search by employee name, ID, or request type..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent" />
          </div>
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-gray-400" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent font-medium">
              <option value="all">All Status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Request ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><p className="font-bold text-[#1B254B]">{request.id}</p></td>
                  <td className="px-6 py-4"><div><p className="font-semibold text-[#1B254B]">{request.employeeName}</p><p className="text-xs text-gray-500">{request.employeeId}</p></div></td>
                  <td className="px-6 py-4"><p className="font-medium text-gray-700">{request.type}</p></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-2 text-gray-600"><Calendar size={16} /><span className="text-sm">{request.date}</span></div></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${request.priority === 'high' ? 'bg-blue-100 text-blue-700' : request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{request.priority.toUpperCase()}</span></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${request.status === 'approved' ? 'bg-blue-100 text-blue-700' : request.status === 'rejected' ? 'bg-blue-100 text-blue-700' : 'bg-blue-100 text-blue-700'}`}>{request.status.toUpperCase()}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedRequest(request); setShowDetailModal(true); }} className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" title="View Details"><Eye size={18} className="text-blue-600 group-hover:scale-110 transition-transform" /></button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" title="Edit"><Edit3 size={18} className="text-blue-600 group-hover:scale-110 transition-transform" /></button>
                      {request.status === 'pending' && (<>
                        <button onClick={() => handleApprove(request.id)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" title="Approve"><CheckCircle size={18} className="text-blue-600 group-hover:scale-110 transition-transform" /></button>
                        <button onClick={() => handleReject(request.id)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" title="Reject"><XCircle size={18} className="text-blue-600 group-hover:scale-110 transition-transform" /></button>
                      </>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 text-white">
              <h2 className="text-xl font-bold">Request Details</h2><p className="text-sm text-blue-100 mt-1">{selectedRequest.id}</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><p className="text-xs font-semibold text-gray-500 mb-2">EMPLOYEE NAME</p><p className="font-bold text-[#1B254B] text-lg">{selectedRequest.employeeName}</p></div>
                <div><p className="text-xs font-semibold text-gray-500 mb-2">EMPLOYEE ID</p><p className="font-bold text-[#1B254B] text-lg">{selectedRequest.employeeId}</p></div>
                <div><p className="text-xs font-semibold text-gray-500 mb-2">REQUEST TYPE</p><p className="font-bold text-[#1B254B] text-lg">{selectedRequest.type}</p></div>
                <div><p className="text-xs font-semibold text-gray-500 mb-2">DATE</p><p className="font-bold text-[#1B254B] text-lg">{selectedRequest.date}</p></div>
                <div><p className="text-xs font-semibold text-gray-500 mb-2">PRIORITY</p><span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedRequest.priority === 'high' ? 'bg-blue-100 text-blue-700' : selectedRequest.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{selectedRequest.priority.toUpperCase()}</span></div>
                <div><p className="text-xs font-semibold text-gray-500 mb-2">STATUS</p><span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedRequest.status === 'approved' ? 'bg-blue-100 text-blue-700' : selectedRequest.status === 'rejected' ? 'bg-blue-100 text-blue-700' : 'bg-blue-100 text-blue-700'}`}>{selectedRequest.status.toUpperCase()}</span></div>
              </div>
              <div><p className="text-xs font-semibold text-gray-500 mb-2">DESCRIPTION</p><p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200">{selectedRequest.description}</p></div>
              {selectedRequest.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button onClick={() => handleApprove(selectedRequest.id)} className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"><CheckCircle size={20} />Approve Request</button>
                  <button onClick={() => handleReject(selectedRequest.id)} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"><XCircle size={20} />Reject Request</button>
                </div>
              )}
              <button onClick={() => setShowDetailModal(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
