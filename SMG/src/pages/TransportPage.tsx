import React, { useState, useMemo } from 'react';
import { Bus, Car, MapPin, Clock, CheckCircle, AlertCircle, Home, Phone, Navigation, FileText, IndianRupee, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContextEnhanced';

export const TransportPage = () => {
  const { currentUser, busRequests = [], parkingRequests = [], requestBusFacility, requestParkingFacility } = useApp();
  const [showBusRequestForm, setShowBusRequestForm] = useState(false);
  const [showParkingRequestForm, setShowParkingRequestForm] = useState(false);
  const [busForm, setBusForm] = useState({
    houseNumber: '',
    street: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    mobileNumber: '',
    alternateNumber: '',
    preferredPickupTime: '',
    remarks: ''
  });
  const [parkingForm, setParkingForm] = useState({
    vehicleType: 'Two Wheeler',
    vehicleNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColor: '',
    fuelType: '',
    ownerName: '',
    preferredSlot: '',
    remarks: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Reimbursement form state
  const [showReimbursementForm, setShowReimbursementForm] = useState(false);
  const [reimbursementForm, setReimbursementForm] = useState({
    // Basic Info
    name: currentUser?.name || '',
    personalAddress: '',
    contactNumber: '',
    emailId: currentUser?.email || '',
    
    // For Interview Candidates (if applicable)
    isInterviewCandidate: false,
    dateOfInterview: '',
    interviewDepartment: '',
    interviewCCN: '',
    candidateName: '',
    postAppliedFor: '',
    bankAccountNumber: '',
    ddPayableAt: '',
    
    // For New Joinee/Employee
    dateOfJoining: '',
    employeeDepartment: currentUser?.department || '',
    employeeCCN: '',
    employeeName: currentUser?.name || '',
    designation: currentUser?.designation || '',
    employeeCode: currentUser?.empId || '',
    modeOfTravelling: '',
    travelFrom: '',
    travelTo: '',
    distanceCovered: '',
    
    // Expense entries
    expenses: [
      { srNo: 1, from: '', to: '', modeOfTravel: '', amount: '' }
    ],
    
    // Total and signatures
    totalInWords: '',
    recruiterName: '',
    candidateSignature: '',
    
    // Office use
    sanctionedAmount: '',
    authorizedSignatory: '',
    accountsDepartment: '',
    hrSignature: '',
    date: new Date().toISOString().split('T')[0]
  });

  const busStatusSteps = ['Submitted', 'Under Review', 'Route Assigned', 'Active'];
  const parkingStatusSteps = ['Submitted', 'Under Review', 'Approved', 'Slot Allocated'];

  const sortedBusRequests = useMemo(() => {
    return [...busRequests].sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }, [busRequests]);

  const sortedParkingRequests = useMemo(() => {
    return [...parkingRequests].sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }, [parkingRequests]);

  const latestBusRequest = sortedBusRequests[0];
  const latestParkingRequest = sortedParkingRequests[0];
  const activeBusRequest = sortedBusRequests.find(req => req.status === 'Active' || req.status === 'Route Assigned');
  const activeParkingRequest = sortedParkingRequests.find(req => req.status === 'Slot Allocated' || req.status === 'Approved');

  // Mock bus route data
  const busRoutes = [
    { 
      id: 1, 
      name: 'Route A - Noida Sector 62', 
      pickupPoint: 'Sector 62, Near Metro Station',
      timing: '8:00 AM',
      returnTiming: '6:00 PM',
      capacity: '45 seats', 
      available: 12, 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Route B - Greater Noida', 
      pickupPoint: 'Alpha 1, Commercial Belt',
      timing: '7:30 AM',
      returnTiming: '5:30 PM',
      capacity: '45 seats', 
      available: 5, 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Route C - Delhi NCR', 
      pickupPoint: 'Dwarka Sector 21, Bus Stand',
      timing: '9:00 AM',
      returnTiming: '7:00 PM',
      capacity: '45 seats', 
      available: 0, 
      status: 'Full' 
    },
    { 
      id: 4, 
      name: 'Route D - Ghaziabad', 
      pickupPoint: 'Vaishali, Main Market',
      timing: '8:30 AM',
      returnTiming: '6:30 PM',
      capacity: '45 seats', 
      available: 18, 
      status: 'Active' 
    },
  ];

  const handleBusSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!busForm.houseNumber || !busForm.street || !busForm.area || !busForm.city || !busForm.pincode || !busForm.mobileNumber) {
      setError('Please fill all required address fields.');
      return;
    }

    if (busForm.mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError('');
    setSubmitting(true);
    requestBusFacility(busForm);
    setSuccessMessage('Bus facility request submitted successfully!');
    setShowSuccess(true);
    setShowBusRequestForm(false);
    setBusForm({
      houseNumber: '',
      street: '',
      landmark: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      mobileNumber: '',
      alternateNumber: '',
      preferredPickupTime: '',
      remarks: ''
    });
    setTimeout(() => setShowSuccess(false), 3000);
    setSubmitting(false);
  };

  const handleParkingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!parkingForm.vehicleType || !parkingForm.vehicleNumber || !parkingForm.vehicleMake || !parkingForm.vehicleModel) {
      setError('Please fill all required vehicle details.');
      return;
    }

    const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i;
    if (!vehicleRegex.test(parkingForm.vehicleNumber.replace(/[\s-]/g, ''))) {
      setError('Please enter a valid vehicle registration number (e.g., DL01AB1234).');
      return;
    }

    setError('');
    setSubmitting(true);
    requestParkingFacility(parkingForm);
    setSuccessMessage('Parking facility request submitted successfully!');
    setShowSuccess(true);
    setShowParkingRequestForm(false);
    setParkingForm({
      vehicleType: 'Two Wheeler',
      vehicleNumber: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleColor: '',
      fuelType: '',
      ownerName: '',
      preferredSlot: '',
      remarks: ''
    });
    setTimeout(() => setShowSuccess(false), 3000);
    setSubmitting(false);
  };

  // Reimbursement form handlers
  const addExpenseRow = () => {
    setReimbursementForm({
      ...reimbursementForm,
      expenses: [
        ...reimbursementForm.expenses,
        { srNo: reimbursementForm.expenses.length + 1, from: '', to: '', modeOfTravel: '', amount: '' }
      ]
    });
  };

  const removeExpenseRow = (index: number) => {
    if (reimbursementForm.expenses.length > 1) {
      const updatedExpenses = reimbursementForm.expenses.filter((_, i) => i !== index);
      const renumbered = updatedExpenses.map((exp, i) => ({ ...exp, srNo: i + 1 }));
      setReimbursementForm({ ...reimbursementForm, expenses: renumbered });
    }
  };

  const updateExpenseRow = (index: number, field: string, value: string) => {
    const updatedExpenses = [...reimbursementForm.expenses];
    updatedExpenses[index] = { ...updatedExpenses[index], [field]: value };
    setReimbursementForm({ ...reimbursementForm, expenses: updatedExpenses });
  };

  const calculateTotal = () => {
    return reimbursementForm.expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
  };

  const handleReimbursementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('Travel Expenses Reimbursement Form submitted successfully!');
    setShowSuccess(true);
    setShowReimbursementForm(false);
    
    // Reset form
    setReimbursementForm({
      name: currentUser?.name || '',
      personalAddress: '',
      contactNumber: '',
      emailId: currentUser?.email || '',
      isInterviewCandidate: false,
      dateOfInterview: '',
      interviewDepartment: '',
      interviewCCN: '',
      candidateName: '',
      postAppliedFor: '',
      bankAccountNumber: '',
      ddPayableAt: '',
      dateOfJoining: '',
      employeeDepartment: currentUser?.department || '',
      employeeCCN: '',
      employeeName: currentUser?.name || '',
      designation: currentUser?.designation || '',
      employeeCode: currentUser?.empId || '',
      modeOfTravelling: '',
      travelFrom: '',
      travelTo: '',
      distanceCovered: '',
      expenses: [{ srNo: 1, from: '', to: '', modeOfTravel: '', amount: '' }],
      totalInWords: '',
      recruiterName: '',
      candidateSignature: '',
      sanctionedAmount: '',
      authorizedSignatory: '',
      accountsDepartment: '',
      hrSignature: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    setTimeout(() => setShowSuccess(false), 3000);
    setSubmitting(false);
  };

  const getStepIndex = (status: string | undefined) => {
    if (!status) return 0;
    const idx = statusSteps.findIndex(step => step.toLowerCase() === status.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-white mb-2 flex items-center gap-3"><Bus size={32} /> Transport Facilities</h1>
        <p className="text-[#87CEEB] opacity-90">Request and manage your office transportation and parking</p>
      </div>

      {showSuccess && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Active Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bus Assignment Status */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Bus className="text-gray-400" size={24} />
            <h3 className="text-[#1B254B] font-semibold">Bus Route Status</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Route</p>
              <p className="font-bold text-gray-400">No Bus Allocated Yet</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Pickup Point</p>
              <p className="font-bold text-gray-400">No Bus Allocated Yet</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-[#A3AED0] mb-1">Pickup Time</p>
              <p className="font-bold text-gray-400">No Bus Allocated Yet</p>
            </div>
          </div>
        </div>

        {/* Active Parking Assignment */}
        {activeParkingRequest && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-lg border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-purple-600" size={24} />
              <h3 className="text-[#1B254B] font-semibold">Your Allocated Parking</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-[#A3AED0] mb-1">Slot Number</p>
                <p className="font-bold text-[#1B254B]">{activeParkingRequest.slotNumber || 'Pending'}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-[#A3AED0] mb-1">Vehicle</p>
                <p className="font-bold text-[#1B254B]">{activeParkingRequest.vehicleNumber || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-[#A3AED0] mb-1">Slot Type</p>
                <p className="font-bold text-[#1B254B]">{activeParkingRequest.slotType || 'TBD'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Request Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bus Facility Request */}
        {!showBusRequestForm ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bus className="text-[#0B4DA2]" size={20} />
                <h3 className="text-[#1B254B] font-semibold">Request Bus Facility</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Don't have a bus route yet? Submit your address details and we'll assign you to the nearest route.
            </p>
            <button
              onClick={() => setShowBusRequestForm(true)}
              className="w-full bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors"
            >
              Request Bus Facility
            </button>
          </div>
        ) : (
          <form onSubmit={handleBusSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Home className="text-[#0B4DA2]" size={20} />
              <h3 className="text-[#1B254B] font-semibold">Bus Facility Request Form</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Employee Name</label>
                <input
                  disabled
                  value={currentUser?.name || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-[#1B254B] font-semibold mb-3">Residential Address</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">House/Flat Number *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.houseNumber}
                    onChange={(e) => setBusForm({ ...busForm, houseNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Street/Building Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.street}
                    onChange={(e) => setBusForm({ ...busForm, street: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Landmark</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.landmark}
                    onChange={(e) => setBusForm({ ...busForm, landmark: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Area/Locality *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.area}
                    onChange={(e) => setBusForm({ ...busForm, area: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">City *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.city}
                    onChange={(e) => setBusForm({ ...busForm, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">State</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.state}
                    onChange={(e) => setBusForm({ ...busForm, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.pincode}
                    onChange={(e) => setBusForm({ ...busForm, pincode: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-[#1B254B] font-semibold mb-3">Contact Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.mobileNumber}
                    onChange={(e) => setBusForm({ ...busForm, mobileNumber: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Alternate Number</label>
                  <input
                    type="tel"
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={busForm.alternateNumber}
                    onChange={(e) => setBusForm({ ...busForm, alternateNumber: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Preferred Pickup Time</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={busForm.preferredPickupTime}
                onChange={(e) => setBusForm({ ...busForm, preferredPickupTime: e.target.value })}
              >
                <option value="">Select Time</option>
                <option>7:00 AM - 7:30 AM</option>
                <option>7:30 AM - 8:00 AM</option>
                <option>8:00 AM - 8:30 AM</option>
                <option>8:30 AM - 9:00 AM</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Additional Remarks</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                placeholder="Any special requirements or instructions..."
                value={busForm.remarks}
                onChange={(e) => setBusForm({ ...busForm, remarks: e.target.value })}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowBusRequestForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors disabled:opacity-70"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}

        {/* Parking Facility Request */}
        {!showParkingRequestForm ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Car className="text-[#0B4DA2]" size={20} />
                <h3 className="text-[#1B254B] font-semibold">Request Parking Facility</h3>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Need a parking slot? Submit your vehicle details and we'll allocate a parking space.
            </p>
            <button
              onClick={() => setShowParkingRequestForm(true)}
              className="w-full bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors"
            >
              Request Parking Facility
            </button>
          </div>
        ) : (
          <form onSubmit={handleParkingSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Car className="text-[#0B4DA2]" size={20} />
              <h3 className="text-[#1B254B] font-semibold">Parking Facility Request Form</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block">Employee Name</label>
                <input
                  disabled
                  value={currentUser?.name || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-[#1B254B] font-semibold mb-3">Vehicle Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Vehicle Type *</label>
                  <select
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={parkingForm.vehicleType}
                    onChange={(e) => setParkingForm({ ...parkingForm, vehicleType: e.target.value })}
                  >
                    <option>Two Wheeler</option>
                    <option>Four Wheeler</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Vehicle Number *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    placeholder="e.g., DL01AB1234"
                    value={parkingForm.vehicleNumber}
                    onChange={(e) => setParkingForm({ ...parkingForm, vehicleNumber: e.target.value.toUpperCase() })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Make *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    placeholder="e.g., Honda, Maruti"
                    value={parkingForm.vehicleMake}
                    onChange={(e) => setParkingForm({ ...parkingForm, vehicleMake: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Model *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    placeholder="e.g., City, Swift"
                    value={parkingForm.vehicleModel}
                    onChange={(e) => setParkingForm({ ...parkingForm, vehicleModel: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Color</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    placeholder="e.g., White"
                    value={parkingForm.vehicleColor}
                    onChange={(e) => setParkingForm({ ...parkingForm, vehicleColor: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block">Fuel Type</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                    value={parkingForm.fuelType}
                    onChange={(e) => setParkingForm({ ...parkingForm, fuelType: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                    <option>Electric</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Preferred Slot</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                placeholder="e.g., Ground Floor, Near Entrance"
                value={parkingForm.preferredSlot}
                onChange={(e) => setParkingForm({ ...parkingForm, preferredSlot: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block">Additional Remarks</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                placeholder="Any special requirements..."
                value={parkingForm.remarks}
                onChange={(e) => setParkingForm({ ...parkingForm, remarks: e.target.value })}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowParkingRequestForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors disabled:opacity-70"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Latest Request Status for Both */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Bus Request Status */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <Bus className="text-[#0B4DA2]" size={20} />
            <h3 className="text-[#1B254B] font-semibold">Latest Bus Request Status</h3>
          </div>

          {latestBusRequest ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Request ID</p>
                  <p className="font-semibold text-[#1B254B]">{latestBusRequest.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Status</p>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0B4DA2]">
                    {latestBusRequest.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-[#1B254B] font-semibold">Progress</p>
                <div className="grid grid-cols-4 gap-2 items-start">
                  {busStatusSteps.map((step, idx) => {
                    const active = idx <= busStatusSteps.indexOf(latestBusRequest.status);
                    return (
                      <div key={step} className="text-center">
                        <div className={`h-1 rounded-full ${active ? 'bg-[#0B4DA2]' : 'bg-gray-200'}`} />
                        <p className={`mt-2 text-xs font-semibold ${active ? 'text-[#0B4DA2]' : 'text-gray-400'}`}>{step}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border rounded-xl p-3 bg-gray-50">
                <p className="text-xs text-[#A3AED0] mb-2">Pickup Address:</p>
                <p className="text-sm text-[#1B254B]">
                  {latestBusRequest.houseNumber}, {latestBusRequest.street}, {latestBusRequest.area}, {latestBusRequest.city} - {latestBusRequest.pincode}
                </p>
                {latestBusRequest.landmark && (
                  <p className="text-xs text-gray-500 mt-1">Near: {latestBusRequest.landmark}</p>
                )}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold text-[#1B254B]">Submitted on:</span> {latestBusRequest.requestDate}</p>
                <p><span className="font-semibold text-[#1B254B]">Contact:</span> {latestBusRequest.mobileNumber}</p>
                {latestBusRequest.preferredPickupTime && (
                  <p><span className="font-semibold text-[#1B254B]">Preferred Time:</span> {latestBusRequest.preferredPickupTime}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Bus size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No bus facility requests yet.</p>
            </div>
          )}
        </div>

        {/* Latest Parking Request Status */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center gap-3">
            <Car className="text-[#0B4DA2]" size={20} />
            <h3 className="text-[#1B254B] font-semibold">Latest Parking Request Status</h3>
          </div>

          {latestParkingRequest ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Request ID</p>
                  <p className="font-semibold text-[#1B254B]">{latestParkingRequest.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[#A3AED0] text-xs mb-1">Status</p>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600">
                    {latestParkingRequest.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-[#1B254B] font-semibold">Progress</p>
                <div className="grid grid-cols-4 gap-2 items-start">
                  {parkingStatusSteps.map((step, idx) => {
                    const active = idx <= parkingStatusSteps.indexOf(latestParkingRequest.status);
                    return (
                      <div key={step} className="text-center">
                        <div className={`h-1 rounded-full ${active ? 'bg-purple-600' : 'bg-gray-200'}`} />
                        <p className={`mt-2 text-xs font-semibold ${active ? 'text-purple-600' : 'text-gray-400'}`}>{step}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border rounded-xl p-3 bg-gray-50">
                <p className="text-xs text-[#A3AED0] mb-2">Vehicle Details:</p>
                <p className="text-sm text-[#1B254B] font-semibold">
                  {latestParkingRequest.vehicleNumber}
                </p>
                <p className="text-sm text-gray-600">
                  {latestParkingRequest.vehicleMake} {latestParkingRequest.vehicleModel} - {latestParkingRequest.vehicleType}
                </p>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold text-[#1B254B]">Submitted on:</span> {latestParkingRequest.requestDate}</p>
                {latestParkingRequest.preferredSlot && (
                  <p><span className="font-semibold text-[#1B254B]">Preferred Slot:</span> {latestParkingRequest.preferredSlot}</p>
                )}
                {latestParkingRequest.slotNumber && (
                  <p><span className="font-semibold text-[#05CD99]">Allocated Slot:</span> {latestParkingRequest.slotNumber}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Car size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No parking facility requests yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* All Requests Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* All Bus Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-[#1B254B] font-semibold mb-4">All My Bus Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                  <th className="pb-3 pt-2 pr-4 font-semibold">Request ID</th>
                  <th className="pb-3 pt-2 pr-4 font-semibold">Address</th>
                  <th className="pb-3 pt-2 pr-4 font-semibold">Date</th>
                  <th className="pb-3 pt-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedBusRequests.map(req => (
                  <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-[#1B254B] text-xs">{req.id}</td>
                    <td className="py-3 pr-4 text-gray-600 text-xs">
                      {req.area}, {req.city}
                    </td>
                    <td className="py-3 pr-4 text-gray-600 text-xs">{req.requestDate}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'Active' ? 'bg-green-50 text-[#05CD99]' :
                        req.status === 'Route Assigned' ? 'bg-blue-50 text-[#0B4DA2]' :
                        req.status === 'Under Review' ? 'bg-yellow-50 text-[#FFB547]' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {sortedBusRequests.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center">
                      <p className="text-gray-400 text-sm">No bus requests found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Parking Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-[#1B254B] font-semibold mb-4">All My Parking Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                  <th className="pb-3 pt-2 pr-4 font-semibold">Request ID</th>
                  <th className="pb-3 pt-2 pr-4 font-semibold">Vehicle</th>
                  <th className="pb-3 pt-2 pr-4 font-semibold">Date</th>
                  <th className="pb-3 pt-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedParkingRequests.map(req => (
                  <tr key={req.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-[#1B254B] text-xs">{req.id}</td>
                    <td className="py-3 pr-4 text-gray-600 text-xs">
                      {req.vehicleNumber}
                    </td>
                    <td className="py-3 pr-4 text-gray-600 text-xs">{req.requestDate}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'Slot Allocated' ? 'bg-green-50 text-[#05CD99]' :
                        req.status === 'Approved' ? 'bg-purple-50 text-purple-600' :
                        req.status === 'Under Review' ? 'bg-yellow-50 text-[#FFB547]' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {sortedParkingRequests.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center">
                      <p className="text-gray-400 text-sm">No parking requests found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Travelling Expenses Reimbursement Form Section */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="text-[#0B4DA2]" size={24} />
            <h3 className="text-[#1B254B] font-semibold text-lg">Travelling Expenses Reimbursement</h3>
          </div>
          {!showReimbursementForm && (
            <button
              onClick={() => setShowReimbursementForm(true)}
              className="bg-[#0B4DA2] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#042A5B] transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Submit Reimbursement
            </button>
          )}
        </div>

        {showReimbursementForm ? (
          <form onSubmit={handleReimbursementSubmit} className="space-y-6">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-xl p-4 text-center">
              <h2 className="text-white font-bold text-lg uppercase tracking-wide">
                Travelling Expenses Reimbursement Form
              </h2>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  value={reimbursementForm.name}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Personal Address *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  value={reimbursementForm.personalAddress}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, personalAddress: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Contact Number *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  value={reimbursementForm.contactNumber}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, contactNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Email ID *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  value={reimbursementForm.emailId}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, emailId: e.target.value })}
                />
              </div>
            </div>

            {/* Interview Candidate Toggle */}
            <div className="flex items-center gap-3 bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
              <input
                type="checkbox"
                id="isInterviewCandidate"
                className="w-5 h-5 text-[#0B4DA2] rounded focus:ring-[#0B4DA2]"
                checked={reimbursementForm.isInterviewCandidate}
                onChange={(e) => setReimbursementForm({ ...reimbursementForm, isInterviewCandidate: e.target.checked })}
              />
              <label htmlFor="isInterviewCandidate" className="text-[#1B254B] font-semibold cursor-pointer">
                I am an Interview Candidate
              </label>
            </div>

            {/* For Interview Candidates Section */}
            {reimbursementForm.isInterviewCandidate && (
              <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 space-y-4">
                <h4 className="text-[#1B254B] font-bold uppercase text-sm mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-yellow-500"></div>
                  For Interview Candidates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Date Of Interview *</label>
                    <input
                      type="date"
                      required={reimbursementForm.isInterviewCandidate}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                      value={reimbursementForm.dateOfInterview}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, dateOfInterview: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Department *</label>
                    <input
                      type="text"
                      required={reimbursementForm.isInterviewCandidate}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                      value={reimbursementForm.interviewDepartment}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, interviewDepartment: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">CCN</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                      value={reimbursementForm.interviewCCN}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, interviewCCN: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Candidates Name *</label>
                    <input
                      type="text"
                      required={reimbursementForm.isInterviewCandidate}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                      value={reimbursementForm.candidateName}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, candidateName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Post Applied For *</label>
                    <input
                      type="text"
                      required={reimbursementForm.isInterviewCandidate}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                      value={reimbursementForm.postAppliedFor}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, postAppliedFor: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Bank Personal Account Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                      value={reimbursementForm.bankAccountNumber}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, bankAccountNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">DD payable at City name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                      value={reimbursementForm.ddPayableAt}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, ddPayableAt: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* For NEW Joinee/Employee Section */}
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 space-y-4">
              <h4 className="text-[#1B254B] font-bold uppercase text-sm mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#0B4DA2]"></div>
                For NEW Joinee/Employee
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Date of Joining</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.dateOfJoining}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, dateOfJoining: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Department *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.employeeDepartment}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, employeeDepartment: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">CCN</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.employeeCCN}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, employeeCCN: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Employees Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.employeeName}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, employeeName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Designation *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.designation}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, designation: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Employee Code *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.employeeCode}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, employeeCode: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Mode of Travelling Committed *</label>
                <select
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                  value={reimbursementForm.modeOfTravelling}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, modeOfTravelling: e.target.value })}
                >
                  <option value="">Select Mode</option>
                  <option value="SL">SL (Sleeper Class)</option>
                  <option value="2nd AC">2nd AC</option>
                  <option value="3rd AC">3rd AC</option>
                  <option value="CC">CC (Chair Car)</option>
                  <option value="Volvo">Volvo</option>
                  <option value="Economic Air Fare">Economic Air Fare</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">From *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.travelFrom}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, travelFrom: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">To *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.travelTo}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, travelTo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Distance Covered (in kms) *</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                    value={reimbursementForm.distanceCovered}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, distanceCovered: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Expense Table */}
            <div className="space-y-4">
              <div className="flex items-start gap-2 bg-gray-50 p-4 rounded-xl">
                <AlertCircle size={20} className="text-[#0B4DA2] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-[#1B254B]">Please Mention Travelling expenses (to & Fro):</span> Attach Railway tickets/Bus Tickets/Air Tickets (Boarding Pass Compulsory)/Taxi Receipt/RC No/Mode by (Petrol/Diesel), Toll Tax Slips & kms if using own car.
                </p>
              </div>

              <div className="overflow-x-auto border-2 border-gray-200 rounded-xl">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold">Sr no</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">From</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">To</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">Mode Of Travel</th>
                      <th className="px-4 py-3 text-left text-sm font-bold">Amount (in Rs)</th>
                      <th className="px-4 py-3 text-center text-sm font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reimbursementForm.expenses.map((expense, index) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-[#1B254B]">{expense.srNo}</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                            value={expense.from}
                            onChange={(e) => updateExpenseRow(index, 'from', e.target.value)}
                            placeholder="From location"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                            value={expense.to}
                            onChange={(e) => updateExpenseRow(index, 'to', e.target.value)}
                            placeholder="To location"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                            value={expense.modeOfTravel}
                            onChange={(e) => updateExpenseRow(index, 'modeOfTravel', e.target.value)}
                            placeholder="Train/Bus/Air/Taxi"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#0B4DA2] outline-none text-sm"
                            value={expense.amount}
                            onChange={(e) => updateExpenseRow(index, 'amount', e.target.value)}
                            placeholder="0.00"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          {reimbursementForm.expenses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExpenseRow(index)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-right font-bold text-[#1B254B]">Total (in Rs)</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border-2 border-[#0B4DA2]">
                          <IndianRupee size={16} className="text-[#0B4DA2]" />
                          <span className="font-bold text-[#0B4DA2]">{calculateTotal().toFixed(2)}</span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <button
                type="button"
                onClick={addExpenseRow}
                className="w-full bg-gray-100 text-[#0B4DA2] py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-gray-300"
              >
                <Plus size={20} />
                Add Another Expense Row
              </button>

              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Total In Words *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  value={reimbursementForm.totalInWords}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, totalInWords: e.target.value })}
                  placeholder="e.g., Five Thousand Rupees Only"
                />
              </div>
            </div>

            {/* Signatures Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Recruiter Name & Signature</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                  value={reimbursementForm.recruiterName}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, recruiterName: e.target.value })}
                  placeholder="Recruiter name (if applicable)"
                />
              </div>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Signature of the Candidate *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white"
                  value={reimbursementForm.candidateSignature}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, candidateSignature: e.target.value })}
                  placeholder="Type your full name"
                />
              </div>
            </div>

            {/* For Office Use Only */}
            <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300 space-y-4">
              <h4 className="text-[#1B254B] font-bold uppercase text-center text-sm mb-4 bg-yellow-200 py-2 rounded-lg">
                FOR OFFICE USE ONLY
              </h4>
              <div>
                <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Amount of Fare sanctioned in words & Figures</label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-white resize-none"
                  rows={2}
                  value={reimbursementForm.sanctionedAmount}
                  onChange={(e) => setReimbursementForm({ ...reimbursementForm, sanctionedAmount: e.target.value })}
                  placeholder="To be filled by office"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Authorized Signatory</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-gray-100"
                    value={reimbursementForm.authorizedSignatory}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, authorizedSignatory: e.target.value })}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Accounts Department</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-gray-100"
                    value={reimbursementForm.accountsDepartment}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, accountsDepartment: e.target.value })}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none bg-gray-100"
                    value={reimbursementForm.date}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowReimbursementForm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors disabled:bg-gray-400"
              >
                {submitting ? 'Submitting...' : 'Submit Reimbursement Form'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12">
            <FileText size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No reimbursement form submitted yet</p>
            <p className="text-sm text-gray-400">Click "Submit Reimbursement" button above to fill the travel expenses form</p>
          </div>
        )}
      </div>
    </div>
  );
};
