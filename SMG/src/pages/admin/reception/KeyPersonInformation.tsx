import { useState } from 'react';
import { UserCog, Search, Plus, X, Edit2, Trash2, Phone, Mail, Building, MapPin, Star } from 'lucide-react';

interface KeyPerson {
  id: number;
  name: string;
  designation: string;
  department: string;
  category: string;
  phone: string;
  email: string;
  officeLocation: string;
  emergencyContact: string;
  availability: string;
  responsibilities: string;
  photo: string;
}

export const KeyPersonInformation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<KeyPerson | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    category: '',
    phone: '',
    email: '',
    officeLocation: '',
    emergencyContact: '',
    availability: '',
    responsibilities: ''
  });

  const [keyPersons, setKeyPersons] = useState<KeyPerson[]>([
    {
      id: 1,
      name: 'Mr. Suresh Sharma',
      designation: 'Chief Executive Officer',
      department: 'Management',
      category: 'Executive',
      phone: '+91 98765 00001',
      email: 'suresh.sharma@smg-scooters.com',
      officeLocation: 'Admin Building - 3rd Floor - CEO Office',
      emergencyContact: '+91 98765 00002',
      availability: '9:00 AM - 6:00 PM',
      responsibilities: 'Overall company operations, Strategic decisions, Board meetings',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CEO'
    },
    {
      id: 2,
      name: 'Dr. Anjali Verma',
      designation: 'Head of Human Resource',
      department: 'Human Resource',
      category: 'HOD',
      phone: '+91 98765 11111',
      email: 'anjali.verma@smg-scooters.com',
      officeLocation: 'Admin Building - 2nd Floor - HR Department',
      emergencyContact: '+91 98765 11112',
      availability: '9:30 AM - 6:30 PM',
      responsibilities: 'Employee relations, Recruitment, Training & Development',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HR'
    },
    {
      id: 3,
      name: 'Mr. Rajesh Kumar',
      designation: 'Chief Financial Officer',
      department: 'Finance',
      category: 'Executive',
      phone: '+91 98765 22222',
      email: 'rajesh.kumar@smg-scooters.com',
      officeLocation: 'Admin Building - 2nd Floor - Finance Department',
      emergencyContact: '+91 98765 22223',
      availability: '9:00 AM - 7:00 PM',
      responsibilities: 'Financial planning, Budgeting, Accounts management',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CFO'
    },
    {
      id: 4,
      name: 'Mr. Vikram Singh',
      designation: 'Production Head',
      department: 'Production',
      category: 'HOD',
      phone: '+91 98765 33333',
      email: 'vikram.singh@smg-scooters.com',
      officeLocation: 'Production Building - Ground Floor',
      emergencyContact: '+91 98765 33334',
      availability: '8:00 AM - 5:00 PM',
      responsibilities: 'Production planning, Quality control, Manufacturing operations',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Production'
    }
  ]);

  const filteredPersons = keyPersons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const executives = keyPersons.filter(p => p.category === 'Executive');
  const hods = keyPersons.filter(p => p.category === 'HOD');
  const managers = keyPersons.filter(p => p.category === 'Manager');

  const handleAddPerson = () => {
    const newPerson: KeyPerson = {
      id: keyPersons.length + 1,
      ...formData,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    };
    setKeyPersons([newPerson, ...keyPersons]);
    setShowAddModal(false);
    setFormData({ name: '', designation: '', department: '', category: '', phone: '', email: '', officeLocation: '', emergencyContact: '', availability: '', responsibilities: '' });
  };

  const handleEditPerson = (person: KeyPerson) => {
    setSelectedPerson(person);
    setFormData({
      name: person.name,
      designation: person.designation,
      department: person.department,
      category: person.category,
      phone: person.phone,
      email: person.email,
      officeLocation: person.officeLocation,
      emergencyContact: person.emergencyContact,
      availability: person.availability,
      responsibilities: person.responsibilities
    });
    setShowEditModal(true);
  };

  const handleUpdatePerson = () => {
    if (selectedPerson) {
      setKeyPersons(keyPersons.map(person =>
        person.id === selectedPerson.id
          ? { ...person, ...formData }
          : person
      ));
      setShowEditModal(false);
      setSelectedPerson(null);
      setFormData({ name: '', designation: '', department: '', category: '', phone: '', email: '', officeLocation: '', emergencyContact: '', availability: '', responsibilities: '' });
    }
  };

  const handleDeletePerson = (id: number) => {
    if (confirm('Are you sure you want to delete this key person?')) {
      setKeyPersons(keyPersons.filter(person => person.id !== id));
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      Executive: 'bg-red-500',
      HOD: 'bg-purple-500',
      Manager: 'bg-blue-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
            <UserCog className="text-indigo-500" size={36} />
            Key Person Information
          </h1>
          <p className="text-gray-500 mt-1">Important contacts and decision makers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Add Key Person
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Star className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{executives.length}</p>
              <p className="text-sm text-gray-500">Executives</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <UserCog className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{hods.length}</p>
              <p className="text-sm text-gray-500">HODs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{managers.length}</p>
              <p className="text-sm text-gray-500">Managers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <UserCog className="text-indigo-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{keyPersons.length}</p>
              <p className="text-sm text-gray-500">Total Key Persons</p>
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
            placeholder="Search by name, designation, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Key Persons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPersons.map((person) => (
          <div key={person.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-4 mb-4">
              <img src={person.photo} alt={person.name} className="w-16 h-16 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-[#1B254B] text-lg">{person.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold">{person.designation}</p>
                  </div>
                  <span className={`px-3 py-1 ${getCategoryBadge(person.category)} text-white text-xs font-bold rounded-full`}>
                    {person.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building size={14} />
                  <span>{person.department}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <Phone className="text-blue-600 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Direct Line</p>
                  <p className="text-sm font-bold text-[#1B254B]">{person.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                <Mail className="text-purple-600 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Email</p>
                  <p className="text-sm font-bold text-[#1B254B] break-all">{person.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                <MapPin className="text-orange-600 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Office Location</p>
                  <p className="text-sm font-bold text-[#1B254B]">{person.officeLocation}</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 font-semibold mb-1">Availability</p>
                <p className="text-sm font-bold text-[#1B254B]">{person.availability}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => handleEditPerson(person)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDeletePerson(person.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-semibold"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modals */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1B254B]">{showAddModal ? 'Add Key Person' : 'Edit Key Person'}</h2>
                <button onClick={() => { showAddModal ? setShowAddModal(false) : setShowEditModal(false); }} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="e.g., CEO, HOD"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="Executive">Executive</option>
                    <option value="HOD">HOD</option>
                    <option value="Manager">Manager</option>
                  </select>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="email@smg-scooters.com"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Office Location *</label>
                  <input
                    type="text"
                    value={formData.officeLocation}
                    onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="Building - Floor - Room"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Availability *</label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    placeholder="e.g., 9:00 AM - 6:00 PM"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Key Responsibilities</label>
                  <textarea
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none"
                    rows={3}
                    placeholder="List key responsibilities..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={showAddModal ? handleAddPerson : handleUpdatePerson}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  {showAddModal ? 'Add Person' : 'Update Person'}
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
