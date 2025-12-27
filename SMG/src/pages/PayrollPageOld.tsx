import React, { useState } from 'react';
import {
  IndianRupee,
  Download,
  Calendar
} from 'lucide-react';

export const PayrollPageOld = ({ user }) => {
  // Mock data removed, replaced with null/empty for integration

  // Salary categories with all values set to 0, keeping original table structure and spacing
  const salaryData = {
    salaryHead: [
      { name: 'Basic', monthly: 0, annual: 0 },
      { name: 'HRA', monthly: 0, annual: 0 },
      { name: 'Special Allowance', monthly: 0, annual: 0 },
      { name: 'Conveyance', monthly: 0, annual: 0 },
      { name: 'Medical', monthly: 0, annual: 0 },
    ],
    otherPerks: [
      { name: 'Bonus', monthly: 0, annual: 0 },
      { name: 'Provident Fund', monthly: 0, annual: 0 },
      { name: 'Gratuity', monthly: 0, annual: 0 },
      { name: 'ESI', monthly: 0, annual: 0 },
    ]
  };

  const salaryHeadSubtotal = 0;
  const otherPerksSubtotal = 0;
  const totalCTC = 0;

  const salaryHeadAnnual = 0;
  const otherPerksAnnual = 0;
  const totalCTCAnnual = 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-[30px] p-8 text-white shadow-xl shadow-blue-900/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl">
            <IndianRupee size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Payroll & Salary</h1>
            <p className="text-blue-100 text-sm">{user.name} • {user.empId}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs text-blue-100 mb-1">Monthly CTC</p>
            <p className="text-2xl font-bold">₹{totalCTC !== null && totalCTC !== undefined ? totalCTC.toLocaleString() : '--'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs text-blue-100 mb-1">Annual CTC</p>
            <p className="text-2xl font-bold">₹{totalCTCAnnual !== null && totalCTCAnnual !== undefined ? totalCTCAnnual.toLocaleString() : '--'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs text-blue-100 mb-1">Current Month</p>
            <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Salary Breakdown Table */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-[#1B254B] mb-1">Salary Breakdown</h3>
            <p className="text-sm text-[#A3AED0]">Detailed breakdown of your compensation structure</p>
          </div>
          <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-xl transition-all active:scale-95">
            <Download size={18} />
            Download Payslip
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border-2 border-gray-300 shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white">
                <th className="border-r-2 border-white/20 px-6 py-4 text-center font-bold text-sm w-16">A</th>
                <th className="border-r-2 border-white/20 px-6 py-4 text-left font-bold">SALARY HEAD</th>
                <th className="border-r-2 border-white/20 px-6 py-4 text-right font-bold">MONTHLY (₹)</th>
                <th className="px-6 py-4 text-right font-bold">ANNUAL (₹)</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.salaryHead.map((item, idx) => (
                <tr key={item.name} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="text-center font-bold">A{idx + 1}</td>
                  <td className="font-semibold pl-6 py-3">{item.name}</td>
                  <td className="text-right pr-6 py-3">₹{item.monthly}</td>
                  <td className="text-right pr-6 py-3">₹{item.annual}</td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td></td>
                <td className="font-bold pl-6 py-3">Subtotal (A)</td>
                <td className="text-right font-bold pr-6 py-3">₹{salaryHeadSubtotal}</td>
                <td className="text-right font-bold pr-6 py-3">₹{salaryHeadAnnual}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <th className="border-r-2 border-white/20 px-6 py-4 text-center font-bold text-sm w-16">B</th>
                <th className="border-r-2 border-white/20 px-6 py-4 text-left font-bold">OTHER PERKS</th>
                <th className="border-r-2 border-white/20 px-6 py-4 text-right font-bold">MONTHLY (₹)</th>
                <th className="px-6 py-4 text-right font-bold">ANNUAL (₹)</th>
              </tr>
            </thead>
            <tbody>
              {salaryData.otherPerks.map((item, idx) => (
                <tr key={item.name} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="text-center font-bold">B{idx + 1}</td>
                  <td className="font-semibold pl-6 py-3">{item.name}</td>
                  <td className="text-right pr-6 py-3">₹{item.monthly}</td>
                  <td className="text-right pr-6 py-3">₹{item.annual}</td>
                </tr>
              ))}
              <tr className="bg-purple-50">
                <td></td>
                <td className="font-bold pl-6 py-3">Subtotal (B)</td>
                <td className="text-right font-bold pr-6 py-3">₹{otherPerksSubtotal}</td>
                <td className="text-right font-bold pr-6 py-3">₹{otherPerksAnnual}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full">
            <tbody>
              <tr className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
                <td className="px-6 py-6 border-r border-yellow-400 w-16"></td>
                <td className="px-6 py-6 border-r border-yellow-400">
                  <div className="flex items-center gap-2">
                    <IndianRupee size={24} className="text-yellow-800" />
                    <span className="font-bold text-[#1B254B] text-lg">Total Annual CTC (A+B)</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-right border-r border-yellow-400">
                  <span className="font-bold text-yellow-900 text-xl">₹{totalCTC}</span>
                </td>
                <td className="px-6 py-6 text-right">
                  <span className="font-bold text-yellow-900 text-xl">₹{totalCTCAnnual}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-[#0B4DA2] rounded-xl p-6 shadow-md">
          <div className="flex items-start gap-3">
            <div className="bg-[#0B4DA2] text-white p-2 rounded-lg mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#1B254B] mb-3 text-lg">Important Notes</h4>
              <div className="space-y-2.5 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-[#0B4DA2] font-bold">•</span>
                  <p><span className="font-semibold">Income Tax:</span> Shall be deducted at source as per the Income Tax Act/Rules.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0B4DA2] font-bold">•</span>
                  <p><span className="font-semibold">ESI:</span> Shall be deducted at Gross as per the ESI Act/Rules.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0B4DA2] font-bold">•</span>
                  <p><span className="font-semibold">Gratuity:</span> Will be payable as per the provision of the Payment of Gratuity Act on completion of 5 years of continuous service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
