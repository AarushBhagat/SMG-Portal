import React, { useState } from 'react';
import { Star, TrendingUp, Award, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';

export const RatingPage = () => {
  const [expandedRating, setExpandedRating] = useState<string | null>(null);

  // Mock data for HR ratings
  const ratings = [
    {
      id: 'RAT-2024-001',
      reviewPeriod: 'Q4 2024 (Oct-Dec)',
      reviewDate: '2024-12-20',
      reviewer: 'Priya Sharma',
      reviewerDesignation: 'HR Manager',
      overallRating: 4.5,
      categories: [
        { name: 'Work Quality', rating: 5, maxRating: 5, comment: 'Exceptional attention to detail and consistently delivers high-quality work.' },
        { name: 'Punctuality', rating: 4, maxRating: 5, comment: 'Generally punctual with occasional delays during peak season.' },
        { name: 'Team Collaboration', rating: 5, maxRating: 5, comment: 'Excellent team player, always ready to help colleagues.' },
        { name: 'Communication Skills', rating: 4, maxRating: 5, comment: 'Good communication skills, could improve on written documentation.' },
        { name: 'Initiative & Innovation', rating: 4.5, maxRating: 5, comment: 'Shows good initiative and has contributed valuable improvement suggestions.' },
        { name: 'Adherence to Policies', rating: 5, maxRating: 5, comment: 'Follows all company policies and procedures diligently.' }
      ],
      strengths: [
        'Technical expertise in assembly operations',
        'Strong problem-solving abilities',
        'Excellent safety record',
        'Mentors junior team members effectively'
      ],
      areasOfImprovement: [
        'Documentation and report writing',
        'Time management during multiple projects',
        'Cross-departmental communication'
      ],
      hrComments: 'Rohit has been an outstanding employee this quarter. His dedication to quality and safety is commendable. We recommend him for the upcoming advanced training program.',
      status: 'Acknowledged'
    },
    {
      id: 'RAT-2024-002',
      reviewPeriod: 'Q3 2024 (Jul-Sep)',
      reviewDate: '2024-09-25',
      reviewer: 'Anjali Verma',
      reviewerDesignation: 'Sr. HR Executive',
      overallRating: 4.2,
      categories: [
        { name: 'Work Quality', rating: 4.5, maxRating: 5, comment: 'Maintains high standards in assembly work.' },
        { name: 'Punctuality', rating: 4, maxRating: 5, comment: 'Consistent attendance record.' },
        { name: 'Team Collaboration', rating: 4, maxRating: 5, comment: 'Works well with team members.' },
        { name: 'Communication Skills', rating: 4, maxRating: 5, comment: 'Communicates effectively within the team.' },
        { name: 'Initiative & Innovation', rating: 4, maxRating: 5, comment: 'Contributed to process improvement ideas.' },
        { name: 'Adherence to Policies', rating: 5, maxRating: 5, comment: 'Excellent adherence to safety protocols.' }
      ],
      strengths: [
        'Consistent performance',
        'Good technical knowledge',
        'Safety conscious'
      ],
      areasOfImprovement: [
        'Leadership skills development',
        'Advanced technical certifications'
      ],
      hrComments: 'Good performance this quarter. Rohit shows consistent improvement and reliability.',
      status: 'Acknowledged'
    },
    {
      id: 'RAT-2024-003',
      reviewPeriod: 'Q2 2024 (Apr-Jun)',
      reviewDate: '2024-06-28',
      reviewer: 'Priya Sharma',
      reviewerDesignation: 'HR Manager',
      overallRating: 4.0,
      categories: [
        { name: 'Work Quality', rating: 4, maxRating: 5, comment: 'Good quality work with minimal errors.' },
        { name: 'Punctuality', rating: 4, maxRating: 5, comment: 'Regular and punctual.' },
        { name: 'Team Collaboration', rating: 4.5, maxRating: 5, comment: 'Great team spirit and cooperation.' },
        { name: 'Communication Skills', rating: 3.5, maxRating: 5, comment: 'Needs improvement in formal communication.' },
        { name: 'Initiative & Innovation', rating: 4, maxRating: 5, comment: 'Shows willingness to take on new challenges.' },
        { name: 'Adherence to Policies', rating: 5, maxRating: 5, comment: 'Strictly follows all guidelines.' }
      ],
      strengths: [
        'Reliable worker',
        'Good attendance',
        'Team player'
      ],
      areasOfImprovement: [
        'Communication skills',
        'Technical skill enhancement'
      ],
      hrComments: 'Satisfactory performance. Encourage Rohit to work on communication skills.',
      status: 'Acknowledged'
    }
  ];

  const getStarColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-blue-500';
    if (rating >= 3.5) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Satisfactory';
    return 'Needs Improvement';
  };

  const renderStars = (rating: number, maxRating: number = 5, size: number = 20) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={size} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative inline-block">
          <Star size={size} className="text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <Star size={size} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={size} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="space-y-6 p-6 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Award size={32} />
          Performance Ratings
        </h1>
        <p className="text-[#87CEEB] opacity-90">
          View your performance ratings and feedback from HR department
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Star className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Current Rating</p>
              <p className="text-2xl font-bold text-[#1B254B]">{ratings[0].overallRating.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            {renderStars(ratings[0].overallRating)}
            <span className="ml-2 text-sm font-semibold text-[#05CD99]">
              {getRatingLabel(ratings[0].overallRating)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Average Rating</p>
              <p className="text-2xl font-bold text-[#1B254B]">
                {(ratings.reduce((sum, r) => sum + r.overallRating, 0) / ratings.length).toFixed(1)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Based on {ratings.length} reviews
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-[#A3AED0]">Total Reviews</p>
              <p className="text-2xl font-bold text-[#1B254B]">{ratings.length}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Last review: {ratings[0].reviewDate}
          </p>
        </div>
      </div>

      {/* Ratings Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-[#1B254B] mb-6">Rating History</h2>
        
        <div className="space-y-4">
          {ratings.map((rating) => (
            <div key={rating.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              {/* Summary Header */}
              <div
                onClick={() => setExpandedRating(expandedRating === rating.id ? null : rating.id)}
                className="p-6 bg-gradient-to-r from-gray-50 to-white cursor-pointer hover:from-blue-50 hover:to-white transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-bold text-[#1B254B]">{rating.reviewPeriod}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rating.status === 'Acknowledged' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rating.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-[#0B4DA2]" />
                        <span>Review Date: {rating.reviewDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={16} className="text-[#0B4DA2]" />
                        <span>Reviewer: {rating.reviewer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" />
                        <span className="font-semibold text-[#1B254B]">Overall: {rating.overallRating}/5</span>
                        <div className="flex items-center gap-1 ml-2">
                          {renderStars(rating.overallRating, 5, 16)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    {expandedRating === rating.id ? (
                      <ChevronUp className="text-[#0B4DA2]" size={24} />
                    ) : (
                      <ChevronDown className="text-[#0B4DA2]" size={24} />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedRating === rating.id && (
                <div className="p-6 bg-white border-t border-gray-200 space-y-6">
                  {/* Category Ratings */}
                  <div>
                    <h4 className="font-bold text-[#1B254B] mb-4 flex items-center gap-2">
                      <Star className="text-yellow-400" size={20} />
                      Category Ratings
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rating.categories.map((cat, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-[#1B254B]">{cat.name}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-[#0B4DA2]">{cat.rating}</span>
                              <span className="text-sm text-gray-500">/ {cat.maxRating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(cat.rating, cat.maxRating, 14)}
                          </div>
                          <p className="text-xs text-gray-600 italic">{cat.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="font-bold text-[#1B254B] mb-3 flex items-center gap-2">
                      <TrendingUp className="text-green-500" size={20} />
                      Strengths
                    </h4>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <ul className="space-y-2">
                        {rating.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-green-500 mt-0.5">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Areas of Improvement */}
                  <div>
                    <h4 className="font-bold text-[#1B254B] mb-3 flex items-center gap-2">
                      <Award className="text-orange-500" size={20} />
                      Areas of Improvement
                    </h4>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <ul className="space-y-2">
                        {rating.areasOfImprovement.map((area, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-orange-500 mt-0.5">→</span>
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* HR Comments */}
                  <div>
                    <h4 className="font-bold text-[#1B254B] mb-3">HR Comments</h4>
                    <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-[#0B4DA2]">
                      <p className="text-sm text-gray-700 italic">"{rating.hrComments}"</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                        <User size={14} />
                        <span className="font-semibold">{rating.reviewer}</span>
                        <span>-</span>
                        <span>{rating.reviewerDesignation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rating Guide */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 shadow-lg border border-purple-200">
        <h3 className="font-bold text-[#1B254B] mb-4 flex items-center gap-2">
          <Award className="text-purple-600" size={24} />
          Rating Scale Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="bg-white p-3 rounded-xl text-center">
            <p className="font-bold text-green-600 mb-1">5.0 - 4.5</p>
            <p className="text-xs text-gray-600">Excellent</p>
          </div>
          <div className="bg-white p-3 rounded-xl text-center">
            <p className="font-bold text-blue-600 mb-1">4.4 - 4.0</p>
            <p className="text-xs text-gray-600">Very Good</p>
          </div>
          <div className="bg-white p-3 rounded-xl text-center">
            <p className="font-bold text-yellow-600 mb-1">3.9 - 3.5</p>
            <p className="text-xs text-gray-600">Good</p>
          </div>
          <div className="bg-white p-3 rounded-xl text-center">
            <p className="font-bold text-orange-600 mb-1">3.4 - 3.0</p>
            <p className="text-xs text-gray-600">Satisfactory</p>
          </div>
          <div className="bg-white p-3 rounded-xl text-center">
            <p className="font-bold text-red-600 mb-1">&lt; 3.0</p>
            <p className="text-xs text-gray-600">Needs Improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
};
