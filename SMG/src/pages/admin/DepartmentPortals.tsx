import { Construction, ArrowLeft, Users, Phone, UserCheck, DollarSign, Clock, Coffee, Calendar, UserCog, Wrench, Package, TrendingUp } from 'lucide-react';
import { CanteenAdminPortal } from './CanteenAdminPortal';
import { PAAdminPortal } from './PAAdminPortal';
import { FinanceAdminPortal } from './FinanceAdminPortal';
import { ReceptionAdminPortal } from './ReceptionAdminPortal';
import { TimeOfficeAdminPortal } from './TimeOfficeAdminPortal';
import { EventsAdminPortal } from './EventsAdminPortal';
import { HODAdminPortal } from './HODAdminPortal';
import { MarketingAdminPortal } from './MarketingAdminPortal';
import { HRAdminPortal } from './HRAdminPortal';

interface DepartmentPortalProps {
  departmentName: string;
  departmentId: string;
  onBack: () => void;
}

const DepartmentPortal = ({ departmentName, departmentId, onBack }: DepartmentPortalProps) => {
  const getIcon = () => {
    switch (departmentId) {
      case 'pna': return Users;
      case 'reception': return Phone;
      case 'hr': return UserCheck;
      case 'finance': return DollarSign;
      case 'time-office': return Clock;
      case 'canteen': return Coffee;
      case 'events': return Calendar;
      case 'hod': return UserCog;
      case 'technician': return Wrench;
      case 'assembly': return Package;
      case 'marketing': return TrendingUp;
      default: return Construction;
    }
  };

  const Icon = getIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#0B4DA2] hover:text-[#042A5B] font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>

        {/* Under Construction Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center animate-in fade-in slide-in-from-bottom duration-700">
          {/* Animated Icon Container */}
          <div className="relative mb-8 inline-block">
            {/* Rotating Circle Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-spin-slow"></div>
            
            {/* Icon */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#0B4DA2] to-[#05CD99] rounded-full flex items-center justify-center shadow-lg">
              <Icon size={64} className="text-white" />
            </div>
          </div>

          {/* Construction Icon */}
          <div className="mb-6">
            <Construction size={48} className="text-yellow-500 mx-auto animate-bounce" />
          </div>

          {/* Department Name */}
          <h1 className="text-4xl font-bold text-[#042A5B] mb-4">
            {departmentName} Portal
          </h1>

          {/* Under Construction Message */}
          <div className="mb-8">
            <p className="text-2xl font-semibold text-gray-700 mb-3">
              Under Construction
            </p>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              This portal is currently being developed. We're working hard to bring you powerful tools and features tailored specifically for the {departmentName} department.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Development Progress</span>
              <span className="font-semibold">In Progress...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0B4DA2] to-[#05CD99] rounded-full animate-pulse-slow" style={{ width: '35%' }}></div>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="font-bold text-lg text-[#042A5B] mb-4">
              🎯 Features Coming Soon
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Department Dashboard</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Request Management</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Analytics & Reports</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">Team Management</p>
              </div>
            </div>
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

// Export all department portals
export const PNAPortal = ({ onBack }: { onBack: () => void }) => (
  <PAAdminPortal onBack={onBack} />
);

export const ReceptionPortal = ({ onBack }: { onBack: () => void }) => (
  <ReceptionAdminPortal onBack={onBack} />
);

export const HRPortal = ({ onBack }: { onBack: () => void }) => (
  <HRAdminPortal onBack={onBack} />
);

export const FinancePortal = ({ onBack }: { onBack: () => void }) => (
  <FinanceAdminPortal onBack={onBack} />
);

export const TimeOfficePortal = ({ onBack }: { onBack: () => void }) => (
  <TimeOfficeAdminPortal onBack={onBack} />
);

export const CanteenPortal = ({ onBack }: { onBack: () => void }) => (
  <CanteenAdminPortal onBack={onBack} />
);

export const EventsPortal = ({ onBack }: { onBack: () => void }) => (
  <EventsAdminPortal onBack={onBack} />
);

export const HODPortal = ({ onBack }: { onBack: () => void }) => (
  <HODAdminPortal onBack={onBack} />
);

export const TechnicianPortal = ({ onBack }: { onBack: () => void }) => (
  <DepartmentPortal departmentName="Technician" departmentId="technician" onBack={onBack} />
);

export const AssemblyPortal = ({ onBack }: { onBack: () => void }) => (
  <DepartmentPortal departmentName="Assembly" departmentId="assembly" onBack={onBack} />
);

export const MarketingPortal = ({ onBack }: { onBack: () => void }) => (
  <MarketingAdminPortal onBack={onBack} />
);
