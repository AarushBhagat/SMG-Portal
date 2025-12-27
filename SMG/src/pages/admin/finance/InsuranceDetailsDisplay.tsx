import { useState } from 'react';
import { Shield, Search, Calendar, FileText, User } from 'lucide-react';

interface InsuranceRecord {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  policyNumber: string;
  policyType: string;
  provider: string;
  coverageAmount: number;
  premium: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Pending';
  nominee: string;
}

export const InsuranceDetailsDisplay = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Health' | 'Life' | 'Accident'>('All');
  
  const [insuranceRecords] = useState<InsuranceRecord[]>([
    {
      id: 1,
      empName: 'Amit Kumar',
      empId: 'SMG-2024-042',
      dept: 'Assembly',
      policyNumber: 'HDFC-HEALTH-2024-042',
      policyType: 'Health Insurance',
      provider: 'HDFC ERGO',
      coverageAmount: 500000,
      premium: 12000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      nominee: 'Sunita Kumar'
    },
    {
      id: 2,
      empName: 'Priya Sharma',
      empId: 'SMG-2024-089',
      dept: 'HR',
      policyNumber: 'LIC-LIFE-2024-089',
      policyType: 'Life Insurance',
      provider: 'LIC',
      coverageAmount: 1000000,
      premium: 18000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      nominee: 'Raj Sharma'
    },
    {
      id: 3,
      empName: 'Rajesh Patel',
      empId: 'SMG-2024-123',
      dept: 'Finance',
      policyNumber: 'ICICI-ACC-2024-123',
      policyType: 'Accident Insurance',
      provider: 'ICICI Lombard',
      coverageAmount: 300000,
      premium: 5000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      nominee: 'Meera Patel'
    }
  ]);

  const filteredRecords = insuranceRecords.filter(record => {
    const matchesSearch = record.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || record.policyType.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  const activeInsurance = insuranceRecords.filter(r => r.status === 'Active').length;
  const totalCoverage = insuranceRecords.reduce((sum, r) => sum + r.coverageAmount, 0);
  const totalPremium = insuranceRecords.reduce((sum, r) => sum + r.premium, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Shield className="text-blue-500" size={36} />
          Insurance Details Display
        </h1>
        <p className="text-gray-500 mt-1">View and manage employee insurance policies</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{activeInsurance}</p>
              <p className="text-sm text-gray-500">Active Policies</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{insuranceRecords.length}</p>
              <p className="text-sm text-gray-500">Total Policies</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">₹{(totalCoverage / 10000000).toFixed(1)}Cr</p>
              <p className="text-sm text-gray-500">Total Coverage</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">₹{(totalPremium / 100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-500">Total Premium</p>
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
              placeholder="Search by name, ID, or policy number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          >
            <option value="All">All Types</option>
            <option value="Health">Health Insurance</option>
            <option value="Life">Life Insurance</option>
            <option value="Accident">Accident Insurance</option>
          </select>
        </div>
      </div>

      {/* Insurance Records Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">Insurance Policies</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Employee</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Policy Details</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Provider</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Coverage</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Premium</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Validity</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Nominee</th>
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
                    <div>
                      <p className="font-semibold text-[#1B254B]">{record.policyType}</p>
                      <p className="text-sm text-gray-500">{record.policyNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-[#1B254B]">{record.provider}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-lg font-bold text-blue-600">₹{(record.coverageAmount / 100000).toFixed(1)}L</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-orange-600">₹{record.premium.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{new Date(record.startDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">to {new Date(record.endDate).toLocaleDateString()}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{record.nominee}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      record.status === 'Active' ? 'bg-green-100 text-green-700' :
                      record.status === 'Expired' ? 'bg-red-100 text-red-700' :
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
