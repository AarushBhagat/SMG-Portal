import React, { useState, useMemo } from 'react';
import { Wallet, Plus, CheckCircle, Clock, XCircle, AlertCircle, IndianRupee, Calendar, FileText, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContextEnhanced';

export const LoanApprovalPage = () => {
  const { currentUser } = useApp();
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [loanApplications, setLoanApplications] = useState<any[]>([
    {
      id: 'LOAN-2024-001',
      type: 'Personal Loan',
      amount: 200000,
      purpose: 'Home Renovation',
      requestedDate: '2024-12-15',
      status: 'Approved',
      approvalDate: '2024-12-18',
      tenure: 24,
      interestRate: 8.5,
      emi: 9242,
      approvedBy: 'Finance Manager',
      disbursementDate: '2024-12-20'
    },
    {
      id: 'LOAN-2024-002',
      type: 'Emergency Loan',
      amount: 50000,
      purpose: 'Medical Emergency',
      requestedDate: '2024-11-10',
      status: 'Disbursed',
      approvalDate: '2024-11-12',
      tenure: 12,
      interestRate: 7.0,
      emi: 4349,
      approvedBy: 'Finance Manager',
      disbursementDate: '2024-11-15'
    }
  ]);

  const [loanForm, setLoanForm] = useState({
    type: '',
    amount: '',
    purpose: '',
    tenure: '',
    documents: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loanTypes = [
    { value: 'Personal Loan', label: 'Personal Loan', maxAmount: 500000, interestRate: 8.5 },
    { value: 'Emergency Loan', label: 'Emergency Loan', maxAmount: 100000, interestRate: 7.0 },
    { value: 'Education Loan', label: 'Education Loan', maxAmount: 1000000, interestRate: 9.0 },
    { value: 'Vehicle Loan', label: 'Vehicle Loan', maxAmount: 300000, interestRate: 10.0 },
    { value: 'Home Loan Assistance', label: 'Home Loan Assistance', maxAmount: 2000000, interestRate: 8.0 }
  ];

  const tenureOptions = [6, 12, 18, 24, 36, 48, 60];

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const selectedLoanType = loanTypes.find(lt => lt.value === loanForm.type);
  const estimatedEMI = loanForm.amount && loanForm.tenure && selectedLoanType
    ? calculateEMI(parseInt(loanForm.amount), selectedLoanType.interestRate, parseInt(loanForm.tenure))
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newApplication = {
      id: `LOAN-${Date.now()}`,
      type: loanForm.type,
      amount: parseInt(loanForm.amount),
      purpose: loanForm.purpose,
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      tenure: parseInt(loanForm.tenure),
      interestRate: selectedLoanType?.interestRate || 0,
      emi: estimatedEMI,
      approvedBy: '',
      disbursementDate: ''
    };

    setLoanApplications([newApplication, ...loanApplications]);
    setShowSuccess(true);
    setShowLoanForm(false);
    setLoanForm({ type: '', amount: '', purpose: '', tenure: '', documents: '' });

    setTimeout(() => {
      setShowSuccess(false);
      setSubmitting(false);
    }, 3000);
  };

  const sortedApplications = useMemo(() => {
    return loanApplications.sort((a, b) => 
      new Date(b.requestedDate).getTime() - new Date(a.requestedDate).getTime()
    );
  }, [loanApplications]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-blue-50 text-blue-700';
      case 'Disbursed': return 'bg-green-50 text-green-700';
      case 'Under Review': return 'bg-yellow-50 text-yellow-700';
      case 'Rejected': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle size={16} />;
      case 'Disbursed': return <CheckCircle size={16} />;
      case 'Under Review': return <Clock size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Wallet size={32} />
          Loan Approval
        </h1>
        <p className="text-[#87CEEB] opacity-90">
          Approval From Finance Department
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-4 flex items-center gap-3 text-green-800">
          <CheckCircle size={24} className="text-green-600" />
          <div>
            <h4 className="font-semibold">Loan Application Submitted Successfully!</h4>
            <p className="text-sm">Your application is under review by the Finance Department.</p>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Total Applications</p>
              <p className="text-2xl font-bold text-[#1B254B]">{loanApplications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Approved</p>
              <p className="text-2xl font-bold text-[#1B254B]">
                {loanApplications.filter(l => l.status === 'Approved' || l.status === 'Disbursed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <Clock className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Pending</p>
              <p className="text-2xl font-bold text-[#1B254B]">
                {loanApplications.filter(l => l.status === 'Under Review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <IndianRupee className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Total Amount</p>
              <p className="text-2xl font-bold text-[#1B254B]">
                ₹{(loanApplications.reduce((sum, l) => sum + l.amount, 0) / 100000).toFixed(1)}L
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apply for Loan Button */}
      {!showLoanForm && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#1B254B] mb-1">Need Financial Assistance?</h3>
              <p className="text-sm text-gray-600">Apply for a loan with competitive interest rates and flexible tenure options.</p>
            </div>
            <button
              onClick={() => setShowLoanForm(true)}
              className="bg-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors flex items-center gap-2 shrink-0"
            >
              <Plus size={20} />
              Apply for Loan
            </button>
          </div>
        </div>
      )}

      {/* Loan Application Form */}
      {showLoanForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#1B254B]">Loan Application Form</h3>
            <button
              type="button"
              onClick={() => setShowLoanForm(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Employee Name *</label>
              <input
                type="text"
                disabled
                value={currentUser?.name || ''}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Employee ID *</label>
              <input
                type="text"
                disabled
                value={currentUser?.empId || currentUser?.id || ''}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Loan Type *</label>
              <select
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={loanForm.type}
                onChange={(e) => setLoanForm({ ...loanForm, type: e.target.value })}
              >
                <option value="">Select Loan Type</option>
                {loanTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} (Max: ₹{(type.maxAmount / 100000).toFixed(1)}L @ {type.interestRate}%)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Loan Amount *</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  required
                  min="10000"
                  max={selectedLoanType?.maxAmount || 500000}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                  value={loanForm.amount}
                  onChange={(e) => setLoanForm({ ...loanForm, amount: e.target.value })}
                  placeholder="Enter amount"
                />
              </div>
              {selectedLoanType && (
                <p className="text-xs text-gray-500 mt-1">Maximum: ₹{(selectedLoanType.maxAmount / 100000).toFixed(1)}L</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Tenure (Months) *</label>
              <select
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={loanForm.tenure}
                onChange={(e) => setLoanForm({ ...loanForm, tenure: e.target.value })}
              >
                <option value="">Select Tenure</option>
                {tenureOptions.map((months) => (
                  <option key={months} value={months}>
                    {months} months ({(months / 12).toFixed(1)} years)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-[#A3AED0] mb-2 block font-semibold">Purpose of Loan *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] outline-none"
                value={loanForm.purpose}
                onChange={(e) => setLoanForm({ ...loanForm, purpose: e.target.value })}
                placeholder="e.g., Home renovation, Medical emergency"
              />
            </div>
          </div>

          {/* EMI Calculation Display */}
          {estimatedEMI > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-[#0B4DA2]" size={24} />
                <h4 className="font-bold text-[#1B254B]">Estimated EMI Breakdown</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-[#A3AED0] mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-[#0B4DA2]">₹{estimatedEMI.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-[#A3AED0] mb-1">Interest Rate</p>
                  <p className="text-2xl font-bold text-[#1B254B]">{selectedLoanType?.interestRate}%</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-[#A3AED0] mb-1">Total Payable</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{(estimatedEMI * parseInt(loanForm.tenure || '0')).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowLoanForm(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors disabled:bg-gray-400"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}

      {/* Loan Applications Table */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-[#1B254B] mb-6">My Loan Applications</h3>
        
        {sortedApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#A3AED0] border-b-2 border-gray-100">
                  <th className="pb-3 pt-2 pr-6 font-semibold">Loan ID</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Type</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Amount</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Purpose</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">EMI</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Tenure</th>
                  <th className="pb-3 pt-2 pr-6 font-semibold">Applied On</th>
                  <th className="pb-3 pt-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedApplications.map((loan) => (
                  <tr key={loan.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-6 font-semibold text-[#1B254B]">{loan.id}</td>
                    <td className="py-4 pr-6 text-[#1B254B]">{loan.type}</td>
                    <td className="py-4 pr-6 font-bold text-green-600">₹{loan.amount.toLocaleString()}</td>
                    <td className="py-4 pr-6 text-gray-600">{loan.purpose}</td>
                    <td className="py-4 pr-6 font-semibold text-[#0B4DA2]">₹{loan.emi.toLocaleString()}</td>
                    <td className="py-4 pr-6 text-gray-600">{loan.tenure} months</td>
                    <td className="py-4 pr-6 text-gray-600">{loan.requestedDate}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(loan.status)}`}>
                        {getStatusIcon(loan.status)}
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Wallet size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No loan applications yet</p>
            <p className="text-sm text-gray-400">Click "Apply for Loan" to submit your first application</p>
          </div>
        )}
      </div>
    </div>
  );
};
