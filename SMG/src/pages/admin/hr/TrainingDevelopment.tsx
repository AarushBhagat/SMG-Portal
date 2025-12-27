import { useState } from 'react';
import { GraduationCap, Plus, Calendar, Users, Download, Send, Award } from 'lucide-react';

export const TrainingDevelopment = () => {
  const [activeTab, setActiveTab] = useState('history');

  const trainingHistory = [
    {
      id: 'TR-001',
      employeeName: 'Rahul Kumar',
      trainingName: 'Safety & Compliance',
      date: '2024-12-15',
      duration: '2 Days',
      status: 'Completed',
      certificateIssued: true,
    },
    {
      id: 'TR-002',
      employeeName: 'Priya Sharma',
      trainingName: 'Customer Service Excellence',
      date: '2024-12-18',
      duration: '1 Day',
      status: 'Completed',
      certificateIssued: true,
    },
    {
      id: 'TR-003',
      employeeName: 'Amit Singh',
      trainingName: 'EV Technology Basics',
      date: '2024-12-20',
      duration: '3 Days',
      status: 'In Progress',
      certificateIssued: false,
    },
  ];

  const upcomingTrainings = [
    {
      id: 'UT-001',
      trainingName: 'Advanced EV Servicing',
      date: '2025-01-10',
      duration: '5 Days',
      participants: 25,
      department: 'Technical',
      trainer: 'Mr Rajesh Gupta',
    },
    {
      id: 'UT-002',
      trainingName: 'Leadership Development',
      date: '2025-01-15',
      duration: '2 Days',
      participants: 15,
      department: 'Management',
      trainer: 'Ms Priya Sharma',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Training & Development</h2>
            <p className="text-white/80">Employee Training Programs & Skill Development</p>
          </div>
          <button className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
            <Plus size={20} />
            Add Training
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Training History
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Upcoming Trainings
          </button>
        </div>
      </div>

      {/* Training History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-lg text-[#1B254B]">Training Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Training ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Employee Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Training Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {trainingHistory.map((training) => (
                  <tr key={training.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#1B254B]">{training.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#1B254B]">{training.employeeName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{training.trainingName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{training.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{training.duration}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        training.status === 'Completed' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {training.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {training.certificateIssued ? (
                        <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                          <Award size={18} />
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">Not Issued</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upcoming Trainings */}
      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTrainings.map((training) => (
            <div key={training.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] rounded-xl flex items-center justify-center">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1B254B]">{training.trainingName}</h3>
                    <p className="text-sm text-gray-500">{training.department}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-600">
                    <strong>{training.date}</strong> • {training.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-gray-400" />
                  <span className="text-gray-600">
                    <strong>{training.participants}</strong> participants
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap size={16} className="text-gray-400" />
                  <span className="text-gray-600">Trainer: <strong>{training.trainer}</strong></span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-4 py-2 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Send size={16} />
                  Share Info
                </button>
                <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
