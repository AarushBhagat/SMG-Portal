import { useState } from 'react';
import { Search, BarChart3, TrendingUp, DollarSign, Users, Eye, X } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Completed' | 'Paused';
  budget: string;
  spent: string;
  roi: string;
  reach: string;
  startDate: string;
  endDate: string;
  agency: string;
  performance: number;
}

export const CampaignStatus = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'CAMP-001',
      name: 'Digital Marketing Q4 2025',
      type: 'Digital',
      status: 'Active',
      budget: '₹8,00,000',
      spent: '₹6,50,000',
      roi: '350%',
      reach: '2.5M',
      startDate: '1 Oct 2025',
      endDate: '31 Dec 2025',
      agency: 'Creative Minds Agency',
      performance: 90
    },
    {
      id: 'CAMP-002',
      name: 'Social Media Boost Campaign',
      type: 'Social Media',
      status: 'Active',
      budget: '₹5,00,000',
      spent: '₹4,20,000',
      roi: '280%',
      reach: '1.8M',
      startDate: '15 Nov 2025',
      endDate: '15 Jan 2026',
      agency: 'Social Spark Media',
      performance: 75
    },
    {
      id: 'CAMP-003',
      name: 'Brand Awareness Drive',
      type: 'Integrated',
      status: 'Completed',
      budget: '₹10,00,000',
      spent: '₹9,80,000',
      roi: '195%',
      reach: '3.2M',
      startDate: '1 Sep 2025',
      endDate: '30 Nov 2025',
      agency: 'Brand Builders Co.',
      performance: 85
    },
    {
      id: 'CAMP-004',
      name: 'Email Marketing Campaign',
      type: 'Email',
      status: 'Paused',
      budget: '₹2,00,000',
      spent: '₹1,20,000',
      roi: '145%',
      reach: '500K',
      startDate: '10 Nov 2025',
      endDate: '10 Dec 2025',
      agency: 'Direct Mail Pro',
      performance: 60
    }
  ]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'bg-green-500';
    if (performance >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Marketing Campaign Status</h1>
        <p className="text-white/80">Track all campaign performance and analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{campaigns.filter(c => c.status === 'Active').length}</p>
              <p className="text-sm text-gray-500">Active Campaigns</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">245%</p>
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
              <p className="text-2xl font-bold text-[#1B254B]">₹25L</p>
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
              <p className="text-2xl font-bold text-[#1B254B]">8.0M</p>
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
              placeholder="Search campaigns by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Active', 'Completed', 'Paused'].map((status) => (
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

      {/* Campaigns Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">Campaign ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Campaign Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-bold">ROI</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Reach</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Performance</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#1B254B]">{campaign.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1B254B]">{campaign.name}</p>
                    <p className="text-xs text-gray-500">Agency: {campaign.agency}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1B254B]">{campaign.budget}</p>
                    <p className="text-xs text-gray-500">Spent: {campaign.spent}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-bold text-lg">{campaign.roi}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#1B254B]">{campaign.reach}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-600">{campaign.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getPerformanceColor(campaign.performance)}`} style={{ width: `${campaign.performance}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">Campaign Details</h2>
                  <p className="text-white/80 text-sm">{selectedCampaign.id}</p>
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
              {/* Campaign Info */}
              <div>
                <h3 className="text-xl font-bold text-[#1B254B] mb-4">{selectedCampaign.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Campaign Type</p>
                    <p className="font-bold text-[#1B254B]">{selectedCampaign.type}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedCampaign.status)}`}>
                      {selectedCampaign.status}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Marketing Agency</p>
                    <p className="font-bold text-[#1B254B]">{selectedCampaign.agency}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Performance</p>
                    <p className="font-bold text-[#1B254B]">{selectedCampaign.performance}%</p>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-3">Financial Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Total Budget</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedCampaign.budget}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Amount Spent</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedCampaign.spent}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Return on Investment</p>
                    <p className="text-2xl font-bold text-green-600">{selectedCampaign.roi}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Total Reach</p>
                    <p className="text-2xl font-bold text-purple-600">{selectedCampaign.reach}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-3">Campaign Timeline</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Start Date</p>
                    <p className="font-bold text-[#1B254B]">{selectedCampaign.startDate}</p>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold mb-1">End Date</p>
                    <p className="font-bold text-[#1B254B]">{selectedCampaign.endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
