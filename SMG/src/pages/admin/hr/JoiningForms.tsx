import { useState } from 'react';
import { UserPlus, Download, FileSpreadsheet, CreditCard, Book, Briefcase, Eye, Upload, ChevronRight, X, ClipboardList } from 'lucide-react';

export const JoiningForms = () => {
  const [showNewJoiningModal, setShowNewJoiningModal] = useState(false);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showIDCardModal, setShowIDCardModal] = useState(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [formStep, setFormStep] = useState(1); // 1 = Basic Info, 2 = Detailed Info
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Step 1: Basic Joining Information
  const [basicInfo, setBasicInfo] = useState({
    employeeName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    dateOfBirth: '',
    bloodGroup: '',
    placeOfBirth: '',
    domicileState: '',
    qualification: '',
    experience: '',
    dateOfJoining: '',
    designationGrade: '',
    costCenter: '',
    panNumber: '',
    aadharNumber: '',
    uanNumber: '',
    bankAccountNumber: '',
    addressPermanent: '',
    contactNumber: '',
    jobLocation: '',
    photo: null as File | null,
  });

  // Step 2: Detailed Personal Information
  const [detailedInfo, setDetailedInfo] = useState({
    firstName: '',
    lastName: '',
    permanentAddress: '',
    communicationAddress: '',
    permanentCity: '',
    permanentPinCode: '',
    permanentState: '',
    communicationCity: '',
    communicationPinCode: '',
    communicationState: '',
    contactNo1: '',
    contactNo2: '',
    email: '',
    majorIllness: '',
    majorSurgery: '',
    emergencyContactName: '',
    emergencyContactPlace: '',
    emergencyContactRelationship: '',
    emergencyContactNumber: '',
    // Family Background
    familyMembers: [
      { relationship: 'Father/Guardian', name: '', gender: '', dob: '', age: '', qualification: '', occupation: '' },
      { relationship: 'Mother', name: '', gender: '', dob: '', age: '', qualification: '', occupation: '' },
      { relationship: 'Spouse', name: '', gender: '', dob: '', age: '', qualification: '', occupation: '' },
      { relationship: 'Children (Son/Daughter)', name: '', gender: '', dob: '', age: '', qualification: '', occupation: '' },
    ],
    // Education
    educationRecords: [
      { qualification: '', schoolCollege: '', board: '', startYear: '', endYear: '', marksPercentage: '', branchOfStudy: '' },
    ],
  });

  const joiningForms = [
    {
      id: 'JF-001',
      employeeName: 'Rahul Kumar',
      position: 'EV Service Technician',
      joinDate: '2025-01-15',
      status: 'Completed',
      idCardGenerated: true,
      handbookProvided: true,
      // Mock complete details
      fatherName: 'Vijay Kumar',
      motherName: 'Sunita Kumar',
      dateOfBirth: '1995-06-15',
      bloodGroup: 'O+',
      contactNumber: '+91 98765 43210',
      email: 'rahul.kumar@smgelectric.com',
      permanentAddress: 'Flat 402, Green Valley Apartments, Sector 12, Noida, UP - 201301',
      panNumber: 'ABCDE1234F',
      aadharNumber: '1234-5678-9012',
      bankAccountNumber: 'HDFC-12345678901234',
    },
    {
      id: 'JF-002',
      employeeName: 'Priya Sharma',
      position: 'Sales Executive',
      joinDate: '2025-01-20',
      status: 'Pending',
      idCardGenerated: false,
      handbookProvided: false,
      // Mock complete details
      fatherName: 'Rajesh Sharma',
      motherName: 'Anita Sharma',
      dateOfBirth: '1997-03-22',
      bloodGroup: 'A+',
      contactNumber: '+91 98765 12345',
      email: 'priya.sharma@smgelectric.com',
      permanentAddress: 'House 24, Shanti Nagar, Delhi - 110018',
      panNumber: 'FGHIJ5678K',
      aadharNumber: '9876-5432-1098',
      bankAccountNumber: 'ICICI-98765432109876',
    },
  ];

  const handleExportToExcel = () => {
    alert('Exporting all joining forms to Excel...');
  };

  const handleViewDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setShowViewDetailsModal(true);
  };

  const handleGenerateIDCard = (employee: any) => {
    setSelectedEmployee(employee);
    setShowIDCardModal(true);
  };

  const handleViewCurriculum = (employee: any) => {
    setSelectedEmployee(employee);
    setShowCurriculumModal(true);
  };

  const handleGenerateBusinessCard = (employee: any) => {
    alert(`Generating Digital Business Card for ${employee.employeeName}...`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBasicInfo({ ...basicInfo, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStep1Submit = () => {
    // Validate Step 1
    if (!basicInfo.employeeName || !basicInfo.dateOfJoining) {
      alert('Please fill all required fields');
      return;
    }
    setFormStep(2);
  };

  const handleFinalSubmit = () => {
    console.log('Basic Info:', basicInfo);
    console.log('Detailed Info:', detailedInfo);
    alert('Joining form submitted successfully!');
    setShowNewJoiningModal(false);
    setFormStep(1);
    // Reset forms
  };

  const addEducationRecord = () => {
    setDetailedInfo({
      ...detailedInfo,
      educationRecords: [
        ...detailedInfo.educationRecords,
        { qualification: '', schoolCollege: '', board: '', startYear: '', endYear: '', marksPercentage: '', branchOfStudy: '' }
      ]
    });
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
                        onClick={() => handleViewDetails(form)}
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
                      <button
                        onClick={() => handleGenerateIDCard(form)}
                        className="p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Generate ID Card"
                      >
                        <CreditCard size={18} />
                      </button>
                      <button
                        onClick={() => handleViewCurriculum(form)}
                        className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                        title="View Curriculum"
                      >
                        <ClipboardList size={18} />
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

      {/* New Joining Form Modal */}
      {showNewJoiningModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex-shrink-0">
              <h2 className="text-2xl font-bold">
                {formStep === 1 ? 'JOINING INFORMATION' : 'Personal Details Form'}
              </h2>
              <p className="text-white/80 text-sm mt-1">
                {formStep === 1 ? 'Step 1 of 2 - Basic Information (TO BE FILLED IN CAPITAL LETTERS)' : 'Step 2 of 2 - Comprehensive Details'}
              </p>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* STEP 1: Basic Joining Information */}
              {formStep === 1 && (
                <div className="space-y-6">
                  {/* Photo Upload */}
                  <div className="flex justify-end">
                    <div className="w-32 h-40 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <label className="cursor-pointer text-center p-4">
                          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500">Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Employee Name</label>
                      <input
                        type="text"
                        value={basicInfo.employeeName}
                        onChange={(e) => setBasicInfo({ ...basicInfo, employeeName: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Father's Name</label>
                      <input
                        type="text"
                        value={basicInfo.fatherName}
                        onChange={(e) => setBasicInfo({ ...basicInfo, fatherName: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Mother's Name</label>
                      <input
                        type="text"
                        value={basicInfo.motherName}
                        onChange={(e) => setBasicInfo({ ...basicInfo, motherName: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Spouse's Name</label>
                      <input
                        type="text"
                        value={basicInfo.spouseName}
                        onChange={(e) => setBasicInfo({ ...basicInfo, spouseName: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Date Of Birth</label>
                      <input
                        type="date"
                        value={basicInfo.dateOfBirth}
                        onChange={(e) => setBasicInfo({ ...basicInfo, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
                      <select
                        value={basicInfo.bloodGroup}
                        onChange={(e) => setBasicInfo({ ...basicInfo, bloodGroup: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      >
                        <option value="">Select</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Place of Birth</label>
                      <input
                        type="text"
                        value={basicInfo.placeOfBirth}
                        onChange={(e) => setBasicInfo({ ...basicInfo, placeOfBirth: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Domicile (state)</label>
                      <input
                        type="text"
                        value={basicInfo.domicileState}
                        onChange={(e) => setBasicInfo({ ...basicInfo, domicileState: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Qualification</label>
                      <input
                        type="text"
                        value={basicInfo.qualification}
                        onChange={(e) => setBasicInfo({ ...basicInfo, qualification: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Experience</label>
                      <input
                        type="text"
                        value={basicInfo.experience}
                        onChange={(e) => setBasicInfo({ ...basicInfo, experience: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                        placeholder="e.g., 5 YEARS"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Date of Joining</label>
                      <input
                        type="date"
                        value={basicInfo.dateOfJoining}
                        onChange={(e) => setBasicInfo({ ...basicInfo, dateOfJoining: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Designation/Grade</label>
                      <input
                        type="text"
                        value={basicInfo.designationGrade}
                        onChange={(e) => setBasicInfo({ ...basicInfo, designationGrade: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Cost Center</label>
                      <input
                        type="text"
                        value={basicInfo.costCenter}
                        onChange={(e) => setBasicInfo({ ...basicInfo, costCenter: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">PAN Number</label>
                      <input
                        type="text"
                        value={basicInfo.panNumber}
                        onChange={(e) => setBasicInfo({ ...basicInfo, panNumber: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Aadhar Number</label>
                      <input
                        type="text"
                        value={basicInfo.aadharNumber}
                        onChange={(e) => setBasicInfo({ ...basicInfo, aadharNumber: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                        maxLength={12}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">UAN Number (PF universal no)</label>
                      <input
                        type="text"
                        value={basicInfo.uanNumber}
                        onChange={(e) => setBasicInfo({ ...basicInfo, uanNumber: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Bank Account Number</label>
                      <input
                        type="text"
                        value={basicInfo.bankAccountNumber}
                        onChange={(e) => setBasicInfo({ ...basicInfo, bankAccountNumber: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Address - Permanent</label>
                      <textarea
                        value={basicInfo.addressPermanent}
                        onChange={(e) => setBasicInfo({ ...basicInfo, addressPermanent: e.target.value.toUpperCase() })}
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="tel"
                        value={basicInfo.contactNumber}
                        onChange={(e) => setBasicInfo({ ...basicInfo, contactNumber: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Job location</label>
                      <input
                        type="text"
                        value={basicInfo.jobLocation}
                        onChange={(e) => setBasicInfo({ ...basicInfo, jobLocation: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
                    <p className="text-sm font-bold text-gray-700 mb-2">Declaration:-</p>
                    <p className="text-sm text-gray-600 italic">
                      I hereby declare that all the information given above is correct upto my knowledge.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Employee Signature:-</label>
                      <div className="w-full h-12 border-2 border-gray-300 rounded-xl bg-gray-50"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Date:-</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Detailed Personal Information */}
              {formStep === 2 && (
                <div className="space-y-6">
                  {/* Personal Details Section */}
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-800">Personal Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name (IN CAPITAL) - First Name</label>
                      <input
                        type="text"
                        value={detailedInfo.firstName}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, firstName: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={detailedInfo.lastName}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, lastName: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Permanent Address</label>
                      <textarea
                        value={detailedInfo.permanentAddress}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, permanentAddress: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Address For Communication</label>
                      <textarea
                        value={detailedInfo.communicationAddress}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, communicationAddress: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">City-</label>
                        <input
                          type="text"
                          value={detailedInfo.permanentCity}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, permanentCity: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pin Code-</label>
                        <input
                          type="text"
                          value={detailedInfo.permanentPinCode}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, permanentPinCode: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                          maxLength={6}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">City-</label>
                        <input
                          type="text"
                          value={detailedInfo.communicationCity}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, communicationCity: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pin Code-</label>
                        <input
                          type="text"
                          value={detailedInfo.communicationPinCode}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, communicationPinCode: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                          maxLength={6}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={detailedInfo.permanentState}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, permanentState: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={detailedInfo.communicationState}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, communicationState: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Contact No</label>
                      <input
                        type="tel"
                        value={detailedInfo.contactNo1}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, contactNo1: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Contact No</label>
                      <input
                        type="tel"
                        value={detailedInfo.contactNo2}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, contactNo2: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Id</label>
                      <input
                        type="email"
                        value={detailedInfo.email}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                  </div>

                  {/* Health Section */}
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-800">Health</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Major Illness/ Surgery</label>
                      <input
                        type="text"
                        value={detailedInfo.majorIllness}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, majorIllness: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Injury If any</label>
                      <input
                        type="text"
                        value={detailedInfo.majorSurgery}
                        onChange={(e) => setDetailedInfo({ ...detailedInfo, majorSurgery: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#0B4DA2] outline-none"
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-3">Contact Person incase Of Emergency</h4>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={detailedInfo.emergencyContactName}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, emergencyContactName: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Place</label>
                        <input
                          type="text"
                          value={detailedInfo.emergencyContactPlace}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, emergencyContactPlace: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Relationship</label>
                        <input
                          type="text"
                          value={detailedInfo.emergencyContactRelationship}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, emergencyContactRelationship: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Contact No</label>
                        <input
                          type="tel"
                          value={detailedInfo.emergencyContactNumber}
                          onChange={(e) => setDetailedInfo({ ...detailedInfo, emergencyContactNumber: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Family Background */}
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-800">Family background</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-2 border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Relationship</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Name</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Gender</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">D.O.B</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Age</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Qualification</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Occupation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedInfo.familyMembers.map((member, idx) => (
                          <tr key={idx}>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={member.relationship}
                                readOnly
                                className="w-full px-2 py-1 text-xs bg-gray-50"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.familyMembers];
                                  updated[idx].name = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, familyMembers: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <select
                                value={member.gender}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.familyMembers];
                                  updated[idx].gender = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, familyMembers: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              >
                                <option value="">-</option>
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="date"
                                value={member.dob}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.familyMembers];
                                  updated[idx].dob = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, familyMembers: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={member.age}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.familyMembers];
                                  updated[idx].age = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, familyMembers: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={member.qualification}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.familyMembers];
                                  updated[idx].qualification = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, familyMembers: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={member.occupation}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.familyMembers];
                                  updated[idx].occupation = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, familyMembers: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Education Section */}
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-800">Education (Start From Highest)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-2 border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Educational Qualification</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">School / College Name</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Board/ University</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Start (mm/yy)</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">End (mm/yy)</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">% Of Marks Secured</th>
                          <th className="border-2 border-gray-300 px-2 py-2 text-xs font-bold">Branch Of Study</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedInfo.educationRecords.map((edu, idx) => (
                          <tr key={idx}>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={edu.qualification}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.educationRecords];
                                  updated[idx].qualification = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, educationRecords: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={edu.schoolCollege}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.educationRecords];
                                  updated[idx].schoolCollege = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, educationRecords: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={edu.board}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.educationRecords];
                                  updated[idx].board = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, educationRecords: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={edu.startYear}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.educationRecords];
                                  updated[idx].startYear = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, educationRecords: updated });
                                }}
                                placeholder="MM/YY"
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={edu.endYear}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.educationRecords];
                                  updated[idx].endYear = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, educationRecords: updated });
                                }}
                                placeholder="MM/YY"
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={edu.marksPercentage}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.educationRecords];
                                  updated[idx].marksPercentage = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, educationRecords: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border-2 border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={edu.branchOfStudy}
                                onChange={(e) => {
                                  const updated = [...detailedInfo.educationRecords];
                                  updated[idx].branchOfStudy = e.target.value;
                                  setDetailedInfo({ ...detailedInfo, educationRecords: updated });
                                }}
                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={addEducationRecord}
                    className="text-sm text-blue-600 hover:text-blue-800 font-bold"
                  >
                    + Add More Education Record
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer - Fixed at bottom */}
            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => {
                  setShowNewJoiningModal(false);
                  setFormStep(1);
                }}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              {formStep === 1 ? (
                <button
                  onClick={handleStep1Submit}
                  className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Next: Personal Details
                  <ChevronRight size={20} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setFormStep(1)}
                    className="px-6 py-3 border-2 border-[#0B4DA2] text-[#0B4DA2] rounded-xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <CreditCard size={20} />
                    Submit Joining Form
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewDetailsModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Employee Details - {selectedEmployee.id}</h2>
                <p className="text-white/80 text-sm mt-1">{selectedEmployee.employeeName}</p>
              </div>
              <button
                onClick={() => setShowViewDetailsModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4 border-b-2 border-gray-200 pb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Employee Name</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Position</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Father's Name</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Mother's Name</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.motherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Date of Birth</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Blood Group</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Join Date</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Status</p>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      selectedEmployee.status === 'Completed' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {selectedEmployee.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4 border-b-2 border-gray-200 pb-2">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Contact Number</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.contactNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Email</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 font-semibold">Permanent Address</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.permanentAddress}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4 border-b-2 border-gray-200 pb-2">Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">PAN Number</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.panNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Aadhar Number</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.aadharNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Bank Account Number</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.bankAccountNumber}</p>
                  </div>
                </div>
              </div>

              {/* Onboarding Status */}
              <div>
                <h3 className="text-lg font-bold text-[#1B254B] mb-4 border-b-2 border-gray-200 pb-2">Onboarding Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${selectedEmployee.idCardGenerated ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <p className="font-bold text-[#1B254B]">ID Card {selectedEmployee.idCardGenerated ? 'Generated' : 'Pending'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${selectedEmployee.handbookProvided ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <p className="font-bold text-[#1B254B]">Handbook {selectedEmployee.handbookProvided ? 'Provided' : 'Pending'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200">
              <button
                onClick={() => setShowViewDetailsModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowViewDetailsModal(false);
                  handleGenerateIDCard(selectedEmployee);
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <CreditCard size={20} />
                Generate ID Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ID Card Modal */}
      {showIDCardModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Employee ID Card</h2>
                <p className="text-white/80 text-sm mt-1">SMG Electric Scooters Ltd</p>
              </div>
              <button
                onClick={() => setShowIDCardModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8">
              {/* ID Card Design */}
              <div className="border-4 border-gray-800 rounded-lg overflow-hidden bg-white shadow-2xl">
                {/* Card Content */}
                <div className="grid grid-cols-5 gap-0">
                  {/* Left Side - Logo */}
                  <div className="col-span-2 bg-white p-6 flex items-center justify-center border-r-2 border-gray-800">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-[#1e3a5f] tracking-tight">SMG</div>
                    </div>
                  </div>

                  {/* Right Side - Details */}
                  <div className="col-span-3 p-6 bg-white">
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold text-gray-800 uppercase">{selectedEmployee.employeeName}</h1>
                      <p className="text-blue-600 font-semibold text-sm">IT Intern-Nirmaan Programme</p>
                      <p className="text-lg font-bold text-gray-800">SMG Electric Scooters Ltd</p>
                      
                      <div className="border-t-2 border-blue-600 pt-3 mt-3">
                        <p className="text-xs font-bold text-gray-700">SMG Electric Scooters Ltd.</p>
                        <p className="text-xs text-gray-600">H.O & Plant :: Office 370 , Mittal Towers</p>
                        <p className="text-xs text-gray-600">Phase 2 New Delhi 110 001 (Pb) India.</p>
                        <p className="text-xs text-gray-600">Call us: 1800-318-705</p>
                        <p className="text-xs text-blue-600 font-semibold">info@smgelectricscootersltd.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom - Scooter Image */}
                <div className="bg-gradient-to-r from-gray-100 to-white p-4 border-t-2 border-gray-800">
                  <div className="flex items-center justify-center h-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg">
                    <p className="text-gray-400 text-sm font-semibold">[ Electric Scooter Illustration ]</p>
                  </div>
                </div>
              </div>

              {/* Print Instructions */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This ID card can be downloaded or printed. Standard size: 85.6mm x 53.98mm (Credit card size)
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200">
              <button
                onClick={() => setShowIDCardModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download size={20} />
                Print ID Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Sheet Modal */}
      {showCurriculumModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Interview Curriculum Sheet</h2>
                <p className="text-white/80 text-sm mt-1">Assessment Template for {selectedEmployee.employeeName}</p>
              </div>
              <button
                onClick={() => setShowCurriculumModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8">
              {/* Header */}
              <div className="border-4 border-gray-800 rounded-lg overflow-hidden bg-white mb-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1B254B]">SMG ELECTRIC SCOOTERS LTD</h3>
                      <p className="text-lg font-semibold text-gray-700 mt-1">CURRICULUM SHEET</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-[#1e3a5f] tracking-tight">SMG</div>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 bg-blue-50 border-b-2 border-gray-300">
                  <h4 className="font-bold text-[#1B254B] mb-4 text-lg">Details</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded border-2 border-gray-300">
                        <p className="text-xs font-bold text-gray-600 mb-1">ROLE</p>
                        <p className="font-bold text-[#1B254B]">EV Designing and Prototyping</p>
                      </div>
                      <div className="bg-white p-3 rounded border-2 border-gray-300">
                        <p className="text-xs font-bold text-gray-600 mb-1">POSITION</p>
                        <p className="font-bold text-[#1B254B]">{selectedEmployee.position}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded border-2 border-gray-300">
                        <p className="text-xs font-bold text-gray-600 mb-1">DEPARTMENT</p>
                        <p className="font-bold text-[#1B254B]">Research And Development</p>
                      </div>
                      <div className="bg-white p-3 rounded border-2 border-gray-300">
                        <p className="text-xs font-bold text-gray-600 mb-1">INTERVIEWER/s:</p>
                        <p className="font-bold text-[#1B254B]">Mr Abhi Sharma, Mr Ram Nath</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assessment Table */}
                <div className="p-6">
                  <table className="w-full border-2 border-gray-400">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B] w-20">Sr. No</th>
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B] w-64">Basis</th>
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-gray-400 px-4 py-4 font-bold text-center align-top">1</td>
                        <td className="border-2 border-gray-400 px-4 py-4 font-semibold align-top">Technical Knowledge/ Skills</td>
                        <td className="border-2 border-gray-400 px-4 py-4">
                          <div className="space-y-2">
                            <div className="font-medium">1) EV 2 wheeler Working</div>
                            <div className="font-medium">2) EV 2 wheeler Components Details</div>
                            <div className="font-medium">3) EV Battery and Motor functionality</div>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border-2 border-gray-400 px-4 py-4 font-bold text-center align-top">2</td>
                        <td className="border-2 border-gray-400 px-4 py-4 font-semibold align-top">
                          Prior Work Experience<br/>
                          <span className="text-sm text-gray-600">(Only For Experienced)</span>
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-4">
                          <div className="space-y-2">
                            <div className="font-medium">1) Previous Role Jobs</div>
                            <div className="font-medium">2) Introduction About Yourself</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-400 px-4 py-4 font-bold text-center align-top">3</td>
                        <td className="border-2 border-gray-400 px-4 py-4 font-semibold align-top">Autocad</td>
                        <td className="border-2 border-gray-400 px-4 py-4">
                          <div className="space-y-2">
                            <div className="font-medium">1) Introduction To Autocad</div>
                            <div className="font-medium">2) Types Of 3 d Softwares</div>
                            <div className="font-medium">3) Knowledge of Other 3D designing Softwares (Solidworks/Catia/NX etc)</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Note */}
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This curriculum sheet is used for interview assessment. Interviewers should evaluate candidates based on the criteria mentioned above.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200 sticky bottom-0">
              <button
                onClick={() => setShowCurriculumModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download size={20} />
                Print Curriculum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
