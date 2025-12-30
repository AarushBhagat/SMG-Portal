import { useState } from 'react';
import { Users, Search, Plus, X, User, Building, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Visitor {
  id: number;
  name: string;
  company: string;
  purpose: string;
  personToMeet: string;
  department: string;
  checkInTime: string;
  checkOutTime?: string;
  phone: string;
  idProof: string;
  status: 'Checked In' | 'Checked Out' | 'In Meeting';
  photo: string;
}

export const VisitorManagementSystem = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    purpose: '',
    personToMeet: '',
    department: '',
    phone: '',
    idProof: '',
    photo: ''
  });

  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: 1,
      name: 'Amit Sharma',
      company: 'Tech Solutions Pvt Ltd',
      purpose: 'Business Meeting',
      personToMeet: 'Rajesh Kumar',
      department: 'Sales',
      checkInTime: '10:30 AM',
      phone: '+91 98765 43210',
      idProof: 'Aadhar - 1234 5678 9012',
      status: 'Checked In',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit'
    },
    {
      id: 2,
      name: 'Priya Gupta',
      company: 'Marketing Corp',
      purpose: 'Interview - Marketing Manager',
      personToMeet: 'HR Team',
      department: 'Human Resource',
      checkInTime: '11:15 AM',
      phone: '+91 87654 32109',
      idProof: 'PAN - ABCD1234E',
      status: 'In Meeting',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      company: 'Supplier Industries',
      purpose: 'Vendor Meeting',
      personToMeet: 'Procurement Head',
      department: 'Procurement',
      checkInTime: '09:00 AM',
      checkOutTime: '11:30 AM',
      phone: '+91 76543 21098',
      idProof: 'Driving License - DL123456',
      status: 'Checked Out',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
    }
  ]);

  const filteredVisitors = visitors.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.personToMeet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeVisitors = visitors.filter(v => v.status !== 'Checked Out');
  const todayTotal = visitors.length;
  const checkedOut = visitors.filter(v => v.status === 'Checked Out').length;

  const handleAddVisitor = () => {
    const newVisitor: Visitor = {
      id: visitors.length + 1,
      ...formData,
      checkInTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Checked In',
      photo: formData.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    };
    setVisitors([newVisitor, ...visitors]);
    setShowAddModal(false);
    setFormData({ name: '', company: '', purpose: '', personToMeet: '', department: '', phone: '', idProof: '', photo: '' });
  };

  const handleCheckOut = (id: number) => {
    setVisitors(visitors.map(v =>
      v.id === id
        ? { ...v, status: 'Checked Out', checkOutTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : v
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <Users className="text-blue-500" size={36} />
            Visitor Management System
          </h1>
          <p className="text-gray-500 mt-1">Track and manage all visitors</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Add Visitor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{activeVisitors.length}</p>
              <p className="text-sm text-gray-500">Active Visitors</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{todayTotal}</p>
              <p className="text-sm text-gray-500">Today's Visitors</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <XCircle className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{checkedOut}</p>
              <p className="text-sm text-gray-500">Checked Out</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">2.5h</p>
              <p className="text-sm text-gray-500">Avg Duration</p>
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
            placeholder="Search by name, company, or person to meet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Meeting With</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={visitor.photo} alt={visitor.name} className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold text-[#1B254B]">{visitor.name}</p>
                        <p className="text-xs text-gray-500">{visitor.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1B254B] font-medium">{visitor.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1B254B]">{visitor.purpose}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#1B254B]">{visitor.personToMeet}</p>
                    <p className="text-xs text-gray-500">{visitor.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1B254B] flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />
                      {visitor.checkInTime}
                    </p>
                    {visitor.checkOutTime && (
                      <p className="text-xs text-gray-500">Out: {visitor.checkOutTime}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      visitor.status === 'Checked In' ? 'bg-green-100 text-green-600' :
                      visitor.status === 'In Meeting' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {visitor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {visitor.status !== 'Checked Out' && (
                      <button
                        onClick={() => handleCheckOut(visitor.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-semibold"
                      >
                        Check Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Visitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">Add New Visitor</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Visitor Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Enter company (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID Proof *</label>
                  <input
                    type="text"
                    value={formData.idProof}
                    onChange={(e) => setFormData({ ...formData, idProof: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Aadhar / PAN / DL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Person to Meet *</label>
                  <input
                    type="text"
                    value={formData.personToMeet}
                    onChange={(e) => setFormData({ ...formData, personToMeet: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Enter name"
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
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Visitor Photo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, photo: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.photo && (
                  <div className="mt-2 flex items-center gap-3">
                    <img src={formData.photo} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photo: '' })}
                      className="text-sm text-red-600 font-semibold hover:text-red-700"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose of Visit *</label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  rows={3}
                  placeholder="Enter purpose of visit"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddVisitor}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Add Visitor
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
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
