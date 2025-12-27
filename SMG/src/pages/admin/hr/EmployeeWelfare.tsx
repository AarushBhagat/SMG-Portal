import { useState } from 'react';
import { Heart, School, Hospital, FileText, Download, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const EmployeeWelfare = () => {
  const [activeTab, setActiveTab] = useState('institutions');

  const institutions = [
    {
      id: 1,
      name: 'Delhi Public School',
      type: 'School',
      location: 'Sector 45, Noida',
      contact: '+91 120-1234567',
    },
    {
      id: 2,
      name: 'Fortis Hospital',
      type: 'Medical',
      location: 'Sector 62, Noida',
      contact: '+91 120-7654321',
    },
    {
      id: 3,
      name: 'Amity University',
      type: 'College',
      location: 'Sector 125, Noida',
      contact: '+91 120-9876543',
    },
  ];

  const grievances = [
    {
      id: 'GR-001',
      employeeName: 'Rahul Kumar',
      subject: 'Work Environment Issue',
      submittedDate: '2024-12-15',
      status: 'Resolved',
      priority: 'Medium',
    },
    {
      id: 'GR-002',
      employeeName: 'Priya Sharma',
      subject: 'Salary Discrepancy',
      submittedDate: '2024-12-20',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 'GR-003',
      employeeName: 'Amit Singh',
      subject: 'Leave Approval Delay',
      submittedDate: '2024-12-23',
      status: 'Open',
      priority: 'Low',
    },
  ];

  const policies = [
    { name: 'Leave Policy', icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { name: 'Code of Conduct', icon: FileText, color: 'bg-purple-50 text-purple-600' },
    { name: 'Health & Safety', icon: Heart, color: 'bg-red-50 text-red-600' },
    { name: 'Travel Policy', icon: FileText, color: 'bg-green-50 text-green-600' },
    { name: 'IT Policy', icon: FileText, color: 'bg-orange-50 text-orange-600' },
    { name: 'Grievance Policy', icon: FileText, color: 'bg-pink-50 text-pink-600' },
  ];

  const tabs = [
    { id: 'institutions', label: 'Institutions List' },
    { id: 'grievances', label: 'Grievance Redressal' },
    { id: 'policies', label: 'Policy Documents' },
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
          {activeTab === 'institutions' && (
            <button className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
              <Plus size={20} />
              Add Institution
            </button>
          )}
          {activeTab === 'grievances' && (
            <button className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
              <Plus size={20} />
              New Grievance
            </button>
          )}
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

      {/* Institutions List */}
      {activeTab === 'institutions' && (
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
                {institutions.map((institution) => (
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
    </div>
  );
};
