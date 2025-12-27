import { useState } from 'react';
import { ShoppingCart, Search, DollarSign, Send, CheckCircle } from 'lucide-react';

export const SaleCoupons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const employees = [
    { id: 1, name: 'Amit Kumar', empId: 'SMG-2024-042', dept: 'Assembly', balance: 5 },
    { id: 2, name: 'Priya Sharma', empId: 'SMG-2024-089', dept: 'HR', balance: 10 },
    { id: 3, name: 'Rajesh Patel', empId: 'SMG-2024-123', dept: 'Finance', balance: 2 },
    { id: 4, name: 'Sneha Reddy', empId: 'SMG-2024-156', dept: 'Marketing', balance: 8 },
    { id: 5, name: 'Vikram Singh', empId: 'SMG-2024-189', dept: 'Production', balance: 15 }
  ];

  const couponPrice = 100;
  const totalAmount = quantity * couponPrice;

  const handleSale = () => {
    if (selectedEmployee && quantity > 0) {
      // Here you would make API call to record the sale
      console.log('Sale:', { employee: selectedEmployee, quantity, totalAmount });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedEmployee(null);
        setQuantity(1);
      }, 2000);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <ShoppingCart className="text-blue-500" size={36} />
          Sale of New Coupons
        </h1>
        <p className="text-gray-500 mt-1">Record coupon sales to employees and notify finance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#1B254B] mb-4">Select Employee</h2>
          
          {/* Search Box */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          {/* Employee List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredEmployees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployee(emp)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedEmployee?.id === emp.id
                    ? 'border-[#0B4DA2] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-[#1B254B]">{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.empId} • {emp.dept}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs font-semibold text-gray-600">Current</p>
                    <p className="text-lg font-bold text-[#0B4DA2]">{emp.balance}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sale Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#1B254B] mb-4">Sale Details</h2>

          {selectedEmployee ? (
            <div className="space-y-6">
              {/* Selected Employee */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Selected Employee</p>
                <p className="font-bold text-[#1B254B]">{selectedEmployee.name}</p>
                <p className="text-sm text-gray-500">{selectedEmployee.empId}</p>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Coupons
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg font-semibold"
                />
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per Coupon</span>
                  <span className="font-semibold text-[#1B254B]">₹{couponPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold text-[#1B254B]">{quantity}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#1B254B]">Total Amount</span>
                    <span className="text-2xl font-bold text-[#0B4DA2]">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Information Note */}
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Finance department and employee will be automatically notified via email about this transaction.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSale}
                className="w-full bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Complete Sale & Notify
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <ShoppingCart size={64} className="mb-4 opacity-20" />
              <p className="text-lg font-semibold text-gray-500">Select an employee to proceed</p>
              <p className="text-sm text-gray-400 mt-1">Search and select from the list</p>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-[#1B254B] mb-2">Sale Successful!</h3>
              <p className="text-gray-600 mb-4">
                {quantity} coupon(s) sold to {selectedEmployee?.name}
              </p>
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                ✅ Finance department notified<br />
                ✅ Employee notified via email
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
