import { useState } from 'react';
import { Search, TrendingUp, Pause, PlayCircle, Eye, BarChart3, DollarSign, Users, X } from 'lucide-react';

interface OngoingCampaign {
  id: string;
  name: string;
  type: string;
  budget: string;
  spent: string;
  roi: string;
  reach: string;
  startDate: string;
  endDate: string;
  agency: string;
  progress: number;
  status: 'Active' | 'Paused';
  impressions: string;
  clicks: string;
  conversions: string;
}

export const OngoingCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState<OngoingCampaign | null>(null);

  const [campaigns, setCampaigns] = useState<OngoingCampaign[]>([
    {
      id: 'CAMP-001',
      name: 'Digital Marketing Q4 2025',
      type: 'Digital',
      budget: '₹8,00,000',
      spent: '₹6,50,000',
      roi: '350%',
      reach: '2.5M',
      startDate: '1 Oct 2025',
      endDate: '31 Dec 2025',
      agency: 'Creative Minds Agency',
      progress: 81,
      status: 'Active',
      impressions: '5.2M',
      clicks: '185K',
      conversions: '12.5K'
    },
    {
      id: 'CAMP-002',
      name: 'Social Media Boost Campaign',
      type: 'Social Media',
      budget: '₹5,00,000',
      spent: '₹4,20,000',
      roi: '280%',
      reach: '1.8M',
      startDate: '15 Nov 2025',
      endDate: '15 Jan 2026',
      agency: 'Social Spark Media',
      progress: 65,
      status: 'Active',
      impressions: '3.8M',
      clicks: '142K',
      conversions: '8.2K'
    },
    {
      id: 'CAMP-005',
      name: 'Year End Clearance Sale',
      type: 'Integrated',
      budget: '₹6,50,000',
      spent: '₹3,80,000',
      roi: '215%',
      reach: '1.2M',
      startDate: '10 Dec 2025',
      endDate: '31 Dec 2025',
      agency: 'Brand Builders Co.',
      progress: 45,
      status: 'Paused',
      impressions: '2.1M',
      clicks: '92K',
      conversions: '5.8K'
    },
    {
      id: 'CAMP-006',
      name: 'Influencer Partnership Drive',
      type: 'Influencer Marketing',
      budget: '₹4,00,000',
      spent: '₹2,50,000',
      roi: '320%',
      reach: '980K',
      startDate: '20 Nov 2025',
      endDate: '20 Jan 2026',
      agency: 'Social Spark Media',
      progress: 58,
      status: 'Active',
      impressions: '1.9M',
      clicks: '78K',
      conversions: '6.1K'
    }
  ]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleToggleStatus = (id: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' as const : 'Active' as const } : c
    ));
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Ongoing Campaigns</h1>
        <p className="text-white/80">Monitor and manage active marketing campaigns</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <PlayCircle className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{campaigns.filter(c => c.status === 'Active').length}</p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Pause className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{campaigns.filter(c => c.status === 'Paused').length}</p>
              <p className="text-sm text-gray-500">Paused</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">288%</p>
              <p className="text-sm text-gray-500">Avg ROI</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">₹17L</p>
              <p className="text-sm text-gray-500">Total Spent</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">6.48M</p>
              <p className="text-sm text-gray-500">Total Reach</p>
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
            {['All', 'Active', 'Paused'].map((status) => (
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
      <div className="grid grid-cols-1 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-[#1B254B]">{campaign.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{campaign.id} • {campaign.type} • {campaign.agency}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(campaign.id)}
                    className={`p-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      campaign.status === 'Active'
                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {campaign.status === 'Active' ? <Pause size={18} /> : <PlayCircle size={18} />}
                    {campaign.status === 'Active' ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => setSelectedCampaign(campaign)}
                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">Campaign Progress</span>
                  <span className="text-sm font-bold text-[#1B254B]">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${getProgressColor(campaign.progress)}`} style={{ width: `${campaign.progress}%` }}></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                  <span>{campaign.startDate}</span>
                  <span>{campaign.endDate}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Budget</p>
                  <p className="text-lg font-bold text-blue-600">{campaign.budget}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Spent</p>
                  <p className="text-lg font-bold text-orange-600">{campaign.spent}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">ROI</p>
                  <p className="text-lg font-bold text-green-600">{campaign.roi}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Reach</p>
                  <p className="text-lg font-bold text-purple-600">{campaign.reach}</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Impressions</p>
                  <p className="text-sm font-bold text-indigo-600">{campaign.impressions}</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Clicks</p>
                  <p className="text-sm font-bold text-pink-600">{campaign.clicks}</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Conversions</p>
                  <p className="text-sm font-bold text-teal-600">{campaign.conversions}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCampaign.name}</h2>
                  <p className="text-white/80 text-sm">{selectedCampaign.id} • {selectedCampaign.type}</p>
                </div>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  selectedCampaign.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedCampaign.status}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold">
                  {selectedCampaign.progress}% Complete
                </span>
              </div>

              {/* Timeline */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600 font-semibold mb-2">Campaign Duration</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1B254B]">{selectedCampaign.startDate}</p>
                    <p className="text-xs text-gray-500">Start Date</p>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1B254B]">{selectedCampaign.endDate}</p>
                    <p className="text-xs text-gray-500">End Date</p>
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-3">Financial Overview</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Total Budget</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedCampaign.budget}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Amount Spent</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedCampaign.spent}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">ROI</p>
                    <p className="text-2xl font-bold text-green-600">{selectedCampaign.roi}</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Total Reach</p>
                    <p className="text-xl font-bold text-purple-600">{selectedCampaign.reach}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Impressions</p>
                    <p className="text-xl font-bold text-indigo-600">{selectedCampaign.impressions}</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-xl border border-pink-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Clicks</p>
                    <p className="text-xl font-bold text-pink-600">{selectedCampaign.clicks}</p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Conversions</p>
                    <p className="text-xl font-bold text-teal-600">{selectedCampaign.conversions}</p>
                  </div>
                </div>
              </div>

              {/* Agency Info */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs text-gray-600 font-semibold mb-1">Marketing Agency</p>
                <p className="text-lg font-bold text-[#1B254B]">{selectedCampaign.agency}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
