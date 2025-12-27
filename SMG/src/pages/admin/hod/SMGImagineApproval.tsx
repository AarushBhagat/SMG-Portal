import { useState } from 'react';
import { Search, Eye, Check, X, Lightbulb, User, Calendar, FileText, TrendingUp } from 'lucide-react';

interface ImagineIdea {
  id: string;
  empId: string;
  empName: string;
  title: string;
  category: 'Process' | 'Product' | 'Cost Saving' | 'Safety' | 'Quality';
  description: string;
  expectedBenefit: string;
  submittedOn: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
}

export const SMGImagineApproval = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedIdea, setSelectedIdea] = useState<ImagineIdea | null>(null);

  const [ideas, setIdeas] = useState<ImagineIdea[]>([
    {
      id: 'IMG001',
      empId: 'SMG-EMP-245',
      empName: 'Amit Kumar',
      title: 'Digital Attendance Tracking System',
      category: 'Process',
      description: 'Implement QR code-based attendance system to eliminate manual registers and reduce errors',
      expectedBenefit: 'Save 2 hours daily in attendance management, 100% accuracy',
      submittedOn: '22 Dec 2025',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 'IMG002',
      empId: 'SMG-EMP-312',
      empName: 'Priya Singh',
      title: 'Automated Quality Check System',
      category: 'Quality',
      description: 'Use AI-powered cameras for instant quality inspection on production line',
      expectedBenefit: 'Reduce defects by 40%, faster inspection process',
      submittedOn: '23 Dec 2025',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 'IMG003',
      empId: 'SMG-EMP-189',
      empName: 'Rahul Verma',
      title: 'Energy-Efficient LED Lighting',
      category: 'Cost Saving',
      description: 'Replace all factory lights with motion-sensor LED lights',
      expectedBenefit: 'Save ₹50,000 monthly on electricity bills',
      submittedOn: '20 Dec 2025',
      status: 'Approved',
      priority: 'Medium'
    }
  ]);

  const handleApprove = (id: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, status: 'Approved' as const } : idea
    ));
    setSelectedIdea(null);
  };

  const handleReject = (id: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, status: 'Rejected' as const } : idea
    ));
    setSelectedIdea(null);
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         idea.empName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || idea.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = ideas.filter(i => i.status === 'Pending').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">SMG IMAGINE Approval</h1>
            <p className="text-white/80">Review and approve innovative ideas from your team</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
            <div className="text-4xl font-bold">{pendingCount}</div>
            <div className="text-sm text-white/80">Pending</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Search by idea title or employee name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
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

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    <Lightbulb className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1B254B] mb-1">{idea.title}</h3>
                    <p className="text-sm text-gray-500">{idea.id}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    idea.priority === 'High' ? 'bg-red-100 text-red-700' :
                    idea.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {idea.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    idea.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    idea.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {idea.status}
                  </span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  {idea.category}
                </span>
              </div>

              {/* Employee Info */}
              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-gray-400" />
                <span className="font-semibold text-[#1B254B]">{idea.empName}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{idea.empId}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">{idea.description}</p>

              {/* Expected Benefit */}
              <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                <div className="flex items-start gap-2">
                  <TrendingUp size={16} className="text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-green-700 font-semibold mb-1">Expected Benefit</p>
                    <p className="text-sm text-green-900">{idea.expectedBenefit}</p>
                  </div>
                </div>
              </div>

              {/* Submitted Date */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>Submitted on {idea.submittedOn}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedIdea(idea)}
                  className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Eye size={16} />
                  View Details
                </button>
                {idea.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(idea.id)}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(idea.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">{selectedIdea.title}</h2>
                  <p className="text-white/80 text-sm">Idea ID: {selectedIdea.id}</p>
                </div>
                <button
                  onClick={() => setSelectedIdea(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <User className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Submitted By</p>
                      <p className="font-bold text-[#1B254B]">{selectedIdea.empName}</p>
                      <p className="text-sm text-gray-600">{selectedIdea.empId}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Submitted On</p>
                      <p className="font-bold text-[#1B254B]">{selectedIdea.submittedOn}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Category</p>
                      <p className="font-bold text-[#1B254B]">{selectedIdea.category}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="text-blue-500 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Description</p>
                      <p className="font-semibold text-[#1B254B]">{selectedIdea.description}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="text-green-600 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-green-700 font-semibold mb-1">Expected Benefit</p>
                      <p className="font-bold text-green-800">{selectedIdea.expectedBenefit}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedIdea.status === 'Pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleApprove(selectedIdea.id)}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Approve Idea
                  </button>
                  <button
                    onClick={() => handleReject(selectedIdea.id)}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Reject Idea
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
