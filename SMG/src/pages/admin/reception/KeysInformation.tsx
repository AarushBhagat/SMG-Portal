import { useState } from 'react';
import { Key, Search, Plus, X, Edit2, Trash2, Clock, User, MapPin } from 'lucide-react';

interface KeyRecord {
  id: number;
  keyId: string;
  keyType: string;
  location: string;
  issuedTo: string;
  employeeId: string;
  department: string;
  issueDate: string;
  returnDate?: string;
  purpose: string;
  status: 'Issued' | 'Returned' | 'Lost';
}

export const KeysInformation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<KeyRecord | null>(null);
  const [formData, setFormData] = useState({
    keyId: '',
    keyType: '',
    location: '',
    issuedTo: '',
    employeeId: '',
    department: '',
    purpose: ''
  });

  const [keys, setKeys] = useState<KeyRecord[]>([
    {
      id: 1,
      keyId: 'KEY-001',
      keyType: 'Main Gate',
      location: 'Gate 1 - Main Entrance',
      issuedTo: 'Ramesh Kumar',
      employeeId: 'SMG-SEC-101',
      department: 'Security',
      issueDate: '2024-01-15',
      purpose: 'Security Duty',
      status: 'Issued'
    },
    {
      id: 2,
      keyId: 'KEY-045',
      keyType: 'Conference Room A',
      location: 'Admin Building - 2nd Floor',
      issuedTo: 'Priya Sharma',
      employeeId: 'SMG-ADM-234',
      department: 'Administration',
      issueDate: '2024-12-26',
      purpose: 'Client Meeting',
      status: 'Issued'
    },
    {
      id: 3,
      keyId: 'KEY-023',
      keyType: 'Storage Room',
      location: 'Production Building - Ground Floor',
      issuedTo: 'Sunil Patel',
      employeeId: 'SMG-PRD-156',
      department: 'Production',
      issueDate: '2024-12-20',
      returnDate: '2024-12-25',
      purpose: 'Inventory Check',
      status: 'Returned'
    }
  ]);

  const filteredKeys = keys.filter(key =>
    key.keyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.issuedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const issuedKeys = keys.filter(k => k.status === 'Issued');
  const returnedKeys = keys.filter(k => k.status === 'Returned');
  const lostKeys = keys.filter(k => k.status === 'Lost');

  const handleAddKey = () => {
    const newKey: KeyRecord = {
      id: keys.length + 1,
      ...formData,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Issued'
    };
    setKeys([newKey, ...keys]);
    setShowAddModal(false);
    setFormData({ keyId: '', keyType: '', location: '', issuedTo: '', employeeId: '', department: '', purpose: '' });
  };

  const handleEditKey = (key: KeyRecord) => {
    setSelectedKey(key);
    setFormData({
      keyId: key.keyId,
      keyType: key.keyType,
      location: key.location,
      issuedTo: key.issuedTo,
      employeeId: key.employeeId,
      department: key.department,
      purpose: key.purpose
    });
    setShowEditModal(true);
  };

  const handleUpdateKey = () => {
    if (selectedKey) {
      setKeys(keys.map(key =>
        key.id === selectedKey.id
          ? { ...key, ...formData }
          : key
      ));
      setShowEditModal(false);
      setSelectedKey(null);
      setFormData({ keyId: '', keyType: '', location: '', issuedTo: '', employeeId: '', department: '', purpose: '' });
    }
  };

  const handleReturnKey = (id: number) => {
    setKeys(keys.map(key =>
      key.id === id
        ? { ...key, status: 'Returned', returnDate: new Date().toISOString().split('T')[0] }
        : key
    ));
  };

  const handleDeleteKey = (id: number) => {
    if (confirm('Are you sure you want to delete this key record?')) {
      setKeys(keys.filter(key => key.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Key className="text-orange-500" size={36} />
            Keys Information Management
          </h1>
          <p className="text-gray-500 mt-1">Track all issued and returned keys</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Issue Key
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Key className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{issuedKeys.length}</p>
              <p className="text-sm text-gray-500">Currently Issued</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Key className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{returnedKeys.length}</p>
              <p className="text-sm text-gray-500">Returned</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Key className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{lostKeys.length}</p>
              <p className="text-sm text-gray-500">Lost/Missing</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Key className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{keys.length}</p>
              <p className="text-sm text-gray-500">Total Records</p>
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
            placeholder="Search by key ID, issued to, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Keys Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Key ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Key Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Issued To</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredKeys.map((key) => (
                <tr key={key.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#1B254B]">{key.keyId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#1B254B]">{key.keyType}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1B254B] flex items-center gap-1">
                      <MapPin size={14} className="text-gray-400" />
                      {key.location}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-[#1B254B]">{key.issuedTo}</p>
                      <p className="text-xs text-gray-500">{key.employeeId} • {key.department}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1B254B] flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />
                      {new Date(key.issueDate).toLocaleDateString()}
                    </p>
                    {key.returnDate && (
                      <p className="text-xs text-green-600">Return: {new Date(key.returnDate).toLocaleDateString()}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      key.status === 'Issued' ? 'bg-orange-100 text-orange-600' :
                      key.status === 'Returned' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {key.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {key.status === 'Issued' && (
                        <button
                          onClick={() => handleReturnKey(key.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-xs font-semibold"
                        >
                          Mark Returned
                        </button>
                      )}
                      <button
                        onClick={() => handleEditKey(key)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteKey(key.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modals */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">{showAddModal ? 'Issue New Key' : 'Edit Key Record'}</h2>
                <button onClick={() => { showAddModal ? setShowAddModal(false) : setShowEditModal(false); }} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Key ID *</label>
                  <input
                    type="text"
                    value={formData.keyId}
                    onChange={(e) => setFormData({ ...formData, keyId: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="KEY-XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Key Type *</label>
                  <input
                    type="text"
                    value={formData.keyType}
                    onChange={(e) => setFormData({ ...formData, keyType: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="e.g., Conference Room"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Building - Floor - Area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Issued To *</label>
                  <input
                    type="text"
                    value={formData.issuedTo}
                    onChange={(e) => setFormData({ ...formData, issuedTo: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Employee Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID *</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="SMG-XXX-XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose *</label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Purpose of key issue"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={showAddModal ? handleAddKey : handleUpdateKey}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  {showAddModal ? 'Issue Key' : 'Update Record'}
                </button>
                <button
                  onClick={() => { showAddModal ? setShowAddModal(false) : setShowEditModal(false); }}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
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
