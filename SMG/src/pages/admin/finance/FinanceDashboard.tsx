import { DollarSign, Shield, TrendingUp, Package, Users, FileText } from 'lucide-react';

export const FinanceDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B]">Finance Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage salaries, insurance, loans, and asset requests</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">245</p>
              <p className="text-sm text-gray-500">Salaries Processed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">189</p>
              <p className="text-sm text-gray-500">Active Insurance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">12</p>
              <p className="text-sm text-gray-500">Pending Loans</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B254B]">8</p>
              <p className="text-sm text-gray-500">Asset Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="text-blue-500" size={24} />
            <h2 className="text-xl font-bold text-[#1B254B]">Recent Salary Updates</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Amit Kumar', empId: 'SMG-2024-042', amount: '₹45,000', date: '2024-12-25' },
              { name: 'Priya Sharma', empId: 'SMG-2024-089', amount: '₹52,000', date: '2024-12-25' },
              { name: 'Rajesh Patel', empId: 'SMG-2024-123', amount: '₹38,000', date: '2024-12-24' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#1B254B]">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.empId}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{item.amount}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-[#1B254B]">Pending Approvals</h2>
          </div>
          <div className="space-y-3">
            {[
              { type: 'Loan Request', name: 'Vikram Singh', amount: '₹2,00,000', status: 'Pending' },
              { type: 'Asset Request', name: 'Anjali Verma', amount: 'Laptop', status: 'Pending' },
              { type: 'Loan Request', name: 'Sunil Patel', amount: '₹1,50,000', status: 'Pending' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#1B254B]">{item.type}</p>
                    <p className="text-sm text-gray-500">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">{item.amount}</p>
                    <span className="text-xs px-2 py-1 bg-orange-500 text-white rounded-full">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <Users className="text-green-500" size={24} />
          Monthly Financial Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-sm text-gray-500 mb-1">Total Salary Disbursed</p>
            <p className="text-3xl font-bold text-green-600">₹1.2 Cr</p>
            <p className="text-xs text-gray-500 mt-1">December 2024</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-500 mb-1">Insurance Premium</p>
            <p className="text-3xl font-bold text-blue-600">₹8.5 L</p>
            <p className="text-xs text-gray-500 mt-1">This Month</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <p className="text-sm text-gray-500 mb-1">Loans Approved</p>
            <p className="text-3xl font-bold text-purple-600">₹15 L</p>
            <p className="text-xs text-gray-500 mt-1">This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};
