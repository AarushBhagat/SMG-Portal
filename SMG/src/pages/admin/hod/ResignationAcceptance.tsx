import { useState } from 'react';
import { Search, Eye, Check, X, UserX, Calendar, User, FileText, Briefcase } from 'lucide-react';

interface Resignation {
  id: string;
  empId: string;
  empName: string;
  department: string;
  designation: string;
  joiningDate: string;
  resignationDate: string;
  lastWorkingDate: string;
  noticePeriod: string;
  reason: string;
  hrStatus: 'Pending' | 'Approved' | 'Rejected';
  hodStatus: 'Pending' | 'Approved' | 'Rejected';
}

export const ResignationAcceptance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedResignation, setSelectedResignation] = useState<Resignation | null>(null);

  const [resignations, setResignations] = useState<Resignation[]>([
    {
      id: 'RES001',
      empId: 'SMG-EMP-456',
      empName: 'Rahul Verma',
      department: 'Information Technology',
      designation: 'Software Engineer',
      joiningDate: '15 Jan 2022',
      resignationDate: '20 Dec 2025',
      lastWorkingDate: '20 Jan 2026',
      noticePeriod: '30 days',
      reason: 'Higher studies abroad',
      hrStatus: 'Approved',
      hodStatus: 'Pending'
    },
    {
      id: 'RES002',
      empId: 'SMG-EMP-789',
      empName: 'Sneha Patel',
      department: 'Information Technology',
      designation: 'QA Tester',
      joiningDate: '10 March 2023',
      resignationDate: '18 Dec 2025',
      lastWorkingDate: '18 Jan 2026',
      noticePeriod: '30 days',
      reason: 'Personal reasons',
      hrStatus: 'Approved',
      hodStatus: 'Approved'
    }
  ]);

  const handleApprove = (id: string) => {
    setResignations(resignations.map(res => 
      res.id === id ? { ...res, hodStatus: 'Approved' as const } : res
    ));
    setSelectedResignation(null);
  };

  const handleReject = (id: string) => {
    setResignations(resignations.map(res => 
      res.id === id ? { ...res, hodStatus: 'Rejected' as const } : res
    ));
    setSelectedResignation(null);
  };

  const filteredResignations = resignations.filter(res => {
    const matchesSearch = res.empName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         res.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || res.hodStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = resignations.filter(r => r.hodStatus === 'Pending').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resignation Acceptance</h1>
            <p className="text-white/80">HOD final approval after HR clearance</p>
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
            {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resignations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResignations.map((resignation) => (
          <div key={resignation.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-red-400 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <UserX className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1B254B] mb-1">{resignation.empName}</h3>
                    <p className="text-sm text-gray-500">{resignation.empId}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {resignation.id}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    resignation.hodStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                    resignation.hodStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {resignation.hodStatus}
                  </span>
                </div>
              </div>

              {/* Employee Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Department</p>
                  <p className="text-sm font-bold text-[#1B254B] truncate">{resignation.department}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Designation</p>
                  <p className="text-sm font-bold text-[#1B254B] truncate">{resignation.designation}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Resignation Date:</span>
                  <span className="font-semibold text-[#1B254B]">{resignation.resignationDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Working Day:</span>
                  <span className="font-semibold text-red-600">{resignation.lastWorkingDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Notice Period:</span>
                  <span className="font-semibold text-[#1B254B]">{resignation.noticePeriod}</span>
                </div>
              </div>

              {/* HR Status */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <div>
                    <p className="text-xs text-green-700 font-semibold">HR Status</p>
                    <p className="text-sm font-bold text-green-800">{resignation.hrStatus}</p>
                  </div>
                </div>
              </div>

              {/* Reason Preview */}
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 font-semibold mb-1">Reason</p>
                <p className="text-sm text-gray-700 line-clamp-2">{resignation.reason}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedResignation(resignation)}
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Eye size={16} />
                  View Details
                </button>
                {resignation.hodStatus === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(resignation.id)}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <Check size={16} />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(resignation.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedResignation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">Resignation Details</h2>
                  <p className="text-white/80 text-sm">Resignation ID: {selectedResignation.id}</p>
                </div>
                <button
                  onClick={() => setSelectedResignation(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Employee Info */}
                <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <User className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Employee Details</p>
                      <p className="font-bold text-[#1B254B]">{selectedResignation.empName}</p>
                      <p className="text-sm text-gray-600">{selectedResignation.empId}</p>
                    </div>
                  </div>
                </div>

                {/* Department & Designation */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Department</p>
                      <p className="font-bold text-[#1B254B]">{selectedResignation.department}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Designation</p>
                      <p className="font-bold text-[#1B254B]">{selectedResignation.designation}</p>
                    </div>
                  </div>
                </div>

                {/* Joining Date */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Joining Date</p>
                      <p className="font-bold text-[#1B254B]">{selectedResignation.joiningDate}</p>
                    </div>
                  </div>
                </div>

                {/* Resignation Date */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Resignation Date</p>
                      <p className="font-bold text-[#1B254B]">{selectedResignation.resignationDate}</p>
                    </div>
                  </div>
                </div>

                {/* Last Working Day */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-red-600 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-red-700 font-semibold mb-1">Last Working Day</p>
                      <p className="font-bold text-red-800">{selectedResignation.lastWorkingDate}</p>
                    </div>
                  </div>
                </div>

                {/* Notice Period */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Notice Period</p>
                      <p className="font-bold text-[#1B254B]">{selectedResignation.noticePeriod}</p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Reason for Resignation</p>
                      <p className="font-semibold text-[#1B254B]">{selectedResignation.reason}</p>
                    </div>
                  </div>
                </div>

                {/* HR Status */}
                <div className="col-span-2 bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-green-700 font-semibold mb-1">HR Approval Status</p>
                      <p className="font-bold text-green-800">{selectedResignation.hrStatus}</p>
                      <p className="text-sm text-green-600 mt-1">HR has cleared this resignation request</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedResignation.hodStatus === 'Pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedResignation.id)}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Accept Resignation
                  </button>
                  <button
                    onClick={() => handleReject(selectedResignation.id)}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Reject Resignation
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
