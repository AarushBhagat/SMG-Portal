import { useState } from 'react';
import { ClipboardList, Download, Send, Eye, Plus, Calendar, User, Printer } from 'lucide-react';

export const InterviewManagement = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showNewInterviewModal, setShowNewInterviewModal] = useState(false);

  const scheduledInterviews = [
    {
      id: 'INT-001',
      candidateName: 'Rahul Kumar',
      position: 'Sr Designing Officer',
      date: '2025-12-28',
      time: '10:00 AM',
      interviewer: 'Mr Parwinder Singh',
      status: 'Scheduled',
      type: 'Walk-in'
    },
    {
      id: 'INT-002',
      candidateName: 'Priya Sharma',
      position: 'EV Showroom Executive',
      date: '2025-12-29',
      time: '02:00 PM',
      interviewer: 'Ms Meera Gupta',
      status: 'Scheduled',
      type: 'Scheduled'
    },
  ];

  const tabs = [
    { id: 'scheduled', label: 'Scheduled Interviews' },
    { id: 'assessment', label: 'Assessment Sheet' },
    { id: 'schedule-sheet', label: 'Schedule Sheet' },
    { id: 'curriculum', label: 'Curriculum Sheet' },
    { id: 'biodata', label: 'Bio Data Form' },
  ];

  const handleShareToReception = (interview: any) => {
    alert(`Interview details for ${interview.candidateName} shared with Reception!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Interview Management</h2>
            <p className="text-white/80">Schedule, Assess & Manage Candidate Interviews</p>
          </div>
          <button
            onClick={() => setShowNewInterviewModal(true)}
            className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scheduled Interviews */}
      {activeTab === 'scheduled' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Interview ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Candidate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Interviewer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduledInterviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#1B254B]">{interview.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#1B254B]">{interview.candidateName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{interview.position}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-[#1B254B]">{interview.date}</div>
                        <div className="text-sm text-gray-500">{interview.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{interview.interviewer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        interview.type === 'Walk-in' 
                          ? 'bg-purple-50 text-purple-600' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {interview.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-600">
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {interview.type === 'Walk-in' && (
                          <button
                            onClick={() => handleShareToReception(interview)}
                            className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                            title="Share to Reception"
                          >
                            <Send size={18} />
                          </button>
                        )}
                        <button
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assessment Sheet */}
      {activeTab === 'assessment' && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="text-center py-12">
            <ClipboardList size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-[#1B254B] mb-2">Interview Assessment Sheet</h3>
            <p className="text-gray-500 mb-6">Download template or create new assessment</p>
            <div className="flex gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                <Download size={20} />
                Download Template
              </button>
              <button className="bg-white border-2 border-[#0B4DA2] text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                <Printer size={20} />
                Print Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Sheet */}
      {activeTab === 'schedule-sheet' && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-[#1B254B] mb-2">Interview Schedule Sheet</h3>
            <p className="text-gray-500 mb-6">Download or print interview schedule template</p>
            <div className="flex gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                <Download size={20} />
                Download Template
              </button>
              <button className="bg-white border-2 border-[#0B4DA2] text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                <Printer size={20} />
                Print Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Sheet */}
      {activeTab === 'curriculum' && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="text-center py-12">
            <ClipboardList size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-[#1B254B] mb-2">Interview Curriculum Sheet</h3>
            <p className="text-gray-500 mb-6">Download or print curriculum template</p>
            <div className="flex gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                <Download size={20} />
                Download Template
              </button>
              <button className="bg-white border-2 border-[#0B4DA2] text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                <Printer size={20} />
                Print Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bio Data Form */}
      {activeTab === 'biodata' && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="text-center py-12">
            <User size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-[#1B254B] mb-2">Bio Data Form</h3>
            <p className="text-gray-500 mb-6">Download or print bio data template</p>
            <div className="flex gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                <Download size={20} />
                Download Template
              </button>
              <button className="bg-white border-2 border-[#0B4DA2] text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                <Printer size={20} />
                Print Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
