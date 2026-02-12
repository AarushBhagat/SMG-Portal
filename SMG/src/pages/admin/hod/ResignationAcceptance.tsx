import { useState, useMemo } from 'react';
import { Search, Eye, Check, X, UserX, Calendar, User, FileText, Briefcase, AlertCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContextEnhanced';
import { useAuth } from '../../../context/AuthContext';

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
  const { requests = [], approveRequest, rejectRequest, allUsers = [] } = useApp();
  const { user: authUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedResignation, setSelectedResignation] = useState<Resignation | null>(null);
  const [showDeptSelector, setShowDeptSelector] = useState(false);
  const [selectedDept, setSelectedDept] = useState('');
  
  // Available departments
  const departments = [
    'Assembly',
    'Information Technology',
    'Production',
    'Quality Control',
    'HR',
    'Finance',
    'Admin',
    'Marketing',
    'Maintenance'
  ];

  // Get current user's department for filtering
  // If department is set to role name (like 'HOD'), try to get from designation or default
  const rawDepartment = authUser?.department;
  const isRoleName = rawDepartment === 'HOD' || rawDepartment === 'hod' || rawDepartment === 'admin';
  
  // Try multiple sources for department
  const currentDepartment = isRoleName 
    ? (localStorage.getItem('hodDepartment') || 'Assembly') // Use cached or default to Assembly
    : (rawDepartment || 'Information Technology');
  
  console.log('🔍 [ResignationAcceptance] Current HOD Details:', {
    name: authUser?.name,
    rawDepartment: rawDepartment,
    department: currentDepartment,
    role: authUser?.role,
    isRoleName: isRoleName
  });

  // Transform Firebase requests to component format
  const resignations = useMemo(() => {
    console.log('🔍 [ResignationAcceptance] Filtering resignations');
    console.log('   Total requests:', requests.length);
    console.log('   Current HOD Department:', currentDepartment);
    console.log('   Current HOD Role:', authUser?.role);
    
    const filtered = requests.filter(req => {
      // Filter resignation requests that need HOD approval
      const isResignation = req.requestType === 'resignation';
      
      if (!isResignation) return false;
      
      const approvers = req.approvers || [];
      const isFromDepartment = req.department === currentDepartment;
      
      // Find HOD approver - check both by department match and by role
      const hodApprover = approvers.find(app => app.role === 'HOD');
      const hodApproverMatchesDept = hodApprover && hodApprover.department === currentDepartment;
      
      console.log(`   📋 Resignation ${req.id}:`, {
        employeeName: req.employeeName,
        employeeDept: req.department,
        isFromDepartment,
        approvers: approvers.map(a => ({ 
          level: a.level, 
          role: a.role, 
          dept: a.department, 
          status: a.status 
        })),
        hodApprover: hodApprover ? { 
          dept: hodApprover.department, 
          status: hodApprover.status,
          matchesDept: hodApproverMatchesDept 
        } : null,
        willShow: isFromDepartment && hodApproverMatchesDept
      });
      
      // Show if: resignation from same department AND has HOD approver for this department
      return isFromDepartment && hodApproverMatchesDept;
    });
    
    console.log('   ✅ Filtered resignations count:', filtered.length);
    
    return filtered.map(req => {
      const requestData = req.requestData || {};
      const approvers = req.approvers || [];
      const hodApprover = approvers.find(app => app.role === 'HOD' && app.department === currentDepartment);
      const hrApprover = approvers.find(app => app.role === 'HR Admin');
      
      // Find user details
      const userDetails = allUsers.find(user => user.id === req.userId || user.empId === req.employeeId);
      
      return {
        id: req.id,
        empId: req.employeeId || 'N/A',
        empName: req.employeeName || req.userName || 'N/A',
        department: req.department || currentDepartment,
        designation: userDetails?.role || userDetails?.designation || 'Employee',
        joiningDate: userDetails?.joinDate || userDetails?.joiningDate || 'N/A',
        resignationDate: req.createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString(),
        lastWorkingDate: requestData.lastWorkingDate?.toDate?.()?.toLocaleDateString() || requestData.lastWorkingDate || 'N/A',
        noticePeriod: requestData.noticePeriod ? `${requestData.noticePeriod} days` : '30 days',
        reason: requestData.reasonForLeaving || req.description || 'Not specified',
        hrStatus: (hrApprover?.status === 'approved' ? 'Approved' : 
                 hrApprover?.status === 'rejected' ? 'Rejected' : 'Pending') as 'Pending' | 'Approved' | 'Rejected',
        hodStatus: (hodApprover?.status === 'approved' ? 'Approved' : 
                  hodApprover?.status === 'rejected' ? 'Rejected' : 'Pending') as 'Pending' | 'Approved' | 'Rejected'
      };
    });
  }, [requests, currentDepartment, allUsers]);

  const handleApprove = async (id: string) => {
    try {
      await approveRequest(id, 'HOD approved the resignation request');
      setSelectedResignation(null);
    } catch (error) {
      console.error('Error approving resignation:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectRequest(id, 'HOD rejected the resignation request');
      setSelectedResignation(null);
    } catch (error) {
      console.error('Error rejecting resignation:', error);
    }
  };

  const filteredResignations = resignations.filter(res => {
    const matchesSearch = res.empName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         res.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || res.hodStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = resignations.filter(r => r.hodStatus === 'Pending').length;
  
  console.log('📊 [ResignationAcceptance] Stats:', {
    totalResignations: resignations.length,
    filtered: filteredResignations.length,
    pending: pendingCount
  });

  // Handle department change
  const handleDepartmentChange = (dept: string) => {
    setSelectedDept(dept);
    localStorage.setItem('hodDepartment', dept);
    setShowDeptSelector(false);
    window.location.reload(); // Reload to apply filter
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Department Selector Warning */}
      {(authUser?.department === 'HOD' || authUser?.department === 'hod' || authUser?.department === 'admin') && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-yellow-600 shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-yellow-800 mb-2">⚠️ Department Not Set</h3>
              <p className="text-yellow-700 mb-3">
                Your account department is set to "{authUser?.department}" (role name). 
                Please select your actual department to view requests.
              </p>
              <div className="flex flex-wrap gap-2">
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => handleDepartmentChange(dept)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentDepartment === dept
                        ? 'bg-yellow-600 text-white'
                        : 'bg-white text-yellow-800 hover:bg-yellow-100 border border-yellow-300'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
              <p className="text-xs text-yellow-600 mt-3">
                Currently viewing: <strong>{currentDepartment}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
      
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

      {/* Debug Info - Show all resignations in system */}
      {resignations.length === 0 && requests.filter(r => r.requestType === 'resignation').length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
            <AlertCircle size={20} />
            Debug: Found {requests.filter(r => r.requestType === 'resignation').length} resignation(s) in system
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            {requests.filter(r => r.requestType === 'resignation').slice(0, 3).map((req, idx) => (
              <div key={idx} className="bg-white rounded p-3 border border-orange-200">
                <p><strong>Employee:</strong> {req.employeeName} (Dept: {req.department})</p>
                <p><strong>Your Dept:</strong> {currentDepartment}</p>
                <p><strong>Match:</strong> {req.department === currentDepartment ? '✅ YES' : '❌ NO'}</p>
                <p><strong>Approvers:</strong> {JSON.stringify(req.approvers?.map(a => ({ role: a.role, dept: a.department })))}</p>
              </div>
            ))}
            <p className="text-xs mt-2">Check browser console (F12) for full details</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-bold text-[#1B254B]">{filteredResignations.length}</span> resignation request(s)
            {currentDepartment && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Department: {currentDepartment}</span>}
          </div>
        </div>
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
        {filteredResignations.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
            <UserX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No Resignation Requests</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No requests match your search criteria' : 
               `No resignation requests found for ${currentDepartment} department`}
            </p>
            {requests.length > 0 && resignations.length === 0 && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-left max-w-md mx-auto">
                <p className="text-sm text-yellow-800">
                  <strong>Debug Info:</strong> Found {requests.length} total request(s) in system, 
                  but none are resignation requests for your department.
                </p>
                <p className="text-xs text-yellow-700 mt-2">
                  Check browser console (F12) for detailed filtering logs.
                </p>
              </div>
            )}
          </div>
        ) : (
          filteredResignations.map((resignation) => (
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
        ))
        )}
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
