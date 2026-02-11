import { useState } from 'react';
import { FileText, Plus, AlertCircle, CheckCircle, Clock, Book, X, Download, Shield } from 'lucide-react';

interface Grievance {
  id: string;
  employeeId: string;
  employeeName: string;
  category: string;
  subject: string;
  description: string;
  dateReported: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  resolution: string;
}

interface Policy {
  id: string;
  policyName: string;
  category: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  status: 'Active' | 'Draft' | 'Archived';
  documentUrl: string;
  description: string;
}

export const GrievancePolicyManagement = () => {
  const [activeTab, setActiveTab] = useState<'grievances' | 'policies'>('grievances');
  const [showGrievanceForm, setShowGrievanceForm] = useState(false);
  const [showPolicyForm, setShowPolicyForm] = useState(false);

  const [grievanceForm, setGrievanceForm] = useState({
    employeeId: '',
    employeeName: '',
    category: 'Workplace Conduct',
    subject: '',
    description: '',
    priority: 'Medium' as const,
    assignedTo: ''
  });

  const [policyForm, setPolicyForm] = useState({
    policyName: '',
    category: 'General',
    effectiveDate: '',
    version: '1.0',
    status: 'Draft' as const,
    documentUrl: '',
    description: ''
  });

  // Mock grievance data
  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: 'GRV-001',
      employeeId: 'EMP-101',
      employeeName: 'Mr Praphull Chandra',
      category: 'Workplace Conduct',
      subject: 'Request for flexible work hours',
      description: 'Would like to discuss options for flexible working schedule due to family commitments.',
      dateReported: '2025-01-15',
      status: 'Under Investigation',
      priority: 'Medium',
      assignedTo: 'HR Manager',
      resolution: ''
    }
  ]);

  // Mock policy data
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: 'POL-001',
      policyName: 'Code of Conduct',
      category: 'Ethics',
      effectiveDate: '2025-01-01',
      lastUpdated: '2025-01-01',
      version: '2.0',
      status: 'Active',
      documentUrl: 'https://example.com/policies/code-of-conduct.pdf',
      description: 'Guidelines for ethical behavior and professional conduct in the workplace'
    },
    {
      id: 'POL-002',
      policyName: 'Leave Policy',
      category: 'HR',
      effectiveDate: '2025-01-01',
      lastUpdated: '2025-01-10',
      version: '3.1',
      status: 'Active',
      documentUrl: 'https://example.com/policies/leave-policy.pdf',
      description: 'Comprehensive policy covering all types of employee leaves and entitlements'
    }
  ]);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGrievance: Grievance = {
      id: `GRV-${String(grievances.length + 1).padStart(3, '0')}`,
      ...grievanceForm,
      dateReported: new Date().toISOString().split('T')[0],
      status: 'Open',
      resolution: ''
    };
    setGrievances([...grievances, newGrievance]);
    setShowGrievanceForm(false);
    setGrievanceForm({
      employeeId: '',
      employeeName: '',
      category: 'Workplace Conduct',
      subject: '',
      description: '',
      priority: 'Medium',
      assignedTo: ''
    });
    alert('Grievance recorded successfully!');
  };

  const handlePolicySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPolicy: Policy = {
      id: `POL-${String(policies.length + 1).padStart(3, '0')}`,
      ...policyForm,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPolicies([...policies, newPolicy]);
    setShowPolicyForm(false);
    setPolicyForm({
      policyName: '',
      category: 'General',
      effectiveDate: '',
      version: '1.0',
      status: 'Draft',
      documentUrl: '',
      description: ''
    });
    alert('Policy added successfully!');
  };

  const getGrievanceStatusBadge = (status: string) => {
    const styles = {
      'Open': 'bg-yellow-100 text-yellow-700',
      'Under Investigation': 'bg-blue-100 text-blue-700',
      'Resolved': 'bg-green-100 text-green-700',
      'Closed': 'bg-gray-100 text-gray-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getPolicyStatusBadge = (status: string) => {
    const styles = {
      'Active': 'bg-green-100 text-green-700',
      'Draft': 'bg-yellow-100 text-yellow-700',
      'Archived': 'bg-gray-100 text-gray-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      'Low': 'bg-green-100 text-green-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'High': 'bg-red-100 text-red-700'
    };
    return styles[priority as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const grievanceStats = {
    total: grievances.length,
    open: grievances.filter(g => g.status === 'Open').length,
    underInvestigation: grievances.filter(g => g.status === 'Under Investigation').length,
    resolved: grievances.filter(g => g.status === 'Resolved').length
  };

  const policyStats = {
    total: policies.length,
    active: policies.filter(p => p.status === 'Active').length,
    draft: policies.filter(p => p.status === 'Draft').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Shield className="text-teal-500" size={36} />
            Employee Grievance & Policy Management
          </h1>
          <p className="text-gray-500 mt-1">Manage employee grievances and company policies</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'grievances' && (
            <button
              onClick={() => setShowGrievanceForm(true)}
              className="bg-gradient-to-br from-teal-600 to-teal-800 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
            >
              <Plus size={20} />
              Add Grievance
            </button>
          )}
          {activeTab === 'policies' && (
            <button
              onClick={() => setShowPolicyForm(true)}
              className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
            >
              <Plus size={20} />
              Add Policy
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('grievances')}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'grievances'
                ? 'bg-gradient-to-r from-teal-600 to-teal-800 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <AlertCircle size={20} />
            Grievances ({grievances.length})
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'policies'
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Book size={20} />
            Policies ({policies.length})
          </button>
        </div>
      </div>

      {/* Grievances Tab */}
      {activeTab === 'grievances' && (
        <>
          {/* Grievance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B254B]">{grievanceStats.total}</p>
                  <p className="text-sm text-gray-500">Total Grievances</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B254B]">{grievanceStats.open}</p>
                  <p className="text-sm text-gray-500">Open</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B254B]">{grievanceStats.underInvestigation}</p>
                  <p className="text-sm text-gray-500">Under Investigation</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B254B]">{grievanceStats.resolved}</p>
                  <p className="text-sm text-gray-500">Resolved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grievance List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1B254B] mb-4">Grievance Records</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">ID</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Employee</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Category</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Subject</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Date</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Priority</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Assigned To</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grievances.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-500">
                        No grievances recorded. Click "Add Grievance" to create one.
                      </td>
                    </tr>
                  ) : (
                    grievances.map((grievance) => (
                      <tr key={grievance.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                        <td className="py-4 px-4 font-bold text-[#1B254B]">{grievance.id}</td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-[#1B254B]">{grievance.employeeName}</p>
                          <p className="text-xs text-gray-500">{grievance.employeeId}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{grievance.category}</td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-700">{grievance.subject}</p>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{grievance.dateReported}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityBadge(grievance.priority)}`}>
                            {grievance.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{grievance.assignedTo || 'Unassigned'}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getGrievanceStatusBadge(grievance.status)}`}>
                            {grievance.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Policies Tab */}
      {activeTab === 'policies' && (
        <>
          {/* Policy Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Book className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B254B]">{policyStats.total}</p>
                  <p className="text-sm text-gray-500">Total Policies</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B254B]">{policyStats.active}</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <FileText className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B254B]">{policyStats.draft}</p>
                  <p className="text-sm text-gray-500">Drafts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Policy List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1B254B] mb-4">Company Policies</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">ID</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Policy Name</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Category</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Effective Date</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Version</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        No policies found. Click "Add Policy" to create one.
                      </td>
                    </tr>
                  ) : (
                    policies.map((policy) => (
                      <tr key={policy.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                        <td className="py-4 px-4 font-bold text-[#1B254B]">{policy.id}</td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-[#1B254B]">{policy.policyName}</p>
                          <p className="text-xs text-gray-500">{policy.description.substring(0, 50)}...</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                            {policy.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{policy.effectiveDate}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-700">{policy.version}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getPolicyStatusBadge(policy.status)}`}>
                            {policy.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <Download size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Grievance Form Modal */}
      {showGrievanceForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1B254B]">Record New Grievance</h2>
              <button
                onClick={() => setShowGrievanceForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleGrievanceSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employee ID *</label>
                  <input
                    type="text"
                    value={grievanceForm.employeeId}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, employeeId: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all"
                    required
                    placeholder="e.g., EMP-101"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employee Name *</label>
                  <input
                    type="text"
                    value={grievanceForm.employeeName}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, employeeName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select
                    value={grievanceForm.category}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all"
                    required
                  >
                    <option value="Workplace Conduct">Workplace Conduct</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Discrimination">Discrimination</option>
                    <option value="Safety">Safety</option>
                    <option value="Compensation">Compensation</option>
                    <option value="Working Conditions">Working Conditions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Priority *</label>
                  <select
                    value={grievanceForm.priority}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, priority: e.target.value as any })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={grievanceForm.subject}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all"
                    required
                    placeholder="Brief summary of the grievance"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={grievanceForm.description}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all"
                    rows={4}
                    required
                    placeholder="Detailed description of the grievance"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Assigned To</label>
                  <input
                    type="text"
                    value={grievanceForm.assignedTo}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, assignedTo: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all"
                    placeholder="e.g., HR Manager"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGrievanceForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Record Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Policy Form Modal */}
      {showPolicyForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1B254B]">Add New Policy</h2>
              <button
                onClick={() => setShowPolicyForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePolicySubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Policy Name *</label>
                  <input
                    type="text"
                    value={policyForm.policyName}
                    onChange={(e) => setPolicyForm({ ...policyForm, policyName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                    placeholder="e.g., Remote Work Policy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select
                    value={policyForm.category}
                    onChange={(e) => setPolicyForm({ ...policyForm, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                  >
                    <option value="General">General</option>
                    <option value="HR">HR</option>
                    <option value="Ethics">Ethics</option>
                    <option value="IT">IT</option>
                    <option value="Security">Security</option>
                    <option value="Safety">Safety</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Effective Date *</label>
                  <input
                    type="date"
                    value={policyForm.effectiveDate}
                    onChange={(e) => setPolicyForm({ ...policyForm, effectiveDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Version *</label>
                  <input
                    type="text"
                    value={policyForm.version}
                    onChange={(e) => setPolicyForm({ ...policyForm, version: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                    placeholder="e.g., 1.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status *</label>
                  <select
                    value={policyForm.status}
                    onChange={(e) => setPolicyForm({ ...policyForm, status: e.target.value as any })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    required
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Document URL</label>
                  <input
                    type="url"
                    value={policyForm.documentUrl}
                    onChange={(e) => setPolicyForm({ ...policyForm, documentUrl: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={policyForm.description}
                    onChange={(e) => setPolicyForm({ ...policyForm, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    rows={4}
                    required
                    placeholder="Comprehensive description of the policy"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPolicyForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Add Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
