import { useState } from 'react';
import { 
  Radio, 
  Send,
  Users,
  Building2,
  Clock,
  CheckCircle,
  Calendar,
  Eye,
  X
} from 'lucide-react';

interface BroadcastMessage {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'department' | 'role';
  targetValue?: string;
  sentBy: string;
  sentDate: string;
  sentTime: string;
  recipientCount: number;
  status: 'sent' | 'scheduled';
}

export const BroadcastPage = () => {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = useState<BroadcastMessage | null>(null);

  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([
    {
      id: 'BRD-001',
      title: 'Emergency System Maintenance',
      message: 'URGENT: All systems will undergo emergency maintenance tonight from 10 PM to 2 AM. Please save your work and log out before 10 PM.',
      targetAudience: 'all',
      sentBy: 'Super Admin',
      sentDate: '2024-12-27',
      sentTime: '14:30',
      recipientCount: 450,
      status: 'sent'
    },
    {
      id: 'BRD-002',
      title: 'Assembly Department Meeting',
      message: 'Important: All assembly department staff must attend the mandatory safety briefing tomorrow at 9:00 AM in Main Hall.',
      targetAudience: 'department',
      targetValue: 'Assembly',
      sentBy: 'Super Admin',
      sentDate: '2024-12-26',
      sentTime: '16:00',
      recipientCount: 85,
      status: 'sent'
    },
    {
      id: 'BRD-003',
      title: 'Year-End Celebration Announcement',
      message: 'Join us for the Year-End celebration party on December 31st at 6:00 PM. Venue: Company Auditorium. Food, music, and awards ceremony!',
      targetAudience: 'all',
      sentBy: 'Super Admin',
      sentDate: '2024-12-25',
      sentTime: '10:00',
      recipientCount: 450,
      status: 'sent'
    },
    {
      id: 'BRD-004',
      title: 'Admin Training Session',
      message: 'All department admins are requested to join the new portal training session on January 3rd at 11:00 AM via video conference.',
      targetAudience: 'role',
      targetValue: 'Admin',
      sentBy: 'Super Admin',
      sentDate: '2024-12-24',
      sentTime: '12:30',
      recipientCount: 12,
      status: 'sent'
    }
  ]);

  const [newBroadcast, setNewBroadcast] = useState({
    title: '',
    message: '',
    targetAudience: 'all',
    targetValue: ''
  });

  const handleSendBroadcast = () => {
    const newId = `BRD-${(broadcasts.length + 1).toString().padStart(3, '0')}`;
    const now = new Date();
    const recipientCount = newBroadcast.targetAudience === 'all' ? 450 :
                          newBroadcast.targetAudience === 'department' ? 85 : 12;
    
    const broadcast: BroadcastMessage = {
      id: newId,
      title: newBroadcast.title,
      message: newBroadcast.message,
      targetAudience: newBroadcast.targetAudience as 'all' | 'department' | 'role',
      targetValue: newBroadcast.targetValue || undefined,
      sentBy: 'Super Admin',
      sentDate: now.toISOString().split('T')[0],
      sentTime: now.toTimeString().substring(0, 5),
      recipientCount: recipientCount,
      status: 'sent'
    };
    
    setBroadcasts([broadcast, ...broadcasts]);
    setShowSendModal(false);
    setNewBroadcast({
      title: '',
      message: '',
      targetAudience: 'all',
      targetValue: ''
    });
  };

  const getTargetDisplay = (broadcast: BroadcastMessage) => {
    if (broadcast.targetAudience === 'all') return 'All Employees';
    if (broadcast.targetAudience === 'department') return `${broadcast.targetValue} Department`;
    if (broadcast.targetAudience === 'role') return `All ${broadcast.targetValue}s`;
    return 'Unknown';
  };

  const totalSent = broadcasts.filter(b => b.status === 'sent').length;
  const totalRecipients = broadcasts.reduce((sum, b) => sum + b.recipientCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Broadcast Messages</h1>
        <p className="text-blue-100 text-sm">Send instant messages to all employees or specific groups across the company</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Radio size={20} className="text-blue-600" />
            <p className="text-xs font-semibold text-blue-700">BROADCASTS SENT</p>
          </div>
          <p className="text-3xl font-bold text-[#1B254B]">{totalSent}</p>
          <p className="text-xs text-gray-600 mt-1">Total messages sent</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} className="text-blue-600" />
            <p className="text-xs font-semibold text-blue-700">TOTAL RECIPIENTS</p>
          </div>
          <p className="text-3xl font-bold text-[#1B254B]">{totalRecipients}</p>
          <p className="text-xs text-gray-600 mt-1">Messages delivered</p>
        </div>
      </div>

      {/* Send New Broadcast Button */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#1B254B] mb-2">Send New Broadcast Message</h3>
            <p className="text-sm text-gray-600">Instantly notify all employees or specific departments/roles</p>
          </div>
          <button
            onClick={() => setShowSendModal(true)}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all whitespace-nowrap"
          >
            <Radio size={22} />
            Broadcast Message
          </button>
        </div>
      </div>

      {/* Broadcast History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-[#1B254B] mb-4">Broadcast History</h3>

        <div className="space-y-4">
          {broadcasts.map((broadcast) => (
            <div key={broadcast.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Radio size={20} className="text-blue-600" />
                    <h4 className="text-lg font-bold text-[#1B254B]">{broadcast.title}</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      {broadcast.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">{broadcast.message}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-blue-600" />
                      <span>{getTargetDisplay(broadcast)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-blue-600" />
                      <span>{broadcast.recipientCount} recipients</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span>{broadcast.sentDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-600" />
                      <span>{broadcast.sentTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-blue-600" />
                      <span>By: {broadcast.sentBy}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedBroadcast(broadcast);
                    setShowViewModal(true);
                  }}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                  title="View Details"
                >
                  <Eye size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {broadcasts.length === 0 && (
            <div className="text-center py-12">
              <Radio size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No broadcasts sent yet</p>
              <p className="text-sm text-gray-400 mt-2">Send your first broadcast message to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Send Broadcast Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSendModal(false)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
                  <Radio size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1B254B]">Send Broadcast Message</h3>
                  <p className="text-sm text-gray-600">This message will be sent instantly to all selected recipients</p>
                </div>
              </div>
              <button onClick={() => setShowSendModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message Title</label>
                <input
                  type="text"
                  value={newBroadcast.title}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none"
                  placeholder="Enter broadcast title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Broadcast Message</label>
                <textarea
                  value={newBroadcast.message}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none resize-none"
                  placeholder="Type your broadcast message here..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={newBroadcast.targetAudience}
                    onChange={(e) => setNewBroadcast({ ...newBroadcast, targetAudience: e.target.value, targetValue: '' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                  >
                    <option value="all">All Employees (450 people)</option>
                    <option value="department">Specific Department</option>
                    <option value="role">Specific Role</option>
                  </select>
                </div>

                {newBroadcast.targetAudience === 'department' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Department</label>
                    <select
                      value={newBroadcast.targetValue}
                      onChange={(e) => setNewBroadcast({ ...newBroadcast, targetValue: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Department</option>
                      <option value="Assembly">Assembly (85 people)</option>
                      <option value="HR">HR (12 people)</option>
                      <option value="Finance">Finance (18 people)</option>
                      <option value="Marketing">Marketing (15 people)</option>
                      <option value="Technology">Technology (25 people)</option>
                      <option value="Quality">Quality (20 people)</option>
                      <option value="Canteen">Canteen (10 people)</option>
                      <option value="Time Office">Time Office (8 people)</option>
                      <option value="Reception">Reception (6 people)</option>
                      <option value="Transport">Transport (22 people)</option>
                    </select>
                  </div>
                )}

                {newBroadcast.targetAudience === 'role' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Role</label>
                    <select
                      value={newBroadcast.targetValue}
                      onChange={(e) => setNewBroadcast({ ...newBroadcast, targetValue: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B4DA2] focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admins (12 people)</option>
                      <option value="Manager">Managers (25 people)</option>
                      <option value="Supervisor">Supervisors (35 people)</option>
                      <option value="Employee">Employees (378 people)</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Radio size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1B254B] mb-1">Instant Delivery</p>
                    <p className="text-xs text-gray-700">This message will be delivered immediately to all selected recipients via email, SMS, and in-app notifications.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowSendModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendBroadcast}
                disabled={!newBroadcast.title || !newBroadcast.message}
                className="px-6 py-3 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                Send Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Broadcast Modal */}
      {showViewModal && selectedBroadcast && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1B254B]">Broadcast Details</h3>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-[#1B254B] mb-2">{selectedBroadcast.title}</h4>
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
                  {selectedBroadcast.status.toUpperCase()}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-900 leading-relaxed">{selectedBroadcast.message}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">TARGET AUDIENCE</p>
                  <p className="text-sm font-bold text-gray-900">{getTargetDisplay(selectedBroadcast)}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">RECIPIENTS</p>
                  <p className="text-sm font-bold text-gray-900">{selectedBroadcast.recipientCount} people</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">SENT BY</p>
                  <p className="text-sm font-bold text-gray-900">{selectedBroadcast.sentBy}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">SENT DATE & TIME</p>
                  <p className="text-sm font-bold text-gray-900">{selectedBroadcast.sentDate} at {selectedBroadcast.sentTime}</p>
                </div>
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
    </div>
  );
};
