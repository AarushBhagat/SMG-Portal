import { useState } from 'react';
import { FileText, Eye, CheckCircle, XCircle, Download, Plus, Send, Filter } from 'lucide-react';

export const MRFApproval = () => {
  const [showNewMRFModal, setShowNewMRFModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMRF, setSelectedMRF] = useState<any>(null);
  const [vacancyType, setVacancyType] = useState('new');
  
  const [formData, setFormData] = useState({
    ccnNumber: '',
    date: new Date().toISOString().split('T')[0],
    vacancies: [
      {
        designation: '',
        noOfVacancies: '',
        skills: '',
        experience: '',
        jobDescription: '',
        department: '',
        jobLocation: '',
        ctc: '',
      }
    ],
    reportingSupervisor: '',
    hodApproval: false,
    directorApproval: false,
    hrVerification: false,
  });

  const mrfRequests = [
    {
      id: 'MRF-001',
      ccnNumber: '2333246910',
      date: '8/11/2025',
      designation: 'Sr Designing Officer',
      noOfVacancies: 39,
      department: 'R&D',
      status: 'Pending Approval',
      submittedBy: 'Mr Parwinder Singh',
    },
    {
      id: 'MRF-002',
      ccnNumber: '2333246911',
      date: '10/11/2025',
      designation: 'EV Showroom Executives',
      noOfVacancies: 25,
      department: 'SALES',
      status: 'Approved',
      submittedBy: 'Ms Priya Sharma',
    },
    {
      id: 'MRF-003',
      ccnNumber: '2333246912',
      date: '12/11/2025',
      designation: 'EV Service Technician',
      noOfVacancies: 32,
      department: 'ASSEMBLY',
      status: 'Pending Approval',
      submittedBy: 'Mr Rajesh Kumar',
    },
  ];

  const handleAddVacancy = () => {
    setFormData({
      ...formData,
      vacancies: [
        ...formData.vacancies,
        {
          designation: '',
          noOfVacancies: '',
          skills: '',
          experience: '',
          jobDescription: '',
          department: '',
          jobLocation: '',
          ctc: '',
        }
      ]
    });
  };

  const handleRemoveVacancy = (index: number) => {
    const newVacancies = formData.vacancies.filter((_, i) => i !== index);
    setFormData({ ...formData, vacancies: newVacancies });
  };

  const handleVacancyChange = (index: number, field: string, value: string) => {
    const newVacancies = [...formData.vacancies];
    newVacancies[index] = { ...newVacancies[index], [field]: value };
    setFormData({ ...formData, vacancies: newVacancies });
  };

  const handleSubmitMRF = () => {
    console.log('MRF Submitted:', formData);
    alert('MRF submitted for Super Admin approval!');
    setShowNewMRFModal(false);
    // Reset form
    setFormData({
      ccnNumber: '',
      date: new Date().toISOString().split('T')[0],
      vacancies: [{
        designation: '',
        noOfVacancies: '',
        skills: '',
        experience: '',
        jobDescription: '',
        department: '',
        jobLocation: '',
        ctc: '',
      }],
      reportingSupervisor: '',
      hodApproval: false,
      directorApproval: false,
      hrVerification: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">MRF & Job Description Management</h2>
            <p className="text-white/80">Manpower Requirement Forms & Job Descriptions</p>
          </div>
          <button
            onClick={() => setShowNewMRFModal(true)}
            className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            New MRF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-600">Filter:</span>
          </div>
          <select className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none text-sm">
            <option>All Status</option>
            <option>Pending Approval</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <select className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none text-sm">
            <option>All Departments</option>
            <option>R&D</option>
            <option>Sales</option>
            <option>Assembly</option>
            <option>Production</option>
          </select>
        </div>
      </div>

      {/* MRF List */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">MRF ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">CCN Number</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Designation</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Vacancies</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Department</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mrfRequests.map((mrf) => (
                <tr key={mrf.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#1B254B]">{mrf.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{mrf.ccnNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{mrf.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#1B254B]">{mrf.designation}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[#0B4DA2]">{mrf.noOfVacancies}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-600">{mrf.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      mrf.status === 'Approved' 
                        ? 'bg-green-50 text-green-600' 
                        : mrf.status === 'Rejected'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {mrf.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedMRF(mrf);
                          setShowViewModal(true);
                        }}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Download PDF"
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

      {/* New MRF Modal */}
      {showNewMRFModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex-shrink-0">
              <h2 className="text-2xl font-bold">New Manpower Requirement Form</h2>
              <p className="text-white/80 text-sm mt-1">SMG Electric Scooters Ltd</p>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">{/* This ensures scrollable content */}
              {/* Vacancy Type */}
              <div className="mb-6 bg-yellow-50 p-4 rounded-xl">
                <label className="block text-sm font-bold text-gray-700 mb-3">VACANCY TYPE</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={vacancyType === 'new'}
                      onChange={() => setVacancyType('new')}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">NEW VACANCY</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={vacancyType === 'replacement'}
                      onChange={() => setVacancyType('replacement')}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">REPLACEMENT VACANCY</span>
                  </label>
                </div>
              </div>

              {/* CCN Number and Date */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">CCN NUMBER</label>
                  <input
                    type="text"
                    value={formData.ccnNumber}
                    onChange={(e) => setFormData({ ...formData, ccnNumber: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    placeholder="2333246910"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">DATE</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  />
                </div>
              </div>

              {/* Vacancy Details */}
              {formData.vacancies.map((vacancy, index) => (
                <div key={index} className="mb-6 p-4 border-2 border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Vacancy #{index + 1}</h3>
                    {formData.vacancies.length > 1 && (
                      <button
                        onClick={() => handleRemoveVacancy(index)}
                        className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-bold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">DESIGNATION *</label>
                      <input
                        type="text"
                        value={vacancy.designation}
                        onChange={(e) => handleVacancyChange(index, 'designation', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                        placeholder="Sr Designing Officer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">NO OF VACANCIES *</label>
                      <input
                        type="number"
                        value={vacancy.noOfVacancies}
                        onChange={(e) => handleVacancyChange(index, 'noOfVacancies', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                        placeholder="39"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">SKILLS *</label>
                      <input
                        type="text"
                        value={vacancy.skills}
                        onChange={(e) => handleVacancyChange(index, 'skills', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                        placeholder="Autocad, Catia, Nx, Solidworks"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">EXPERIENCE *</label>
                      <input
                        type="text"
                        value={vacancy.experience}
                        onChange={(e) => handleVacancyChange(index, 'experience', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                        placeholder="Fresher / Experience"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">DEPARTMENT *</label>
                      <select
                        value={vacancy.department}
                        onChange={(e) => handleVacancyChange(index, 'department', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                      >
                        <option value="">Select Department</option>
                        <option value="R&D">R&D</option>
                        <option value="SALES">SALES</option>
                        <option value="ASSEMBLY">ASSEMBLY (Production)</option>
                        <option value="HR">HR</option>
                        <option value="FINANCE">FINANCE</option>
                        <option value="MARKETING">MARKETING</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">JOB LOCATION *</label>
                      <input
                        type="text"
                        value={vacancy.jobLocation}
                        onChange={(e) => handleVacancyChange(index, 'jobLocation', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                        placeholder="Mumbai, Delhi, Gurgaon"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">CTC *</label>
                      <input
                        type="text"
                        value={vacancy.ctc}
                        onChange={(e) => handleVacancyChange(index, 'ctc', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                        placeholder="₹3-4 LAKHS"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">JOB DESCRIPTION *</label>
                      <textarea
                        value={vacancy.jobDescription}
                        onChange={(e) => handleVacancyChange(index, 'jobDescription', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none resize-none"
                        placeholder="1) Designing Of Ev parts and Components. 2) Designing Of the Ev Body. 3)Knowledge Of Cad /Solidworks/Catia"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddVacancy}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#0B4DA2] hover:text-[#0B4DA2] font-bold transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Another Vacancy
              </button>

              {/* Reporting Supervisor */}
              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">NAME & SIGNATURE OF REPORTING SUPERVISOR</label>
                <input
                  type="text"
                  value={formData.reportingSupervisor}
                  onChange={(e) => setFormData({ ...formData, reportingSupervisor: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  placeholder="Mr Parwinder Singh"
                />
              </div>
            </div>

            {/* Modal Footer - Fixed at bottom */}
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => setShowNewMRFModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitMRF}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Send size={20} />
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedMRF && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white">
              <h2 className="text-2xl font-bold">MRF Details - {selectedMRF.id}</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-semibold">CCN Number</p>
                  <p className="font-bold text-[#1B254B]">{selectedMRF.ccnNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Date</p>
                  <p className="font-bold text-[#1B254B]">{selectedMRF.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Designation</p>
                  <p className="font-bold text-[#1B254B]">{selectedMRF.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">No of Vacancies</p>
                  <p className="font-bold text-[#1B254B]">{selectedMRF.noOfVacancies}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Department</p>
                  <p className="font-bold text-[#1B254B]">{selectedMRF.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Submitted By</p>
                  <p className="font-bold text-[#1B254B]">{selectedMRF.submittedBy}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
