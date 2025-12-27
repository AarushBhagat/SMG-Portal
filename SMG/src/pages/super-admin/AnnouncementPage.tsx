import { useState } from 'react';
import { 
  Megaphone, 
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  X,
  Calendar,
  Users,
  Building2,
  AlertCircle
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'department' | 'role';
  targetValue?: string;
  priority: 'high' | 'medium' | 'low';
  createdBy: string;
  createdDate: string;
  expiryDate?: string;
  status: 'active' | 'expired';
}

export const AnnouncementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTarget, setFilterTarget] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ANN-001',
      title: 'Year-End Company Holiday',
      message: 'The company will be closed from December 30th to January 1st for the New Year holidays. Regular operations will resume on January 2nd, 2025.',
      targetAudience: 'all',
      priority: 'high',
      createdBy: 'Super Admin',
      createdDate: '2024-12-20',
      expiryDate: '2025-01-02',
      status: 'active'
    },
    {
      id: 'ANN-002',
      title: 'Assembly Department - Safety Training',
      message: 'Mandatory safety training session for all assembly department employees scheduled for January 5th at 10:00 AM in Conference Hall A.',
      targetAudience: 'department',
      targetValue: 'Assembly',
      priority: 'high',
      createdBy: 'Super Admin',
      createdDate: '2024-12-18',
      expiryDate: '2025-01-05',
      status: 'active'
    },
    {
      id: 'ANN-003',
      title: 'New Employee Benefits Update',
      message: 'We are pleased to announce enhanced medical insurance coverage and increased meal allowance effective from January 1st, 2025. Details have been sent to your email.',
      targetAudience: 'all',
      priority: 'medium',
      createdBy: 'HR Admin',
      createdDate: '2024-12-15',
      status: 'active'
    },
    {
      id: 'ANN-004',
      title: 'HR Department - Document Submission Deadline',
      message: 'All pending employee documents must be submitted to HR by December 31st, 2024. Late submissions will delay salary processing.',
      targetAudience: 'department',
      targetValue: 'HR',
      priority: 'high',
      createdBy: 'Super Admin',
      createdDate: '2024-12-12',
      expiryDate: '2024-12-31',
      status: 'active'
    },
    {
      id: 'ANN-005',
      title: 'Annual Performance Review',
      message: 'Annual performance reviews for all employees will be conducted from January 15-30, 2025. Please ensure your self-assessment forms are completed.',
      targetAudience: 'all',
      priority: 'medium',
      createdBy: 'Super Admin',
      createdDate: '2024-12-10',
      expiryDate: '2025-01-30',
      status: 'active'
    },
    {
      id: 'ANN-006',
      title: 'Cafeteria Menu Update',
      message: 'New healthy meal options have been added to the cafeteria menu. Check the notice board for weekly specials and pricing.',
      targetAudience: 'all',
      priority: 'low',
      createdBy: 'Canteen Admin',
      createdDate: '2024-12-05',
      status: 'active'
    },
    {
      id: 'ANN-007',
      title: 'IT System Maintenance',
      message: 'Scheduled IT system maintenance on December 28th from 2:00 AM to 6:00 AM. All online services will be temporarily unavailable.',
      targetAudience: 'all',
      priority: 'high',
      createdBy: 'IT Admin',
      createdDate: '2024-12-01',
      expiryDate: '2024-12-28',
      status: 'expired'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    targetAudience: 'all',
    targetValue: '',
    priority: 'medium',
    expiryDate: ''
  });

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTarget = filterTarget === 'all' || announcement.targetAudience === filterTarget;
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus;
    return matchesSearch && matchesTarget && matchesStatus;
  });

  const handleCreateAnnouncement = () => {
    const newId = `ANN-${(announcements.length + 1).toString().padStart(3, '0')}`;
    const announcement: Announcement = {
      id: newId,
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      targetAudience: newAnnouncement.targetAudience as 'all' | 'department' | 'role',
      targetValue: newAnnouncement.targetValue || undefined,
      priority: newAnnouncement.priority as 'high' | 'medium' | 'low',
      createdBy: 'Super Admin',
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: newAnnouncement.expiryDate || undefined,
      status: 'active'
    };
    setAnnouncements([announcement, ...announcements]);
    setShowCreateModal(false);
    setNewAnnouncement({
      title: '',
      message: '',
      targetAudience: 'all',
      targetValue: '',
      priority: 'medium',
      expiryDate: ''
    });
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
  };

  const getTargetDisplay = (announcement: Announcement) => {
    if (announcement.targetAudience === 'all') return 'All Employees';
    if (announcement.targetAudience === 'department') return `${announcement.targetValue} Department`;
    if (announcement.targetAudience === 'role') return `${announcement.targetValue} Role`;
    return 'Unknown';
  };

  const activeCount = announcements.filter(a => a.status === 'active').length;
  const expiredCount = announcements.filter(a => a.status === 'expired').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Announcements</h1>
        <p className="text-blue-100 text-sm">Create and manage company-wide announcements for employees and departments</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone size={20} className="text-blue-600" />
            <p className="text-xs font-semibold text-blue-700">ACTIVE</p>
          </div>
          <p className="text-3xl font-bold text-[#1B254B]">{activeCount}</p>
          <p className="text-xs text-gray-600 mt-1">Current announcements</p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={20} className="text-gray-600" />
            <p className="text-xs font-semibold text-gray-700">EXPIRED</p>
          </div>
          <p className="text-3xl font-bold text-[#1B254B]">{expiredCount}</p>
          <p className="text-xs text-gray-600 mt-1">Past announcements</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all"
            />
          </div>

          <select
            value={filterTarget}
            onChange={(e) => setFilterTarget(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Audiences</option>
            <option value="all">All Employees</option>
            <option value="department">Department Specific</option>
            <option value="role">Role Specific</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all whitespace-nowrap"
          >
            <Plus size={20} />
            New Announcement
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing <span className="font-bold text-[#0B4DA2]">{filteredAnnouncements.length}</span> of <span className="font-bold">{announcements.length}</span> announcements
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[#1B254B]">{announcement.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadgeColor(announcement.priority)}`}>
                    {announcement.priority.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(announcement.status)}`}>
                    {announcement.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{announcement.message}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-blue-600" />
                    <span>{getTargetDisplay(announcement)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span>Posted: {announcement.createdDate}</span>
                  </div>
                  {announcement.expiryDate && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-blue-600" />
                      <span>Expires: {announcement.expiryDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-blue-600" />
                    <span>By: {announcement.createdBy}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedAnnouncement(announcement);
                    setShowViewModal(true);
                  }}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  title="View"
                >
                  <Eye size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setSelectedAnnouncement(announcement);
                    setShowEditModal(true);
                  }}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  title="Edit"
                >
                  <Edit3 size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  title="Delete"
                >
                  <Trash2 size={18} className="text-red-600 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Megaphone size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No announcements found</p>
            <p className="text-sm text-gray-400 mt-2">Create your first announcement to get started</p>
          </div>
        )}
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1B254B]">Create New Announcement</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  placeholder="Enter announcement title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none resize-none"
                  placeholder="Enter announcement message"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={newAnnouncement.targetAudience}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, targetAudience: e.target.value, targetValue: '' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="all">All Employees</option>
                    <option value="department">Specific Department</option>
                    <option value="role">Specific Role</option>
                  </select>
                </div>

                {newAnnouncement.targetAudience === 'department' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Department</label>
                    <select
                      value={newAnnouncement.targetValue}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, targetValue: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Department</option>
                      <option value="Assembly">Assembly</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Technology">Technology</option>
                      <option value="Quality">Quality</option>
                      <option value="Canteen">Canteen</option>
                      <option value="Time Office">Time Office</option>
                      <option value="Reception">Reception</option>
                      <option value="Transport">Transport</option>
                    </select>
                  </div>
                )}

                {newAnnouncement.targetAudience === 'role' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Role</label>
                    <select
                      value={newAnnouncement.targetValue}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, targetValue: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Role</option>
                      <option value="Employee">Employee</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Supervisor">Supervisor</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={newAnnouncement.expiryDate}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, expiryDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAnnouncement}
                className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Create Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1B254B]">Announcement Details</h3>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-[#1B254B] mb-2">{selectedAnnouncement.title}</h4>
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadgeColor(selectedAnnouncement.priority)}`}>
                    {selectedAnnouncement.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(selectedAnnouncement.status)}`}>
                    {selectedAnnouncement.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-900 leading-relaxed">{selectedAnnouncement.message}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">TARGET AUDIENCE</p>
                  <p className="text-sm font-bold text-gray-900">{getTargetDisplay(selectedAnnouncement)}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">CREATED BY</p>
                  <p className="text-sm font-bold text-gray-900">{selectedAnnouncement.createdBy}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">CREATED DATE</p>
                  <p className="text-sm font-bold text-gray-900">{selectedAnnouncement.createdDate}</p>
                </div>

                {selectedAnnouncement.expiryDate && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">EXPIRY DATE</p>
                    <p className="text-sm font-bold text-gray-900">{selectedAnnouncement.expiryDate}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Announcement Modal */}
      {showEditModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1B254B]">Edit Announcement</h3>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Title</label>
                <input
                  type="text"
                  defaultValue={selectedAnnouncement.title}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  placeholder="Enter announcement title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  defaultValue={selectedAnnouncement.message}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none resize-none"
                  placeholder="Enter announcement message"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
                  <select
                    defaultValue={selectedAnnouncement.targetAudience}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="all">All Employees</option>
                    <option value="department">Specific Department</option>
                    <option value="role">Specific Role</option>
                  </select>
                </div>

                {selectedAnnouncement.targetAudience === 'department' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <select
                      defaultValue={selectedAnnouncement.targetValue}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Department</option>
                      <option value="Assembly">Assembly</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Technology">Technology</option>
                      <option value="Quality">Quality</option>
                      <option value="Canteen">Canteen</option>
                      <option value="Time Office">Time Office</option>
                      <option value="Reception">Reception</option>
                      <option value="Transport">Transport</option>
                    </select>
                  </div>
                )}

                {selectedAnnouncement.targetAudience === 'role' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                    <select
                      defaultValue={selectedAnnouncement.targetValue}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Role</option>
                      <option value="Employee">Employee</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Supervisor">Supervisor</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    defaultValue={selectedAnnouncement.priority}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    defaultValue={selectedAnnouncement.expiryDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  defaultValue={selectedAnnouncement.status}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
