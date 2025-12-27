import { useState } from 'react';
import { Search, Star, User, Save, X } from 'lucide-react';

interface Employee {
  empId: string;
  empName: string;
  designation: string;
  department: string;
  ratings: {
    workQuality: number;
    productivity: number;
    teamwork: number;
    communication: number;
    punctuality: number;
  };
  overallRating: number;
  lastRated: string;
}

export const EmployeeRatings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingRatings, setEditingRatings] = useState({
    workQuality: 0,
    productivity: 0,
    teamwork: 0,
    communication: 0,
    punctuality: 0
  });

  const [employees, setEmployees] = useState<Employee[]>([
    {
      empId: 'SMG-EMP-245',
      empName: 'Amit Kumar',
      designation: 'Software Engineer',
      department: 'Information Technology',
      ratings: {
        workQuality: 4,
        productivity: 5,
        teamwork: 4,
        communication: 4,
        punctuality: 5
      },
      overallRating: 4.4,
      lastRated: '1 Dec 2025'
    },
    {
      empId: 'SMG-EMP-189',
      empName: 'Priya Singh',
      designation: 'QA Tester',
      department: 'Information Technology',
      ratings: {
        workQuality: 5,
        productivity: 4,
        teamwork: 5,
        communication: 5,
        punctuality: 4
      },
      overallRating: 4.6,
      lastRated: '5 Dec 2025'
    },
    {
      empId: 'SMG-EMP-312',
      empName: 'Rahul Verma',
      designation: 'System Admin',
      department: 'Information Technology',
      ratings: {
        workQuality: 4,
        productivity: 4,
        teamwork: 3,
        communication: 4,
        punctuality: 5
      },
      overallRating: 4.0,
      lastRated: '10 Dec 2025'
    },
    {
      empId: 'SMG-EMP-456',
      empName: 'Sneha Patel',
      designation: 'UI/UX Designer',
      department: 'Information Technology',
      ratings: {
        workQuality: 0,
        productivity: 0,
        teamwork: 0,
        communication: 0,
        punctuality: 0
      },
      overallRating: 0,
      lastRated: 'Not Rated'
    }
  ]);

  const ratingCategories = [
    { key: 'workQuality', label: 'Work Quality', icon: '💼' },
    { key: 'productivity', label: 'Productivity', icon: '⚡' },
    { key: 'teamwork', label: 'Teamwork', icon: '👥' },
    { key: 'communication', label: 'Communication', icon: '💬' },
    { key: 'punctuality', label: 'Punctuality', icon: '⏰' }
  ];

  const handleOpenRating = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditingRatings(employee.ratings);
  };

  const handleRatingChange = (category: string, value: number) => {
    setEditingRatings({ ...editingRatings, [category]: value });
  };

  const handleSaveRatings = () => {
    if (!selectedEmployee) return;

    const total = Object.values(editingRatings).reduce((sum, val) => sum + val, 0);
    const overall = parseFloat((total / 5).toFixed(1));

    setEmployees(employees.map(emp =>
      emp.empId === selectedEmployee.empId
        ? { ...emp, ratings: editingRatings, overallRating: overall, lastRated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }
        : emp
    ));
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-yellow-600';
    if (rating > 0) return 'text-red-600';
    return 'text-gray-400';
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-100';
    if (rating >= 3.5) return 'bg-blue-100';
    if (rating >= 2.5) return 'bg-yellow-100';
    if (rating > 0) return 'bg-red-100';
    return 'bg-gray-100';
  };

  const StarRating = ({ rating, onRate, readonly = false }: { rating: number; onRate?: (val: number) => void; readonly?: boolean }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !readonly && onRate && onRate(star)}
            disabled={readonly}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-all ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            <Star size={readonly ? 16 : 24} fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Employee Ratings</h1>
        <p className="text-white/80">Rate your team members' performance and contribution</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          <input
            type="text"
            placeholder="Search by employee name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.empId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <User className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1B254B] mb-1">{employee.empName}</h3>
                    <p className="text-xs text-gray-500">{employee.empId}</p>
                    <p className="text-sm text-gray-600">{employee.designation}</p>
                  </div>
                </div>
              </div>

              {/* Overall Rating */}
              <div className="flex items-center justify-center py-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-1 ${getRatingColor(employee.overallRating)}`}>
                    {employee.overallRating > 0 ? employee.overallRating.toFixed(1) : 'N/A'}
                  </div>
                  <StarRating rating={Math.round(employee.overallRating)} readonly />
                  <p className="text-xs text-gray-500 mt-2">Overall Rating</p>
                </div>
              </div>

              {/* Rating Categories Preview */}
              <div className="space-y-2">
                {ratingCategories.map((category) => (
                  <div key={category.key} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <span>{category.icon}</span>
                      {category.label}
                    </span>
                    <StarRating rating={employee.ratings[category.key as keyof typeof employee.ratings]} readonly />
                  </div>
                ))}
              </div>

              {/* Last Rated */}
              <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
                Last rated: {employee.lastRated}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenRating(employee)}
                className="w-full bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Star size={18} />
                {employee.overallRating > 0 ? 'Update Rating' : 'Rate Employee'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] p-6 rounded-t-3xl">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h2 className="text-2xl font-bold">Rate Employee</h2>
                  <p className="text-white/80 text-sm">{selectedEmployee.empName} ({selectedEmployee.empId})</p>
                </div>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Employee Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <User className="text-blue-500" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Employee Details</p>
                    <p className="font-bold text-[#1B254B]">{selectedEmployee.designation} • {selectedEmployee.department}</p>
                  </div>
                </div>
              </div>

              {/* Rating Categories */}
              <div className="space-y-4">
                {ratingCategories.map((category) => (
                  <div key={category.key} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-bold text-[#1B254B]">{category.label}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        getRatingBgColor(editingRatings[category.key as keyof typeof editingRatings])
                      } ${getRatingColor(editingRatings[category.key as keyof typeof editingRatings])}`}>
                        {editingRatings[category.key as keyof typeof editingRatings]}/5
                      </div>
                    </div>
                    <StarRating
                      rating={editingRatings[category.key as keyof typeof editingRatings]}
                      onRate={(val) => handleRatingChange(category.key, val)}
                    />
                  </div>
                ))}
              </div>

              {/* Overall Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Overall Rating</p>
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {(Object.values(editingRatings).reduce((sum, val) => sum + val, 0) / 5).toFixed(1)}
                </div>
                <StarRating rating={Math.round(Object.values(editingRatings).reduce((sum, val) => sum + val, 0) / 5)} readonly />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveRatings}
                  className="flex-1 bg-gradient-to-br from-[#042A5B] to-[#0B4DA2] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Ratings
                </button>
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
