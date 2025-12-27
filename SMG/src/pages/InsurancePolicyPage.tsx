import React, { useState } from 'react';
import { Shield, Download, FileText, Building2, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';

export const InsurancePolicyPage = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  // Mock insurance policy data
  const insurancePolicies = [
    {
      id: 1,
      type: 'Group Accidental Insurance Policy',
      fileName: 'Group Accidental Insurance Policy Form.pdf',
      description: 'Comprehensive group accidental insurance coverage for all employees based on their level/grade.',
      policyNumber: 'GAI-2024-SMG-001',
      provider: 'HDFC ERGO General Insurance',
      coverageAmount: 'Based on Employee Level',
      validFrom: '01-Jan-2024',
      validTill: '31-Dec-2024',
      uploadDate: '15-Dec-2023',
      size: '2.4 MB',
      benefits: [
        'Accidental Death Benefit: As per employee level',
        'Permanent Total Disability: As per employee level',
        'Permanent Partial Disability: As per scale',
        'Temporary Total Disability: ₹1,000/week (max 100 weeks)',
        'Medical Expenses: ₹50,000',
        'Ambulance Charges: ₹2,000'
      ],
      coverage: [
        'Employee',
        'Spouse',
        'Dependent Children (up to 25 years)'
      ],
      levelBasedCoverage: [
        { level: 'S/SS/TS', sumInsured: '10 lacs' },
        { level: 'SN/SN+/N/N+', sumInsured: '20 lacs' },
        { level: 'L1 To L2+', sumInsured: '40 lacs' },
        { level: 'L3 - L6', sumInsured: '50 lacs' },
        { level: 'L7 & Above', sumInsured: '100 lacs' }
      ],
      premiumInfo: 'Premium is being Shared by: Welfare Fund, Employee Contribution Fund, Company'
    },
    {
      id: 2,
      type: 'Life Insurance Policy',
      fileName: 'Insurance Policy Form.pdf',
      description: 'Group term life insurance policy providing financial security to employees\' families.',
      policyNumber: 'LI-2024-SMG-002',
      provider: 'LIC of India',
      coverageAmount: '₹25,00,000',
      validFrom: '01-Apr-2024',
      validTill: '31-Mar-2025',
      uploadDate: '20-Mar-2024',
      size: '1.8 MB',
      benefits: [
        'Death Benefit: ₹25,00,000',
        'Critical Illness Cover: ₹5,00,000',
        'Accidental Death Benefit (Additional): ₹25,00,000',
        'Premium Waiver on Disability',
        'Maturity Benefit (if applicable)'
      ],
      coverage: [
        'Employee (Primary Insured)',
        'Nominee Benefits'
      ]
    },
    {
      id: 3,
      type: 'Health Insurance Policy',
      fileName: 'Health Insurance Policy Form.pdf',
      description: 'Comprehensive health insurance coverage including hospitalization and OPD benefits.',
      policyNumber: 'HI-2024-SMG-003',
      provider: 'Star Health Insurance',
      coverageAmount: '₹5,00,000',
      validFrom: '01-Jan-2024',
      validTill: '31-Dec-2024',
      uploadDate: '10-Dec-2023',
      size: '3.2 MB',
      benefits: [
        'Hospitalization Expenses: ₹5,00,000',
        'Pre-hospitalization: 60 days',
        'Post-hospitalization: 90 days',
        'Day Care Procedures: Covered',
        'Ambulance Charges: ₹2,000 per hospitalization',
        'Annual Health Check-up: ₹2,000',
        'Maternity Benefit: ₹50,000 (after 9 months)'
      ],
      coverage: [
        'Employee',
        'Spouse',
        'Dependent Children',
        'Dependent Parents (optional)'
      ]
    }
  ];

  const handleDownload = (policy: any) => {
    // Mock download functionality
    console.log(`Downloading ${policy.fileName}`);
    alert(`Downloading ${policy.fileName}...`);
  };

  const handleViewDetails = (policy: any) => {
    setSelectedPolicy(policy);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Shield size={32} />
          Insurance Policy Information
        </h1>
        <p className="text-[#87CEEB] opacity-90">
          Supply of Information From Finance Department
        </p>
      </div>

      {/* Information Note */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-[#0B4DA2] shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-[#1B254B] mb-2">Important Information</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#0B4DA2] mt-0.5">•</span>
                <span>All insurance policies are maintained and updated by the Finance Department.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0B4DA2] mt-0.5">•</span>
                <span>Please download and review your policy documents carefully.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0B4DA2] mt-0.5">•</span>
                <span>For any claims or queries, contact the Finance Department or HR.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0B4DA2] mt-0.5">•</span>
                <span>Keep your nominee details updated in the HR portal.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Active Policies</p>
              <p className="text-2xl font-bold text-[#1B254B]">{insurancePolicies.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Total Coverage</p>
              <p className="text-2xl font-bold text-[#1B254B]">₹40L+</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Insurance Providers</p>
              <p className="text-2xl font-bold text-[#1B254B]">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Documents Grid */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-[#1B254B] mb-6">Available Policy Documents</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insurancePolicies.map((policy) => (
            <div 
              key={policy.id} 
              className="border-2 border-gray-200 rounded-3xl p-6 hover:border-[#0B4DA2] transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0B4DA2] to-[#042A5B] flex items-center justify-center shrink-0">
                  <FileText className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1B254B] mb-1">{policy.type}</h3>
                  <p className="text-sm text-gray-600">{policy.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-[#A3AED0] mb-1">Policy Number</p>
                    <p className="text-sm font-bold text-[#1B254B]">{policy.policyNumber}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-[#A3AED0] mb-1">Provider</p>
                    <p className="text-sm font-bold text-[#1B254B]">{policy.provider}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-[#A3AED0] mb-1">Coverage Amount</p>
                    <p className="text-sm font-bold text-green-600">{policy.coverageAmount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-[#A3AED0] mb-1">File Size</p>
                    <p className="text-sm font-bold text-[#1B254B]">{policy.size}</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-[#0B4DA2]" />
                    <span className="font-semibold text-[#1B254B]">Valid Period:</span>
                    <span className="text-gray-700">{policy.validFrom} to {policy.validTill}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleViewDetails(policy)}
                  className="flex-1 bg-gray-100 text-[#1B254B] py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  View Details
                </button>
                <button
                  onClick={() => handleDownload(policy)}
                  className="flex-1 bg-[#0B4DA2] text-white py-2.5 rounded-xl font-bold hover:bg-[#042A5B] transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#1B254B] mb-2">{selectedPolicy.type}</h3>
                <p className="text-gray-600">{selectedPolicy.description}</p>
              </div>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Policy Information */}
              <div>
                <h4 className="font-bold text-[#1B254B] mb-3 flex items-center gap-2">
                  <FileText className="text-[#0B4DA2]" size={20} />
                  Policy Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-[#A3AED0] mb-1">Policy Number</p>
                    <p className="font-bold text-[#1B254B]">{selectedPolicy.policyNumber}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-[#A3AED0] mb-1">Provider</p>
                    <p className="font-bold text-[#1B254B]">{selectedPolicy.provider}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-[#A3AED0] mb-1">Coverage Amount</p>
                    <p className="font-bold text-green-600">{selectedPolicy.coverageAmount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-[#A3AED0] mb-1">Valid Period</p>
                    <p className="font-bold text-[#1B254B]">{selectedPolicy.validFrom} - {selectedPolicy.validTill}</p>
                  </div>
                </div>
              </div>

              {/* Level-Based Coverage Table (for Group Accidental Insurance) */}
              {selectedPolicy.levelBasedCoverage && (
                <div>
                  <h4 className="font-bold text-[#1B254B] mb-3 flex items-center gap-2">
                    <Building2 className="text-[#0B4DA2]" size={20} />
                    Coverage Based on Employee Level
                  </h4>
                  <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-t-3xl overflow-hidden">
                    <div className="grid grid-cols-2 p-4">
                      <div className="font-bold text-white">Employee Level</div>
                      <div className="font-bold text-white">Sum Insured</div>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 border-t-0 rounded-b-3xl overflow-hidden">
                    {selectedPolicy.levelBasedCoverage.map((coverage: any, idx: number) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-2 p-4 ${
                          idx !== selectedPolicy.levelBasedCoverage.length - 1 ? 'border-b border-gray-200' : ''
                        } ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <div className="font-semibold text-[#1B254B]">{coverage.level}</div>
                        <div className="font-bold text-green-600">₹{coverage.sumInsured}</div>
                      </div>
                    ))}
                  </div>
                  {selectedPolicy.premiumInfo && (
                    <div className="mt-3 bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-[#0B4DA2]">Note: </span>
                        {selectedPolicy.premiumInfo}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Benefits */}
              <div>
                <h4 className="font-bold text-[#1B254B] mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  Benefits Covered
                </h4>
                <div className="bg-green-50 rounded-xl p-4">
                  <ul className="space-y-2">
                    {selectedPolicy.benefits.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Coverage */}
              <div>
                <h4 className="font-bold text-[#1B254B] mb-3 flex items-center gap-2">
                  <User className="text-[#0B4DA2]" size={20} />
                  Coverage Includes
                </h4>
                <div className="bg-blue-50 rounded-xl p-4">
                  <ul className="space-y-2">
                    {selectedPolicy.coverage.map((member: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-[#0B4DA2] mt-0.5">•</span>
                        <span className="text-gray-700">{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedPolicy(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(selectedPolicy)}
                className="flex-1 bg-[#0B4DA2] text-white py-3 rounded-xl font-bold hover:bg-[#042A5B] transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
