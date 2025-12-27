import { useState } from 'react';
import {
  Users,
  Phone,
  UserCheck,
  DollarSign,
  Clock,
  Coffee,
  Calendar,
  UserCog,
  Wrench,
  Package,
  TrendingUp,
  Building2,
  ChevronRight
} from 'lucide-react';

interface AdminPortalSelectionProps {
  onSelectPortal: (portal: string) => void;
}

export const AdminPortalSelection = ({ onSelectPortal }: AdminPortalSelectionProps) => {
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  const portals = [
    {
      id: 'pna',
      name: 'P&A',
      fullName: 'Planning & Administration',
      icon: Users,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'reception',
      name: 'RECEPTION',
      fullName: 'Reception Management',
      icon: Phone,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'hr',
      name: 'HUMAN RESOURCE',
      fullName: 'HR Department',
      icon: UserCheck,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'finance',
      name: 'FINANCE',
      fullName: 'Finance Department',
      icon: DollarSign,
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'time-office',
      name: 'TIME OFFICE',
      fullName: 'Time Office Management',
      icon: Clock,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'canteen',
      name: 'CANTEEN',
      fullName: 'Canteen Management',
      icon: Coffee,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'events',
      name: 'EVENTS',
      fullName: 'Events Management',
      icon: Calendar,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      id: 'hod',
      name: 'HEAD OF DEPARTMENT',
      fullName: 'HOD Portal',
      icon: UserCog,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'marketing',
      name: 'MARKETING',
      fullName: 'Marketing Department',
      icon: TrendingUp,
      color: 'bg-rose-500',
      hoverColor: 'hover:bg-rose-600',
      gradient: 'from-rose-500 to-rose-600',
      hasSubItems: true,
      subItems: [
        'Marketing Campaign Status',
        'New Marketing Agency',
        'New Campaign Status',
        'Ongoing Campaign Status'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-center mb-4">
            <Building2 size={48} className="text-[#0B4DA2] mr-4" />
            <h1 className="text-5xl font-bold text-[#042A5B]">Admin Portal</h1>
          </div>
          <p className="text-xl text-gray-600 mt-2">
            Select Your Department to Access Portal
          </p>
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-[#0B4DA2] to-[#05CD99] mx-auto rounded-full"></div>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portals.map((portal, index) => (
            <div
              key={portal.id}
              className="animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => onSelectPortal(portal.id)}
                onMouseEnter={() => setHoveredPortal(portal.id)}
                onMouseLeave={() => setHoveredPortal(null)}
                className="w-full group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Card Content */}
                <div className="relative p-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${portal.color} rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-300`}
                  >
                    <portal.icon
                      size={32}
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Portal Name */}
                  <h3 className="text-lg font-bold text-[#1B254B] group-hover:text-white transition-colors duration-300 mb-2">
                    {portal.name}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300 mb-4">
                    {portal.fullName}
                  </p>

                  {/* Sub Items Badge (if applicable) */}
                  {portal.hasSubItems && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-blue-100 text-blue-600 group-hover:bg-white/20 group-hover:text-white px-2 py-1 rounded-full font-medium transition-all duration-300">
                        {portal.subItems?.length} Features
                      </span>
                    </div>
                  )}

                  {/* Arrow Icon */}
                  <div className="flex items-center justify-end">
                    <ChevronRight
                      size={24}
                      className={`text-gray-400 group-hover:text-white transition-all duration-300 ${
                        hoveredPortal === portal.id ? 'translate-x-2' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300"></div>
              </button>

              {/* Sub Items Tooltip on Hover */}
              {portal.hasSubItems && hoveredPortal === portal.id && (
                <div className="absolute z-10 mt-2 w-64 bg-white rounded-xl shadow-xl p-4 border border-gray-100 animate-in fade-in slide-in-from-top duration-200">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                    Features:
                  </p>
                  <ul className="space-y-1">
                    {portal.subItems?.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Select your department to access specific administrative functions</p>
          <p className="mt-1">Contact IT support if you don't see your department</p>
        </div>
      </div>
    </div>
  );
};
