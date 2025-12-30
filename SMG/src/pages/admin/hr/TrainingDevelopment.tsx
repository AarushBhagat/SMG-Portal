import { useState } from 'react';
import { GraduationCap, Plus, Calendar, Users, Download, Send, Award, X } from 'lucide-react';

export const TrainingDevelopment = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [showAddTrainingModal, setShowAddTrainingModal] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState([
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
  ]);

  const [upcomingTrainings, setUpcomingTrainings] = useState([
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
  ]);

  const [newTraining, setNewTraining] = useState({
    trainingName: '',
    date: '',
    duration: '',
    participants: '',
    department: '',
    trainer: ''
  });

  const handleAddTraining = () => {
    const trainingId = `UT-${String(upcomingTrainings.length + 1).padStart(3, '0')}`;
    const training = {
      id: trainingId,
      ...newTraining,
      participants: parseInt(newTraining.participants)
    };
    setUpcomingTrainings([...upcomingTrainings, training]);
    setShowAddTrainingModal(false);
    setActiveTab('upcoming'); // Switch to upcoming tab to show the new training
    setNewTraining({
      trainingName: '',
      date: '',
      duration: '',
      participants: '',
      department: '',
      trainer: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Training & Development</h2>
            <p className="text-white/80">Employee Training Programs & Skill Development</p>
          </div>
          <button 
            onClick={() => setShowAddTrainingModal(true)}
            className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
          >
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
          ))}        </div>
      )}

      {/* Add Training Modal */}
      {showAddTrainingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Add New Training</h2>
                <p className="text-white/80 text-sm mt-1">Schedule a new training program</p>
              </div>
              <button
                onClick={() => setShowAddTrainingModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Training Information */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1B254B] text-lg border-b-2 border-gray-200 pb-2">Training Information</h3>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Training Name *</label>
                  <input
                    type="text"
                    value={newTraining.trainingName}
                    onChange={(e) => setNewTraining({...newTraining, trainingName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Advanced EV Servicing"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department *</label>
                    <select
                      value={newTraining.department}
                      onChange={(e) => setNewTraining({...newTraining, department: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Department</option>
                      <option value="Technical">Technical</option>
                      <option value="Management">Management</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="R&D">R&D</option>
                      <option value="Production">Production</option>
                      <option value="Quality">Quality</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trainer Name *</label>
                    <input
                      type="text"
                      value={newTraining.trainer}
                      onChange={(e) => setNewTraining({...newTraining, trainer: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., Mr Rajesh Gupta"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1B254B] text-lg border-b-2 border-gray-200 pb-2">Schedule Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      value={newTraining.date}
                      onChange={(e) => setNewTraining({...newTraining, date: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Duration *</label>
                    <select
                      value={newTraining.duration}
                      onChange={(e) => setNewTraining({...newTraining, duration: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Duration</option>
                      <option value="Half Day">Half Day</option>
                      <option value="1 Day">1 Day</option>
                      <option value="2 Days">2 Days</option>
                      <option value="3 Days">3 Days</option>
                      <option value="5 Days">5 Days</option>
                      <option value="1 Week">1 Week</option>
                      <option value="2 Weeks">2 Weeks</option>
                      <option value="1 Month">1 Month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expected Participants *</label>
                  <input
                    type="number"
                    value={newTraining.participants}
                    onChange={(e) => setNewTraining({...newTraining, participants: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    placeholder="Enter number of participants"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200 sticky bottom-0">
              <button
                onClick={() => setShowAddTrainingModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTraining}
                disabled={!newTraining.trainingName || !newTraining.date || !newTraining.duration || !newTraining.department}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
                Add Training
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
