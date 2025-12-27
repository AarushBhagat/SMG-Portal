import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Users, Star, Phone, Mail, MapPin, Calendar, DollarSign, X } from 'lucide-react';

interface Agency {
  id: string;
  name: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  expertise: string[];
  rating: number;
  activeProjects: number;
  totalBudget: string;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

export const MarketingAgencies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

  const [agencies, setAgencies] = useState<Agency[]>([
    {
      id: 'AGN-001',
      name: 'Creative Minds Agency',
      type: 'Digital Marketing',
      contactPerson: 'Rahul Mehta',
      email: 'contact@creativeminds.com',
      phone: '+91 98765 11111',
      address: 'Cyber City, Gurugram, Haryana',
      expertise: ['SEO', 'PPC', 'Content Marketing', 'Social Media'],
      rating: 4.8,
      activeProjects: 3,
      totalBudget: '₹15,00,000',
      joinedDate: '15 Jan 2023',
      status: 'Active'
    },
    {
      id: 'AGN-002',
      name: 'Social Spark Media',
      type: 'Social Media Marketing',
      contactPerson: 'Priya Singh',
      email: 'hello@socialspark.in',
      phone: '+91 98765 22222',
      address: 'Connaught Place, New Delhi',
      expertise: ['Instagram', 'Facebook', 'LinkedIn', 'Influencer Marketing'],
      rating: 4.5,
      activeProjects: 2,
      totalBudget: '₹8,00,000',
      joinedDate: '20 Mar 2023',
      status: 'Active'
    },
    {
      id: 'AGN-003',
      name: 'Brand Builders Co.',
      type: 'Integrated Marketing',
      contactPerson: 'Amit Kumar',
      email: 'info@brandbuilders.com',
      phone: '+91 98765 33333',
      address: 'Sector 18, Noida, UP',
      expertise: ['Brand Strategy', 'Creative Design', 'Media Planning', 'Events'],
      rating: 4.9,
      activeProjects: 4,
      totalBudget: '₹22,00,000',
      joinedDate: '10 Feb 2022',
      status: 'Active'
    },
    {
      id: 'AGN-004',
      name: 'Direct Mail Pro',
      type: 'Email Marketing',
      contactPerson: 'Sneha Reddy',
      email: 'support@directmailpro.in',
      phone: '+91 98765 44444',
      address: 'MG Road, Bangalore, Karnataka',
      expertise: ['Email Campaigns', 'Marketing Automation', 'Lead Nurturing'],
      rating: 4.2,
      activeProjects: 1,
      totalBudget: '₹3,50,000',
      joinedDate: '5 Aug 2023',
      status: 'Inactive'
    }
  ]);

  const [newAgency, setNewAgency] = useState({
    name: '',
    type: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    expertise: '',
  });

  const filteredAgencies = agencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgency = () => {
    const agency: Agency = {
      id: `AGN-${String(agencies.length + 1).padStart(3, '0')}`,
      name: newAgency.name,
      type: newAgency.type,
      contactPerson: newAgency.contactPerson,
      email: newAgency.email,
      phone: newAgency.phone,
      address: newAgency.address,
      expertise: newAgency.expertise.split(',').map(e => e.trim()),
      rating: 0,
      activeProjects: 0,
      totalBudget: '₹0',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active'
    };
    setAgencies([...agencies, agency]);
    setShowAddModal(false);
    setNewAgency({ name: '', type: '', contactPerson: '', email: '', phone: '', address: '', expertise: '' });
  };

  const handleDeleteAgency = (id: string) => {
    setAgencies(agencies.filter(agency => agency.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Marketing Agencies</h1>
            <p className="text-white/80">Manage and onboard marketing agency partners</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-white text-[#042A5B] px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg"
          >
            <Plus size={20} />
            Add New Agency
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{agencies.filter(a => a.status === 'Active').length}</p>
              <p className="text-sm text-gray-500">Active Agencies</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Star className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">4.6</p>
              <p className="text-sm text-gray-500">Avg Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">₹48.5L</p>
              <p className="text-sm text-gray-500">Total Budget</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">10</p>
              <p className="text-sm text-gray-500">Active Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          <input
            type="text"
            placeholder="Search agencies by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAgencies.map((agency) => (
          <div key={agency.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-[#1B254B]">{agency.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      agency.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {agency.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{agency.id} • {agency.type}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedAgency(agency)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteAgency(agency.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= agency.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-600">{agency.rating.toFixed(1)}</span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-gray-400" />
                  <span className="text-gray-600">{agency.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-600">{agency.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-600">{agency.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-600">{agency.address}</span>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2">
                {agency.expertise.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#1B254B]">{agency.activeProjects}</p>
                  <p className="text-xs text-gray-500">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#1B254B]">{agency.totalBudget}</p>
                  <p className="text-xs text-gray-500">Budget</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-600">{agency.joinedDate}</p>
                  <p className="text-xs text-gray-500">Joined</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agency Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <h2 className="text-2xl font-bold">Add New Marketing Agency</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agency Name</label>
                <input
                  type="text"
                  value={newAgency.name}
                  onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter agency name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agency Type</label>
                <input
                  type="text"
                  value={newAgency.type}
                  onChange={(e) => setNewAgency({ ...newAgency, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Digital Marketing, Social Media"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  value={newAgency.contactPerson}
                  onChange={(e) => setNewAgency({ ...newAgency, contactPerson: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contact person name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newAgency.email}
                    onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newAgency.phone}
                    onChange={(e) => setNewAgency({ ...newAgency, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={newAgency.address}
                  onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise (comma-separated)</label>
                <input
                  type="text"
                  value={newAgency.expertise}
                  onChange={(e) => setNewAgency({ ...newAgency, expertise: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO, PPC, Social Media"
                />
              </div>

              <button
                onClick={handleAddAgency}
                className="w-full bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Add Agency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
