import { useState } from 'react';
import { UserPlus, Download, FileSpreadsheet, CreditCard, Book, Briefcase, Eye } from 'lucide-react';

export const JoiningForms = () => {
  const [showNewJoiningModal, setShowNewJoiningModal] = useState(false);

  const joiningForms = [
    {
      id: 'JF-001',
      employeeName: 'Rahul Kumar',
      position: 'EV Service Technician',
      joinDate: '2025-01-15',
      status: 'Completed',
      idCardGenerated: true,
      handbookProvided: true,
    },
    {
      id: 'JF-002',
      employeeName: 'Priya Sharma',
      position: 'Sales Executive',
      joinDate: '2025-01-20',
      status: 'Pending',
      idCardGenerated: false,
      handbookProvided: false,
    },
  ];

  const handleExportToExcel = () => {
    alert('Exporting all joining forms to Excel...');
  };

  const handleGenerateIDCard = (employee: any) => {
    alert(`Generating ID Card for ${employee.employeeName}...`);
  };

  const handleGenerateBusinessCard = (employee: any) => {
    alert(`Generating Digital Business Card for ${employee.employeeName}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Joining Forms Management</h2>
            <p className="text-white/80">Employee Onboarding & Documentation</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportToExcel}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <FileSpreadsheet size={20} />
              Export to Excel
            </button>
            <button
              onClick={() => setShowNewJoiningModal(true)}
              className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <UserPlus size={20} />
              New Joining Form
            </button>
          </div>
        </div>
      </div>

      {/* Joining Forms Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Form ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Employee Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Position</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Join Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {joiningForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#1B254B]">{form.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#1B254B]">{form.employeeName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{form.position}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{form.joinDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      form.status === 'Completed' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleGenerateIDCard(form)}
                        disabled={form.idCardGenerated}
                        className={`p-2 rounded-lg transition-colors ${
                          form.idCardGenerated
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                        title={form.idCardGenerated ? 'ID Card Generated' : 'Generate ID Card'}
                      >
                        <CreditCard size={18} />
                      </button>
                      <button
                        onClick={() => handleGenerateBusinessCard(form)}
                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                        title="Generate Digital Business Card"
                      >
                        <Briefcase size={18} />
                      </button>
                      <button
                        disabled={form.handbookProvided}
                        className={`p-2 rounded-lg transition-colors ${
                          form.handbookProvided
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                        }`}
                        title={form.handbookProvided ? 'Handbook Provided' : 'Provide Handbook'}
                      >
                        <Book size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
