import { useState } from 'react';
import { ShirtIcon, Search, Calendar, User, Package } from 'lucide-react';

interface IssueRecord {
  id: number;
  empName: string;
  empId: string;
  dept: string;
  items: string;
  sizes: string;
  issueDate: string;
  issuedBy: string;
  category: 'New Joiner' | 'Additional';
}

export const UniformIssueRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [records] = useState<IssueRecord[]>([
    {
      id: 1,
      empName: 'Amit Kumar',
      empId: 'SMG-2024-042',
      dept: 'Assembly',
      items: 'Shirt, Pants, Safety Shoes',
      sizes: 'L - 34 - 9',
      issueDate: '2024-10-15',
      issuedBy: 'P&A Admin',
      category: 'New Joiner'
    },
    {
      id: 2,
      empName: 'Priya Sharma',
      empId: 'SMG-2024-089',
      dept: 'HR',
      items: 'Shirt (2 pcs)',
      sizes: 'M',
      issueDate: '2024-11-02',
      issuedBy: 'P&A Admin',
      category: 'Additional'
    },
    {
      id: 3,
      empName: 'Rajesh Patel',
      empId: 'SMG-2024-123',
      dept: 'Finance',
      items: 'Shirt (Extra)',
      sizes: 'L',
      issueDate: '2024-12-20',
      issuedBy: 'P&A Admin',
      category: 'Additional'
    }
  ]);

  const filteredRecords = records.filter(rec =>
    rec.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <ShirtIcon className="text-indigo-500" size={36} />
          Uniform Issue Records
        </h1>
        <p className="text-gray-500 mt-1">View all uniform issuance history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Package className="text-indigo-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{records.length}</p>
              <p className="text-sm text-gray-500">Total Issues</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{records.filter(r => r.category === 'New Joiner').length}</p>
              <p className="text-sm text-gray-500">New Joiners</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShirtIcon className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">{records.filter(r => r.category === 'Additional').length}</p>
              <p className="text-sm text-gray-500">Additional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by employee name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4">All Issue Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Employee</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Items Issued</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Sizes</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Category</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Issue Date</th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-600">Issued By</th>
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
                    <p className="font-semibold text-[#1B254B]">{record.items}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-[#1B254B]">{record.sizes}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      record.category === 'New Joiner' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {record.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">{record.issueDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{record.issuedBy}</p>
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
