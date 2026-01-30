import React from 'react';
import { SummaryCard } from '../../components/SummaryCard';
import { QuickActions } from '../../components/QuickActions';
import { RequestsTable } from '../../components/RequestsTable';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContextEnhanced';
import { Calendar, Package, Users } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const { requests, trainings, myAssets, leaveBalance } = useApp();

  // Calculate summary stats from Firebase data
  const summaryStats = [
    {
      id: 1,
      title: 'Leave Balance',
      value: String(leaveBalance.casual.remaining + leaveBalance.sick.remaining),
      subtitle: 'Days Available',
      trend: 'Casual & Sick',
      trendUp: true,
      icon: 'Calendar',
      color: 'blue' as const,
    },
    {
      id: 2,
      title: 'Pending Requests',
      value: String(requests.filter(r => r.status === 'pending').length),
      subtitle: 'Awaiting Approval',
      trend: 'Active requests',
      trendUp: false,
      icon: 'Clock',
      color: 'orange' as const,
    },
    {
      id: 3,
      title: 'Training Sessions',
      value: String(trainings.length),
      subtitle: 'Available',
      trend: 'Enroll now',
      trendUp: true,
      icon: 'GraduationCap',
      color: 'green' as const,
    },
    {
      id: 4,
      title: 'Assets Assigned',
      value: String(myAssets.length),
      subtitle: 'Active Items',
      trend: 'All tracked',
      trendUp: true,
      icon: 'Package',
      color: 'purple' as const,
    },
  ];

  const quickActions = [
    { id: 1, title: 'Apply Leave', icon: 'CalendarDays', color: 'blue' as const, route: '/leaves' },
    { id: 2, title: 'Submit Request', icon: 'Receipt', color: 'green' as const, route: '/requests' },
    { id: 3, title: 'View Attendance', icon: 'FileText', color: 'purple' as const, route: '/attendance' },
    { id: 4, title: 'Update Profile', icon: 'User', color: 'orange' as const, route: '/profile' },
    { id: 5, title: 'Training Portal', icon: 'BookOpen', color: 'indigo' as const, route: '/training' },
    { id: 6, title: 'My Documents', icon: 'HelpCircle', color: 'red' as const, route: '/documents' },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8 pt-16 pl-64 w-full min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          <h1 style={{ color: 'var(--smg-dark)' }}>
            Hey {user?.name?.split(' ')[0] || 'Employee'} 👋
          </h1>
        </div>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your account today.</p>
      </div>

      {/* Summary Cards - Horizontally scrollable on mobile */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
          {summaryStats.map((stat) => (
            <SummaryCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left/Center Column - Requests Table */}
        <div className="xl:col-span-2">
          <RequestsTable requests={requests.slice(0, 5)} />
        </div>

        {/* Right Column - Info Panels */}
        <div className="space-y-6">
          {/* Upcoming Training */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: 'var(--smg-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--smg-light-blue)' }}>
                  <Calendar size={20} style={{ color: 'var(--smg-royal)' }} strokeWidth={2.5} />
                </div>
                <h3 style={{ color: 'var(--smg-dark)' }}>Upcoming Training</h3>
              </div>
            </div>
            <div className="space-y-3">
              {trainings.slice(0, 3).length > 0 ? (
                trainings.slice(0, 3).map((training) => (
                  <div
                    key={training.id}
                    className="p-4 bg-gray-50 rounded-xl border hover:shadow-md transition-all cursor-pointer group"
                    style={{ borderColor: 'var(--smg-border)' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors" style={{ color: 'var(--smg-dark)' }}>
                        {training.title}
                      </h4>
                      {training.type === 'Mandatory' && (
                        <span
                          className="text-xs px-2 py-1 rounded-lg font-medium whitespace-nowrap"
                          style={{
                            backgroundColor: '#FEF2F2',
                            color: '#ef4444',
                          }}
                        >
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{training.date}</p>
                    <p className="text-xs text-gray-500">{training.duration} • {training.instructor}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No upcoming training sessions</p>
              )}
            </div>
          </div>

          {/* Assigned Assets */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: 'var(--smg-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F3E5F5' }}>
                  <Package size={20} style={{ color: '#9333ea' }} strokeWidth={2.5} />
                </div>
                <h3 style={{ color: 'var(--smg-dark)' }}>My Assets</h3>
              </div>
            </div>
            <div className="space-y-2">
              {myAssets.slice(0, 4).length > 0 ? (
                myAssets.slice(0, 4).map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="text-sm font-medium" style={{ color: 'var(--smg-dark)' }}>
                        {asset.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{asset.type}</p>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-lg font-medium"
                      style={{
                        backgroundColor: '#ECFDF5',
                        color: '#10b981',
                      }}
                    >
                      {asset.condition}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No assets assigned</p>
              )}
            </div>
          </div>

          {/* Team Contacts - Placeholder */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: 'var(--smg-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                  <Users size={20} style={{ color: '#10b981' }} strokeWidth={2.5} />
                </div>
                <h3 style={{ color: 'var(--smg-dark)' }}>Key Contacts</h3>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500 text-center py-4">Contact information coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}