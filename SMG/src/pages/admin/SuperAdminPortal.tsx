import { Construction, ArrowLeft, Crown } from 'lucide-react';

interface SuperAdminPortalProps {
  onBack: () => void;
}

export const SuperAdminPortal = ({ onBack }: SuperAdminPortalProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#0B4DA2] hover:text-[#042A5B] font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </button>

        {/* Under Construction Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center animate-in fade-in slide-in-from-bottom duration-700">
          {/* Animated Icon Container */}
          <div className="relative mb-8 inline-block">
            {/* Rotating Circle Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-20 animate-spin-slow"></div>
            
            {/* Icon */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Crown size={64} className="text-white" />
            </div>
          </div>

          {/* Construction Icon */}
          <div className="mb-6">
            <Construction size={48} className="text-yellow-500 mx-auto animate-bounce" />
          </div>

          {/* Portal Name */}
          <h1 className="text-4xl font-bold text-[#042A5B] mb-4">
            Super Admin Portal
          </h1>

          {/* Under Construction Message */}
          <div className="mb-8">
            <p className="text-2xl font-semibold text-gray-700 mb-3">
              Under Construction
            </p>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              The Super Admin Portal is currently being developed. This will be the central hub for complete system administration, user management, and organizational oversight.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Development Progress</span>
              <span className="font-semibold">In Progress...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-pulse-slow" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="font-bold text-lg text-[#042A5B] mb-4">
              👑 Super Admin Features Coming Soon
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Complete User Management</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Role & Permission Control</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">System Configuration</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Organization-wide Analytics</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Department Oversight</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Security & Audit Logs</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Global Announcements</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Master Data Management</p>
              </div>
            </div>
          </div>

          {/* Admin Badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg">
            <Crown size={20} />
            <span>Super Admin Access Required</span>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Need immediate assistance?{' '}
              <a href="mailto:support@smg-scooters.com" className="text-[#0B4DA2] hover:underline font-semibold">
                Contact IT Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
