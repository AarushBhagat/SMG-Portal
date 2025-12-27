import { useState } from 'react';
import { Plus, Search, Calendar, DollarSign, Target, Users, Eye, CheckCircle, X } from 'lucide-react';

interface NewCampaign {
  id: string;
  name: string;
  type: string;
  budget: string;
  startDate: string;
  endDate: string;
  agency: string;
  objective: string;
  targetAudience: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
  submittedDate: string;
}

export const NewCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<NewCampaign | null>(null);

  const [campaigns, setCampaigns] = useState<NewCampaign[]>([
    {
      id: 'NC-001',
      name: 'Summer Sale 2026 Campaign',
      type: 'Social Media',
      budget: '₹6,00,000',
      startDate: '1 Apr 2026',
      endDate: '30 Jun 2026',
      agency: 'Social Spark Media',
      objective: 'Increase brand awareness and drive sales during summer season',
      targetAudience: 'Age 18-35, Urban areas, Middle-income group',
      status: 'Under Review',
      submittedDate: '15 Dec 2025'
    },
    {
      id: 'NC-002',
      name: 'New Product Launch Campaign',
      type: 'Integrated',
      budget: '₹12,00,000',
      startDate: '1 Feb 2026',
      endDate: '31 Mar 2026',
      agency: 'Brand Builders Co.',
      objective: 'Launch new electric scooter model with multi-channel campaign',
      targetAudience: 'Age 25-45, Eco-conscious consumers, Metro cities',
      status: 'Approved',
      submittedDate: '10 Dec 2025'
    },
    {
      id: 'NC-003',
      name: 'Email Nurture Campaign Q1',
      type: 'Email Marketing',
      budget: '₹1,50,000',
      startDate: '1 Jan 2026',
      endDate: '31 Mar 2026',
      agency: 'Direct Mail Pro',
      objective: 'Nurture existing leads and convert to customers',
      targetAudience: 'Website visitors, Newsletter subscribers',
      status: 'Draft',
      submittedDate: '20 Dec 2025'
    },
    {
      id: 'NC-004',
      name: 'Festive Season Campaign',
      type: 'Digital',
      budget: '₹8,50,000',
      startDate: '15 Oct 2026',
      endDate: '15 Nov 2026',
      agency: 'Creative Minds Agency',
      objective: 'Boost sales during Diwali festival period',
      targetAudience: 'All age groups, Pan-India, Festival shoppers',
      status: 'Rejected',
      submittedDate: '5 Dec 2025'
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: '',
    budget: '',
    startDate: '',
    endDate: '',
    agency: '',
    objective: '',
    targetAudience: '',
  });

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddCampaign = () => {
    const campaign: NewCampaign = {
      id: `NC-${String(campaigns.length + 1).padStart(3, '0')}`,
      ...newCampaign,
      status: 'Draft',
      submittedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setCampaigns([...campaigns, campaign]);
    setShowAddModal(false);
    setNewCampaign({ name: '', type: '', budget: '', startDate: '', endDate: '', agency: '', objective: '', targetAudience: '' });
  };

  const handleApprove = (id: string) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'Approved' as const } : c));
    setSelectedCampaign(null);
  };

  const handleReject = (id: string) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'Rejected' as const } : c));
    setSelectedCampaign(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-700';
      case 'Under Review': return 'bg-yellow-100 text-yellow-700';
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">New Campaign Proposals</h1>
            <p className="text-white/80">Submit and manage new campaign proposals</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-white text-[#042A5B] px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg"
          >
            <Plus size={20} />
            New Campaign
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Target className="text-gray-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{campaigns.filter(c => c.status === 'Draft').length}</p>
              <p className="text-sm text-gray-500">Draft</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Eye className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{campaigns.filter(c => c.status === 'Under Review').length}</p>
              <p className="text-sm text-gray-500">Under Review</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{campaigns.filter(c => c.status === 'Approved').length}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <X className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{campaigns.filter(c => c.status === 'Rejected').length}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Draft', 'Under Review', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
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

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1B254B] mb-1">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">{campaign.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Campaign Type</p>
                  <p className="text-sm font-bold text-[#1B254B]">{campaign.type}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Budget</p>
                  <p className="text-sm font-bold text-green-600">{campaign.budget}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Agency</p>
                  <p className="text-sm font-bold text-[#1B254B] truncate">{campaign.agency}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Duration</p>
                  <p className="text-xs font-bold text-[#1B254B]">{campaign.startDate}</p>
                  <p className="text-xs text-gray-500">to {campaign.endDate}</p>
                </div>
              </div>

              {/* Objective */}
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-1">Objective</p>
                <p className="text-sm text-[#1B254B] line-clamp-2">{campaign.objective}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Submitted: {campaign.submittedDate}</p>
                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="px-4 py-2 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <h2 className="text-2xl font-bold">New Campaign Proposal</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter campaign name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Type</label>
                  <input
                    type="text"
                    value={newCampaign.type}
                    onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digital, Social Media, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget</label>
                  <input
                    type="text"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹5,00,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    type="text"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1 Jan 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                  <input
                    type="text"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="31 Mar 2026"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marketing Agency</label>
                <input
                  type="text"
                  value={newCampaign.agency}
                  onChange={(e) => setNewCampaign({ ...newCampaign, agency: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select or enter agency name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Objective</label>
                <textarea
                  value={newCampaign.objective}
                  onChange={(e) => setNewCampaign({ ...newCampaign, objective: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Describe campaign objectives"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
                <textarea
                  value={newCampaign.targetAudience}
                  onChange={(e) => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Describe target audience"
                />
              </div>

              <button
                onClick={handleAddCampaign}
                className="w-full bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Submit Campaign Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCampaign.name}</h2>
                  <p className="text-white/80 text-sm">{selectedCampaign.id}</p>
                </div>
                <button onClick={() => setSelectedCampaign(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className={`px-4 py-2 rounded-xl text-sm font-bold ${getStatusColor(selectedCampaign.status)}`}>
                  {selectedCampaign.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Campaign Type</p>
                  <p className="font-bold text-[#1B254B]">{selectedCampaign.type}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Budget</p>
                  <p className="font-bold text-green-600 text-xl">{selectedCampaign.budget}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Start Date</p>
                  <p className="font-bold text-[#1B254B]">{selectedCampaign.startDate}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-semibold mb-1">End Date</p>
                  <p className="font-bold text-[#1B254B]">{selectedCampaign.endDate}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs text-gray-600 font-semibold mb-2">Marketing Agency</p>
                <p className="font-bold text-[#1B254B]">{selectedCampaign.agency}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Campaign Objective</p>
                <p className="text-gray-600 p-4 bg-gray-50 rounded-xl">{selectedCampaign.objective}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Target Audience</p>
                <p className="text-gray-600 p-4 bg-gray-50 rounded-xl">{selectedCampaign.targetAudience}</p>
              </div>

              {selectedCampaign.status === 'Under Review' && (
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedCampaign.id)}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Approve Campaign
                  </button>
                  <button
                    onClick={() => handleReject(selectedCampaign.id)}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Reject Campaign
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
