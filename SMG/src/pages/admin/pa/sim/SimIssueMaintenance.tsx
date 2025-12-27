import { useState } from 'react';
import { Smartphone, Search, Plus, Edit, Trash2, X } from 'lucide-react';

interface SimRecord {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  simNumber: string;
  provider: string;
  plan: string;
  issueDate: string;
  status: 'Active' | 'Inactive' | 'Replaced';
}

export const SimIssueMaintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState<SimRecord[]>([
    {
      id: 1,
      empName: 'Amit Kumar',
      empId: 'SMG-2024-042',
      dept: 'Assembly',
      simNumber: '+91 98765 43210',
      provider: 'Airtel',
      plan: 'Unlimited - ₹599',
      issueDate: '2024-10-15',
      status: 'Active'
    },
    {
      id: 2,
      empName: 'Priya Sharma',
      empId: 'SMG-2024-089',
      dept: 'HR',
      simNumber: '+91 98765 43211',
      provider: 'Jio',
      plan: 'Premium - ₹799',
      issueDate: '2024-11-02',
      status: 'Active'
    },
    {
      id: 3,
      empName: 'Rajesh Patel',
      empId: 'SMG-2024-123',
      dept: 'Finance',
      simNumber: '+91 98765 43212',
      provider: 'Vi',
      plan: 'Standard - ₹399',
      issueDate: '2024-09-20',
      status: 'Replaced'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SimRecord | null>(null);
  const [formData, setFormData] = useState({
    empName: '',
    empId: '',
    dept: '',
    simNumber: '',
    provider: 'Airtel',
    plan: '',
    issueDate: '',
    status: 'Active' as 'Active' | 'Inactive' | 'Replaced'
  });

  const filteredRecords = records.filter(rec =>
    rec.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.simNumber.includes(searchQuery)
  );

  const activeRecords = filteredRecords.filter(r => r.status === 'Active');

  const handleAddRecord = () => {
    setFormData({
      empName: '',
      empId: '',
      dept: '',
      simNumber: '',
      provider: 'Airtel',
      plan: '',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
    setShowAddModal(true);
  };

  const handleEditRecord = (record: SimRecord) => {
    setSelectedRecord(record);
    setFormData({
      empName: record.empName,
      empId: record.empId,
      dept: record.dept,
      simNumber: record.simNumber,
      provider: record.provider,
      plan: record.plan,
      issueDate: record.issueDate,
      status: record.status
    });
    setShowModal(true);
  };

  const handleSaveNewRecord = () => {
    const newRecord: SimRecord = {
      id: records.length + 1,
      ...formData
    };
    setRecords([...records, newRecord]);
    setShowAddModal(false);
  };

  const handleUpdateRecord = () => {
    if (selectedRecord) {
      setRecords(records.map(rec =>
        rec.id === selectedRecord.id
          ? { ...rec, ...formData }
          : rec
      ));
      setShowModal(false);
      setSelectedRecord(null);
    }
  };

  const handleDeleteRecord = (id: number) => {
    if (confirm('Are you sure you want to delete this SIM record?')) {
      setRecords(records.filter(rec => rec.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Smartphone className="text-blue-500" size={36} />
          SIM Issue & Maintenance Records
        </h1>
        <p className="text-gray-500 mt-1">Manage all SIM card issue records and maintenance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Smartphone className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{activeRecords.length}</p>
              <p className="text-sm text-gray-500">Active SIMs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Smartphone className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{records.filter(r => r.status === 'Replaced').length}</p>
              <p className="text-sm text-gray-500">Replaced</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Smartphone className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{records.filter(r => r.status === 'Inactive').length}</p>
              <p className="text-sm text-gray-500">Inactive</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Smartphone className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{records.length}</p>
              <p className="text-sm text-gray-500">Total Records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, ID, or SIM number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleAddRecord}
            className="px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Plus size={20} />
            Add New Record
          </button>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">All SIM Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Employee</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">SIM Number</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Provider</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Plan</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Issue Date</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-bold text-[#1B254B]">{record.empName}</p>
                      <p className="text-sm text-gray-500">{record.empId} • {record.dept}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-[#1B254B]">{record.simNumber}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-[#1B254B]">{record.provider}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-[#1B254B]">{record.plan}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{record.issueDate}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      record.status === 'Active' ? 'bg-green-100 text-green-700' :
                      record.status === 'Replaced' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditRecord(record)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteRecord(record.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">Edit SIM Record</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employee Name</label>
                  <input
                    type="text"
                    value={formData.empName}
                    onChange={(e) => setFormData({ ...formData, empName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    value={formData.empId}
                    onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.dept}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">SIM Number</label>
                  <input
                    type="text"
                    value={formData.simNumber}
                    onChange={(e) => setFormData({ ...formData, simNumber: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Provider</label>
                  <select 
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  >
                    <option>Airtel</option>
                    <option>Jio</option>
                    <option>Vi</option>
                    <option>BSNL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Plan</label>
                  <input
                    type="text"
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Issue Date</label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' | 'Replaced' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Replaced</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleUpdateRecord}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">Add New SIM Record</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employee Name</label>
                  <input
                    type="text"
                    value={formData.empName}
                    onChange={(e) => setFormData({ ...formData, empName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Enter employee name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    value={formData.empId}
                    onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="e.g., SMG-2024-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.dept}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="e.g., Assembly"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">SIM Number</label>
                  <input
                    type="text"
                    value={formData.simNumber}
                    onChange={(e) => setFormData({ ...formData, simNumber: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Provider</label>
                  <select 
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  >
                    <option>Airtel</option>
                    <option>Jio</option>
                    <option>Vi</option>
                    <option>BSNL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Plan</label>
                  <input
                    type="text"
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="e.g., Unlimited - ₹599"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Issue Date</label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' | 'Replaced' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Replaced</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleSaveNewRecord}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all"
                >
                  Add Record
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
