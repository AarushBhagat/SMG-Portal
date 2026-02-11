import { useState } from 'react';
import { IndianRupee, Search, Calendar, Download, Filter } from 'lucide-react';

interface SalaryRecord {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  designation: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  status: 'Paid' | 'Pending' | 'Processing';
  month: string;
}

export const SalaryStatusDisplay = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Pending' | 'Processing'>('All');
  
  // Real salary data for employee@smg.com - Mr Praphull Chandra (IT DEPARTMENT)
  const [salaryRecords] = useState<SalaryRecord[]>([
    {
      id: 1,
      empName: 'Mr Praphull Chandra',
      empId: 'EMP-IT-001',
      dept: 'IT Department',
      designation: 'IT Employee',
      basicSalary: 17894,
      allowances: 17893, // HRA(5368) + Special Allowance(9525) + Conveyance(1600) + Bonus(1400)
      deductions: 3615, // EPF Employee(2147) + ESI Employee(268) + PT(200) + Tax(1000)
      netSalary: 32172, // Total: 38,897 Monthly CTC includes employer contributions
      paymentDate: '2024-12-25',
      status: 'Paid',
      month: 'December 2024'
    }
  ]);

  const filteredRecords = salaryRecords.filter(record => {
    const matchesSearch = record.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPaid = salaryRecords.filter(r => r.status === 'Paid').reduce((sum, r) => sum + r.netSalary, 0);
  const totalPending = salaryRecords.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <IndianRupee className="text-green-500" size={36} />
          Salary Status Display
        </h1>
        <p className="text-gray-500 mt-1">View and manage employee salary records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <IndianRupee className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{salaryRecords.filter(r => r.status === 'Paid').length}</p>
              <p className="text-sm text-gray-500">Salaries Paid</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{totalPending}</p>
              <p className="text-sm text-gray-500">Pending Payments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <IndianRupee className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">₹{(totalPaid / 100000).toFixed(2)}L</p>
              <p className="text-sm text-gray-500">Total Disbursed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">Dec 2024</p>
              <p className="text-sm text-gray-500">Current Period</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
            </select>
            <button className="px-6 py-3 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold">
              <Download size={20} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Salary Records Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Salary Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Employee</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Designation</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Basic Salary</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Allowances</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Deductions</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Net Salary</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Payment Date</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-bold text-[#1B254B]">{record.empName}</p>
                      <p className="text-sm text-gray-500">{record.empId} • {record.dept}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{record.designation}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-[#1B254B]">₹{record.basicSalary.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-green-600">+₹{record.allowances.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-red-600">-₹{record.deductions.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-xl font-bold text-[#0B4DA2]">₹{record.netSalary.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{record.paymentDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      record.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      record.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {record.status}
                    </span>
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
