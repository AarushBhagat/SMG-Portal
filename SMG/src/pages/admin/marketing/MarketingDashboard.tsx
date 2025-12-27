import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Users, MapPin, BarChart3 } from 'lucide-react';

interface Campaign {
  id: string;
  campaign_name: string;
  campaign_manager: string;
  campaign_team: string[];
  targeted_area: string;
  start_date: string | null;
  end_date: string | null;
  notes: string;
  status: string;
  budget_file_name: string | null;
  budget_file_data: string | null;
  assets: any[];
  created_at: string;
}

interface MarketingDashboardProps {
  onNavigate: (page: string) => void;
}

export const MarketingDashboard = ({ onNavigate }: MarketingDashboardProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    upcoming: 0,
    completed: 0,
    teamMembers: 0,
    targetedAreas: 0
  });

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = () => {
    const data = localStorage.getItem('marketing_campaigns');
    const loadedCampaigns: Campaign[] = data ? JSON.parse(data) : [];
    setCampaigns(loadedCampaigns);

    // Calculate stats
    const today = new Date();
    let active = 0;
    let upcoming = 0;
    let completed = 0;
    const teamSet = new Set<string>();
    const areaSet = new Set<string>();

    loadedCampaigns.forEach(c => {
      // Count team members
      c.campaign_team?.forEach(member => teamSet.add(member));
      
      // Count areas
      if (c.targeted_area) areaSet.add(c.targeted_area);

      // Count status
      if (c.start_date && c.end_date) {
        const start = new Date(c.start_date);
        const end = new Date(c.end_date);
        
        if (today < start) upcoming++;
        else if (today > end) completed++;
        else active++;
      }
    });

    setStats({
      total: loadedCampaigns.length,
      active,
      upcoming,
      completed,
      teamMembers: teamSet.size,
      targetedAreas: areaSet.size
    });
  };

  const getRecentCampaigns = () => {
    return campaigns
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  };

  const getCampaignStatus = (campaign: Campaign) => {
    if (!campaign.start_date || !campaign.end_date) return 'Inactive';
    
    const today = new Date();
    const start = new Date(campaign.start_date);
    const end = new Date(campaign.end_date);
    
    if (today < start) return 'Upcoming';
    if (today > end) return 'Completed';
    return 'Active';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Upcoming': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const statCards = [
    { label: 'Total Campaigns', value: stats.total, icon: TrendingUp, color: 'bg-blue-100 text-blue-600', change: `${campaigns.length} total` },
    { label: 'Active Campaigns', value: stats.active, icon: Calendar, color: 'bg-green-100 text-green-600', change: `${stats.active} running` },
    { label: 'Upcoming', value: stats.upcoming, icon: BarChart3, color: 'bg-purple-100 text-purple-600', change: `${stats.upcoming} scheduled` },
    { label: 'Team Members', value: stats.teamMembers, icon: Users, color: 'bg-orange-100 text-orange-600', change: `${stats.teamMembers} active` },
    { label: 'Targeted Areas', value: stats.targetedAreas, icon: MapPin, color: 'bg-pink-100 text-pink-600', change: `${stats.targetedAreas} regions` },
    { label: 'Completed', value: stats.completed, icon: TrendingUp, color: 'bg-gray-100 text-gray-600', change: `${stats.completed} finished` }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Marketing Dashboard</h1>
        <p className="text-white/80">Track and manage all your marketing campaigns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-3xl font-bold text-[#1B254B] mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('create-campaign')}
            className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-6 text-white text-left hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={24} />
              <h3 className="font-bold text-lg">Create New Campaign</h3>
            </div>
            <p className="text-white/80 text-sm">Launch a new marketing campaign</p>
          </button>

          <button
            onClick={() => onNavigate('campaigns')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 text-white text-left hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={24} />
              <h3 className="font-bold text-lg">View All Campaigns</h3>
            </div>
            <p className="text-white/80 text-sm">Manage existing campaigns</p>
          </button>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1B254B]">Recent Campaigns</h2>
          <button
            onClick={() => onNavigate('campaigns')}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All →
          </button>
        </div>

        {getRecentCampaigns().length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-medium">No campaigns yet</p>
            <p className="text-sm mt-1">Create your first marketing campaign to get started</p>
            <button
              onClick={() => onNavigate('create-campaign')}
              className="mt-4 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {getRecentCampaigns().map(campaign => (
              <div key={campaign.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1B254B]">{campaign.campaign_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Manager:</span> {campaign.campaign_manager} • 
                      <span className="font-medium ml-2">Area:</span> {campaign.targeted_area || 'Not specified'}
                    </p>
                    {campaign.start_date && campaign.end_date && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(getCampaignStatus(campaign))}`}>
                      {getCampaignStatus(campaign)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
