import { useState, useMemo } from 'react';
import { Star, Plus, Eye, X, Filter, Search, Calendar, Award, TrendingUp, Users } from 'lucide-react';
import { useApp } from '../../context/AppContextEnhanced';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Rating {
  ratingId: string;
  userId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  score: number; // 1-5
  feedback: string;
  remarks: string;
  evaluationDate: Date;
  evaluatedBy: string;
  evaluatedByName: string;
  quarter: string;
  category: 'Performance' | 'Behavior' | 'Skills' | 'Overall';
}

const EmployeeRating = () => {
  const { allUsers, currentUser } = useApp();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterQuarter, setFilterQuarter] = useState('All');
  
  const [formData, setFormData] = useState({
    score: 0,
    category: 'Performance' as 'Performance' | 'Behavior' | 'Skills' | 'Overall',
    feedback: '',
    remarks: '',
    quarter: getCurrentQuarter()
  });

  // Get current quarter
  function getCurrentQuarter() {
    const now = new Date();
    const quarter = Math.floor((now.getMonth() + 3) / 3);
    return `Q${quarter}-${now.getFullYear()}`;
  }

  // Get all departments
  const departments = useMemo(() => {
    const depts = new Set(allUsers.map(user => user.department).filter(Boolean));
    return ['All', ...Array.from(depts)];
  }, [allUsers]);

  // Get all ratings from all users
  const allRatings = useMemo(() => {
    const ratings: Rating[] = [];
    allUsers.forEach(user => {
      if (user.ratings && Array.isArray(user.ratings)) {
        user.ratings.forEach((rating: any) => {
          ratings.push({
            ...rating,
            userId: user.id,
            employeeId: user.employeeId,
            employeeName: user.name,
            department: user.department
          });
        });
      }
    });
    return ratings.sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime());
  }, [allUsers]);

  // Filter employees for rating
  const filteredEmployees = useMemo(() => {
    return allUsers.filter(user => {
      const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'All' || user.department === filterDepartment;
      return matchesSearch && matchesDepartment && user.role === 'employee';
    });
  }, [allUsers, searchTerm, filterDepartment]);

  // Filter ratings
  const filteredRatings = useMemo(() => {
    return allRatings.filter(rating => {
      const matchesDepartment = filterDepartment === 'All' || rating.department === filterDepartment;
      const matchesQuarter = filterQuarter === 'All' || rating.quarter === filterQuarter;
      const matchesSearch = rating.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rating.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDepartment && matchesQuarter && matchesSearch;
    });
  }, [allRatings, filterDepartment, filterQuarter, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalRated = new Set(filteredRatings.map(r => r.userId)).size;
    const avgScore = filteredRatings.length > 0
      ? (filteredRatings.reduce((sum, r) => sum + r.score, 0) / filteredRatings.length).toFixed(1)
      : '0.0';
    const thisQuarter = filteredRatings.filter(r => r.quarter === getCurrentQuarter()).length;
    
    return {
      totalRated,
      avgScore,
      thisQuarter,
      totalRatings: filteredRatings.length
    };
  }, [filteredRatings]);

  const handleOpenRatingModal = (employee: any) => {
    setSelectedEmployee(employee);
    setFormData({
      score: 0,
      category: 'Performance',
      feedback: '',
      remarks: '',
      quarter: getCurrentQuarter()
    });
    setShowRatingModal(true);
  };

  const handleViewDetails = (rating: Rating) => {
    setSelectedRating(rating);
    setShowDetailsModal(true);
  };

  const handleSubmitRating = async () => {
    if (!selectedEmployee || formData.score === 0) {
      alert('Please select a rating score');
      return;
    }

    try {
      const ratingId = `RATING-${Date.now()}`;
      const newRating = {
        ratingId,
        score: formData.score,
        category: formData.category,
        feedback: formData.feedback,
        remarks: formData.remarks,
        quarter: formData.quarter,
        evaluationDate: new Date().toISOString(),
        evaluatedBy: currentUser.id,
        evaluatedByName: currentUser.name,
        createdAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'users', selectedEmployee.id), {
        ratings: arrayUnion(newRating),
        updatedAt: serverTimestamp()
      });

      alert('Rating submitted successfully!');
      setShowRatingModal(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    }
  };

  const renderStars = (score: number, interactive: boolean = false, onChange?: (score: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${
              star <= score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:fill-yellow-300 hover:text-yellow-300' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      'Performance': 'bg-blue-100 text-blue-800',
      'Behavior': 'bg-green-100 text-green-800',
      'Skills': 'bg-purple-100 text-purple-800',
      'Overall': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employee Rating Management</h1>
            <p className="text-blue-100">Evaluate and track employee performance ratings</p>
          </div>
          <Award className="w-16 h-16 opacity-20" />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Employees Rated</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalRated}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.avgScore}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">This Quarter</p>
              <p className="text-3xl font-bold text-green-600">{stats.thisQuarter}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Ratings</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalRatings}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={filterQuarter}
            onChange={(e) => setFilterQuarter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Quarters</option>
            <option value={getCurrentQuarter()}>{getCurrentQuarter()}</option>
            <option value={`Q1-${new Date().getFullYear()}`}>Q1-{new Date().getFullYear()}</option>
            <option value={`Q2-${new Date().getFullYear()}`}>Q2-{new Date().getFullYear()}</option>
            <option value={`Q3-${new Date().getFullYear()}`}>Q3-{new Date().getFullYear()}</option>
            <option value={`Q4-${new Date().getFullYear()}`}>Q4-{new Date().getFullYear()}</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 font-semibold">
              Rate Employees
            </button>
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">
              Rating History
            </button>
          </div>
        </div>

        {/* Employees List for Rating */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredEmployees.map(employee => {
              const latestRating = employee.ratings && employee.ratings.length > 0
                ? employee.ratings[employee.ratings.length - 1]
                : null;
              
              return (
                <div key={employee.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                        {employee.name?.charAt(0) || 'E'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.employeeId}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{employee.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Designation:</span>
                      <span className="font-medium">{employee.designation || 'N/A'}</span>
                    </div>
                    {latestRating && (
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Latest Rating:</p>
                        {renderStars(latestRating.score)}
                        <p className="text-xs text-gray-500 mt-1">{latestRating.quarter}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenRatingModal(employee)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Rating
                  </button>
                </div>
              );
            })}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No employees found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Rate Employee</h2>
                  <p className="text-blue-100">{selectedEmployee.name} - {selectedEmployee.employeeId}</p>
                </div>
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Performance">Performance</option>
                  <option value="Behavior">Behavior</option>
                  <option value="Skills">Skills</option>
                  <option value="Overall">Overall</option>
                </select>
              </div>

              {/* Quarter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quarter
                </label>
                <input
                  type="text"
                  value={formData.quarter}
                  onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Q1-2026"
                />
              </div>

              {/* Rating Score */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Rating Score * (1-5)
                </label>
                <div className="flex items-center gap-4">
                  {renderStars(formData.score, true, (score) => setFormData({ ...formData, score }))}
                  <span className="text-2xl font-bold text-gray-700">{formData.score}/5</span>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Feedback/Comments
                </label>
                <textarea
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide detailed feedback on employee's performance..."
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional notes or recommendations..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRating}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Rating Details</h2>
                  <p className="text-purple-100">{selectedRating.employeeName}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                  <p className="font-semibold">{selectedRating.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Department</p>
                  <p className="font-semibold">{selectedRating.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Quarter</p>
                  <p className="font-semibold">{selectedRating.quarter}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(selectedRating.category)}`}>
                    {selectedRating.category}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Rating Score</p>
                {renderStars(selectedRating.score)}
              </div>

              {selectedRating.feedback && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Feedback</p>
                  <p className="text-gray-700">{selectedRating.feedback}</p>
                </div>
              )}

              {selectedRating.remarks && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Remarks</p>
                  <p className="text-gray-700">{selectedRating.remarks}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Evaluated By</p>
                <p className="font-semibold">{selectedRating.evaluatedByName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(selectedRating.evaluationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeRating;
