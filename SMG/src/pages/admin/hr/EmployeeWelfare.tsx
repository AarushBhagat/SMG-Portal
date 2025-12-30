import { useState } from 'react';
import { Heart, School, Hospital, FileText, Download, Plus, AlertCircle, CheckCircle, Clock, X, Eye } from 'lucide-react';

export const EmployeeWelfare = () => {
  const [activeTab, setActiveTab] = useState('schools');
  const [showAddInstitutionModal, setShowAddInstitutionModal] = useState(false);
  const [showAddHospitalModal, setShowAddHospitalModal] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [showAddGrievanceModal, setShowAddGrievanceModal] = useState(false);
  const [selectedGrievance, setSelectedGrievance] = useState<any>(null);

  const [schools, setSchools] = useState([
    {
      id: 1,
      name: 'Delhi Public School',
      type: 'School',
      location: 'Sector 45, Noida',
      contact: '+91 120-1234567',
    },
    {
      id: 3,
      name: 'Amity University',
      type: 'College',
      location: 'Sector 125, Noida',
      contact: '+91 120-9876543',
    },
  ]);

  const [hospitals, setHospitals] = useState([
    {
      id: 2,
      name: 'Fortis Hospital',
      type: 'Medical',
      location: 'Sector 62, Noida',
      contact: '+91 120-7654321',
    },
  ]);

  const [newInstitution, setNewInstitution] = useState({
    name: '',
    type: '',
    location: '',
    contact: ''
  });

  const [newHospital, setNewHospital] = useState({
    name: '',
    location: '',
    contact: '',
    specialization: ''
  });

  const [newGrievance, setNewGrievance] = useState({
    employeeName: '',
    subject: '',
    description: '',
    department: '',
    category: '',
    priority: ''
  });

  const [grievances, setGrievances] = useState([
    {
      id: 'GR-001',
      employeeName: 'Rahul Kumar',
      subject: 'Work Environment Issue',
      submittedDate: '2024-12-15',
      status: 'Resolved',
      priority: 'Medium',
      description: 'The air conditioning in the office is not working properly, causing discomfort during working hours.',
      department: 'Operations',
      category: 'Workplace',
      resolution: 'AC unit was repaired and is now functioning properly. Maintenance scheduled for quarterly checks.'
    },
    {
      id: 'GR-002',
      employeeName: 'Priya Sharma',
      subject: 'Salary Discrepancy',
      submittedDate: '2024-12-20',
      status: 'In Progress',
      priority: 'High',
      description: 'There is a discrepancy in my salary for the month of November. The overtime hours were not calculated correctly.',
      department: 'Sales',
      category: 'Payroll',
      resolution: ''
    },
    {
      id: 'GR-003',
      employeeName: 'Amit Singh',
      subject: 'Leave Approval Delay',
      submittedDate: '2024-12-23',
      status: 'Open',
      priority: 'Low',
      description: 'My leave application submitted on 15th December has not been approved yet. I need to plan my travel.',
      department: 'HR',
      category: 'Leave Management',
      resolution: ''
    },
  ]);

  const handleAddInstitution = () => {
    const institution = {
      id: schools.length + 1,
      ...newInstitution
    };
    setSchools([...schools, institution]);
    setShowAddInstitutionModal(false);
    setNewInstitution({ name: '', type: '', location: '', contact: '' });
  };

  const handleAddHospital = () => {
    const hospital = {
      id: hospitals.length + 1,
      name: newHospital.name,
      type: 'Medical',
      location: newHospital.location,
      contact: newHospital.contact,
      specialization: newHospital.specialization
    };
    setHospitals([...hospitals, hospital]);
    setShowAddHospitalModal(false);
    setNewHospital({ name: '', location: '', contact: '', specialization: '' });
  };

  const handleViewGrievance = (grievance: any) => {
    setSelectedGrievance(grievance);
    setShowGrievanceModal(true);
  };

  const handleAddGrievance = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const grievanceId = `GR-${String(grievances.length + 1).padStart(3, '0')}`;
    const grievance = {
      id: grievanceId,
      submittedDate: formattedDate,
      status: 'Open',
      resolution: '',
      ...newGrievance
    };
    setGrievances([...grievances, grievance]);
    setShowAddGrievanceModal(false);
    setNewGrievance({
      employeeName: '',
      subject: '',
      description: '',
      department: '',
      category: '',
      priority: ''
    });
  };

  const tabs = [
    { id: 'schools', label: 'Educational Institutions' },
    { id: 'hospitals', label: 'Medical Facilities' },
    { id: 'grievances', label: 'Grievance Redressal' },
    { id: 'policies', label: 'Policy Documents' },
  ];

  const policies = [
    { name: 'Leave Policy', icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { name: 'Code of Conduct', icon: FileText, color: 'bg-purple-50 text-purple-600' },
    { name: 'Health & Safety', icon: Heart, color: 'bg-red-50 text-red-600' },
    { name: 'Travel Policy', icon: FileText, color: 'bg-green-50 text-green-600' },
    { name: 'IT Policy', icon: FileText, color: 'bg-orange-50 text-orange-600' },
    { name: 'Grievance Policy', icon: FileText, color: 'bg-pink-50 text-pink-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Employee Welfare</h2>
            <p className="text-white/80">Support Services, Institutions & Policies</p>
          </div>
          <div className="flex gap-3">
            {activeTab === 'schools' && (
              <button 
                onClick={() => setShowAddInstitutionModal(true)}
                className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                Add Institution
              </button>
            )}
            {activeTab === 'hospitals' && (
              <button 
                onClick={() => setShowAddHospitalModal(true)}
                className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                Add Hospital
              </button>
            )}
            {activeTab === 'grievances' && (
              <button 
                onClick={() => setShowAddGrievanceModal(true)}
                className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                New Grievance
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
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

      {/* Schools Tab */}
      {activeTab === 'schools' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Institution Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schools.map((institution) => (
                  <tr key={institution.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          institution.type === 'School' ? 'bg-blue-50' :
                          institution.type === 'Medical' ? 'bg-red-50' : 'bg-purple-50'
                        }`}>
                          {institution.type === 'Medical' ? (
                            <Hospital size={20} className="text-red-600" />
                          ) : (
                            <School size={20} className={
                              institution.type === 'School' ? 'text-blue-600' : 'text-purple-600'
                            } />
                          )}
                        </div>
                        <span className="font-medium text-[#1B254B]">{institution.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        institution.type === 'School' ? 'bg-blue-50 text-blue-600' :
                        institution.type === 'Medical' ? 'bg-red-50 text-red-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {institution.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{institution.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600">{institution.contact}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-bold">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hospitals Tab */}
      {activeTab === 'hospitals' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Hospital Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {hospitals.map((hospital) => (
                  <tr key={hospital.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50">
                          <Hospital size={20} className="text-red-600" />
                        </div>
                        <span className="font-medium text-[#1B254B]">{hospital.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{hospital.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600">{hospital.contact}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-bold">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grievances */}
      {activeTab === 'grievances' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Grievance ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {grievances.map((grievance) => (
                  <tr key={grievance.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#1B254B]">{grievance.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#1B254B]">{grievance.employeeName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{grievance.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{grievance.submittedDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        grievance.priority === 'High' ? 'bg-red-50 text-red-600' :
                        grievance.priority === 'Medium' ? 'bg-orange-50 text-orange-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {grievance.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {grievance.status === 'Resolved' && <CheckCircle size={16} className="text-green-600" />}
                        {grievance.status === 'In Progress' && <Clock size={16} className="text-orange-600" />}
                        {grievance.status === 'Open' && <AlertCircle size={16} className="text-blue-600" />}
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          grievance.status === 'Resolved' ? 'bg-green-50 text-green-600' :
                          grievance.status === 'In Progress' ? 'bg-orange-50 text-orange-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {grievance.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleViewGrievance(grievance)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-bold flex items-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Policy Documents */}
      {activeTab === 'policies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 ${policy.color} rounded-xl flex items-center justify-center`}>
                  <policy.icon size={28} />
                </div>
                <h3 className="font-bold text-lg text-[#1B254B]">{policy.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Download the {policy.name.toLowerCase()} document for detailed information and guidelines.
              </p>
              <button className="w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Download size={18} />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Institution Modal */}
      {showAddInstitutionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">Add Educational Institution</h2>
              <button onClick={() => setShowAddInstitutionModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Institution Name *</label>
                <input
                  type="text"
                  value={newInstitution.name}
                  onChange={(e) => setNewInstitution({...newInstitution, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Delhi Public School"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Type *</label>
                <select
                  value={newInstitution.type}
                  onChange={(e) => setNewInstitution({...newInstitution, type: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="University">University</option>
                  <option value="Training Center">Training Center</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={newInstitution.location}
                  onChange={(e) => setNewInstitution({...newInstitution, location: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Sector 45, Noida"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number *</label>
                <input
                  type="text"
                  value={newInstitution.contact}
                  onChange={(e) => setNewInstitution({...newInstitution, contact: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="+91 120-1234567"
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200">
              <button onClick={() => setShowAddInstitutionModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleAddInstitution}
                disabled={!newInstitution.name || !newInstitution.type || !newInstitution.location || !newInstitution.contact}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
                Add Institution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Hospital Modal */}
      {showAddHospitalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">Add Medical Facility</h2>
              <button onClick={() => setShowAddHospitalModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hospital Name *</label>
                <input
                  type="text"
                  value={newHospital.name}
                  onChange={(e) => setNewHospital({...newHospital, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Fortis Hospital"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                <input
                  type="text"
                  value={newHospital.specialization}
                  onChange={(e) => setNewHospital({...newHospital, specialization: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Multi-specialty, Cardiac Care"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  value={newHospital.location}
                  onChange={(e) => setNewHospital({...newHospital, location: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Sector 62, Noida"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number *</label>
                <input
                  type="text"
                  value={newHospital.contact}
                  onChange={(e) => setNewHospital({...newHospital, contact: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="+91 120-7654321"
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200">
              <button onClick={() => setShowAddHospitalModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleAddHospital}
                disabled={!newHospital.name || !newHospital.location || !newHospital.contact}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
                Add Hospital
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grievance Details Modal */}
      {showGrievanceModal && selectedGrievance && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Grievance Details</h2>
                <p className="text-white/80 text-sm mt-1">{selectedGrievance.id}</p>
              </div>
              <button onClick={() => setShowGrievanceModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Employee Name</p>
                  <p className="font-bold text-[#1B254B]">{selectedGrievance.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Department</p>
                  <p className="font-bold text-[#1B254B]">{selectedGrievance.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Submitted Date</p>
                  <p className="font-bold text-[#1B254B]">{selectedGrievance.submittedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Category</p>
                  <p className="font-bold text-[#1B254B]">{selectedGrievance.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Priority</p>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-block ${
                    selectedGrievance.priority === 'High' ? 'bg-red-50 text-red-600' :
                    selectedGrievance.priority === 'Medium' ? 'bg-orange-50 text-orange-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {selectedGrievance.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold inline-block ${
                    selectedGrievance.status === 'Resolved' ? 'bg-green-50 text-green-600' :
                    selectedGrievance.status === 'In Progress' ? 'bg-orange-50 text-orange-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {selectedGrievance.status}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-2">Subject</p>
                <p className="font-bold text-[#1B254B] text-lg">{selectedGrievance.subject}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-semibold mb-2">Description</p>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedGrievance.description}</p>
              </div>

              {selectedGrievance.resolution && (
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-2">Resolution</p>
                  <p className="text-gray-700 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">{selectedGrievance.resolution}</p>
                </div>
              )}
            </div>
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200">
              <button onClick={() => setShowGrievanceModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                Close
              </button>
              <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                <Download size={20} />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Grievance Modal */}
      {showAddGrievanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">New Grievance</h2>
                <p className="text-white/80 text-sm mt-1">Submit a new employee grievance</p>
              </div>
              <button onClick={() => setShowAddGrievanceModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Employee Name *</label>
                <input
                  type="text"
                  value={newGrievance.employeeName}
                  onChange={(e) => setNewGrievance({...newGrievance, employeeName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="Enter employee name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department *</label>
                  <select
                    value={newGrievance.department}
                    onChange={(e) => setNewGrievance({...newGrievance, department: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Department</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Technical">Technical</option>
                    <option value="R&D">R&D</option>
                    <option value="Production">Production</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select
                    value={newGrievance.category}
                    onChange={(e) => setNewGrievance({...newGrievance, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Workplace">Workplace</option>
                    <option value="Payroll">Payroll</option>
                    <option value="Leave Management">Leave Management</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Safety">Safety</option>
                    <option value="Benefits">Benefits</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Priority *</label>
                <select
                  value={newGrievance.priority}
                  onChange={(e) => setNewGrievance({...newGrievance, priority: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  value={newGrievance.subject}
                  onChange={(e) => setNewGrievance({...newGrievance, subject: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="Brief subject of the grievance"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={newGrievance.description}
                  onChange={(e) => setNewGrievance({...newGrievance, description: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                  rows={4}
                  placeholder="Provide detailed description of the grievance"
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200 sticky bottom-0">
              <button onClick={() => setShowAddGrievanceModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleAddGrievance}
                disabled={!newGrievance.employeeName || !newGrievance.subject || !newGrievance.description || !newGrievance.department || !newGrievance.category || !newGrievance.priority}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
                Submit Grievance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
